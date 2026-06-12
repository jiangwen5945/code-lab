<!--
核心逻辑：

1. Web Animation API 驱动动画
   - element.animate() 从当前位置平滑移动到点击位置
   - 多关键帧定义挤压变形 (scaleX) 的弹性效果
2. 运动方向计算
   - Math.atan2 计算点击位置相对小球的旋转角度
   - 动画过程中始终朝向运动方向
3. 动画管理
   - 新动画开始前取消之前所有动画 (getAnimations)
   - onMounted 初始化小球起始位置
-->
<template>
    <div class="page-cell" @click="handleClick">
        <h2 class="slide-down">wed animation api</h2>
        <div class="ball" ref="ball"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const ball = ref(null)
let ballX = 600
let ballY = 300

onMounted(() => {
    ball.value.style.transform = `translate(600px, 300px)`
})

const move = (toX, toY) => {
    // 取消之前动画
    ball.value.getAnimations().forEach(e => {
        e.cancel()
    });

    // 小球变形角度（三角函数求反正切）
    const rad = Math.atan2(toY - ballY, toX - ballX)
    const deg = (rad * 180) / Math.PI
    ball.value.animate([
        {
            transform: `translate(${ballX}px , ${ballY}px) rotate(${deg}deg)`
        },
        {
            transform: `translate(${ballX}px , ${ballY}px) rotate(${deg}deg) scaleX(1.5)`,
            offset: 0.6
        },
        {
            transform: `translate(${toX}px , ${toY}px) rotate(${deg}deg) scaleX(1.5)`,
            offset: 0.8
        },
        {
            transform: `translate(${toX}px, ${toY}px) rotate(${deg}deg)`
        }
    ], {
        duration: 800,
        fill: 'forwards'
    })

    // 记录小球当前位置
    ballX = toX
    ballY = toY
}

const handleClick = (event) => {
    const { offsetX, offsetY } = event
    move(offsetX - 25, offsetY - 25)
}

</script>

<style lang="scss" scoped>
.ball {
    width: 50px;
    height: 50px;
    background: #ef60ea;
    border-radius: 50%;
    position: absolute;
}

h2 {
    font-size: 3em;
    position: absolute;
    top: 20px;
    text-align: center;
    // background: red;
    width: 100%;
}
</style>