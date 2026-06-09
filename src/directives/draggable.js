export default {
  // 例：<div v-draggable></div>

  mounted: (el) => {
    el.style.cursor = 'move'
    el.style.position = 'absolute'
    el.onmousedown = (e) => {
      // 记录当前的left、top值
      let disX = e.pageX - el.offsetLeft
      let disY = e.pageY - el.offsetTop

      // 鼠标移动
      document.onmousemove = (e) => {
        let x = e.pageX - disX
        let y = e.pageY - disY

        // 临界值处理
        let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)
        let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)

        if (x < 0) {
          x = 0
        } else if (x > maxX) {
          x = maxX
        }

        if (y < 0) {
          y = 0
        } else if (y > maxY) {
          y = maxY
        }

        el.style.left = `${x}px`
        el.style.top = `${y}px`
      }
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null
      }
    }
  }
}
