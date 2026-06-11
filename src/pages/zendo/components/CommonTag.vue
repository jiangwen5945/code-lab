<template>
  <div class="tag-container">
    <el-tag
      v-for="(item, index) in navList" 
      :key="item.name" 
      :effect="item.path === currentRoute ? 'dark' : 'light'" 
      :closable="item.path !== '/home'"
      @close="handleClose(item, index)" 
      @click="changeMenu(item)"
      size="small" 
    >
      {{ item.name }}
    </el-tag>
  </div>
</template>

<script setup>
import { useZendoStore } from '../stores/zendo.js'
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const zendoStore = useZendoStore()
const navList = computed(() => zendoStore.navList)

// 获取当前路由
const currentRoute = computed(() => router.currentRoute.value.path)

// 点击tag跳转的功能
const changeMenu = (item) => {
  if (item.path !== currentRoute.value) {
    router.push({ path: item.path })
  }
}

// 点击tag删除的功能
const handleClose = (item, index) => {
  // 触发store删除标签方法
  zendoStore.closeNav(item)
  // 如果标签不是当前页面，直接关闭；
  if (item.path !== currentRoute.value) return
  if (navList.value.length === 0) {
    router.push('/')
    zendoStore.updateNavList({
      component: "PannelView",
      icon: "",
      name: "首页",
      path: "/"
    })
    return
  }
  // 如果标签是当前页面,且在最后一个时跳转上一个路由，否则跳转下一个路由
  if (navList.value.length === index) {
    router.push(navList.value[index - 1].path)
  } else {
    router.push(navList.value[index].path)
  }
}
</script>

<style lang="scss" scoped>
.tag-container {
  padding: 6px 24px;

  background: transparent;
  background-image: radial-gradient(transparent 1px, var(--el-bg-color) 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);

  position: sticky;
  top: 0px;
  z-index: 99;
  width: 100%;
  .el-tag {
    margin: 4px;
    cursor: pointer;
  }
}
</style>