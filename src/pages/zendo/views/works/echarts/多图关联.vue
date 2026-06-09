<template>
    <div class="echarts-container">
        <div class="cell" ref="chart1"></div>
        <div class="cell" ref="chart2"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const chart1 = ref(null);
const chart2 = ref(null);


onMounted(() => {
    // 柱状图
    var waterMarkText = 'jw';
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = canvas.height = 100;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = 0.10;
    ctx.font = '20px Microsoft Yahei';
    ctx.translate(50, 50);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(waterMarkText, 0, 0);
    const myChart1 = echarts.init(chart1.value);
    const option1 = {
        backgroundColor: { type: 'pattern', image: canvas, repeat: 'repeat' },
        color: ['#45C2E0', '#C12BDD', '#FF7851', 'yellow', '#FF9325'],
        title: { text: '抖音受欢迎程度', },
        tooltip: { toolip: { show: true }, },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '70后', max: 100 },
                { name: '80后', max: 100 },
                { name: '90后', max: 100 },
                { name: '00后', max: 100 },
                { name: '10后', max: 100 },
            ]
        },
        series: [{     //配置第1个图表的数据系列
            type: 'radar',   //设置柱状图中每个柱子的宽度
            data: [{
                value: [88.0, 94.5, 90.00, 70.50, 67.40],
                name: '情况',
                areaStyle: {
                    normal: {
                        color: 'pink'
                    }
                }
            }],
        }]
    };
    myChart1.setOption(option1);

    // 折线图
    const myChart2 = echarts.init(chart2.value);
    const option2 = {
        backgroundColor: { type: 'pattern', image: canvas, repeat: 'repeat' },
        color: ['#45C2E0', '#C1EBDD', '#FF9393', 'black', '#FF9393'],
        title: { text: '微博受欢迎程度', },
        tooltip: { toolip: { show: true }, },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: '70后', max: 100 },
                { name: '80后', max: 100 },
                { name: '90后', max: 100 },
                { name: '00后', max: 100 },
                { name: '10后', max: 100 },
            ]
        },
        series: [{     //配置第1个图表的数据系列
            type: 'radar',   //设置柱状图中每个柱子的宽度
            data: [{
                value: [83.30, 77.50, 80.90, 81.25, 90.00],
                name: '情况',
                areaStyle: {
                    normal: {
                        color: 'blue'
                    }
                }
            }],
        }]
    };
    myChart2.setOption(option2);


    echarts.connect([myChart1, myChart2]);
});
</script>

<style scoped lang="scss">
.echarts-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 400px 400px;
    column-gap: 20px;
    row-gap: 1ch;

    .cell {
        border: 1px solid #eee;
    }

}
</style>