<template>
    <!-- 
    单行实现步骤：
    1. 将文本框属性设置为等宽字体，计算文本框的字数，设置文字大小、相对布局等。
    2. 将文本框隐藏，通过动画改变文本框宽度，动画速度曲线使用css内置函数steps()变成步长动画，然后将动画模式设置为forwards,保留动画最后一帧样式。
    3. 使用伪元素after，设置边框属性和绝对布局，模拟光标；再使用动画实现若隐若现效果。

    多行实现步骤：
    1. 多行打字机实现思路是在单行的基础上进行的。
    2. 利用动画延迟属性，来实现单行实现过渡到多行实现的效果。
    3. 需要注意的是光标的处理，是最后一行光标才可以无限动画，其他行可以指定光标动画执行次数。
    -->
    <div class="container">
        <div class="text__box one">给时间以生命，给岁月以文明!</div>
        <!-- <div class="text__box two">失去人性，失去很多；失去兽性，失去一切</div>
        <div class="text__box three">弱小和无知不是生存的障碍，傲慢才是</div>
        <div class="text__box four">时来天地皆同力，势去英雄不自由</div> -->
    </div>
</template>

<style scoped lang="scss">
.container {
    // position: relative;
    // margin-top: 100px;
    // margin-left: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: linear-gradient(90deg, rgba(60, 10, 30, 0.04) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(60, 10, 30, 0.04) 3%, rgba(0, 0, 0, 0) 3%);
    background-size: 20px 20px;
    background-position: center center;
}

.text__box {
    position: relative;
    overflow: hidden;
    width: 0;
    font-size: 32px;
    line-height: 34px;
    font-family: "Courier New", Courier, monospace;
    white-space: nowrap;
    /* forwards: 属性规定动画不播放时将应用于元素的样式 */
    /* steps: css内置函数中animation-timing-function中的阶梯函数 */
    animation: width 2s steps(14) forwards;

    &::after {
        content: "";
        position: absolute;
        right: 0px;
        height: 32px;
        border-right: 1px solid #000;
        /* 单行 */
        animation: showInfinite 0.5s infinite both;
        /* 多行：执行5次*/
        // animation: showInfinite 0.5s 5 both;
    }
}

.one {
    animation-delay: 0s;
}

.two {
    animation-delay: 2s;

    &::after {
        animation-delay: 2s;
    }
}

.three {
    animation-delay: 4s;

    &::after {
        animation-delay: 4s;
    }
}

.four {
    animation-delay: 6s;

    &::after {
        animation-delay: 6s;
        animation: showInfinite 0.5s infinite both;
    }
}


@keyframes width {
    0% {
        width: 0;
    }

    100% {
        /* 单位em,表示一个字体的宽度 */
        width: 14em;
    }
}

@keyframes showInfinite {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
