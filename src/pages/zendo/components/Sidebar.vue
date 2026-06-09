<script setup>
import { RouterLink } from 'vue-router'
import { useZendoStore } from "../stores/zendo"

const zendoStore = useZendoStore()
</script>

<template>
    <el-menu default-active="1" :collapse="zendoStore.isCollapse" class="el-menu-vertical-demo">
        <el-menu-item class="logo">
            <img src="../assets/imgs/logo.png" alt="logo" style="width: 30px; margin-right: 6px;">
            <template #title>
                <span style="font-weight: bold;">代码实验室</span>
            </template>
        </el-menu-item>

        <template v-for="(menu, i) in zendoStore.menuList" :key="menu.path">
            <!-- 一级菜单 -->
            <RouterLink :to="menu.path" v-if="!menu.children" @click="zendoStore.updateNavList(menu)">
                <el-menu-item :index="i + ''">
                    <el-icon>
                        <component class="icons" :is="menu.icon"></component>
                    </el-icon>

                    <template #title>
                        {{ menu.name }}
                    </template>
                </el-menu-item>
            </RouterLink>

            <!-- 二级菜单 -->
            <el-sub-menu :index="i + ''" v-else>
                <template #title>
                    <el-icon>
                        <component class="icons" :is="menu.icon"></component>
                    </el-icon>
                    <span>{{ menu.name }}</span>
                </template>

                <template v-for="(subMenu, j) in menu.children" :key="subMenu.path">
                    <RouterLink :to="subMenu.path" @click="zendoStore.updateNavList(subMenu)">
                        <el-menu-item :index="i + '-' + j">
                            {{ subMenu.name }}
                        </el-menu-item>
                    </RouterLink>
                </template>
            </el-sub-menu>
        </template>
    </el-menu>
</template>

<style scoped lang="scss">
.el-menu-vertical-demo {
    min-height: 100vh;
    // color: var(--color-text);
    // background: var(--color-background);
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}

.logo {
    position: sticky;
    top: 0;
    z-index: 99;
    background:  var(--el-bg-color);
}
</style>
