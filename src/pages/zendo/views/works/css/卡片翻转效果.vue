<template>
    <div class="page-cell flex-cc">
        <div class="card">
        <div class="front">小土豆🥔
        </div>
        <div class="back">
            <img src="/src/pages/zendo/assets/imgs/小土豆.png" alt="">
        </div>
    </div>
    </div>
</template>

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
        transform: rotateY(-180deg)
    }

    &:hover .back {
        transform: rotateY(0deg)
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

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
