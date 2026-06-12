<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - Flexbox 横向图片列表，perspective 建立 3D 视场
   - hover 时通过 translateZ 前推 + rotateY 旋转 + filter 去除灰度/提亮，形成波浪展开效果
   - + 相邻兄弟选择器控制右侧卡片逐级变形，:has() 选择器控制左侧卡片对称变形
2. 交互方式
   - hover 触发波浪展开动画，transition 时长 1.25s，使用 cubic-bezier(.1, .7, 0, 1) 弹性曲线
   - click/focus 时 width 展开至 28vw，z-index: 100 突出选中卡片
3. 结构要点
   - .items 为 flex 容器，gap: 6.4px，每个 .item 使用 background-image 展示图片
   - ::before/::after 伪元素扩大 hover 触发区域（左右各 20px），防止快速滑动时断触
4. 其他要点
   - CSS 自定义属性 --index: calc(1vw + 1vh) 实现响应式尺寸
   - will-change 优化动画渲染性能，默认 filter: grayscale(1) brightness(.5)
-->
<template>
    <div class="page-cell  flex-cc">
        <div class="wrapper">
            <div class="items">
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/15_voqq0c.png)"></div>
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/21_wbsty7.png)"></div>
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/1_zlqnwl.jpg)"></div>
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/16_epnmqm.png)"></div>
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/Screenshot_23_8_nbzwdm.png)"></div>
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/29_jbd4di.jpg)"></div>
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/14_zkwtff.png)"></div>
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/8_ucihr5.png)"></div>
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/18_bguamv.png)"></div>
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/Screenshot_18_4_mscxmr.jpg)"></div>
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/2_zja2bq.png)"></div>
                <div class="item" tabindex="0"
                    style="background-image: url(https://highflyer.sirv.com/cloud/11_p1oi8m.png)"></div>

            </div>

        </div>
    </div>
</template>
<style scoped lang="scss">
.page-cell {
    --index: calc(1vw + 1vh);
    --transition: cubic-bezier(.1, .7, 0, 1);
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.items {
    display: flex;
    gap: 6.4px;
    perspective: calc(var(--index) * 35);
}

.item {
    width: calc(var(--index) * 3);
    height: calc(var(--index) * 12);
    background-color: #222;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    filter: grayscale(1) brightness(.5);
    transition: transform 1.25s var(--transition), filter 3s var(--transition), width 1.25s var(--transition);
    will-change: transform, filter, rotateY, width;
}

.item::before,
.item::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 20px;
    right: calc(var(--index) * -1);
}

.item::after {
    left: calc(var(--index) * -1);
}

.items .item:hover {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 10));
}

/*Right*/

.items .item:hover+* {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 8.5)) rotateY(35deg);
    z-index: -1;
}

.items .item:hover+*+* {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 5.6)) rotateY(40deg);
    z-index: -2;
}

.items .item:hover+*+*+* {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 2.5)) rotateY(30deg);
    z-index: -3;
}

.items .item:hover+*+*+*+* {
    filter: inherit;
    transform: translateZ(calc(var(--index) * .6)) rotateY(15deg);
    z-index: -4;
}


/*Left*/

.items .item:has(+ :hover) {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 8.5)) rotateY(-35deg);
}

.items .item:has(+ * + :hover) {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 5.6)) rotateY(-40deg);
}

.items .item:has(+ * + * + :hover) {
    filter: inherit;
    transform: translateZ(calc(var(--index) * 2.5)) rotateY(-30deg);
}

.items .item:has(+ * + * + * + :hover) {
    filter: inherit;
    transform: translateZ(calc(var(--index) * .6)) rotateY(-15deg);
}

.items .item:active,
.items .item:focus {
    width: 28vw;
    filter: inherit;
    z-index: 100;
    transform: translateZ(calc(var(--index) * 10));
    margin: 0 .45vw;
}
</style>
