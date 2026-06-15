<script setup>
import Sidebar from '../components/Sidebar.vue';
import TheHeader from '../components/TheHeader.vue';
import CommonTag from '../components/CommonTag.vue'
import { onBeforeRouteUpdate, onBeforeRouteLeave, useRoute, RouterView } from 'vue-router';
import { computed, ref, watch, onMounted, nextTick } from 'vue';
import { useZendoStore } from '../stores/zendo.js'
import { KeepAlive } from 'vue';

const route = useRoute()
const isSolo = computed(() => route.query.isOpenedSolo === '1')

watch(() => route.name, (name) => {
  if (isSolo.value && name) {
    document.title = name
  }
}, { immediate: true })

const features = [
  { icon: 'MagicStick', desc: '30+ 前端特效 — CSS 动画、ECharts 图表等' },
  { icon: 'Monitor', desc: '在线预览 — 查看源码，一键打开演示' },
  { icon: 'Switch', desc: '暗黑模式 — 暗黑与明亮主题自由切换' },
  { icon: 'FolderOpened', desc: '分类浏览 — 按分类快速定位感兴趣的内容' },
]

const zendoStore = useZendoStore()
const showWelcome = ref(false)
const showTour = ref(false)

onMounted(() => {
  if (!zendoStore.hasSeenWelcome) {
    showWelcome.value = true
  } else if (!zendoStore.hasSeenTour) {
    showTour.value = true
  }
})

function onStartExplore() {
  zendoStore.setWelcomeSeen()
  showWelcome.value = false
}

function onWelcomeClose() {
  nextTick(() => {
    if (!zendoStore.hasSeenTour) {
      showTour.value = true
    }
  })
}

function onTourFinish() {
  zendoStore.setTourSeen()
}

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


      <el-main class="main" ref="main">
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

  <!-- 首次登录欢迎弹窗 -->
  <el-dialog v-model="showWelcome" title="欢迎来到代码实验室" width="500px" :close-on-click-modal="false" @closed="onWelcomeClose">
    <div class="welcome-body">
      <div class="welcome-logo">
        <img src="../assets/imgs/logo.png" alt="logo">
      </div>
      <p class="welcome-desc">你的前端探索空间，汇集 30+ 特效示例</p>
      <div class="features">
        <div class="feature" v-for="f in features" :key="f.title">
          <el-icon :size="18"><component :is="f.icon" /></el-icon>
          <span>{{ f.desc }}</span>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="welcome-footer">
        <el-button type="warning" @click="onStartExplore" size="large">开始探索</el-button>
      </div>
    </template>
  </el-dialog>

   <!-- 首次登录使用引导 --> 
  <el-tour v-model="showTour" :contentStyle="{ maxWidth: '320px' }" @finish="onTourFinish">
    <el-tour-step
      target="#tour-link"
      title="独立窗口打开"
      description="点击此图标可在新窗口中独立打开当前示例页面"
      :nextButtonProps="{ children: '下一步' }"
    />
    <el-tour-step
      target="#tour-edit"
      title="编辑笔记"
      description="在这里可以查看当前示例的源码实现和核心逻辑总结"
      :prevButtonProps="{ children: '上一步' }"
      :nextButtonProps="{ children: '下一步' }"
    />
    <el-tour-step
      target="#tour-theme"
      title="主题切换"
      description="切换暗黑模式和明亮模式"
      :prevButtonProps="{ children: '上一步' }"
      :nextButtonProps="{ children: '完成' }"
    />
  </el-tour>
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

.welcome-body {
  text-align: center;
  padding: 16px 32px 8px;

  .welcome-logo {
    img {
      width: 72px;
      margin-bottom: 16px;
    }
  }

  .welcome-desc {
    font-size: 15px;
    color: var(--el-text-color-secondary);
    margin: 0 0 28px;
  }
}

.welcome-footer {
  display: flex;
  justify-content: center;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 0;

  .feature {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    font-size: 14px;
    color: var(--el-text-color-primary);
    border-radius: 8px;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--el-fill-color-light);
    }
  }
}
</style>
