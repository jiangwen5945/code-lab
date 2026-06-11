<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const baseUrl = import.meta.env.BASE_URL

const preloaderHide = ref(false)

const typewriterText = ref('')
const showCursor = ref(true)

const hoverClass = ref('')

const works = [
  {
    title: 'code-lab',
    desc: '代码实验室',
    img: `${baseUrl}img/work/item-1.webp`,
    url: `${baseUrl}zendo`,
    platforms: ['app']
  },
  {
    title: 'my-blog',
    desc: '个人博客',
    img: `${baseUrl}img/work/item-2.webp`,
    url: 'https://jiangwen.site/blog',
    platforms: ['pc', 'app']
  },
  {
    title: 'xiamao-mall',
    desc: '电商网站',
    img: `${baseUrl}img/work/item-4.webp`,
    url: 'https://xiamao-mall.jiangwen.site',
    platforms: ['pc']
  },
  {
    title: 'xiamao-admin',
    desc: '后台管理系统',
    img: `${baseUrl}img/work/item-3.webp`,
    url: 'https://xiamao-admin.jiangwen.site',
    platforms: ['pc']
  },
  {
    title: 'live-dashboard',
    desc: '实时数据大屏展示',
    img: `${baseUrl}img/work/item-5.webp`,
    url: 'https://xiamao-dashboard.jiangwen.site',
    platforms: ['pc']
  }
]

const isMobile = ref(window.innerWidth < 768)
const deviceType = computed(() => (isMobile.value ? 'app' : 'pc'))

function isMatched(item) {
  return item.platforms.includes(deviceType.value)
}

const breakpointHandler = () => {
  isMobile.value = window.innerWidth < 768
}

function showToast(msg) {
  const el = document.createElement('div')
  el.textContent = msg
  Object.assign(el.style, {
    position: 'fixed',
    zIndex: '999999',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px 24px',
    borderRadius: '8px',
    background: 'rgba(0,0,0,0.75)',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'var(--font-primary, serif)',
    whiteSpace: 'nowrap',
    opacity: '0',
    transition: 'opacity 0.3s ease'
  })
  document.body.appendChild(el)
  requestAnimationFrame(() => { el.style.opacity = '1' })
  setTimeout(() => {
    el.style.opacity = '0'
    setTimeout(() => el.remove(), 300)
  }, 2500)
}

function handleWorkClick(item) {
  if (isMatched(item)) {
    window.open(item.url, '_blank')
    return
  }
  const target = isMobile.value ? '电脑' : '手机'
  showToast(`请在${ target }端打开此项目`)
}

const services = [
  { icon: 'Monitor', label: 'Vue 前端开发' },
  { icon: 'Odometer', label: '后台管理系统' },
  { icon: 'ShoppingCart', label: '电商平台方案' },
  { icon: 'Iphone', label: '移动端 H5' },
  { icon: 'Refresh', label: '优化与重构' }
]

const scrolledPastThreshold = ref(false)

let mouseMoveHandler = null
let mouseLeaveHandler = null
let scrollHandler = null
let desktopScrollHandler = null
let observer = null

function smoothScroll(e, targetId) {
  e.preventDefault()
  const el = document.querySelector(targetId)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  setTimeout(() => {
    preloaderHide.value = true
  }, 100)

  setTimeout(() => {
    document.querySelectorAll('#intro .animation-container').forEach((el) => {
      const delay = parseInt(el.getAttribute('data-animation-delay') || '0')
      setTimeout(() => {
        el.classList.add('run-animation')
      }, 700 + delay)
    })
  }, 700)

  setTimeout(() => {
    const lines = 
      [
        '从前我写代码，现在我描述代码',
        '从古法编程到许愿式编程（Vibe Coding）',
        '一路见证前端的进化.....',
      ]
    let lineIdx = 0
    let charIdx = 0

    function typeNext() {
      if (lineIdx >= lines.length) return
      if (charIdx < lines[lineIdx].length) {
        typewriterText.value += lines[lineIdx][charIdx]
        charIdx++
        setTimeout(typeNext, 80 + Math.random() * 40)
      } else {
        if (lineIdx < lines.length - 1) {
          typewriterText.value += '<br>'
        }
        lineIdx++
        charIdx = 0
        setTimeout(typeNext, 500)
      }
    }
    typeNext()
  }, 1000)

  const isDesktop = window.innerWidth >= 768
  if (isDesktop) {
    mouseMoveHandler = (e) => {
      hoverClass.value = e.clientX >= window.innerWidth / 2 ? 'hover-right' : ''
    }
    mouseLeaveHandler = () => {
      hoverClass.value = ''
    }
    document.addEventListener('mousemove', mouseMoveHandler)
    document.documentElement.addEventListener('mouseleave', mouseLeaveHandler)

    desktopScrollHandler = () => {
      scrolledPastThreshold.value = window.scrollY > 100
    }
    desktopScrollHandler()
    window.addEventListener('scroll', desktopScrollHandler)
  } else {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      let ticking = false
      scrollHandler = () => {
        if (ticking) return
        requestAnimationFrame(() => {
          document.body.style.setProperty('--scroll', window.scrollY + 'px')
          ticking = false
        })
        ticking = true
      }
      window.addEventListener('scroll', scrollHandler)
    }
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3 }
  )

  window.addEventListener('resize', breakpointHandler)

  nextTick(() => {
    document.querySelectorAll('.scroll-animated-from-right').forEach((el) => {
      observer.observe(el)
    })
  })
})

