<!--
核心逻辑：

1. 散点图呈现周流量数据
   - 使用 ECharts scatter 系列类型，x 轴映射星期（Sun~Sat），y 轴映射流量数值
   - 数据为硬编码静态数组 [220, 182, 191, 234, 290, 330, 310]
2. 图表自适应
   - 监听 window.resize 事件，触发 chartInstance.resize()
3. 数据流
   - 静态数据在 option.series[0].data 中直接定义，无需外部请求
4. 其他要点
   - 使用 onMounted 初始化图表，onUnmounted 移除 resize 监听
-->
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