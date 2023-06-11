<template>
  <div>
    <v-container class="justify-center">
      <h2>우아한테크코스 크루들을 위한 Chat-GPT 서비스입니다.</h2>
      <v-textarea
        v-model="chatStore.query"
        variant="outlined"
        label="질문을 입력해주세요."
        append-inner-icon="mdi-arrow-right"
        clearable
        clear-icon="mdi-close-circle"
        @click:append-inner="chatStore.chat"
        @click:clear="chatStore.clear"
        @keydown.enter.exact.prevent="chatStore.chat"
        @keydown.enter.shift.prevent="appendNewLine"
        hide-details
      ></v-textarea>
      <v-btn @click="chatStore.stop">
        멈춤 버튼
      </v-btn>
      <v-card>
        {{  chatStore.result }}
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import { useChatStore } from "~~/stores/chat";

const chatStore = useChatStore();

const appendNewLine = (event: any) => {
  if (event.isComposing) {
    event.stopPropagation();
  } else if (event.shiftKey) {
    chatStore.query += "\n";
  }
};
</script>

<style scoped></style>
