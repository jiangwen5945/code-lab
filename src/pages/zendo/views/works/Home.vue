<template>
    <div class="page-cell flex-cc">
        <div class="t">
            <h2>临江仙</h2>
            <p>滚滚长江东逝水</p>
            <p>浪花淘尽英雄</p>
            <p>是非成败转头空</p>
            <p>青山依旧在</p>
            <p>几度夕阳红</p>
            <p>白发渔樵江渚上</p>
            <p>惯看秋月春风</p>
            <p>一壶浊酒喜相逢</p>
            <p>古今多少事</p>
            <p>都付笑谈中</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap');
// @import url('../../assets/fonts/googleapis.css');
.t {
    font-family: "Ma Shan Zheng", cursive;
    font-size: 50px;
    text-align: justify; // 文字分散排列
    text-align-last: justify; // 最后一行文字分散排列
    writing-mode: vertical-rl; // 文字排列方向
    height: 60vh;
}

h2, p {
    margin-left: 30px;
}
</style>