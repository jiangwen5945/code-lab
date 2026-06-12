<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - 展示 9 种不同的 CSS 文字特效，每个 h1:nth-child 对应一种效果：
     1. -webkit-box-reflect 倒影效果
     2. -webkit-text-stroke 描边 + text-shadow 彩色偏移
     3. text-decoration: line-through 删除线创意效果
     4. 多层 text-shadow 叠加实现 3D 浮雕字
     5. background-clip: text + 渐变背景实现文字半色分割
     6. text-shadow 模糊效果
     7. 双色 text-shadow 实现浮雕立体感
     8. mask: radial-gradient 点阵遮罩效果
     9. background-position 渐变色流动动画
2. 交互方式
   - 纯展示，无交互（第 9 种渐变动画自动播放）
3. 结构要点
   - .page-cell 使用 CSS Grid 布局（repeat(auto-fill, 400px)）排列 9 个 h1
4. 其他要点
   - 涵盖 text-shadow、background-clip、mask、box-reflect、text-stroke 等多种文字处理技术
-->
<script>
export default {
  cover: 'https://iili.io/JqJOqRS.png',
  link: 'https://juejin.cn/post/7165675529763454983',
  info: `🌈属于文字效果，里面有各种样式类型的文本，当然不仅仅可以应用于文字上，你也可以应用在其他地方。首先你要先学会他，不是吗？
    知识点：
    1. <code>background-clip: text;</code> 背景文本裁切
    2. <code>mask</code> 遮罩层 
    3. <code>svg，fliter</code>等效果应用 
    `
}
</script>
<template>
  <div class="page-cell">
    <h1>Hello World</h1>
    <h1>Hello World</h1>
    <h1>Hello World</h1>
    <h1>Hello World</h1>
    <h1>Hello World</h1>
    <h1>Hello World</h1>
    <h1>Hello World</h1>
    <h1>Hello World</h1>
    <h1>Hello World</h1>
  </div>
</template>
<style scoped>
.page-cell {
  display: grid;
  grid-template-columns: repeat(auto-fill, 400px);
  justify-content: center;
}

h1{
  font-size: 48px;
  font-weight: bold;
  white-space: nowrap;
  text-align: center;
  padding: 48px 0;
}

h1:nth-child(1) {
  /* 文字反射倒影 */
  -webkit-box-reflect: below -2.55em linear-gradient(transparent 30%, rgba(255, 255, 255, 0.6) 100%);
}

h1:nth-child(2) {
  /* 文字描边 width color */
  -webkit-text-stroke: 1px black;
  color: transparent;
  text-shadow:
    -5px 0 rgba(0, 255, 255, 0.4),
    5px 0 rgba(255, 0, 255, 0.4);
}

h1:nth-child(3) {
  text-decoration: line-through;
}

h1:nth-child(4) {
  color: #f4f4f4;
  text-shadow:
    -1px -1px white,
    1px 1px gray,
    2px 2px #7a7a7a,
    3px 3px #757575,
    4px 4px #707070,
    5px 5px #6b6b6b,
    6px 6px #666666,
    7px 7px #616161,
    8px 8px #5c5c5c,
    9px 9px #575757;
}

h1:nth-child(5) {
  color: transparent;
  background-image: linear-gradient(transparent 0%, transparent 50%, #447df7 50%, #447df7 100%);
  -webkit-background-clip: text;
  -webkit-text-stroke: 1px #447df7;
}

h1:nth-child(6) {
  color: transparent;
  text-shadow: 0 0 5px black;
}

h1:nth-child(7) {
  /* 文字间距 */
  letter-spacing: 4.8px;
  text-shadow:
    1px 1px 0px white,
    3px 3px 0px black;
}
h1:nth-child(8) {
  mask: radial-gradient(circle at 50% 50%, white, transparent 50%, transparent);
  mask-size: 2px 2px;
}
h1:nth-child(9) {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  color: transparent;
  background-position: center;
  background-size: 400% 400%;
  background-clip: text;
  animation: gradientBG 15s ease infinite;
}
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
