<template>
  <div v-if="!isHome">
    <RouterLink to="/">
      <div class="fcc">
        <button class="back-home-btn">回到主页</button>
      </div>
    </RouterLink>
    <div class="line"></div>
    <div class="view-content">
      <RouterView />
    </div>
  </div>
  <div v-else class="view-content">
    <RouterView />
  </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router'
import { ref, watch } from "vue"
const route = useRoute()
const isHome = ref(true)
watch(route, (val) => {
  isHome.value = val.fullPath == '/'
})
</script>

<style>
.back-home-btn{
  background: burlywood;
  color: #fff;
  margin: 20px 0 0 0;
}
.line{
  width: 100%;
  height: 1px;
  background: #ccc;
  margin: 20px 0;
}
.view-content{
  border: 1rpx solid red;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  display: block;
}
</style>