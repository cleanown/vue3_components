<template>
  <Transition name="fade" @after-leave="onDestroy">
    <div v-show="visible" class="img-view" :style="[{zIndex: zIndex}]" @mousewheel="handleMouseWheel($event)">
      <div style="position: absolute;z-index: 2;top: 20px;color: red;width: 100%;text-align: center;">组件未引入框架，请自己在组件内修改相关icon（改完这条删）</div>
      <div class="view-btn set-close fcc" @click="onClose" title="关闭">×</div>
      <div v-show="imgIndex > 0" class="view-btn set-pre fcc" @click="onPre" title="上一张">←</div>
      <div v-show="imgIndex < imgList.length - 1" class="view-btn set-next fcc" @click="onNext" title="下一张">→</div>
      <div class="view-set fcc">
        <span class="set-item" @click="handleImgSet('enlarge')" title="缩小">-</span>
        <span class="set-item" @click="handleImgSet('narrow')" title="放大">+</span>
        <span class="set-item" @click="handleImgSet('recovery')" title="恢复">口</span>
        <span class="set-item" @click="handleImgSet('turnLeft')" title="左转">↪</span>
        <span class="set-item" @click="handleImgSet('turnRight')" title="右转">↩</span>
      </div>
      <div class="img-box">
        <img
          class="img-content"
          :style="[{transform: `scale(${imgStyle.scale}) rotate(${imgStyle.rotate}deg)`, marginTop: imgStyle.marginTop + 'px', marginLeft: imgStyle.marginLeft + 'px', transition: `all ${imgStyle.tranistionTime}s linear`}]"
          :src="imgSrc.url"
          @dragstart.prevent
          @mousedown="handleMouseDown($event)"
          @mousemove="handleMouseMove($event)"
          @mouseup="handleMouseUp($event)"
          @mouseleave="handleMouseUp($event)"
        >
      </div>
    </div>
  </Transition>
  
</template>
<script setup lang='ts'>
import { ImgContent } from "./main"
import { ref, reactive, onMounted, onBeforeUnmount, defineProps, defineEmits, computed } from 'vue'
const props = defineProps({
  imgList: {//图片列表
    type: Array<ImgContent>,
    default: []
  },
  index: {//图片显示下标
    type: Number,
    default: 0,
  },
  zIndex: {//层级
    type: Number,
    default: 1000,
  }
})
const emit = defineEmits(['destroy'])
const visible = ref(false)
const imgIndex = ref(props.index)
const imgStyle = reactive({
  tranistionTime: 0.2,
  scale: 1,
  rotate: 0,
  marginTop: 0,
  marginLeft: 0,
  startX: 0,
  startY: 0,
})
const imgSrc = computed(() => props.imgList[imgIndex.value])
onMounted(() => {
  visible.value = true
  document.addEventListener('keydown', handleKeyDown)
})
onBeforeUnmount (() => {
  document.removeEventListener('keydown', handleKeyDown)
})
function handleKeyDown (e: KeyboardEvent) {
  switch (e.code) {
    case 'Escape':
      onClose()
      break;
    case 'ArrowLeft':
      onPre()
      break;
    case 'ArrowRight':
      onNext()
      break;
    case 'ArrowUp':
      handleImgSet('narrow')
      break;
    case 'ArrowDown':
      handleImgSet('enlarge')
      break;
    case 'Enter':
      handleImgSet('recovery')
      break;
    default:
      break;
  }
}
//按钮操作
function onClose () {//关闭
  visible.value = false
}
function onPre () {//上一张
  if (imgIndex.value > 0) {
    imgStyle.scale = 1
    imgIndex.value--
  }
}
function onNext () {//下一张
  if (imgIndex.value < props.imgList.length - 1) {
    imgStyle.scale = 1
    imgIndex.value++
  }
}
function handleImgSet (set: String) {//图片操作
  if (set == 'enlarge') {
    imgStyle.scale = imgStyle.scale - 0.1
  } else if (set == 'narrow') {
    imgStyle.scale = imgStyle.scale + 0.1
  } else if (set == 'recovery') {
    imgStyle.scale = 1
    imgStyle.rotate = 0
    imgStyle.marginTop = 0
    imgStyle.marginLeft = 0
    imgStyle.startX = 0
    imgStyle.startY = 0
  } else if (set == 'turnLeft') {
    imgStyle.rotate = imgStyle.rotate - 90
  } else if (set == 'turnRight') {
    imgStyle.rotate = imgStyle.rotate + 90
  }
}
//拖拽处理
const isPressed = ref(false)
function handleMouseDown (e: MouseEvent) {
  isPressed.value = true
  imgStyle.tranistionTime = 0
  imgStyle.startX = e.pageX - imgStyle.marginLeft/2
  imgStyle.startY = e.pageY - imgStyle.marginTop/2
}
function handleMouseMove (e: MouseEvent) {
  if (isPressed.value) {
    imgStyle.marginLeft = (e.pageX - imgStyle.startX) * 2
    imgStyle.marginTop = (e.pageY - imgStyle.startY) * 2
  }
}
function handleMouseUp (e: MouseEvent) {
  isPressed.value = false
  imgStyle.tranistionTime = 0.2
  imgStyle.startX = 0
  imgStyle.startY = 0
}
// 鼠标滚轮
function handleMouseWheel (e: WheelEvent) {
  const scaleVal = imgStyle.scale - e.deltaY / 5000
  if (scaleVal > 0.1 && scaleVal < 3) {
    imgStyle.scale = scaleVal
  }
}
//动画结束销毁
function onDestroy () {
  emit('destroy')
}
</script>

<style>
.img-view{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.set-close{
  position: absolute;
  top: 40px;
  right: 40px;
}
.set-pre{
  position: absolute;
  left: 40px;
  top: 50%;
  transform: rotateY(-50%);
}
.set-next{
  position: absolute;
  right: 40px;
  top: 50%;
  transform: rotateY(-50%);
}
.view-btn{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #606266;
  color: #fff;
  cursor: pointer;
  user-select: none;
  font-size: 25px;
  z-index: 2;
}
.view-set{
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #606266;
  color: #fff;
  cursor: pointer;
  user-select: none;
  z-index: 2;
  border-radius: 50px;
}
.set-item{
  padding: 10px 15px;
  font-size: 20px;
}
.set-item:first-child{
  border-radius: 50px 0px 0px 50px;
  padding: 10px 15px 10px 20px;
}
.set-item:last-child{
  border-radius: 0px 50px 50px 0px;
  padding: 10px 20px 10px 15px;
}
.img-box{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-content{
  user-select: none;
  display: block;
  content: " ";
  max-width: 100%;
  max-height: 100%;
}
.fcc{
  display: flex;
  align-items: center;
  justify-content: center;
}
.fade-enter-from, .fade-leave-to{
  opacity: 0;
}
.fade-enter-active,.fade-leave-active {
  transition: all .3s cubic-bezier(.55,0,.1,1);
}
</style>