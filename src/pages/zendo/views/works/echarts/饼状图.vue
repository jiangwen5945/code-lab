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