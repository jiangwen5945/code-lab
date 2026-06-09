export default {
  // 例：<div v-draggable></div>

  mounted: (el) => {
    // 初始化样式
    el.style.transition = 'all 0.3s linear'
    el.style.transform = `perspective(500px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))`
    
    const yRange = [-10, 10]
    const xRange = [-10, 10]

    // 辅助函数：计算rotate旋转角度
    const getRotate = (range, value, max) => {
      return (value / max) * (range[1] - range[0]) + range[0]
    }

    el.onmousemove = (e) => {
      const { offsetX, offsetY } = e
      const { offsetWidth, offsetHeight } = el
      const ry = -getRotate(yRange, offsetX, offsetWidth)
      const rx = getRotate(xRange, offsetY, offsetHeight)
      el.style.setProperty('--rx', `${rx}deg`)
      el.style.setProperty('--ry', `${ry}deg`)
    }

    el.onmouseleave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
  }
}
