<!--
核心逻辑：

1. 折线图展示两组数据系列
   - 使用 ECharts line 系列，分别展示点击量（虚线绿色带标签）和访客数
   - 访客数系列启用 stack: 'x' 堆叠模式
2. 交互方式
   - Y 轴配置 axisLine.symbol: 'arrow' 带箭头符号
   - 点击量系列自定义绿色虚线样式（width: 4）并显示顶部标签
3. 数据流
   - 数据为硬编码静态数组，点击量 [10, 22, 28, 43, 49]，访客数 [5, 4, 3, 5, 10]
4. 其他要点
   - 监听 window.resize 实现图表自适应
-->
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