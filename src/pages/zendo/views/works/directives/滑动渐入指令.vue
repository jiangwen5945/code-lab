<!--
核心逻辑：

1. 自定义指令 v-slide-in
   - 通过 IntersectionObserver 监听每个 .item 元素是否进入视口
   - 配合 Web Animation API（element.animate）播放 translateY + opacity 过渡动画
   - 动画先暂停，元素进入视口后播放，播放完成后 unobserve 仅触发一次
2. [交互/使用方式]
   - 在需要滑入的元素上添加 v-slide-in 指令即可
   - 页面滚动到对应位置时自动触发动画
3. [数据/状态管理]
   - 无 props/参数传递，指令内部自动管理 observer 实例
4. [其他要点]
   - 使用 Sass 的 random-color 函数为 10 个色块生成随机背景色
   - 依次展示 10 个随机色块滑入的效果
-->
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