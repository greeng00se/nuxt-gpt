import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", () => {
  const query = ref("");
  const result = ref("");
  const load = ref(false);

  let controller = null;

  const clear = () => {
    query.value = "";
  };

  const chat = async () => {

    if (load.value) {
      return;
    }
    load.value = true;

    controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(useRuntimeConfig().public.GPT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${useRuntimeConfig().public.GPT_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: query.value }],
          stream: true,
        }),
        signal
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      result.value = "";

      while(true) {
        const chunk = await reader.read();
        const { done, value } = chunk;
        if (done) {
          break;
        }
        const decodedChunk = decoder.decode(value);
        const lines = decodedChunk.split("\n");
        const parsedLines = lines
          .map(line => line.replace(/^data: /, "").trim())
          .filter(line => line !== "" && line !== "[DONE]")
          .map(line => JSON.parse(line));

          for (const parsedLine of parsedLines) {
            const { choices } = parsedLine;
            const { delta } = choices[0];
            const { content } = delta;
            if (content) {
              result.value += content;
            }
          }
      }
    } catch (error) {
      if(signal.aborted) {
        result.value = "Reqeust Aborted";
      }
    } finally {
      load.value = false;
    }
  };

  const stop = () => {
    if (controller) {
      controller.abort();
      controller = null;
    }
  }

  return { query, result, clear, chat, stop };
});
