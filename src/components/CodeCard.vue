<script setup>
import { computed, ref } from 'vue'
import hljs from 'highlight.js'

const defaultCode = `const developer = {
  name: 'jiangwen',
  role: '前端工程师',
  skill: ['HTML', 'JS', 'CSS'],
  sayHello() {
    return '欢迎来到我的代码实验室🧪'
  }
}
`

const titleMap = {
  javascript: 'about.js',
  typescript: 'about.ts',
  python: 'about.py',
  html: 'about.html',
  css: 'about.css',
  vue: 'about.vue',
  json: 'about.json',
  bash: 'about.sh',
}

const props = defineProps({
  code: {
    type: String,
    default: defaultCode
  },
  language: {
    type: String,
    default: 'javascript'
  }
})

const card = ref(null)
const yRange = [-10, 10]
const xRange = [-10, 10]

const titleText = computed(() => titleMap[props.language] || `about.${props.language}`)

const highlightedCode = computed(() => {
  if (hljs.getLanguage(props.language)) {
    return hljs.highlight(props.code, { language: props.language }).value
  }
  return hljs.highlightAuto(props.code).value
})

const getRotate = (range, value, max) => {
  return (value / max) * (range[1] - range[0]) + range[0]
}

const onMouseMove = (e) => {
  const { offsetX, offsetY } = e
  const { offsetWidth, offsetHeight } = card.value
  const ry = -getRotate(yRange, offsetX, offsetWidth)
  const rx = getRotate(xRange, offsetY, offsetHeight)
  card.value.style.setProperty('--rx', `${rx}deg`)
  card.value.style.setProperty('--ry', `${ry}deg`)
}

const onMouseLeave = () => {
  card.value.style.setProperty('--rx', '0deg')
  card.value.style.setProperty('--ry', '0deg')
}
</script>

<template>
  <div class="card" ref="card" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
    <div class="mac-window">
      <div class="title-bar">
        <div class="traffic-lights">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <span class="title-text">{{ titleText }}</span>
      </div>
      <div class="code-body">
        <pre v-html="highlightedCode"></pre>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$bg-card: #1e1e2e;
$bg-title: #2a2a3e;
$border-title: #363650;
$text-title: #a0a0c0;
$text-code: #cdd6f4;
$font-mono: 'SF Mono', 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;

.card {
  // width: clamp(500px, 60%, 700px);
  width: 500px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 20px 30px -10px;
  transition: all 0.3s linear;
  transform: perspective(500px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));

  &:hover {
    box-shadow: rgba(137, 180, 250, 0.3) 0px 20px 50px -10px;
  }
}

.mac-window {
  background: $bg-card;
  border-radius: inherit;
  overflow: hidden;
  font-family: $font-mono;
  font-size: 14px;
  line-height: 1.6;

  .title-bar {
    display: flex;
    align-items: center;
    position: relative;
    padding: 12px 16px;
    background: $bg-title;
    border-bottom: 1px solid $border-title;

    .traffic-lights {
      display: flex;
      gap: 8px;

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;

        &.red { background: #ff5f57; }
        &.yellow { background: #ffbd2e; }
        &.green { background: #28c840; }
      }
    }

    .title-text {
      position: absolute;
      right: 0%;
      transform: translateX(-50%);
      color: $text-title;
      font-size: 13px;
      font-weight: 500;
      user-select: none;
    }
  }

  .code-body {
    padding: 16px;
    overflow-x: auto;
    aspect-ratio: 16 / 9;

    pre {
      margin: 0;
      white-space: pre;
      color: $text-code;
    }
  }
}

@media (max-width: 768px) {
  .card {
    width: 80vw;
  }

  .mac-window {
    font-size: 12px;

    .title-bar {
      padding: 8px 12px;

      .traffic-lights .dot {
        width: 10px;
        height: 10px;
      }

      .title-text {
        font-size: 11px;
      }
    }

    .code-body {
      padding: 12px;
      aspect-ratio: auto;
      min-height: 200px;
    }
  }
}


.code-body :deep(.hljs-keyword),
.code-body :deep(.hljs-literal),
.code-body :deep(.hljs-built_in),
.code-body :deep(.hljs-type) { color: #cba6f7; }

.code-body :deep(.hljs-attr) { color: #a6e3a1; }

.code-body :deep(.hljs-string),
.code-body :deep(.hljs-template-variable),
.code-body :deep(.hljs-addition) { color: #f9e2af; }

.code-body :deep(.hljs-title),
.code-body :deep(.hljs-title.function_),
.code-body :deep(.hljs-title.class_) { color: #89dceb; }

.code-body :deep(.hljs-comment),
.code-body :deep(.hljs-deletion) { color: #6c7086; font-style: italic; }

.code-body :deep(.hljs-number) { color: #fab387; }

.code-body :deep(.hljs-params) { color: #cdd6f4; }
</style>
