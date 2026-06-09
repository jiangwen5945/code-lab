<template>
    <div class="page">
        <div class="echarts-container" ref="chartRef"></div>

        <el-dialog v-model="dialogFormVisible" title="添加节点" width="500">
            <el-form :model="form">
                <el-form-item label="节点名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleAddNode">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import * as echarts from 'echarts';
import { useRouter } from 'vue-router'

const router = useRouter();
const chartRef = ref(null);

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
    preName: ''
})

const mockAreaTree = [
    {
        "name": "全球",
        "children": [
            {
                "name": "亚洲",
                "children": [
                    {
                        "name": "中国",
                        "children": [
                            {
                                "name": "北京",
                                "children": [
                                    {
                                        "name": "朝阳区",
                                        "value": 100
                                    },
                                    {
                                        "name": "海淀区",
                                        "value": 120
                                    }
                                ]
                            },
                            {
                                "name": "上海",
                                "children": [
                                    {
                                        "name": "浦东新区",
                                        "value": 150
                                    },
                                    {
                                        "name": "徐汇区",
                                        "value": 130
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "日本",
                        "children": [
                            {
                                "name": "东京",
                                "children": [
                                    {
                                        "name": "千代田区",
                                        "value": 80
                                    },
                                    {
                                        "name": "港区",
                                        "value": 90
                                    }
                                ]
                            },
                            {
                                "name": "大阪",
                                "children": [
                                    {
                                        "name": "大阪市",
                                        "value": 70
                                    },
                                    {
                                        "name": "神户市",
                                        "value": 60
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "name": "欧洲",
                "children": [
                    {
                        "name": "英国",
                        "children": [
                            {
                                "name": "伦敦",
                                "children": [
                                    {
                                        "name": "威斯敏斯特区",
                                        "value": 95
                                    },
                                    {
                                        "name": "金融城",
                                        "value": 110
                                    }
                                ]
                            },
                            {
                                "name": "曼彻斯特",
                                "children": [
                                    {
                                        "name": "曼彻斯特市区",
                                        "value": 75
                                    },
                                    {
                                        "name": "索尔福德",
                                        "value": 65
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "法国",
                        "children": [
                            {
                                "name": "巴黎",
                                "children": [
                                    {
                                        "name": "第一区",
                                        "value": 105
                                    },
                                    {
                                        "name": "第七区",
                                        "value": 115
                                    }
                                ]
                            },
                            {
                                "name": "马赛",
                                "children": [
                                    {
                                        "name": "马赛市区",
                                        "value": 85
                                    },
                                    {
                                        "name": "普罗旺斯地区艾克斯",
                                        "value": 70
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]


window.myDialog = (e) => {
    router.push('/')
}

// 生成随机唯一Id
const generateRandomId = () => {
    const randomId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    return randomId;
}

let treeData = reactive([
    {
        id: generateRandomId(),
        name: '一代目',
        vale: 1,
        children: []
    }
])

let chartInstance = null

// 初始化echart
const init = async () => {
    chartInstance = echarts.init(chartRef.value);
    // chartInstance.showLoading()
    // chartInstance.hideLoading()
    // 指定图表的配置项和数据
    const option = {
        toolbox: {
            show: true,
            feature: {
                dataView: { show: true }, // 至少配置一个工具
                saveAsImage: { show: true }
                // restore: { show: true },
            }
        },
        // tooltip: {
        //     show: true,
        //     trigger: 'item',
        //     enterable: true,
        //     extraCssText: 'z-index: 99;max-width: 100px;white-space:pre-wrap',
        //     formatter: function (params) {
        //         const result = params.data
        //         return `<div ><h2 onclick="myDialog('${result.name}')" style='color: red; font-size: 14px'>查看详情</h2></div>`
        //     }
        // },
        series: [
            {
                type: 'tree',
                data: treeData,
                // data: mockAreaTree,
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750,
                roam: true,  // 是否开启鼠标缩放和平移漫游
                edgeShape: 'polyline', // 折线
                labelLayout: {
                    moveOverlap: 'shiftY'
                },
                label: {
                    // with: 150,
                    // height: 50,
                    backgroundColor: '#79c4fd',
                    color: '#fff',
                    borderRadius: 6,
                    padding: [10, 20]

                },
                lineStyle: {
                    color: '#333',
                    type: 'dashed', // 设置虚线类型
                    width: 1
                }
            }
        ]
    };
    chartInstance.setOption(option);
}

const handleAddNode = async (nodeName) => {
    console.log('handleAddNode', nodeName);
    let treeOption = chartInstance.getOption()
    let treeData = treeOption['series'][0]['data'][0]
    let targetNode = findNodeById(treeData, form.preName)

    const nodeData = await getNodeData(form.name)
    console.log('nodeData', nodeData);

    targetNode.children = [
        ...nodeData,
        ...targetNode.children
    ]

    setTimeout(() => {
        chartInstance.setOption(treeOption)
        console.log('需要添加的节点为：', targetNode);
        dialogFormVisible.value = false
        form.preName = ''
        form.name = ''
    })
}

const findNodeById = (treeData, targetId) => {
    if (targetId === treeData.name) {
        return treeData
    }
    if (treeData.children) {
        for (let i = 0; i < treeData.children.length; i++) {
            let res = findNodeById(treeData.children[i], targetId)
            if (res) return res
        }
    }
    return null
}

// 获取节点的子节点数据
const getNodeData = (nodeName) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData = [
                {
                    id: generateRandomId(),
                    name: nodeName,
                    children: [],
                    collapsed: false
                }
            ]
            resolve(mockData)
        }, 200)

    })
}

// 添加节点
const addChildNode = async (params) => {
    console.log('params', params, treeData);

    const { data } = params
    if (data.isAdd) {
        dialogFormVisible.value = true
        form.preName = data.preName
        return
    }

    // 末级节点添加模拟数据
    if (data.children && data.children.length === 0) {
        const nodeData = await getNodeData(data.name)
        console.log('获取点击节点的数据', nodeData);

        const addNodeEl = {
            name: '添加+',
            isAdd: true,
            preName: data.name
        }

        params.data.children = [
            // ...nodeData,
            addNodeEl
        ]
        let treeOption = chartInstance.getOption()
        setTimeout(() => {
            chartInstance.setOption(treeOption)
        }, 500)
    }
}

const handleKeyup13 = (event) => {
    if (event.keyCode === 13) {
        handleAddNode()
    }
}

onMounted(() => {
    init()
    chartInstance.on('click', addChildNode)
    window.addEventListener('resize', chartInstance.resize)
    window.addEventListener('keyup', handleKeyup13)
});

// 移除监听
onUnmounted(() => {
    window.removeEventListener('resize', chartInstance.resize)
    window.removeEventListener('keyup', handleKeyup13)
})

</script>

<style lang="scss" scoped>
.echarts-container {
    width: 100%;
    height: 100%;
}
</style>