onUnmounted(() => {
  if (mouseMoveHandler) {
    document.removeEventListener('mousemove', mouseMoveHandler)
  }
  if (mouseLeaveHandler) {
    document.documentElement.removeEventListener('mouseleave', mouseLeaveHandler)
  }
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
  if (desktopScrollHandler) {
    window.removeEventListener('scroll', desktopScrollHandler)
  }
  if (observer) {
    observer.disconnect()
  }
  window.removeEventListener('resize', breakpointHandler)
})
</script>

<template>
  <div :class="['home', hoverClass]">
    <div :class="['preloader', { 'hide-preloader': preloaderHide }]">
      <div class="spinner"></div>
    </div>

    <div class="image-container">
      <div class="background-img"></div>
    </div>

    <div class="content-area">
      <div class="content-area-inner">
        <section id="intro">
          <div class="container-mid">
            <div class="animation-container animation-fade-down" data-animation-delay="0">
              <h1>我是姜文</h1>
            </div>
            <div class="animation-container animation-fade-left" data-animation-delay="300">
              <p class="subline">
                <span v-html="typewriterText"></span
                ><span v-if="showCursor" class="typewriter-cursor">|</span>
              </p>
            </div>
            <div class="animation-container animation-fade-up" data-animation-delay="600">
              <a
                href="#work"
                :class="['smooth-scroll', { 'scrolled-hover': scrolledPastThreshold }]"
                @click="smoothScroll($event, '#work')"
              >
                个人作品集<el-icon><ArrowDown /></el-icon>
              </a>
            </div>
          </div>
        </section>

        <section id="service">
          <ul class="services-list">
            <li v-for="s in services" :key="s.label" class="scroll-animated-from-right">
              <span class="icon-circle"
                ><el-icon :size="24"><component :is="s.icon" /></el-icon></span
              >{{ s.label }}
            </li>
          </ul>
        </section>

        <section id="work">
          <h3 class="headline scroll-animated-from-right">我的作品</h3>
          <div class="showcase">
            <div v-for="item in works" :key="item.title" class="item scroll-animated-from-right">
              <div :class="'work-link'" @click="handleWorkClick(item)">
                <div class="info">
                  <div class="container-mid">
                    <h5>{{ item.title }}</h5>
                    <p>{{ item.desc }}</p>
                  </div>
                </div>
                <div
                  class="background-image"
                  :style="{ backgroundImage: `url(${item.img})` }"
                ></div>
              </div>
              <div class="device-badges">
                <span v-for="p in item.platforms" :key="p" class="badge">
                  {{ p === 'pc' ? 'PC' : 'App' }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <h3 class="headline scroll-animated-from-right">联系我</h3>
          <ul class="contact-list">
            <li class="scroll-animated-from-right">
              <el-icon><Iphone /></el-icon>17759795597
            </li>
            <li class="scroll-animated-from-right">
              <el-icon><Message /></el-icon>jiangwen5945@gmail.com
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  --font-primary: 'Arapey', serif;
  --font-heading: 'Abril Fatface', cursive;
  --color-black: #000;
  --color-white: #fff;
  --color-dark: #111;
  --color-overlay: #00000097;
  margin: 0;
  font-family: var(--font-primary);
  font-weight: 300;
  color: var(--color-black);
  -webkit-font-smoothing: antialiased;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-heading);
    font-weight: normal;
    letter-spacing: 0.05em;
    color: var(--color-black);
  }

  h1 {
    font-size: min(9.6vw, 43.2px);
  }
  h3 {
    font-size: min(7.467vw, 33.6px);
  }
  h5 {
    font-size: min(5.333vw, 24px);
  }

  p {
    font-size: min(4.8vw, 21.6px);
  }

  a,
  .work-link {
    cursor: pointer;
    transition: all 300ms ease;
    text-decoration: none;

    &:hover,
    &:focus {
      cursor: pointer;
      transition: all 300ms ease;
      text-decoration: none;
    }
  }
}

