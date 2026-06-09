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
