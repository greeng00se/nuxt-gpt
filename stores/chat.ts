import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", () => {
  const query = ref("");
  
  const clear = () => {
    query.value = "";
  };


  return { query, clear };
});