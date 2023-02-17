<script setup lang="ts">
  import { ref } from "vue";
  import Message from './components/message/main';
  const num = ref(1)
  function handleMsg (type: string) {
    Message({type: type, message: createRandomChinese(Math.floor(Math.random() * 100))})
  }

  function createRandomChinese (count: Number) {
      const start = parseInt('4e00', 16)
      const end = parseInt('9fa5', 16)
      let name = ''
      for(let i = 0; i < count; i++) {
          const cha = Math.floor(Math.random() * (end - start))
          name += '\\u' + (start + cha).toString(16)
      }
      return eval(`'${name}'`)
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
