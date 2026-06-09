<!-- 
 小结：
 1. defineAsyncComponent
 2. IntersectionObserver
-->
<template>
    <div class="page-cell flex-cc">
        <div class="container">
            <div class="card-box">
                <div class="card">
                    <img src="../../../assets//imgs/j1.jpg" alt="">
                </div>
                <div class="card">
                    <img src="../../../assets//imgs/j2.jpg" alt="">
                </div>
                <div class="card">
                    <img src="../../../assets//imgs/j3.jpg" alt="">
                </div>
                <div class="card">
                    <img src="../../../assets//imgs/j4.jpg" alt="">
                </div>
                <div class="card">
                    <img src="../../../assets//imgs/j5.jpg" alt="">
                </div>
                <div class="card">
                    <img src="../../../assets//imgs/j6.jpg" alt="">
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
