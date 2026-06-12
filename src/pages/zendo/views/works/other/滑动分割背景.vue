<!--
核心逻辑：

1. 鼠标滑动分割效果
   - 监听 window 的 mousemove 事件获取鼠标 X 坐标
   - 根据 (clientX / innerWidth) * 100% 动态计算左面板宽度
   - 左右两侧分别使用深色和浅色背景形成视觉对比
2. 实时 DOM 操作
   - 直接操作 #left-side 元素的 style.width 属性
   - 无需第三方库，纯原生 JS 实现
-->
<script setup>
import { onMounted, onUnmounted } from 'vue'
onMounted(() => {
  window.addEventListener('mousemove', mousemove)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', mousemove)
})
const mousemove = (e) => {
  // 鼠标移动时，顶层的背景宽度根据鼠标位置改变
  const left = document.getElementById('left-side')
  left.style.width = `${(e.clientX / window.innerWidth) * 100}%`
}
</script>

<template>
  <div class="page-cell">
    <div id="left-side" class="side">
      <h2 class="title">
        我是 光明和黑暗
      </h2>
      <p class="fancy">I am the light and the dark</p>

    </div>
    <div id="right-side" class="side">
      <h2 class="title">
        我是 光明和黑暗
      </h2>
      <p class="fancy">I am the light and the dark</p>

    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Rajdhani:300&display=swap');
$--light: white;
$--dark: black;

.side {
  display: grid;
  height: 100%;
  width: 100%;
  overflow: hidden;
  place-items: center;
  position: absolute;
  cursor: default;
  box-sizing: border-box;
  text-align: center;

  .title {
    font-size: 7vw;
    width: 90vw;
  }

  .fancy {
    font-family: 'Rajdhani', sans-serif;
    font-size: 5vw;
    width: 90vw;
    font-weight: 200;
  }
}

#left-side {
  background-color: $--dark;
  z-index: 2;
  color: $--light;
}

#right-side {
  background-color: $--light;
  color: $--dark;
}
</style>