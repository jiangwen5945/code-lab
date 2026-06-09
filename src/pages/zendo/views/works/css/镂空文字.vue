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
  // background: url('../../../assets/imgs/j1.jpg');
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
