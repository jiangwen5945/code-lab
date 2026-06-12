<!--
核心逻辑：

1. 树图展示企业股权结构
   - 使用 tree 系列展示多层企业控股关系
   - 支持 expandAndCollapse 折叠展开，roam 缩放漫游
2. 扁平数据转树形
   - buildTree() 基于 parentId 将扁平企业列表递归转换为树结构
   - 通过哈希表缓存节点引用，支持同一节点出现在多个父级下（如合资公司X）
3. tooltip 异步加载
   - tooltip.formatter 中使用回调 + mockGetData 异步获取占股比例数据
   - 通过 ticket 机制控制异步加载状态，显示 Loading... 过渡
4. 高亮交互
   - emphasis.focus: 'ancestor' 悬浮节点时聚焦高亮所有祖先节点
-->
<template>
    <div class="page">
        <div class="echarts-container" ref="chartRef"></div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import * as echarts from 'echarts';
import { useRouter } from 'vue-router'
import { formatter } from 'element-plus';

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

const buildTree = (elements) => {
    const elementMap = {}; // 用于存储每个元素的引用
    const tree = []; // 最终的树结构

    // 首先，将所有元素存储到哈希表中
    elements.forEach(element => {
        if (!elementMap[element.id]) {
            elementMap[element.id] = { ...element, children: [] };
        } else {
            // 如果元素已经存在，合并属性（确保唯一性）
            Object.assign(elementMap[element.id], element);
        }
    });

    // 遍历元素，构建树结构
    elements.forEach(element => {
        if (element.parentId) {
            // 如果元素有父元素，创建一个副本并添加到父元素的 children 数组中
            if (elementMap[element.parentId]) {
                const childCopy = { ...elementMap[element.id] }; // 创建副本
                childCopy.equityPercentage = element.equityPercentage // 确保每个父元素中的子元素 value 值独立
                elementMap[element.parentId].children.push(childCopy);
            }
        } else {
            // 如果元素没有父元素，将其添加到树的根节点
            tree.push(elementMap[element.id]);
        }
    });

    return tree;
}

// 示例数据
const enterprises = [
    { id: 1, name: '企业集团', parentId: null, equityPercentage: null }, // 根企业
    { id: 2, name: '独资子公司A', parentId: 1, equityPercentage: 100 }, // 企业集团A 占股 100%
    { id: 3, name: '子公司B', parentId: 1, equityPercentage: 80 }, // 企业集团A 占股 80%
    { id: 4, name: '子公司A1', parentId: 2, equityPercentage: 70 }, // 独资子公司A 占股 70%
    { id: 5, name: '子公司A2', parentId: 2, equityPercentage: 50 }, // 独资子公司A 占股 50%
    { id: 9, name: '子公司B1', parentId: 3, equityPercentage: 65 }, // 子公司B2 占股 65%
    { id: 10, name: '子公司B2', parentId: 3, equityPercentage: 55 }, // 子公司B2 占股 55%
    { id: 11, name: '合资公司X', parentId: 2, equityPercentage: 30 }, // 企业集团A 占股 40%
    { id: 11, name: '合资公司X', parentId: 3, equityPercentage: 50 }, // 企业集团B 占股 60%
    { id: 11, name: '合资公司X', parentId: 4, equityPercentage: 120 }, // 企业集团B 占股 60%
];

// 构建树结构
const mockTree = buildTree(enterprises);

// 输出结果
console.log(JSON.stringify(mockTree, null, 2));



let chartInstance = null

const mockGetData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * (9999 - 1000) + 1000))
        }, 200)
    })
}

const toHtml = (v) => {
    return `占股比例：${v}%`
}

// 初始化echart
let _currentTicket = ''
let rr = 'Loading...'
const init = async () => {
    chartInstance = echarts.init(chartRef.value);
    // chartInstance.showLoading()
    // chartInstance.hideLoading()
    // 指定图表的配置项和数据
    const option = {
        tooltip: {
            show: true,
            enterable: true,
            formatter: function (params, ticket, callback) {
                const { data } = params
                if (_currentTicket !== ticket) {
                    _currentTicket = ticket
                    rr = 'Loading...'
                    mockGetData().then(res => {
                        rr = toHtml(data.equityPercentage)
                        console.log('tooltip', res, ticket)
                        callback(ticket, toHtml(data.equityPercentage))
                    })
                } else {
                    return rr
                }
            }
        },
        series: [
            {
                id: 't',
                type: 'tree',
                data: mockTree,
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
                },
                emphasis: {
                    focus: 'ancestor' // 聚焦所有祖先节点
                }

            }
        ]
    };
    chartInstance.setOption(option);
}


onMounted(() => {
    init()
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