<!--
核心逻辑：

1. 多级表头
   - 通过 el-table-column 嵌套实现三级表头结构：Date → Delivery Info → Address Info
   - 表头自动合并列，展示层级关系
2. 树形懒加载
   - 配置 row-key="id" 和 lazy 属性启用懒加载
   - tree-props 设置 children（子数据字段）和 hasChildren（是否有子节点标识）
   - :load 回调在有子节点（hasChildren: true）的行展开时异步加载子数据
3. 异步加载
   - load(row, treeNode, resolve) 接收行数据与 resolve 回调
   - 使用 generateRandomId() 生成子行 ID，模拟 1 秒延迟后 resolve 子数据
4. 其他要点
   - 根节点只有第一行设置了 hasChildren: true，其余为叶子行
   - show-overflow-tooltip 处理 ID 列文字溢出
-->
<template>
  <el-table 
    :data="tableData"
    style="width: 100%"
    row-key="id"
    lazy
    :load="load"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="date" label="Date" width="150" />
    <el-table-column label="Delivery Info">
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column label="Address Info">
        <el-table-column prop="id" label="ID" width="100" show-overflow-tooltip/>
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" />
        <el-table-column prop="zip" label="Zip" width="120" />
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { generateRandomId } from '@/utils/index'
const tableData = [
  {
    id: generateRandomId(),
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    hasChildren: true,
    // children: [
    //   {
    //     id: generateRandomId(),
    //     date: '2016-05-13',
    //     name: 'Tom',
    //     state: 'California',
    //     city: 'Los Angeles',
    //     address: 'No. 189, Grove St, Los Angeles',
    //     zip: 'CA 90036',
    //   },
    //   {
    //     id: generateRandomId(),
    //     date: '2016-05-23',
    //     name: 'Tom',
    //     state: 'California',
    //     city: 'Los Angeles',
    //     address: 'No. 189, Grove St, Los Angeles',
    //     zip: 'CA 90036',
    //   }
    // ]
  },
  {
    id: generateRandomId(),
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: generateRandomId(),
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: generateRandomId(),
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: generateRandomId(),
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: generateRandomId(),
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    id: generateRandomId(),
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]

const load = (
  row,
  treeNode,
  resolve
) => {
  setTimeout(() => {
    resolve([
      {
        id: generateRandomId(),
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        id: generateRandomId(),
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
    ])
  }, 1000)
}
</script>