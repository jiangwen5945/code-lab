<!--
核心逻辑：

1. 饼图展示访问来源占比
   - 使用 ECharts pie 系列，展示直接访问/联盟广告/搜索引擎三项占比
2. 交互方式
   - selectedMode: true 支持点击选中扇形，选中和悬浮均带阴影高亮效果
   - emphasis.itemStyle 配置悬浮高亮的阴影样式
3. 数据流
   - 数据为硬编码静态数组，包含 value 和 name 字段
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
        legend: {},
        series: [
            {
                type: 'pie',
                data: [
                    {
                        value: 335,
                        name: '直接访问'
                    },
                    {
                        value: 234,
                        name: '联盟广告'
                    },
                    {
                        value: 1548,
                        name: '搜索引擎'
                    }
                ],
                selectedMode: true,
                select: {
                    itemStyle: {
                        shadowColor: 'rgba(0,0,0,0.5)',
                        shadowBlur: 10,
                        shadowOffsetX: 0
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowColor: 'rgba(0,0,0,0.5)',
                        shadowBlur: 10,
                        shadowOffsetX: 0
                    }
                }
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