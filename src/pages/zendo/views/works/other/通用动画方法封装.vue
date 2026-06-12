<!--
核心逻辑：

1. 通用 requestAnimationFrame 动画
   - 封装 animation() 函数，基于时间差线性插值
   - 支持自定义 from/to/duration/onUpdate 参数
2. 应用场景
   - 价格数字动画：从 1000 打折到 50，实时更新 DOM
   - 元素位移动画：控制 dot 元素 left 属性移动
-->
<template>
    <div>
        <p >价格：¥<span ref="price">1000.00</span> </p>
        <el-button type="primary" @click="handleClick">打折</el-button>

        <div class="dot" ref="dot" @click="handleMove"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const price = ref(null)
const dot = ref(null)
const handleClick = () => {
    animation({
        from: 1000,
        to: 50,
        duration: 2000,
        onUpdate(val){
            price.value.innerHTML = val.toFixed(2)
        }
    })
}

const handleMove = () => {
    animation({
        from: 250,
        to: 1000,
        duration: 2000,
        onUpdate(val){
            console.log(val);
            dot.value.style.left = val +'px'
        }
    })
}

const animation = ({ from, to, duration = 1000, onUpdate }) => {
    let value = from
    const startTime = Date.now()
    const speed = (to - from) / duration
    function _run() {
        // 1. 改变value值
        const t = Date.now() - startTime
        if (t > duration) {
            value = to
            onUpdate && onUpdate(value)
            return
        }
        value = from + t * speed
        onUpdate && onUpdate(value)
        // 2. 注册下一次变化
        requestAnimationFrame(_run)
    }
    _run()
}
</script>

<style lang="scss" scoped>
.dot{
    width: 50px;
    height: 50px;
    background: rgb(0, 131, 131);
    position: absolute;
    top: 150px;
    left: 250px;
}
</style>