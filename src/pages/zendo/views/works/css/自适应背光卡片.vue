<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - ::after 伪元素继承父元素 background（background: inherit），自动获取图片颜色
   - filter: blur(20px) 实现模糊背光效果，z-index: -1 置于卡片后方
   - 背景色自动取自图片本身颜色，实现自适应色光
2. 交互方式
   - 纯展示，无交互
3. 结构要点
   - .backlight 包含背景图片，::after 伪元素作为背光层
   - 三张卡片（.box1/.box2/.box3）分别使用不同图片
4. 其他要点
   - background 简写形式包含 color/image/repeat/position/size
   - 背光颜色随图片主色调自动适配，无需 JS 计算
-->
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
