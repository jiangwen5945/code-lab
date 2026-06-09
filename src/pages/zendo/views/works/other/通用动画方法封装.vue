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