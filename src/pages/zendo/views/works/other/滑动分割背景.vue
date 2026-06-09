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