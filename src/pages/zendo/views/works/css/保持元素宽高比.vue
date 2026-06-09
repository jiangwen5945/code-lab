<template>
    <div class="page-cell flex-cc">
        <div class="box">
            <div class="inner">
                <div class="container flex-cc">保持宽高比</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.box {
    width: 50%;
    background: #eee;
    // aspect-ratio: 16 / 9; // 保持宽高比16:9（有兼容性问题，只支持谷歌88版本后的浏览器）
    .inner{
        width: 100%;
        padding-top: 56%;
        position: relative;
        .container{
            position: absolute;
            inset: 0;
            background: teal;
            color: #fff;
        }
    }
}
</style>
