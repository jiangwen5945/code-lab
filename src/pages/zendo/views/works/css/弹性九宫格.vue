<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - 3×3 CSS Grid 九宫格，每格使用 Sass 循环赋色（hsl($i * 40, 100%, 80%)）
   - :has(.item:hover) 检测 hover 元素，通过 Sass 数学计算行列索引
   - 将 hover 元素所在行/列设为 2fr（其余 1fr），实现弹性缩放
2. 交互方式
   - hover 时对应行和列弹性放大，其他行列保持 1fr
3. 结构要点
   - .card 为 grid 容器（500px × 500px），包含 9 个 .item
4. 其他要点
   - 使用 Sass 的 list.set-nth 动态修改 grid-template-columns/rows
   - transition: 0.2s 平滑网格尺寸过渡
-->
<template>
    <div class="page-cell flex-cc">
        <div class='card'>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
    </div>
</template>


<style lang='scss' scoped>
@use 'sass:list';
@use 'sass:math';
.card {
    width: 500px;
    height: 500px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 10px;
    transition: .2s;

    @for $i from 1 through 9 {
        .item:nth-child(#{$i}) {
            background: hsl($i * 40, 100%, 80%);
        }

        // 移入子元素改变父元素css属性
        &:has(.item:nth-child(#{$i}):hover) {
            $r: math.floor(calc(($i - 1) / 3) + 1);
            $c: ($i - 1) % 3 + 1;
            $arr: 1fr 1fr 1fr;
            $rows: list.set-nth($arr, $r, 2fr);
            $cols: list.set-nth($arr, $c, 2fr);
            grid-template-columns: $cols;
            grid-template-rows: $rows;
        }
    }
}
</style>