<template>
  <p>
    <button @click="handleView">点击预览</button>
  </p>
</template>

<script setup lang='ts'>
import imgView from "@/components/imgUpload/main"
function handleView () {
  imgView([
    {
      fileName: "1",
      url: "https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF",
    },
    {
      fileName: "1",
      url: "https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF",
    },
    {
      fileName: "1",
      url: "https://img2.baidu.com/it/u=3836178366,3730174877&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500",
    },
    {
      fileName: "1",
      url: "https://img1.baidu.com/it/u=1324747567,1538713965&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
    }
  ], 1)
}
</script>

<style scoped>
</style>