export default {
  mounted: (el, binding) => {
    // 没有绑定函数抛出错误
    if (typeof binding.value !== 'function') {
      throw 'throttle callback not a function'
    }

    // 获取节流事件名称（默认点击）
    let domEvent = binding.arg ? binding.arg : 'click'
    let timer

    el.addEventListener(domEvent, () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        binding.value()
      }, 1000)
    })
  }
}
