<!--
核心逻辑：

1. 家庭关系网络图
   - 使用 graph 系列（layout: 'none'）手动布局节点坐标，展示家庭成员关系
   - 节点为家庭成员（姜文、姜发航等），边标注关系类型（父子/夫妻/兄弟/母子/叔侄等）
2. 交互方式
   - roam: true 支持拖拽平移和缩放，scaleLimit 限制缩放范围（0.4~2）
   - 边线条带 curveness: 0.3 曲率，edgeLabel 显示关系文本标签
3. 数据流
   - 节点和边数据为硬编码静态对象，categories 用于图例分类
4. 其他要点
   - 监听 window.resize 实现图表自适应
-->
<template>
    <div class="page">
        <div class="echarts-container" ref="graphChartRef"></div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import * as echarts from 'echarts';
import api from '@/api'
const graphChartRef = ref(null);


onMounted(() => {
    const chartInstance = echarts.init(graphChartRef.value);
    // chartInstance.showLoading()
    // api.getEchartDemoData('/data/asset/data/les-miserables.json').then(data => {
    // chartInstance.hideLoading()
    let data = {
        nodes: [
            {
                "name": "姜文",
                "symbolSize": 10,
                "x": 0,
                "y": 0,
                "value": '30岁',
                "category": 1
            }, {
                "name": "姜发航",
                "symbolSize": 10,
                "x": 100,
                "y": 0,
                "value": 20,
                "category": 1
            },
            {
                "name": "姜吉宇",
                "symbolSize": 5,
                "x": 0,
                "y": 100,
                "value": 9.485714,
                "category": 1
            },
            {
                "name": "童本慧",
                "symbolSize": 10,
                "x": -100,
                "y": 0,
                "value": 9.485714,
                "category": 1
            },
            {
                "name": "谢才姬",
                "symbolSize": 20,
                "x": 0,
                "y": -100,
                "value": 9.485714,
                "category": 1
            },
            {
                "name": "姜承友",
                "symbolSize": 20,
                "x": 100,
                "y": -100,
                "value": 9.485714,
                "category": 1
            },
        ],
        links: [
            {
                source: '姜文',
                target: '姜发航',
                symbolSize: [5, 20],
                label: {
                    show: true,
                    formatter: '兄弟'
                },
            },
            {
                source: "姜文",
                target: "姜吉宇",
                label: {
                    show: true,
                    formatter: '父子'
                },
            },
            {
                "source": "姜文",
                "target": "童本慧",
                label: {
                    show: true,
                    formatter: '夫妻'
                },
            },
            {
                "source": "姜文",
                "target": "姜承友",
                label: {
                    formatter: '父子'
                },
            },
            {
                "source": "姜发航",
                "target": "姜承友",
                label: {
                    formatter: '父子'
                },
            },
            {
                "source": "姜文",
                "target": "谢才姬",
                label: {
                    formatter: '母子'
                },
            },
            {
                "source": "童本慧",
                "target": "姜吉宇",
                label: {
                    formatter: '母子'
                },
            },
            {
                "source": "姜发航",
                "target": "谢才姬",
                label: {
                    formatter: '母子'
                },
            },
            {
                "source": "童本慧",
                "target": "谢才姬",
                label: {
                    formatter: '儿媳'
                },
            },
            {
                "source": "童本慧",
                "target": "姜承友",
                label: {
                    formatter: '儿媳'
                },
            },
            {
                "source": "姜吉宇",
                "target": "姜发航",
                label: {
                    formatter: '叔侄'
                },
            },
            {
                "source": "童本慧",
                "target": "姜发航",
                label: {
                    formatter: '叔嫂'
                },
            },
            {
                "source": "姜吉宇",
                "target": "谢才姬",
                label: {
                    formatter: '祖孙'
                },
            },
            {
                "source": "姜吉宇",
                "target": "姜承友",
                label: {
                    formatter: '祖孙'
                },
            },

        ],
        categories: [
            {
                "name": "A"
            },
            {
                "name": "B"
            },
            {
                "name": "C"
            }
        ]
    }
    // 指定图表的配置项和数据
    var option = {
        tooltip: {},
        legend: [
            {
                data: data.categories.map(function (a) {
                    return a.name;
                })
            }
        ],
        series: [{
            name: '家庭关系图',
            type: 'graph',
            layout: 'none',
            data: data.nodes,
            links: data.links,
            categories: data.categories,
            // edgeSymbol: ['none', 'arrow'],
            roam: true,
            label: {
                show: true,
                position: 'right',
                formatter: '{b}'
            },
            labelLayout: {
                // hideOverlap: true,
                // draggable: true

            },
            edgeLabel: {
                show: true,
            },
            scaleLimit: {
                min: 0.4,
                max: 2
            },
            lineStyle: {
                color: 'source',
                curveness: 0.3
            }
        }]
    };
    chartInstance.setOption(option);
    // })

    window.addEventListener('resize', chartInstance.resize)
});

// 移除监听
onUnmounted(() => {
    window.removeEventListener('resize', chartInstance.resize)
})

</script>

<style lang="scss" scoped>
.echarts-container {
    width: 100%;
    height: 100%;
}
</style>