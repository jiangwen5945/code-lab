<!--
核心逻辑：

1. 鼠标跟踪 3D 旋转
   - 监听 card 的 mousemove 事件，获取 offsetX/offsetY
   - 线性映射到 rotateX/rotateY 角度 (-10°~10°)
   - 通过 CSS 自定义属性 --rx/--ry 动态应用变换
2. Perspective 透视效果
   - transform: perspective(500px) 实现 3D 景深感
   - mouseleave 时归零角度恢复平面
3. 自动语法高亮
   - code 变量存放纯文本 JS 代码（模板字符串）
   - highlight() 用正则交替匹配 token，替换为带 class 的 <span>
   - 通过 v-html 渲染到 <pre> 中
   - 配色由 syntax 对象定义，CSS 自定义属性注入，:deep() 穿透 scoped
-->
<script setup>
import { onMounted, computed, ref } from 'vue'

const card = ref(null)
const yRange = [-10, 10]
const xRange = [-10, 10]

const syntax = {
  keyword: '#cba6f7',
  attr: '#a6e3a1',
  string: '#f9e2af',
  func: '#89dceb',
}

const code = `const developer = {
  name: 'jiangwen',
  role: '前端工程师',
  skill: ['HTML', 'JS', 'CSS'],
  sayHello() {
    return '欢迎来到我的代码实验室🧪'
  }
}

console.log(developer.__proto__ === Bug.prototype) // 输出：true
`

function highlight(code) {
  const escape = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const tokenizer = new RegExp([
    /(\/\/[^\n]*)/.source,
    /('[^']*')/.source,
    /("[^"]*")/.source,
    /(`[^`]*`)/.source,
    /\b(const|let|var|return|function|if|else|for|while|import|export|from|class|new|this|async|await|of|in)\b/.source,
    /\b(\d+)\b/.source,
    /\b([a-zA-Z_$][\w$]*)(?=\s*\()/.source,
    /\b([a-zA-Z_$][\w$]*)(?=\s*:)/.source,
  ].join('|'), 'g')

  const types = ['comment', 'string', 'string', 'string', 'keyword', 'number', 'func', 'attr']

  return escape(code).replace(tokenizer, (...args) => {
    for (let i = 0; i < types.length; i++) {
      if (args[i + 1] !== undefined) {
        return `<span class="${types[i]}">${args[i + 1]}</span>`
      }
    }
    return args[0]
  })
}

const highlightedCode = highlight(code)

const getRotate = (range, value, max) => {
  return (value / max) * (range[1] - range[0]) + range[0]
}

onMounted(() => {
  card.value.onmousemove = (e) => {
    const { offsetX, offsetY } = e
    const { offsetWidth, offsetHeight } = card.value
    const ry = -getRotate(yRange, offsetX, offsetWidth)
    const rx = getRotate(xRange, offsetY, offsetHeight)
    card.value.style.setProperty('--rx', `${rx}deg`)
    card.value.style.setProperty('--ry', `${ry}deg`)
  }

  card.value.onmouseleave = () => {
    card.value.style.setProperty('--rx', '0deg')
    card.value.style.setProperty('--ry', '0deg')
  }
})
</script>

<template>
  <div class="page-cell flex-cc">
    <div class="card" ref="card">
      <div class="mac-window">
        <div class="title-bar">
          <div class="traffic-lights">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="title-text">about.js</span>
        </div>
        <div class="code-body" :style="{ '--keyword': syntax.keyword, '--attr': syntax.attr, '--string': syntax.string, '--func': syntax.func }">
          <pre v-html="highlightedCode"></pre>
        </div>
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

.page-cell {
  gap: 50px;
}

.card {
  width: clamp(500px, 60%, 700px);
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

      :deep(.keyword) { color: var(--keyword); }
      :deep(.attr) { color: var(--attr); }
      :deep(.string) { color: var(--string); }
      :deep(.func) { color: var(--func); }
    }
  }
}
</style>
