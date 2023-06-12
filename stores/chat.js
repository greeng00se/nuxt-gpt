import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", () => {
  const query = ref("");
  const result = ref("");
  const load = ref(false);
  let ws;

  const clear = () => {
    query.value = "";
  };

  const chat = async () => {
    if (!load.value) {
      load.value = true;
      result.value = "";
      ws = new WebSocket(useRuntimeConfig().public.URL);
    }
    
    ws.onopen = (event) => {
      ws.send(JSON.stringify({
        "model" : "gpt-3.5-turbo-0301",
        "prompt" : query.value
      }));
    }
    
    ws.onmessage = function (event) {
      result.value += event.data;
    }
    
    ws.onclose = (event) => {
      load.value = false;
    }
  }

  const close = () => {
    if (load.value) {
      ws.close();
      load.value = false;
    }
  }

  return { query, result, clear, chat, close };
});