/* 预加载 */
.preloader {
  position: fixed;
  z-index: 100000;
  bottom: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: var(--color-white);

  &.hide-preloader {
    height: 0;
    transition: 0.7s ease 0.3s;

    .spinner {
      opacity: 0;
      transition: 0.3s ease;
    }
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 50px;
    height: 50px;
    margin-top: -25px;
    margin-left: -25px;
    border-radius: 100%;
    background-color: var(--color-dark);
    animation: spinner-pulse 0.6s infinite ease-in-out;
  }
}

@keyframes spinner-pulse {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* 图片容器（左侧） */
.image-container {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;

  .background-img {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../assets/img/background.webp) no-repeat top / cover;
  }
}

/* 内容区域（右侧） */
.content-area {
  position: relative;
  left: 0;
  width: 100%;

  .content-area-inner {
    position: relative;
    left: 50%;
    width: 50%;
    padding: 0 20px;
    box-sizing: border-box;
    overflow-x: hidden;

    section {
      max-width: 530px;
      min-height: 100vh;
      margin: 0 auto 18vh auto;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &:last-child {
        margin-bottom: 10vh;
      }

      h3.headline {
        margin-bottom: 1.2em;
      }
    }
  }
}

/* 介绍 */
#intro {
  position: relative;

  .container-mid {
    position: relative;
    width: 100%;

    p.subline {
      font-size: min(4vw, 24px);
      line-height: 1.6em;
      margin-top: 2em;
      margin-bottom: 2.2em;
      position: relative;
      padding: 0 1.8em;
      min-height: 7em;

      &::before {
        content: '\201C';
      }

      &::after {
        content: '\201D';
      }
    }

    a {
      font-size: min(5.867vw, 26.4px);
      line-height: 2.92em;
      position: relative;
      display: inline-block;
      padding: 0 2.6em;
      transition: transform 0.2s ease 0.05s;
      transform-origin: left center;
      color: var(--color-white);
      border-radius: 100px;
      background: var(--color-dark);

      &.scrolled-hover, &:hover {
        transform: rotate(15deg);
      }

      &::before {
        position: absolute;
        top: 45%;
        left: min(5.333vw, 24px);
        width: min(1.867vw, 8.4px);
        height: min(1.867vw, 8.4px);
        content: '';
        border-radius: 100px;
        background: #ffffff;
        box-shadow: 0 0 4px;
      }

      .el-icon {
        font-size: 0.85em;
        margin-left: 0.7em;
      }
    }
  }
}

