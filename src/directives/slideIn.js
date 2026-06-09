const DISTANCE = 100
const DURATION = 500
// 建立映射
const map = new WeakMap()

const ob = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    // 出现在视口中
    if (entry.isIntersecting) {
      const animation = map.get(entry.target)
      animation && animation.play()
      ob.unobserve(entry.target)
    }
  }
})
// 判断是否在视口下面
function isBelowViewport(el) {
  const rect = el.getBoundingClientRect && el.getBoundingClientRect()
  return rect.top - window.innerHeight > 0
}
export default {
  mounted(el) {
    if (!isBelowViewport(el)) return
    const animation = el.animate(
      [
        {
          transform: `translateY(${DISTANCE}px)`,
          opacity: 0.5
        },
        {
          transform: `translateY(0)`,
          opacity: 1
        }
      ],
      {
        duration: DURATION,
        ease: 'ease-out',
        fill: 'forwards'
      }
    )
    animation.pause()
    map.set(el, animation)
    ob.observe(el)
  },
  unmounted(el) {
    ob.unobserve(el)
  }
}
