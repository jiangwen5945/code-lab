<script setup>
import Sidebar from '../components/Sidebar.vue';
import TheHeader from '../components/TheHeader.vue';
import CommonTag from '../components/CommonTag.vue'
import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute, RouterView } from 'vue-router';
import { computed } from 'vue';
import { useZendoStore } from '../stores/zendo.js'
import { KeepAlive } from 'vue';

const route = useRoute()
const isSolo = computed(() => route.query.isOpenedSolo === 'true')

const zendoStore = useZendoStore()
const isBlurView = computed(() => zendoStore.isBlurView)

// 在当前路由改变，但是该组件被复用时调用
onBeforeRouteUpdate((to, from) => {
  console.log('我是组件级的导航守卫 - onBeforeRouteUpdate');
})

// 在导航离开渲染该组件的对应路由时调用
onBeforeRouteLeave((to, from) => {
  console.log('我是组件级的导航守卫 - onBeforeRouteLeave')
})


</script>

<!-- <script>
export default {
  // 组件前置导航守卫尽在 选项式写法 中存在
  beforeRouteEnter(to, from) {
    console.log('我是组件级的导航守卫 - onBeforeRouteEnter: 在渲染该组件的对应路由被验证前调用');
  }
}
</script> -->


<template>
  <template v-if="isSolo">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </template>

  <el-container v-else class="contaier">
    <el-aside width="auto">
      <Sidebar />
    </el-aside>

    <el-container>
      <el-header>
        <the-header />
      </el-header>


      <el-main :class="[isBlurView ? 'blur-main' : 'main']" ref="main">
       <common-tag />

        <router-view v-slot="{ Component }">
          <transition>
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<style scoped lang="scss">
.contaier {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.el-header {
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  // border-bottom: 1px solid rgba(0, 21, 41, .08);
  border-bottom: 1px solid var(--el-menu-border-color);
}

.main {
  // background-image: linear-gradient(90deg, rgba(60, 10, 30, 0.04) 3%, rgba(0, 0, 0, 0) 3%), linear-gradient(360deg, rgba(60, 10, 30, 0.04) 3%, rgba(0, 0, 0, 0) 3%);
  // background-size: 20px 20px;
  // background-position: center center;
  padding: 0 20px;
  font-size: 16px;

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
}

.blur-main {
  padding: 0 20px 20px 20px;
  filter: blur(6px);
}
</style>