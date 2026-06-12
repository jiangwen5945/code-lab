<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - 利用 perspective 建立 3D 视场，transform-style: preserve-3d 保留子元素 3D 空间
   - 6 张卡片通过 nth-child 分别设置 rotateY(0/60/120/180/240/300deg) + translateZ 前推，形成环绕圆柱排列
   - @keyframes cardRotate 逐帧旋转 -60deg 步进，实现自动轮播，hover 时动画暂停
2. 交互方式
   - hover 时 animation-play-state: paused 暂停轮播，方便查看
   - 纯 CSS 实现，无需 JS 交互
3. 结构要点
   - .container 提供 perspective 视场，.card-box 为旋转容器，.card 为每个卡片面
   - 6 个 .card 均匀分布在 360° 圆柱上，CSS 自定义属性 --tz 控制圆柱半径
4. 其他要点
   - -webkit-box-reflect 实现卡片倒影效果，增加立体感
   - cubic-bezier(0.77, 0, 0.175, 1) 缓动函数使轮播节奏更自然
-->
<template>
    <div class="page-cell flex-cc">
        <div class="container">
            <div class="card-box">
                <div class="card">
                    <img src="../../../assets//imgs/w_01.webp" alt="">
                </div>
                <div class="card">
                    <img src="../../../assets//imgs/w_02.webp" alt="">
                </div>
                <div class="card">
                    <img src="../../../assets//imgs/w_03.webp" alt="">
                </div>
                <div class="card">
                    <img src="../../../assets//imgs/w_04.webp" alt="">
                </div>
                <div class="card">
                    <img src="../../../assets//imgs/w_05.webp" alt="">
                </div>
                <div class="card">
                    <img src="../../../assets//imgs/w_06.webp" alt="">
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.page-cell {
    overflow: hidden;
    --tz: 600px
}

.container {
    width: 450px;
    height: 300px;
    perspective: 1000px;
    position: relative;
}

.card-box {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotateY(0) translateZ(calc(var(--tz) * -1));
    animation: cardRotate 30s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    animation-play-state: running;
    &:hover {
        animation-play-state: paused;
    }
}

.card {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
    -webkit-box-reflect: below 15px -webkit-linear-gradient(transparent 50%, rgba(255, 255, 255, 0.3));
}

.card img {
    width: 100%;
    height: 100%;
}

.card:nth-child(1) {
    transform: rotateY(0) translateZ(var(--tz));
}

.card:nth-child(2) {
    transform: rotateY(60deg) translateZ(var(--tz));
}

.card:nth-child(3) {
    transform: rotateY(120deg) translateZ(var(--tz));
}

.card:nth-child(4) {
    transform: rotateY(180deg) translateZ(var(--tz));
}

.card:nth-child(5) {
    transform: rotateY(240deg) translateZ(var(--tz));
}

.card:nth-child(6) {
    transform: rotateY(300deg) translateZ(var(--tz));
}

@keyframes cardRotate {
    
    0%{
        transform: translateZ(calc(var(--tz) * -1)) rotateY(0);
    }

    16.67% {
        transform: translateZ(calc(var(--tz) * -1)) rotateY(-60deg);
    }

    33.33% {
        transform: translateZ(calc(var(--tz) * -1)) rotateY(-120deg);
    }

    50% {
        transform: translateZ(calc(var(--tz) * -1)) rotateY(-180deg);
    }

    66.67% {
        transform: translateZ(calc(var(--tz) * -1)) rotateY(-240deg);
    }

    83.33% {
        transform: translateZ(calc(var(--tz) * -1)) rotateY(-300deg);
    }

    100% {
        transform: translateZ(calc(var(--tz) * -1)) rotateY(-360deg);
    }
}
</style>
