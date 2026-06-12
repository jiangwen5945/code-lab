<!--
核心逻辑：

1. 自定义指令 v-draggable
   - mounted 时设置元素 position: absolute 并监听 mousedown
   - mousedown 记录鼠标与元素初始偏移量
2. [拖拽交互]
   - mousemove 实时计算新 left/top 值，更新元素位置
   - 带边界约束，限制在 body 可视区域内不可拖出
   - mouseup 时清除 mousemove/mouseup 事件监听
3. [使用方式]
   - 在需要拖拽的元素上添加 v-draggable 指令即可
-->
<template>
   <div class="page-cell flex-cc">
    <div class="box">
        <div v-draggable class="draggable-box">可拖拽盒子1</div>
    </div>
   </div>
</template>

<style scoped lang="scss">
.draggable-box {
    width: 200px;
    height: 200px;
    background: teal;
    color: #fff;
    line-height: 200px;
    text-align: center;
    user-select: none
}

.box {
    width: 200px;
    height: 200px;
    padding: 20px;
    margin: 20px;
    border: 1px dashed #b4b2b2;
}
</style>
