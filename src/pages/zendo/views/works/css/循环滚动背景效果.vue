<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - ::before 伪元素创建 150vmax 超大背景层，使用 SVG 图案平铺并旋转 45deg
   - @keyframes bg 通过 background-position 垂直偏移（0 到 -200px）实现无限滚动循环
   - 文本使用 CSS Grid 叠加在背景层之上（grid-area: body 共享网格区域）
2. 交互方式
   - 纯 CSS 自动播放动画
   - prefers-reduced-motion 媒体查询尊重系统动画减弱设置，动画时长设为 0
3. 结构要点
   - .app-content 使用 display: grid + place-items/place-content: center 居中
   - ::before 伪元素作为背景层，h1.text 作为前景层叠加
4. 其他要点
   - CSS 自定义属性 $--bg-size: 200px 控制平铺尺寸
   - font-size 使用 clamp(48px, 10vmin, 96px) 响应式字体
-->
<script>
export default {
    link: 'https://juejin.cn/post/7159380028417277966',
    cover: 'https://iili.io/Jq64rOP.gif',
    info: `很早之前遇到的效果了，当时记得还在为自己搞得小程序登录背景发愁呢。突然发现了这个好看又简约的效果，所以便入手了。主要是根据一小块svg矢量图，然后通过背景重复实现的平铺，再加上背景尺寸和位置的改变，实现了动画效果。
    如果你想改颜色，那建议你下载源地址svg，然后修改fill填充色，你也可以通过上传自己的图片实现效果。
    `
}
</script>
<template>
    <div class="page app-content">
        <h1 class="text" aria-label="Thank you. Have a nice day!">
            <span class="heading" aria-hidden="true">
                <span class="filled">Hello world!</span>
            </span>
        </h1>
    </div>
</template>
<style scoped lang="scss">
/* 引入外部字体库 */
// @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap');
$--text-color: hsl(0 95% 60%);
$--bg-color: hwb(0 100% 0% / 0);
$--bg-size: 200px;

.app-content {
    /* 网格布局 */
    display: grid;
    /*  place-items 属性是align-items 和 justify-items 的简写 */
    /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-items */
    place-items: center;
    /* place-content 属性是align-content 和 justify-content的简写. */
    /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/place-content */
    place-content: center;
    /* grid-template-areas CSS 属性是网格区域 grid areas 在CSS中的特定命名 */
    /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas */
    grid-template-areas: 'body';
    overflow: hidden;
    font-family: 'Dela Gothic One', sans-serif;
    background-color: $--bg-color;
}

.app-content::before {
    /* vmin：当前vw和vh中较小的一个值； */
    /* vmax：当前vw和vh中较大的一个值； */
    /* vmin、vmax的作用：在做移动端页面开发时，会使得文字大小在横竖屏下保持一致。 */
    --size: 150vmax;
    /* grid-area 边界的约定 */
    /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-area */
    grid-area: body;
    content: '';
    /* inline-size CSS 属性影响一个元素的width 或 height，以改变一个元素的盒模型的水平或垂直大小 */
    /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/inline-size */
    inline-size: var(--size);
    /* https://developer.mozilla.org/zh-CN/docs/Web/CSS/block-size */
    block-size: var(--size);
    /* 平铺svg图 */
    // background-image: url('https://www.jq22.com/newjs/foot-pattern.svg');
    background-image: url('/src//pages//zendo/assets/imgs/foot-pattern.svg');
    background-size: $--bg-size;
    background-repeat: repeat;

    transform: rotate(45deg);
    opacity: 0.25;
    animation: bg 6s linear infinite;
}

/* prefers-reduced-motion 用于检测用户的系统是否被开启了动画减弱功能 */
/* https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    body::before {
        animation-duration: 0s;
    }
}

/* 背景图平移动画 */
@keyframes bg {
    to {
        background-position: 0 calc($--bg-size * -1);
    }
}

.text {
    grid-area: body;
    position: relative;
    display: flex;
    /* https://www.runoob.com/cssref/css3-pr-flex-direction.html */
    flex-direction: column;
    /* clamp() 函数的作用是把一个值限制在一个上限和下限之间，当这个值超过最小值和最大值的范围时，在最小值和最大值之间选择一个值使用。 */
    /* https://www.cnblogs.com/lvonve/p/13816256.html */
    /* clamp() 函数接收三个用逗号分隔的表达式作为参数，按最小值、首选值、最大值的顺序排列 */
    font-size: clamp(48px, 10vmin, 96px);
}

.heading span {
    display: block;
    color: $--text-color;
    //将元素的文本转换为(大写字母| 小写字母| 首字母大写)
    text-transform: capitalize
}

</style>