/* 入场动画 */
.animation-container {
  transition: 0.5s ease;

  &.animation-fade-up {
    transform: translateY(10vh);
    opacity: 0;

    &.run-animation {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &.animation-fade-down {
    transform: translateY(-10vh);
    opacity: 0;

    &.run-animation {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &.animation-fade-left {
    transform: translateX(10vh);
    opacity: 0;

    &.run-animation {
      transform: translateX(0);
      opacity: 1;
    }
  }
}

/* 打字机光标 */
.typewriter-cursor {
  display: inline-block;
  margin-left: 2px;
  color: var(--color-black);
  animation: cursor-blink 0.8s step-end infinite;
}

@keyframes cursor-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* 服务 */
#service .services-list {
  margin-bottom: 0;
  padding: 0;
  list-style: none;

  li {
    font-size: min(5.333vw, 24px);
    line-height: 3.4em;

    .icon-circle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 3em;
      height: 3em;
      margin-right: 1.5em;
      border-radius: 100px;
      background: var(--color-dark);
      flex-shrink: 0;
      vertical-align: middle;

      .el-icon {
        font-size: min(5.333vw, 24px);
        color: var(--color-white);
      }
    }
  }
}

/* 作品 */
#work .showcase .item {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: min(53.333vw, 240px);
  margin-bottom: 6vh;
  cursor: pointer;
  border-radius: min(5.333vw, 24px);
  background: var(--color-dark);

  &:last-child {
    margin-bottom: 0;
  }

  .info {
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    transition: 0.25s ease;
    color: var(--color-white);
    background: var(--color-overlay);

    .container-mid {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      padding: 0 min(16vw, 72px);
      transform: translateY(-50%);
      box-sizing: border-box;

      h5 {
        transform: translateX(4vh);
        opacity: 0;
        color: var(--color-white);
      }

      p {
        position: relative;
        transform: translateX(4vh);
        letter-spacing: 0.025em;
        opacity: 0;
        font-size: min(4vw, 16px);
      }
    }
  }

  &:hover {
    .info {
      width: 100%;
    }

    .info .container-mid h5 {
      transition: 0.2s ease 0.2s;
      transform: translateX(0);
      opacity: 1;
    }

    .info .container-mid p {
      transition: 0.2s ease 0.3s;
      transform: translateX(0);
      opacity: 1;
    }
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .device-badges {
    position: absolute;
    z-index: 200;
    top: 12px;
    right: 12px;
    display: flex;
    gap: 6px;

    .badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 100px;
      font-size: 11px;
      font-family: var(--font-primary);
      font-weight: 700;
      letter-spacing: 0.05em;
      line-height: 1.6;
      border: 1.5px solid rgba(255, 255, 255, 0.8);
      color: rgba(255, 255, 255, 0.9);
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(4px);
    }

  }
}

/* 滚动显现 */
.scroll-animated-from-right {
  transform: translateX(20vh);
  opacity: 0;
  transition:
    transform 0.6s ease,
    opacity 0.6s ease;

  &.revealed {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 联系 */
#contact .contact-list {
  margin-top: 3em;
  margin-bottom: 3.4em;
  padding: 0;
  list-style: none;

  li {
    font-size: min(5.333vw, 24px);
    line-height: 2.4em;

    .el-icon {
      line-height: 1.2em;
      width: 1.2em;
      height: 1.2em;
      margin-right: 1em;
      text-align: center;
      border-radius: 100px;
    }
  }
}

/* 悬停分割效果 */
.image-container {
  transition: width 0.4s ease;
}

.content-area .content-area-inner {
  transition:
    left 0.4s ease,
    width 0.4s ease;
}

.hover-right {
  .image-container {
    width: 35%;
  }

  .content-area .content-area-inner {
    left: 35%;
    width: 65%;
  }
}

/* 移动端样式 */
@media (max-width: 767px) {
  .home {
    color: var(--color-white);

    &::before {
      content: '';
      position: fixed;
      z-index: -2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url(../assets/img/background.webp) no-repeat center / cover;
    }

    &::after {
      content: '';
      position: fixed;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: var(--color-white);
    }
  }

  .image-container {
    display: none;
  }

  .content-area .content-area-inner {
    left: 0;
    width: 100%;
    padding: 0 20px;

    section {
      max-width: 530px;
      margin: 0 auto;
      flex-direction: column;
      justify-content: center;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(4px);
      border-radius: min(5.333vw, 24px);
      margin-bottom: 4vh;
      min-height: auto;
      padding: min(10.667vw, 48px) min(5.333vw, 24px);
      border: 1px solid #2d2d2d;
      margin-top: 4vh;
      min-height: 30vh;
    }

    section h3.headline {
      margin-bottom: 1em;
    }
  }

  #intro .container-mid {
    p.subline {
      line-height: 1.6em;
      margin-top: 1.5em;
      margin-bottom: 1.8em;
    }

    a {
      line-height: 2.92em;
      display: inline-flex;
      align-items: center;
      padding: 0 2.2em;

      &:active {
        transform: scale(0.95);
      }
    }
  }

  .typewriter-cursor {
    color: var(--color-white);
  }

  #service .services-list li {
    line-height: 3em;
    display: flex;
    align-items: center;

    .icon-circle {
      width: 2.8em;
      height: 2.8em;
      margin-right: 1em;

      .el-icon {
        font-size: 1.3em;
      }
    }
  }

  #work .showcase .item {
    margin-bottom: 3vh;

    .device-badges {
      top: 8px;
      right: 8px;

      .badge {
        font-size: 10px;
        padding: 1px 8px;
      }
    }

    .info {
      bottom: 0;
      left: 0;
      width: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 60%);
      padding: min(5.333vw, 24px) min(5.333vw, 24px) min(4vw, 18px);
      box-sizing: border-box;

      .container-mid {
        position: relative;
        top: 0;
        padding: 0;
        transform: none;

        h5 {
          transform: none;
          opacity: 1;
        }

        p {
          padding-left: 0;
          transform: none;
          opacity: 1;

          &::before {
            display: none;
          }
        }
      }
    }
  }

  #contact .contact-list {
    margin-top: 2em;
    margin-bottom: 2em;

    li {
      line-height: 2.2em;
      display: flex;
      align-items: center;

      .el-icon {
        width: 1.2em;
        margin-right: 0.8em;
      }
    }
  }
}
</style>
