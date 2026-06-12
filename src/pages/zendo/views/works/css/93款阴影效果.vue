<!--
核心逻辑：

1. 主要 CSS 技术/视觉机制
   - 使用 Flexbox 网格（flex-wrap + gap）展示 93 种 box-shadow 样式卡片
   - 每种阴影通过 v-for 遍历 shadows 数组，:style 内联 boxShadow 属性动态渲染
   - hover 时卡片 translateY(-6px) 微动效，提升交互感
2. 交互方式
   - 点击卡片通过 navigator.clipboard.writeText 复制 box-shadow CSS 代码到剪贴板
   - 点击后显示绿色"已复制"徽标，2 秒后自动消失
   - hover 时显示复制图标（CopyDocument），opacity 过渡渐显
3. 结构要点
   - 每个 .shadow-card 包含编号、复制徽标、复制图标三层
   - 编号和徽标 absolute 定位在卡片的左上和右上角
4. 其他要点
   - 阴影数组涵盖多种经典 CSS 阴影样式（单层、多层、内阴影、彩色阴影等）
-->
<template>
  <div class="shadow-grid">
    <div
      v-for="(shadow, i) in shadows"
      :key="i"
      class="shadow-card"
      :style="{ boxShadow: shadow }"
      @click="copyShadow(i, shadow)"
    >
      <span class="shadow-number">#{{ i + 1 }}</span>
      <span v-if="copiedIndex === i" class="copied-badge">已复制</span>
      <span class="copy-icon"><CopyDocument style="width: 32px; height: 32px;" /></span>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const shadows = [
  'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px',
  'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
  'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
  'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
  'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
  'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
  'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
  'rgb(38, 57, 77) 0px 20px 30px -10px',
  'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
  'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
  'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
  'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px',
  'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
  'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
  'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
  'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
  'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
  'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
  'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
  'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
  'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
  'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
  'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
  'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
  'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset',
  'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
  'rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px',
  'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
  'rgba(0, 0, 0, 0.2) 0px 18px 50px -10px',
  'rgba(0, 0, 0, 0.1) 0px 10px 50px',
  'rgba(0, 0, 0, 0.04) 0px 3px 5px',
  'rgba(240, 46, 170, 0.4) -5px 5px, rgba(240, 46, 170, 0.3) -10px 10px, rgba(240, 46, 170, 0.2) -15px 15px, rgba(240, 46, 170, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px',
  'rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px',
  'rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px',
  'rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px',
  'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em',
  'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
  'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
  'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px',
  'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
  'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
  'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
  'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px',
  'blue 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px, rgb(31, 193, 27) 10px -10px, rgb(255, 255, 255) 20px -20px 0px -3px, rgb(255, 217, 19) 20px -20px, rgb(255, 255, 255) 30px -30px 0px -3px, rgb(255, 156, 85) 30px -30px, rgb(255, 255, 255) 40px -40px 0px -3px, rgb(255, 85, 85) 40px -40px',
  'rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px',
  'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset',
  'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
  'rgba(17, 17, 26, 0.1) 0px 1px 0px',
  'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
  'rgba(17, 17, 26, 0.1) 0px 0px 16px',
  'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
  'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
  'rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px',
  'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px',
  'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',
  'rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px',
  'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px',
  'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
  'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
  'rgba(0, 0, 0, 0.08) 0px 4px 12px',
  'rgba(0, 0, 0, 0.15) 0px 2px 8px',
  'rgba(0, 0, 0, 0.18) 0px 2px 4px',
  'rgba(0, 0, 0, 0.1) -4px 9px 25px -6px',
  'rgba(0, 0, 0, 0.2) 0px 60px 40px -7px',
  'rgba(0, 0, 0, 0.4) 0px 30px 90px',
  'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
  'rgba(0, 0, 0, 0.2) 0px 20px 30px',
  'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px',
  'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
  'rgba(0, 0, 0, 0.09) 0px 3px 12px',
  'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
  'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
  'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
  'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset',
  'rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset',
  'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px',
  'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
]

const copiedIndex = ref(-1)

function copyShadow(index, shadow) {
  const css = `box-shadow: ${shadow};`
  navigator.clipboard.writeText(css)
  copiedIndex.value = index
  setTimeout(() => {
    copiedIndex.value = -1
  }, 2000)
}
</script>

<style scoped lang="scss">
.shadow-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 22px;
  justify-content: space-evenly;
}

.shadow-card {
  position: relative;
  width: 280px;
  height: 280px;
  background: #fff;
  border-radius: 16px;
  cursor: pointer;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-6px);
  }
}

.shadow-number {
  position: absolute;
  top: 14px;
  left: 16px;
  z-index: 1;
  font-size: 13px;
  font-weight: 700;
  color: #bbb;
  letter-spacing: 0.5px;
}

.copied-badge {
  position: absolute;
  top: 14px;
  right: 16px;
  z-index: 1;
  padding: 3px 10px;
  font-size: 12px;
  color: #fff;
  background: #52c41a;
  border-radius: 6px;
  animation: fadeIn 0.2s ease;
}

.copy-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ccc;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.shadow-card:hover .copy-icon {
  opacity: 1;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
