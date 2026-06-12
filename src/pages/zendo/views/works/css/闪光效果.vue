<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - 文字扫光：background-clip: text + 渐变背景，通过 @keyframes 改变 background-position 从 -100% 到 200% 实现扫光
   - 容器扫光：::after 伪元素 linear-gradient 渐变条，通过 translateX 从 -100% 到 100% 扫过
   - 不规则遮罩扫光：mask 属性引用 PNG 图片作为遮罩，实现不规则形状扫光
2. 交互方式
   - 纯 CSS 自动播放，无限循环
3. 结构要点
   - 三种扫光分别对应 h1（文字）、.shark-wrap（容器）、.shark-wrap__mask（不规则遮罩）
4. 其他要点
   - 扫光渐变条使用 transparent 40% → rgba(white, 0.7) → transparent 60% 形成亮条
   - background-size: 50% 控制扫光条宽度，inset: -20% 扩大伪元素区域避免扫光裁切
-->
<template>
    <div class="page-cell flex-vcc">
        <!-- 类型1 -->
        <h1 class="shark-txt">Hello World</h1>
        <!-- 类型2 -->
        <div class="shark-wrap">
            <img :src="`${base}img/work/item-2.webp`">
        </div>
    </div>
</template>

<script setup>
const base = import.meta.env.BASE_URL
</script>


<style lang="scss" scoped>
/* 扫光文字 */
h1 {
    font-size: 120px;
    font-weight: bold;
    color: #323232;
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
</style>