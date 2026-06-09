<script>
export default {
  cover: 'https://iili.io/Jq9GrUg.gif',
  link: 'https://juejin.cn/post/7262007830721413180',
  date:'2023-09-09',
  info: `根据图片本身颜色进行自适应背光效果。
  知识点：
  1. background的简写形式：在CSS2.1里，background属性的简写方式包含五种属性值，从CSS3开始，又增加了3个新的属性值，加起来一共8个。
    background: 
    [background-color]           | 使用的背景颜色  CSS2.1
    [background-image]           | 使用的背景图像  CSS2.1
    [background-repeat]          | 如何重复背景图像  CSS2.1
    [background-attachment]      | 背景图像是否固定或者随着页面的其余部分滚动  CSS2.1
    [background-position] /      | 背景图像的位置  CSS2.1
    [background-size]            | 背景图片的尺寸  CSS3
    [background-origin]          | 背景图片的定位区域  CSS3
    [background-clip]            | 背景的绘制区域  CSS3 
`
}
</script>

<script setup>
import { useZendoStore } from '@/pages/zendo/stores/zendo'
const zendoStore = useZendoStore()
</script>

<template>
    <div class="page-cell  flex-cc">
        <div class="box1 backlight"></div>
        <div class="box2 backlight"></div>
        <div class="box3 backlight"></div>
    </div>
</template>
<!-- 
    📝笔记：background的简写形式：在CSS2.1里，background属性的简写方式包含五种属性值，从CSS3开始，又增加了3个新的属性值，加起来一共8个。
    
    background: 
    [background-color]           | 使用的背景颜色  CSS2.1
    [background-image]           | 使用的背景图像  CSS2.1
    [background-repeat]          | 如何重复背景图像  CSS2.1
    [background-attachment]      | 背景图像是否固定或者随着页面的其余部分滚动  CSS2.1
    [background-position] /      | 背景图像的位置  CSS2.1
    [background-size]            | 背景图片的尺寸  CSS3
    [background-origin]          | 背景图片的定位区域  CSS3
    [background-clip]            | 背景的绘制区域  CSS3 
-->
<style scoped lang="scss">
.box1 {
    background: #fff url('../../../assets/imgs/j1.jpg') no-repeat center / cover;
}

.box2 {
    background: #fff url('../../../assets/imgs/j2.jpg') no-repeat center / cover;
}

.box3 {
    background: #fff url('../../../assets/imgs/j3.jpg') no-repeat center / cover;
}

.backlight {
    position: relative;
    width: 500px;
    height: 500px;
    border-radius: 10px;
    margin: 20px;
    

    &:after {
        content: "";
        width: 100%;
        height: 100%;
        top: 0;
        position: absolute;
        background: inherit;
        filter: blur(20px);
        z-index: -1;
    }
}
</style>
