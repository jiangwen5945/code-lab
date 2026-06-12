<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - 利用 padding-top: 56%（≈ 9/16）基于父容器宽度撑起高度，使高度由宽度决定
   - 子元素 position: absolute + inset: 0 绝对定位铺满容器，实现 16:9 宽高比
2. 交互方式
   - 纯展示，无交互
3. 结构要点
   - .box 定义宽度 50%，.inner 用 padding-top 撑高，.container 绝对定位铺满
4. 其他要点
   - 注释中提及 aspect-ratio 属性作为现代替代方案，但有兼容性限制
-->
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
