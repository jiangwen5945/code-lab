<script setup>
import { computed, ref } from 'vue';
import { useZendoStore } from '../stores/zendo.js'
import ToggleTheme from '@/components/ToggleTheme.vue';
import { useRouter } from 'vue-router'
import CodeDrawer from './CodeDrawer.vue'

const router = useRouter();
// 获取当前路由
const breadcrumbs = computed(() => {
    const [_first, ..._breadcrumbs] = router.currentRoute.value.matched
    return router.currentRoute.value.name === '首页' ? _breadcrumbs : [{ name: '首页', path: '/' }, ..._breadcrumbs]
})

const zendoStore = useZendoStore()
const toggleCollapse = computed(() => zendoStore.toggleCollapse)

const isShowMsgPannel = ref(false)
const handleMsg = () => {
    isShowMsgPannel.value = !isShowMsgPannel.value
}

const handleLink = () => {
    const _route = router.currentRoute.value
    const { href } = router.resolve({
        path: _route.path,
        query: { ..._route.query, isOpenedSolo: '1' }
    })
    window.open(href, '_blank')
}

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
    <div class="header">
        <div class="lbox">
            <el-button @click="toggleCollapse" class="collapse-icon">
                <el-icon>
                    <Expand v-if="zendoStore.isCollapse" />
                    <Fold v-else />
                </el-icon>
            </el-button>

            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: `${item.path}` }" v-for="item in breadcrumbs">
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="rbox">
            <div id="tour-link" class="icon-box" @click="handleLink">
                <el-icon>
                    <Link />
                </el-icon>
            </div>

            <div id="tour-edit" class="bell-box icon-box" @click="handleMsg">
                <el-icon>
                    <Edit />
                </el-icon>
            </div>

            <div id="tour-theme" class="theme-box">
                <ToggleTheme />
            </div>

            <div class="avatar-box">
                <el-avatar :src="`${baseUrl}avatar.jpg`"></el-avatar>
                <span class="username">jiangwen</span>
            </div>
        </div>

    </div>

    <CodeDrawer v-model="isShowMsgPannel" />
</template>

<style lang="scss" scoped>
.header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    // 不使用el-header组件容器包裹
    // height: 60px;
    // box-sizing: border-box;
    // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    // border-bottom: 1px solid var(--el-menu-border-color);
    // padding: 0 20px;

    // 格子透镜效果
    background: transparent;
    background-image: radial-gradient(transparent 1px, var(--el-bg-color) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    // position: sticky;
    // top: 0;
    // z-index: 999;
    // width: 100%;

    .lbox {
        display: flex;
        align-items: center;

        .collapse-icon {
            margin-right: 16px;
        }
    }

    .rbox {
        display: flex;
        align-items: center;
        margin-right: 20px;

        .avatar-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .username {
            font-size: 12px;
            margin-left: 8px;
        }

        .theme-box {
            font-size: 20px;
            margin-right: 16px;
            line-height: 20px;
        }

        .icon-box {
            font-size: 16px;
            margin-right: 16px;
            line-height: 16px;
            cursor: pointer;
        }
    }


}
</style>