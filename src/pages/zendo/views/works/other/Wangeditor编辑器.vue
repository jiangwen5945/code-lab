<!--
核心逻辑：

1. WangEditor 富文本封装
   - 封装为独立组件，通过 v-model 实现双向绑定
   - 支持 disable prop 控制编辑器禁用状态
2. 组件集成
   - 从 @/pages/zendo/components/wangeditor 导入子组件
   - 父组件传递初始内容和禁用状态
-->

<script>
export default {
  cover:'https://iili.io/JqJOzib.png',
  link: 'https://www.wangeditor.com/v5/for-frame.html#vue3'
}
</script>
<script setup>
import WangEditor from '@/pages/zendo/components/wangeditor/index.vue'
import { onMounted, ref } from 'vue'
const content = ref('<p>😁我是一个好用的富文本编辑器~</p>')
const disable = ref(false)
onMounted(() => {})
</script>

<template>
  <div class="page-cell flex-cc">
    <WangEditor v-model="content" :disable="disable" />
  </div>
</template>
<style scoped></style>
