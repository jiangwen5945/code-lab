<script setup>
import { useZendoStore } from '../stores/zendo'
import { useRouter } from 'vue-router'

const router = useRouter()
const zendoStore = useZendoStore()

const baseUrl = import.meta.env.BASE_URL

function handleLogout() {
  zendoStore.logout()
  router.replace('/login')
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleLogout">
    <div class="user-info">
      <el-avatar :src="`${baseUrl}avatar.jpg`" />
      <span class="username">{{ zendoStore.userInfo?.nickname || '用户' }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.username {
  font-size: 12px;
  margin-left: 8px;
}
</style>
