<!-- 
 小结：
 1. defineAsyncComponent
 2. IntersectionObserver
-->
<template>
    <div class="page-cell">
        <div class="pannel" ref="pannelRef"></div>
    </div>
</template>

<script setup>
import { time } from 'echarts';
import { onMounted, ref } from 'vue';

const pannelRef = ref(null)

const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

const textConfig = {
    time: 100,
    text: `春江花月夜
   唐·张若虚  
  春江潮水连海平，海上明月共潮生。
  滟滟随波千万里，何处春江无月明！
  江流宛转绕芳甸，月照花林皆似霰；
  空里流霜不觉飞，汀上白沙看不见。
  江天一色无纤尘，皎皎空中孤月轮。
  江畔何人初见月？江月何年初照人？
  人生代代无穷已，江月年年望相似。
  不知江月待何人，但见长江送流水。
  白云一片去悠悠，青枫浦上不胜愁。
  谁家今夜扁舟子？何处相思明月楼？
  可怜楼上月裴回，应照离人妆镜台。
  玉户帘中卷不去，捣衣砧上拂还来。
  此时相望不相闻，愿逐月华流照君。
  鸿雁长飞光不度，鱼龙潜跃水成文。
  昨夜闲潭梦落花，可怜春半不还家。
  江水流春去欲尽，江潭落月复西斜。
  斜月沉沉藏海雾，碣石潇湘无限路。
  不知乘月几人归，落月摇情满江树。
  `
}

const write = (t) => {
    pannelRef.value.innerText = t + ' |'
}

const run = async () => {
    let t = 0
    while (t <= textConfig.text.length) {
        write(textConfig.text.substring(0, t))
        await delay(textConfig.time)
        t++
    }
}

onMounted(() => {
    run()
})

</script>

<style lang="scss" scoped>
@import url('../../../assets/fonts/googleapis.css');

.pannel {
    font-family: "Ma Shan Zheng", cursive;
    font-size: 30px;
    text-align: left;
    padding: 20px 50px;
    line-height: 1.5em;
    width: 600px;
    margin: 0 auto;
}
</style>