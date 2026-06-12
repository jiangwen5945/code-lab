<template>
    <div class="toggle-container" ref="ref_switch">
        <el-switch :model-value="isDark" class="my-switch" @change="handleChangeTheme" style="
                        --el-switch-off-color: #f0f0f0;
                        --el-switch-on-color: #000;
                    ">
            <template #active-action>
                <el-icon color="#f0f0f0">
                    <Moon />
                </el-icon>
            </template>
            <template #inactive-action>
                <el-icon color="#000">
                    <Sunny />
                </el-icon>
            </template>
        </el-switch>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleTheme = useToggle(isDark)

const ref_switch = ref(null)
const handleChangeTheme = () => {
    if (!document.startViewTransition) {
        toggleTheme()
        return
    }

    try {
        let t = document.startViewTransition(() => {
            toggleTheme()
        });

        t.ready.then(() => {
            let { x, y } = ref_switch.value.getBoundingClientRect();
            let radius = Math.sqrt(Math.max(x, (innerWidth - x)) ** 2 + Math.max(y, (innerHeight - y) ** 2))
            let clipPath = [
                `circle(0 at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`
            ]
            document.documentElement.animate(
                {
                    clipPath: isDark.value ? clipPath.reverse() : clipPath
                },
                {
                    duration: 500,
                    pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)'
                }
            )
        })
    } catch {
        // View Transitions API 不支持时静默降级
    }
}
</script>

<style lang="scss">
/* 去除 Switch 的圆形背景 */
.is-checked .el-switch__action {
    background-color: #000 !important;
    /* 根据需要设置背景色 */
}

.el-switch__action {
    background-color: #f0f0f0 !important;
    /* 根据需要设置背景色 */
}

::view-transition-old(root),
::view-transition-new(root) {
    animation: none;
}

.dark::view-transition-old(root) {
    z-index: 999;
}
</style>