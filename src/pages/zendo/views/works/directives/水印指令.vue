<!--
核心逻辑：

1. 自定义指令 v-waterMarker
   - 内部创建 canvas，将水印文字旋转 -20 度后绘制到 canvas 上
   - 通过 toDataURL() 导出为背景图片，以平铺方式设置为元素的 backgroundImage
2. [参数配置]
   - text：水印文字内容（默认 "JiangWen版权所有"）
   - font：字体样式（默认 "14px Microsoft JhengHei"）
   - textColor：文字颜色（默认 "rgba(180, 180, 180, 0.4)"）
3. [使用方式]
   - 在目标元素上添加 v-waterMarker="{ text, font, textColor }" 指令
   - 指令会在元素上生成全页面半透明水印覆盖效果
-->
<template>
    <div class="page" v-waterMarker="{
        text: 'JiangWen版权所有',
        font: '14px Microsoft JhengHei',
        textColor: 'rgba(180, 180, 180, 0.4)'
    }">
    </div>
</template>

<style scoped lang="scss">
</style>