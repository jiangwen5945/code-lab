<template>
    <div class="page-cell">
        <div class="echarts-container" ref="chart"></div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null);

onMounted(() => {
    const chartInstance = echarts.init(chart.value);
    const option = {
        legend: {
            show: false
        },
        xAxis: {
            data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        },
        yAxis: {},
        series: [
            {
                name: '周流量',
                type: 'scatter',
                data: [220, 182, 191, 234, 290, 330, 310]
            }
        ]
    };
    chartInstance.setOption(option);
    window.addEventListener('resize', chartInstance.resize)
});

// 移除监听
onUnmounted(() => {
    window.removeEventListener('resize', chartInstance.resize)
})
</script>

<style scoped lang="scss">
.echarts-container {
    width: 100%;
    height: 100%;
    padding: 10px
}
</style>