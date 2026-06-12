<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - 通过 CSS mask 将 SVG 图标作为遮罩施加在背景山川图片上，使背景仅通过图标区域显示
   - @keyframes move 平移 background-position（0 → 100% → 0），产生云雾流动动画
   - filter: brightness(1.3) 提升整体亮度
2. 交互方式
   - 纯 CSS 自动播放动画
3. 结构要点
   - 单个 .mask 元素，集背景图片、mask 遮罩、动画于一体
4. 其他要点
   - mask 引用外部 SVG URL，mask-size: cover 自适应填充
   - background-size: cover 确保背景图片完整覆盖
-->
<script>
export default {
  link: 'https://github.com/chokcoco/iCSS/issues/80',
  cover:'https://iili.io/JqJOTfj.png'
}
</script>
<template>
  <div class="page-cell flex-cc">
    <div class="mask"></div>
  </div>
</template>
<style lang="scss" scoped>
.mask {
  width: 520px;
  height: 300px;
  // 背景山川图片
  background: url('https://sp-webfront.skypixel.com/skypixel/v2/public/website/assets/1535027674204-f6eca6369ec03e70262b58b0e25cda7b.jpg');
  // background: url('../../../assets/imgs/w_01.webp');
  background-size: cover;
  // 遮罩层svg -- dij
  mask: url('http://www2.djicdn.com/assets/images/v3/logo-black2-145dcb13c56f36a65d084180a42136fa.svg');
  mask-size: cover;
  filter: brightness(1.3);
  animation: move 100s infinite;
}

@keyframes move {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
}
</style>
