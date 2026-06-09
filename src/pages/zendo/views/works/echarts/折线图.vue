<template>
    <div class="page">
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

        },
        xAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E']
        },
        yAxis: {
            type: 'value',
            name: '亿元',
            nameTextStyle: {
                align: "right",
            },
            axisLine: {
                symbol: 'arrow',
                lineStyle: {
                    type: 'dashed'
                    // ...
                }
            }
        },
        series: [
            {
                name: '点击量',
                data: [10, 22, 28, 43, 49],
                type: 'line',
                // smooth: true,
                lineStyle: {
                    color: 'green',
                    width: 4,
                    type: 'dashed'

                },
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 12
                },
            },
            {
                name: '访客数',
                data: [5, 4, 3, 5, 10],
                type: 'line',
                stack: 'x'
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
}
</style>