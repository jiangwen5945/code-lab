<!--
核心逻辑：

1. BroadcastChannel 跨页签通信
   - 创建命名通道 "myChannel" 实现多标签页实时通信
   - onmessage 监听接收消息，postMessage 发送消息
2. 双向数据同步
   - 输入框内容变更时自动广播到所有同源页签
   - 组件卸载时调用 channel.close() 清理通道
-->
<script>
export default {
  info: `BroadcastChannel`,
  hidden: false
}
</script>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const msg = ref('')
let channel = null
onMounted(() => {
  // 创建一个名为 "myChannel" 的通道
  channel = new BroadcastChannel('myChannel')
  // 监听通道的消息
  channel.onmessage = (e) => {
    console.log(e.data)
    msg.value = e.data
  }
})
onUnmounted(() => {
  // 关闭通道
  channel.close()
})
const changeInput = (e) => {
  msg.value = e.target.value
  // 发送消息到通道
  channel.postMessage(e.target.value)
}
</script>

<template>
  <input type="text" v-model="msg" @input="changeInput" />
</template>
<style lang="scss" scoped></style>
