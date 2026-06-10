<script setup>
import { computed, ref } from 'vue';
import { useZendoStore } from '../stores/zendo.js'
import ToggleTheme from '@/components/ToggleTheme.vue';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
// 获取当前路由
const breadcrumbs = computed(() => {
    const [_first, ..._breadcrumbs] = router.currentRoute.value.matched
    return router.currentRoute.value.name === '首页' ? _breadcrumbs : [{ name: '首页', path: '/' }, ..._breadcrumbs]
})

console.log('router.currentRoute', router.currentRoute);


const zendoStore = useZendoStore()
const toggleCollapse = computed(() => zendoStore.toggleCollapse)
const toggleBlurView = computed(() => zendoStore.toggleBlurView)

const isShowMsgPannel = ref(false)
const handleMsg = () => {
    isShowMsgPannel.value = !isShowMsgPannel.value
}
const handleLink = () => {
    console.log('handleLink', router.currentRoute.value.meta.code);
    let path = router.currentRoute.value.meta.code
    if (path && path.indexOf('http') !== -1) {
        window.open(path, '_blank')
    }
    else {
        router.push(path)
    }
}

const handleBlank = () => {
    window.open(window.location.href + '/demo', '_blank')
}

const baseUrl = import.meta.env.BASE_URL

const html = '<a>123</a>'
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
            <div class="icon-box" @click="handleBlank">
                <el-icon>
                    <Monitor />
                </el-icon>
            </div>

            <div class="bell-box icon-box" @click="handleMsg">
                <el-icon>
                    <Edit />
                </el-icon>
            </div>

            <div class="icon-box" @click="handleLink">
                <el-icon>
                    <Link />
                </el-icon>
            </div>

            <div class="bell-box icon-box" @click="toggleBlurView">
                <el-icon>
                    <View v-if="zendoStore.isBlurView" />
                    <Hide v-else />
                </el-icon>
            </div>

            <div class="theme-box">
                <ToggleTheme />
            </div>

            <div class="avatar-box">
                <el-avatar :src="`${baseUrl}avatar.jpg`"></el-avatar>
                <span class="username">jiangwen</span>
            </div>
        </div>

        <div class="msg-pannel el-card" :class="isShowMsgPannel ? 'msg-pannel__show' : ''">
            <!-- {{ zendoStore.notes }} -->
            <!-- {{ router.currentRoute.value.meta.info }} -->
            <div v-html="html"></div>
        </div>

    </div>
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

    .msg-pannel {
        width: 300px;
        height: calc(100% - 59px);
        position: absolute;
        right: -300px;
        top: 59px;
        z-index: 99;
        transition: all .5s ease-in-out;
        // background: #fff;
        // color: #000;
        text-align: center;
        padding: 20px 10px;
        opacity: 0;
    }

    .msg-pannel__show {
        right: 0;
        opacity: .9;
    }
}
</style>