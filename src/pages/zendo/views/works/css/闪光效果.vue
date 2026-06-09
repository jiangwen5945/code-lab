<template>
    <div class="page-cell flex-vcc">
        <!-- 类型1 -->
        <h1 class="shark-txt">文以载道</h1>
        <!-- 类型2 -->
        <div class="shark-wrap">
            <img src="/src/pages/zendo/assets/imgs/j3.jpg" alt="">
        </div>
        <!-- 类型3 -->
        <div class="shark-wrap shark-wrap__mask">
            <img src="../../../assets//imgs/mask_demo.png" alt="">
        </div>
    </div>
</template>

<style lang="scss" scoped>


/* 扫光文字 */
h1 {
    font-size: 120px;
    font-weight: bold;
    color: #9747FF;
    text-align: center;
    margin: 0;
}

.shark-txt {
    -webkit-text-fill-color: transparent;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0) 60%) -100%/50% no-repeat currentColor;
    background-clip: text;
    animation: shark-txt 2s infinite;
}

@keyframes shark-txt {
    from {
        background-position: -100%;
    }

    to {
        background-position: 200%;
    }
}

/* 扫光容器 */
.shark-wrap {
    width: 500px;
    border-radius: 8px;
    background-color: #FFE8A3;
    overflow: hidden;
    position: relative;
    margin-top: 30px;

    &::after {
        content: '';
        position: absolute;
        inset: -20%;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0) 60%);
        animation: shark-wrap 2s infinite;
        transform: translateX(-100%);
    }
}

.shark-wrap img {
    display: block;
    width: 100%;
}


@keyframes shark-wrap {
    to {
        transform: translateX(100%);
    }
}


/* 扫光容器（不规则图片扫光） */
.shark-wrap__mask {
    mask: url('../../../assets/imgs/mask_demo.png') 0 0/100%;
}
</style>