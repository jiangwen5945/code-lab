export default {
  mounted: (el, binding) => {
    // 没有绑定函数抛出错误
    if (typeof binding.value !== 'function') {
      throw 'debounce callback not a function'
    }

    // 获取节流事件名称（默认输入事件）
    let domEvent = binding.arg ? binding.arg : 'input'
    let timer

    el.addEventListener(domEvent, () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        binding.value()
      }, 2000)
    })
  }
}
