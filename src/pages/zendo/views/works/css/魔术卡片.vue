<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - @property --rotate 注册 CSS 角度变量，使渐变角度可被 @keyframes 驱动
   - ::before 使用 linear-gradient(var(--rotate)) 作旋转彩色渐变边框
   - ::after 添加 blur 模糊效果增强发光感
   - @keyframes spin 驱动 --rotate 从 0deg 到 360deg 无限旋转
2. 交互方式
   - hover 时停止动画（animation: none）、隐藏边框（opacity: 0）、显示文字颜色
3. 结构要点
   - .card 为卡片主体，::before 为彩色边框层，::after 为发光光晕层
4. 其他要点
   - @property 是 CSS Houdini 特性，需浏览器支持
   - 卡片尺寸使用 CSS 自定义属性 --card-height/--card-width 控制
-->
<script>
export default {
    cover: 'https://iili.io/Jq9GrUg.gif',
    link: 'https://juejin.cn/post/7262007830721413180',
    code: 'https://codepen.io/jiangwen5945/details/WNLBmGK',
    date: '2023-09-09',
    info: `参考大佬 Chokcoco 的作品，用 Vue3.0 实现了一下，代码比较简单，就不多说了。
  知识点：
  1.通过伪元素制造多层表情标签，制造3D假象；
  2.通过记录下落转向上升的那一帧开始，更换表情和背景；
  3.学会如何通过 <code>conic-gradient</code> <code>linear-gradient</code> <code>radial-gradient </code> 实现多样化的背景效果；
`
}
</script>
<template>
    <div class="page-cell  flex-cc">
        <div class="card">Magic Card</div>
    </div>
</template>

<style scoped lang="css">
@property --rotate {
    syntax: "<angle>";
    initial-value: 132deg;
    inherits: false;
}

.page-cell {
    --card-height: 65vh;
    --card-width: calc(var(--card-height) / 1.5);
}

.card {
    background: #191c29;
    width: var(--card-width);
    height: var(--card-height);
    padding: 3px;
    position: relative;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    font-size: 1.5em;
    color: rgb(88 199 250 / 0%);
    cursor: pointer;
    font-family: cursive;
}

.card:hover {
    color: rgb(88 199 250 / 100%);
    transition: color 1s;
}

.card:hover:before,
.card:hover:after {
    animation: none;
    opacity: 0;
}


.card::before {
    content: "";
    width: 104%;
    height: 102%;
    border-radius: 8px;
    background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
    position: absolute;
    z-index: -1;
    top: -1%;
    left: -2%;
    animation: spin 2.5s linear infinite;
}

.card::after {
    position: absolute;
    content: "";
    top: calc(var(--card-height) / 6);
    left: 0;
    right: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    transform: scale(0.8);
    filter: blur(calc(var(--card-height) / 6));
    background-image: linear-gradient(var(--rotate), #5ddcff, #3c67e3 43%, #4e00c2);
    opacity: 1;
    transition: opacity .5s;
    animation: spin 2.5s linear infinite;
}

@keyframes spin {
    0% {
        --rotate: 0deg;
    }

    100% {
        --rotate: 360deg;
    }
}
</style>
