<template>
  <transition name="my-message" @after-leave="onDestroy">
    <div ref="myMessageRef" v-show="visible" class="main" :class="[`my-message-${type}`]" :style="[{top: top + 'px'}]" @mouseenter="clearTimer" @mouseleave="startTimer">{{message}}</div>
  </transition>
</template>

<script setup lang='ts'>
import { ref, onMounted, defineProps, defineEmits, PropType, nextTick } from 'vue'
const props = defineProps({
  id: {
    type: String,
    default: 'my-message'
  },
  message: {
    type: String,
    default: "",
  },
  type: {
    type: String as PropType<'info' | 'success' | 'warning' | 'error'>,
    defautl: "info"
  },
  duration: {
    type: Number,
    default: 3000,
  }
})
const emit = defineEmits(['close', 'destroy'])
const visible = ref(false)
const top = ref(20)
const timer = ref<any>(null)
const myMessageRef = ref<HTMLDivElement>()
const height = ref(0)
onMounted(() => {
  visible.value = true
  startTimer()
  nextTick(() => {
    height.value = myMessageRef.value!.getBoundingClientRect().height
  })
})
function startTimer () {
  if (props.duration > 0) {
    timer.value = setTimeout(()=> {
      visible.value = false
      onClose()
    }, props.duration)
  }
}
function clearTimer () {
  timer.value && clearTimeout(timer.value)
}
function onClose () {
  emit('close')
}
function onDestroy () {
  emit('destroy')
}
defineExpose({
  visible,
  top,
  height,
  close,
})
</script>

<style scoped>
.main{
  position: fixed;
  top: 20px;
  left: 50%;
  min-width: 350px;
  transform: translate(-50%);
  border: .5px solid #EBEEF5;
  border-radius: 4px;
  padding: 10px;
  transition: opacity .3s cubic-bezier(.55,0,.1,1), top .4s cubic-bezier(.55,0,.1,1);
  overflow: hidden;
  background-color: #edf2fc;
  color: #909399;
}
.my-message-enter-from, .my-message-leave-to{
  transform: translate(-50%, -100%);
  opacity: 0;
}
.my-message-enter-active,
.my-message-leave-active {
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
.my-message-info{
  background-color: #edf2fc;
  border-color: #EBEEF5;
  color: #909399;
}
.my-message-success{
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67C23A;
}
.my-message-warning{
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #E6A23C;
}
.my-message-error{
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #F56C6C;
}
</style>