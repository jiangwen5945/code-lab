<script setup>
import TablePlus from '../../../components/TablePlus.vue'
import { msg } from '@/utils/message'

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
const tableColumns = [
    {
        prop: 'date',
        label: '日期',
        width: ''
    },
    {
        prop: 'name',
        label: '姓名',
        width: ''
    },
    {
        prop: 'address',
        label: '地址',
        width: ''
    },
    {
        prop: 'operation',
        label: '操作',
        width: ''
    }
]

const handleEdit = (e) => {
    console.log(e);
}

const handleOpenMSg = () => {
    msg('hello!', '最新消息', (fn) => { alert('关闭'); fn() })
}


</script>

<template>
    <div class="container">
        <el-divider content-position="left" border-style="dashed">封装表格</el-divider>
        <tablePlus :tableData="tableData" :tableColumns="tableColumns" border>
            <template #operation="scoped">
                <el-button type="primary" size="default" @click="handleEdit(scoped)">编辑</el-button>
            </template>
        </tablePlus>

        <el-divider content-position="left" border-style="dashed" style="margin-top: 100px;">封装JSX消息提示</el-divider>
        <el-button type="primary" @click="msg('hello!')">显示消息</el-button>
        <el-button type="primary" @click="msg('hello!', '最新消息')">显示标题</el-button>
        <el-button type="primary" @click="handleOpenMSg">执行回调函数</el-button>
    </div>
</template>
