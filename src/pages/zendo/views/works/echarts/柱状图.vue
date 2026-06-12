<!--
核心逻辑：

1. 柱状图展示商品销量
   - 使用 ECharts bar 系列，x 轴为商品名称（衬衫、羊毛衫等），y 轴为销量数值
   - 柱体顶部设圆角 borderRadius: [5, 5, 0, 0]
2. 选中交互
   - selectedMode: true 支持点击选中柱子，选中后带阴影高亮效果
   - select.itemStyle 配置 shadowColor/shadowBlur 增强视觉反馈
3. 数据流
   - 数据为硬编码静态数组 [5, 20, 36, 10, 10, 20]
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
        // ECharts 配置项
        legend: {},
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            itemStyle: {
                borderRadius: [5, 5, 0, 0]
            },
            selectedMode: true,
            select: {
                itemStyle: {
                    shadowColor: 'rgba(0,0,0,0.5)',
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    borderColor: '#fff',
                }
            },
        }]
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