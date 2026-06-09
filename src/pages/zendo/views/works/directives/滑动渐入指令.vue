<template>
    <div class="page-cell">
        <div class="item" v-slide-in v-for="n in 10" :key="n">{{ n }}</div>
    </div>
</template>

<style scoped lang="scss">
@use 'sass:math';
@function random-color() {
    $random-red: math.random(255);
    $random-green: math.random(255);
    $random-blue: math.random(255);
    @return rgb($random-red, $random-green, $random-blue);
}

// 使用函数
.item {
    width: 80%;
    height: 400px;
    margin: 20px auto;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-size: 50px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(1) {
        background-color: random-color();
    }

    &:nth-child(2) {
        background-color: random-color();
    }

    &:nth-child(3) {
        background-color: random-color();
    }

    &:nth-child(4) {
        background-color: random-color();
    }

    &:nth-child(5) {
        background-color: random-color();
    }

    &:nth-child(6) {
        background-color: random-color();
    }

    &:nth-child(7) {
        background-color: random-color();
    }

    &:nth-child(8) {
        background-color: random-color();
    }

    &:nth-child(9) {
        background-color: random-color();
    }

    &:nth-child(10) {
        background-color: random-color();
    }
}
</style>