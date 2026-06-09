<script setup>
defineProps({
    tableData: {
        type: Array,
        required: true
    },
    tableColumns: {
        type: Array,
        required: true
    }
})
</script>


<script>
export default {
    mounted() {
    }
}
</script>

<template>
    <el-table :data="tableData" v-bind="$attrs">
        <el-table-column v-for="col in tableColumns" :prop="col.prop" :key="col.prop" :label="col.label"
            :width="col.width">
            <template v-if="$slots[col.prop]" #default="scoped">
                <slot :name="col.prop" v-bind="scoped"></slot>
            </template>
        </el-table-column>

        <el-table-column>
            <template #header>
                金额（元）
               <el-select clearable filterable>
                <el-option
                    label="演示1"
                    value="demo1">
                </el-option>
                <el-option
                    label="演示2"
                    value="demo2">
                </el-option>
                <el-option
                    label="演示3"
                    value="demo3">
                </el-option>
               </el-select>
               
            </template>
        </el-table-column>
    </el-table>

</template>

<style scoped></style>
