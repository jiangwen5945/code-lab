<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'
import hljs from 'highlight.js'
import lightCss from 'highlight.js/styles/github.css?raw'
import darkCss from 'highlight.js/styles/github-dark.css?raw'

defineProps({
    modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])

const route = useRoute()
const isDark = useDark()

const HLJS_STYLE_ID = 'hljs-theme'
watchEffect(() => {
    let style = document.getElementById(HLJS_STYLE_ID)
    if (!style) {
        style = document.createElement('style')
        style.id = HLJS_STYLE_ID
        document.head.appendChild(style)
    }
    style.textContent = isDark.value ? darkCss : lightCss
})

const viewFiles = import.meta.glob('../views/works/**/*.vue', { query: '?raw', import: 'default', eager: true })
const currentPageCode = computed(() => {
    const path = decodeURIComponent(route.path)
    const filePath = `../views/works${path}.vue`
    const raw = viewFiles[filePath]
    if (!raw) return '// 当前页面暂无源码'
    return hljs.highlight(raw, { language: 'html' }).value
})
</script>

<template>
    <el-drawer :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" direction="rtl" size="500px" title="源码展示">
        <div class="code-wrapper">
            <pre><code v-html="currentPageCode"></code></pre>
        </div>
    </el-drawer>
</template>

<style lang="scss" scoped>
.code-wrapper {
    height: 100%;
    overflow: auto;

    pre {
        margin: 0;
        font-size: 13px;
        line-height: 1.5;
    }

    code {
        font-family: 'Fira Code', 'JetBrains Mono', Consolas, monospace;
    }
}
</style>
