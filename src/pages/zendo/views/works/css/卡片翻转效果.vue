<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - perspective 建立 3D 视场，backface-visibility: hidden 确保旋转后背面不可见
   - .front 面 hover 时 rotateY(-180deg) 翻转到背面
   - .back 面初始 rotateY(-180deg) 隐藏，hover 时 rotateY(0deg) 翻转为正面
2. 交互方式
   - hover 触发翻转动画，transition: all 1s 平滑过渡
3. 结构要点
   - .card 为相对定位容器，.front 和 .back 绝对定位重叠
   - .back 包含图片和文字说明
4. 其他要点
   - 翻转使用 Y 轴旋转，也可改为 X 轴实现上下翻转
   - object-fit: cover 确保图片覆盖容器
-->
<template>
  <div class="page-cell flex-cc">
    <div class="card">
      <div class="front">
        <img :src="`${base}img/work/item-7.webp`" />
      </div>
      <div class="back">
        <img :src="`${base}img/work/item-10.webp`" />
      </div>
    </div>
  </div>
</template>

<script setup>
const base = import.meta.env.BASE_URL
</script>

<style scoped lang="scss">
.card {
  position: relative;
  width: 500px;
  height: 500px;
  text-align: center;
  line-height: 500px;
  font-size: 60px;
  color: #fff;
  margin: 80px auto;
  perspective: 1100px; // 使具有三维位置变换的元素产生透视效果

  &:hover .front {
    transform: rotateY(-180deg);
  }

  &:hover .back {
    transform: rotateY(0deg);
  }

  .front,
  .back {
    height: 500px;
    width: 500px;
    border-radius: 20px;
    overflow: hidden;
    transition: all 1s;
    backface-visibility: hidden;
  }

  .front {
    background: turquoise;
  }

  .back {
    background: orangered;
    transform: rotateY(-180deg);
    position: absolute;
    top: 0;
    left: 0;
  }

  .back-text {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 60px;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
    z-index: 1;
    pointer-events: none;
    white-space: nowrap;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
