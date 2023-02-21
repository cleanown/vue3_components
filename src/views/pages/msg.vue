<script setup lang="ts">
  import { ref } from "vue";
  import Message from '@/components/message/main';
  import { createRandomChinese } from "@/utils/index"
  const num = ref(1)
  function handleMsg (type: string) {
    Message({type: type, message: createRandomChinese(Math.floor(Math.random() * 100))})
  }
</script>

<template>
  <button @click="handleMsg('info')">msg-test{{num}}info</button>
  <button @click="handleMsg('success')">msg-test{{num}}success</button>
  <button @click="handleMsg('warning')">msg-test{{num}}warning</button>
  <button @click="handleMsg('error')">msg-test{{num}}error</button>
</template>

<style scoped>

</style>