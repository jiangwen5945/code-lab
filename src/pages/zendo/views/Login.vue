<!--
核心逻辑：

1. 拟人化柱状图交互
   - 左侧 4 根柱状图（bar-1~4）被设计成有眼睛的拟人角色
   - 每根柱子通过 getBoundingClientRect 获取自身位置，结合鼠标坐标（mouse.x/y）
     计算偏移量（fx/fy）和倾斜量（skew），驱动 CSS transform 和眼睛位置
   - 通过 calcFace() 计算面部偏移，calcPupil() 计算瞳孔偏移

2. 鼠标追踪
   - 监听全局 mousemove，实时更新 mouse.x / mouse.y
   - 瞳孔根据鼠标相对眼睛中心的距离和方向，在限定半径内跟随
   - 柱子本身也会随鼠标轻微倾斜（skewX）

3. 眨眼动画
   - scheduleBlink(id) 用随机 setTimeout（3~7 秒）触发眨眼
   - 眨眼时对应 eye 的 height 瞬间缩为 2px，150ms 后恢复

4. 输入交互反馈
   - 邮箱聚焦（onEmailFocus）触发 typingReaction，柱子 1/2 产生较大偏移
   - 密码输入时 hasPassword 计数，触发柱子反应

5. 密码窥视反应
   - 点击显示密码（showPassword）后，schedulePeek() 随机延迟（2~5 秒）
     触发 peekReaction，柱子做出"偷看"动作，800ms 后恢复
   - 各柱子根据 showPassword/typingReaction/hasPwdHidden 状态组合，
     通过 getForceXY() 返回覆盖坐标，替代鼠标追踪的默认偏移

6. 状态驱动的计算属性
   - barStyle / eyesStyle / pupilStyle / mouth4Style 均为 computed
   - 根据 isShowPwd、typingReaction、hasPwdHidden、blink 等状态，
     返回不同的位置/变换值，transition 实现平滑动画
-->
<template>
  <div class="page">
    <!-- Left panel -->
    <div class="panel-left">
      <div class="grid-overlay" />
      <div class="glow-1" />
      <div class="glow-2" />

      <a class="logo" href="/">
        <span class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </span>
        Code Lab
      </a>

      <div class="chart-area" ref="chartAreaRef">
        <div class="chart-stage" ref="stageRef">
          <div
            class="bar bar-1"
            ref="bar1Ref"
            :style="bar1Style"
          >
            <div class="bar-eyes" :style="eyes1Style">
              <div class="eye" :style="eye1Style">
                <div class="eye-inner" :style="pupil1Style" />
              </div>
              <div class="eye" :style="eye1Style">
                <div class="eye-inner" :style="pupil1Style" />
              </div>
            </div>
          </div>

          <div
            class="bar bar-2"
            ref="bar2Ref"
            :style="bar2Style"
          >
            <div class="bar-eyes" :style="eyes2Style">
              <div class="eye" :style="eye2Style">
                <div class="eye-inner" :style="pupil2Style" />
              </div>
              <div class="eye" :style="eye2Style">
                <div class="eye-inner" :style="pupil2Style" />
              </div>
            </div>
          </div>

          <div class="bar bar-3" ref="bar3Ref" :style="bar3Style">
            <div class="bar-eyes" :style="eyes3Style">
              <div class="eye-inner" :style="pupil3Style" />
              <div class="eye-inner" :style="pupil3Style" />
            </div>
          </div>

          <div class="bar bar-4" ref="bar4Ref" :style="bar4Style">
            <div class="bar-eyes" :style="eyes4Style">
              <div class="eye-inner" :style="pupil4Style" />
              <div class="eye-inner" :style="pupil4Style" />
            </div>
            <div class="bar-mouth" :style="mouth4Style" />
          </div>
        </div>
      </div>

      <div class="footer-links">
        <a href="#">隐私政策</a>
        <a href="#">服务条款</a>
      </div>
    </div>

    <!-- Right panel -->
    <div class="panel-right">
      <div class="form-wrap">
        <div class="mobile-logo">
          <span class="mobile-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#09090b" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </span>
          CareerCompass
        </div>

        <div class="form-header">
          <h1>欢迎回来！</h1>
          <p>请输入您的详细信息</p>
        </div>

      <form class="form" @submit.prevent="handleSubmit">
        <div class="field">
          <label for="email">邮箱</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="请输入邮箱"
            @focus="onEmailFocus"
            @blur="onEmailBlur"
          >
        </div>

        <div class="field">
          <label for="password">密码</label>
          <div class="password-wrap">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="请输入密码"
              @input="onPasswordInput"
            >
            <button
              type="button"
              class="password-toggle"
              @click="togglePassword"
              aria-label="切换密码可见性"
            >
              <svg
                v-if="showPassword"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-4.97 0-9.33-3.11-10.73-8a10.07 10.07 0 0 1 2.79-4.66" />
                <path d="m1 1 22 22" />
                <path d="M6.73 6.73A6 6 0 0 1 18 12c0 .66-.12 1.3-.32 1.87" />
              </svg>
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="errorMsg" class="form-error">{{ errorMsg }}</div>

        <div class="form-row">
          <div class="checkbox-wrap">
            <input id="remember" v-model="remember" type="checkbox">
            <label for="remember">记住我 30 天</label>
          </div>
          <a class="forgot-link" href="#" @click.prevent="onForgotPwd">忘记密码？</a>
        </div>

        <button class="btn" type="submit" :disabled="loading">
          <span class="btn-text">{{ loading ? '登录中...' : '登录' }}</span>
          <span class="btn-overlay">
            {{ loading ? '登录中...' : '登录' }}
            <svg v-if="!loading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </button>
      </form>

        <div class="guest-wrap">
          <button class="btn btn-guest" type="button" @click="handleGuestLogin">
            <span class="btn-text">
              访客登录
            </span>
            <span class="btn-overlay">
              访客登录
              <svg viewBox="0 0 512 512" fill="currentColor">
                <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
              </svg>
            </span>
          </button>
        </div>

        <div class="signup-text">
          还没有账号？<a href="#" @click.prevent="onRegister">立即注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { useZendoStore } from '@/pages/zendo/stores/zendo'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isTyping = ref(false)
const typingReaction = ref(false)
const peekReaction = ref(false)
const hasPassword = ref(0)
const remember = ref(true)
const loading = ref(false)
const errorMsg = ref('')

const router = useRouter()
const zendoStore = useZendoStore()

const stageRef = ref<HTMLElement>()
const bar1Ref = ref<HTMLElement>()
const bar2Ref = ref<HTMLElement>()
const bar3Ref = ref<HTMLElement>()
const bar4Ref = ref<HTMLElement>()

const mouse = reactive({ x: 0, y: 0 })
const blink = reactive({ 1: false, 2: false })

let typingTimer: number | undefined
let peekTimer: number | undefined
let blinkTimer1: number | undefined
let blinkTimer2: number | undefined
let animId: number | undefined

// Bar defaults
const D = {
  1: { eL: 45, eT: 40, barH: 400, pupilD: 5 },
  2: { eL: 26, eT: 32, barH: 310, pupilD: 4 },
  3: { eL: 82, eT: 90, barH: 200, pupilD: 5 },
  4: { eL: 52, eT: 40, mL: 40, mT: 88, barH: 230, pupilD: 5 },
}

function calcFace(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 3
  const dx = mouse.x - cx
  const dy = mouse.y - cy
  return {
    fx: Math.max(-15, Math.min(15, dx / 20)),
    fy: Math.max(-10, Math.min(10, dy / 30)),
    skew: Math.max(-6, Math.min(6, -dx / 120)),
  }
}

function getForceXY(id: number) {
  if (showPassword.value && hasPassword.value > 0) {
    if (id === 1) return peekReaction.value ? { fx: 4, fy: 5 } : { fx: -4, fy: -4 }
    if (id === 2) return { fx: -4, fy: -4 }
    if (id === 3 || id === 4) return { fx: -5, fy: -4 }
  }
  if (typingReaction.value) {
    if (id === 1) return { fx: 3, fy: 4 }
    if (id === 2) return { fx: 0, fy: -4 }
  }
  return null
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function calcPupil(el: HTMLElement, maxDist: number) {
  const r = el.getBoundingClientRect()
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  const dx = mouse.x - cx
  const dy = mouse.y - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const clamped = Math.min(dist, maxDist)
  const angle = Math.atan2(dy, dx)
  return { x: Math.cos(angle) * clamped, y: Math.sin(angle) * clamped }
}

function hasPwdHidden() {
  return hasPassword.value > 0 && !showPassword.value
}

function scheduleBlink(id: number) {
  const delay = Math.random() * 4000 + 3000
  const timer = setTimeout(() => {
    blink[id] = true
    setTimeout(() => {
      blink[id] = false
      scheduleBlink(id)
    }, 150)
  }, delay)
  if (id === 1) blinkTimer1 = timer
  else blinkTimer2 = timer
}

function triggerTypingReaction() {
  if (typingReaction.value) return
  typingReaction.value = true
  clearTimeout(typingTimer)
  typingTimer = window.setTimeout(() => { typingReaction.value = false }, 800)
}

function schedulePeek() {
  clearTimeout(peekTimer)
  if (!showPassword.value || hasPassword.value === 0) return
  peekTimer = window.setTimeout(() => {
    peekReaction.value = true
    setTimeout(() => {
      peekReaction.value = false
      schedulePeek()
    }, 800)
  }, Math.random() * 3000 + 2000)
}

function cancelPeek() {
  clearTimeout(peekTimer)
  peekReaction.value = false
}

// Computed styles
function barStyle(id: number) {
  const el = [null, bar1Ref, bar2Ref, bar3Ref, bar4Ref][id]?.value
  if (!el) return {}

  let f = calcFace(el)
  const force = getForceXY(id)
  if (force) f = { ...f, ...force }

  const isShowPwd = showPassword.value && hasPassword.value > 0
  const isTypingReact = typingReaction.value || hasPwdHidden()

  const base: Record<string, any> = {}
  const d = D[id as keyof typeof D]

  if (id === 1) {
    if (isShowPwd) {
      base.height = d.barH + 'px'
      base.transform = 'skewX(0deg)'
    } else if (isTypingReact) {
      base.height = '440px'
      base.transform = `skewX(${(f.skew || 0) - 12}deg) translateX(40px)`
    } else {
      base.height = d.barH + 'px'
      base.transform = `skewX(${f.skew || 0}deg)`
    }
  } else if (id === 2) {
    if (isShowPwd) {
      base.transform = 'skewX(0deg)'
    } else if (typingReaction.value) {
      base.transform = `skewX(${1.5 * (f.skew || 0) + 10}deg) translateX(20px)`
    } else {
      base.transform = `skewX(${isTypingReact ? 1.5 * (f.skew || 0) : f.skew || 0}deg)`
    }
  } else if (id === 3 || id === 4) {
    base.transform = isShowPwd ? 'skewX(0deg)' : `skewX(${f.skew || 0}deg)`
  }

  return base
}

const bar1Style = computed(() => barStyle(1))
const bar2Style = computed(() => barStyle(2))
const bar3Style = computed(() => barStyle(3))
const bar4Style = computed(() => barStyle(4))

function eyesStyle(id: number) {
  const el = [null, bar1Ref, bar2Ref, bar3Ref, bar4Ref][id]?.value
  if (!el) return {}

  let f = calcFace(el)
  const force = getForceXY(id)
  if (force) f = { ...f, ...force }

  const isShowPwd = showPassword.value && hasPassword.value > 0
  const d = D[id as keyof typeof D]

  if (id === 1) {
    if (isShowPwd) return { left: '20px', top: '35px' }
    if (typingReaction.value || hasPwdHidden()) return { left: '55px', top: '65px' }
    return { left: (d.eL + f.fx) + 'px', top: (d.eT + f.fy) + 'px' }
  }
  if (id === 2) {
    if (isShowPwd) return { left: '10px', top: '28px' }
    if (typingReaction.value) return { left: '32px', top: '12px' }
    return { left: (d.eL + f.fx) + 'px', top: (d.eT + f.fy) + 'px' }
  }
  if (id === 3) {
    if (isShowPwd) return { left: '50px', top: '85px' }
    return { left: (d.eL + (f.fx || 0)) + 'px', top: (d.eT + (f.fy || 0)) + 'px' }
  }
  if (id === 4) {
    if (isShowPwd) return { left: '20px', top: '35px' }
    return { left: (d.eL + (f.fx || 0)) + 'px', top: (d.eT + (f.fy || 0)) + 'px' }
  }
  return {}
}

const eyes1Style = computed(() => eyesStyle(1))
const eyes2Style = computed(() => eyesStyle(2))
const eyes3Style = computed(() => eyesStyle(3))
const eyes4Style = computed(() => eyesStyle(4))

const pupilStyle = (id: number, maxDist: number) => {
  const el = [null, bar1Ref, bar2Ref, bar3Ref, bar4Ref][id]?.value
  if (!el) return {}

  const isShowPwd = showPassword.value && hasPassword.value > 0

  if (id === 1 && blink[1]) return {}
  if (id === 2 && blink[2]) return {}

  let p: { x: number; y: number }
  const force = getForceXY(id)
  if (force) {
    p = { x: force.fx, y: force.fy }
  } else {
    // Find the eye element
    const container = [null, bar1Ref, bar2Ref, bar3Ref, bar4Ref][id]?.value?.querySelector('.bar-eyes')
    if (!container) return {}
    const eyes = container.querySelectorAll(id === 1 || id === 2 ? '.eye' : '.eye-inner')
    p = calcPupil(eyes[0] as HTMLElement, maxDist)
  }

  return { transform: `translate(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px)` }
}

const pupil1Style = computed(() => ({ width: '7px', height: '7px', ...pupilStyle(1, 5) }))
const pupil2Style = computed(() => ({ width: '6px', height: '6px', ...pupilStyle(2, 4) }))
const pupil3Style = computed(() => ({ width: '12px', height: '12px', ...pupilStyle(3, 5) }))
const pupil4Style = computed(() => ({ width: '12px', height: '12px', ...pupilStyle(4, 5) }))

const eye1Style = computed(() => ({
  width: '18px',
  height: blink[1] ? '2px' : '18px',
}))
const eye2Style = computed(() => ({
  width: '16px',
  height: blink[2] ? '2px' : '16px',
}))

const mouth4Style = computed(() => {
  const el = bar4Ref.value
  if (!el) return {}
  const f = calcFace(el)
  const isShowPwd = showPassword.value && hasPassword.value > 0
  if (isShowPwd) return { left: '10px', top: '88px' }
  return { left: (D[4].mL + (f.fx || 0)) + 'px', top: (D[4].mT + (f.fy || 0)) + 'px' }
})

function onForgotPwd() {
  ElMessage({ message: '密码重置功能暂未开放', type: 'warning', duration: 3000 })
}

function onRegister() {
  ElMessage({ message: '注册功能暂未开放', type: 'warning', duration: 3000 })
}

async function handleGuestLogin() {
  email.value = 'guest@example.com'
  password.value = '123456'
  await handleSubmit()
}

async function handleSubmit() {
  errorMsg.value = ''
  if (!email.value || !password.value) {
    errorMsg.value = '请输入邮箱和密码'
    return
  }
  loading.value = true
  try {
    await zendoStore.login(email.value, password.value)
    router.replace('/home')
  } catch (err) {
    errorMsg.value = err.message === 'Invalid login credentials'
      ? '邮箱或密码错误'
      : (err.message || '登录失败，请重试')
  } finally {
    loading.value = false
  }
}

// Form handlers
function onEmailFocus() {
  isTyping.value = true
  triggerTypingReaction()
}
function onEmailBlur() { isTyping.value = false }
function onPasswordInput(e: Event) {
  const el = e.target as HTMLInputElement
  hasPassword.value = el.value.length
  if (showPassword.value && hasPassword.value > 0) schedulePeek()
}
function togglePassword() {
  showPassword.value = !showPassword.value
  if (showPassword.value && hasPassword.value > 0) schedulePeek()
  else cancelPeek()
}

onMounted(() => {
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })
  scheduleBlink(1)
  scheduleBlink(2)
})

onUnmounted(() => {
  clearTimeout(typingTimer)
  clearTimeout(peekTimer)
  clearTimeout(blinkTimer1)
  clearTimeout(blinkTimer2)
  cancelAnimationFrame(animId!)
})
</script>

<style scoped>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

.page {
  display: grid;
  height: 100vh;
  overflow: hidden;
}

.panel-left {
  display: none;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, rgba(255,255,255,.88), rgba(255,255,255,.78), rgba(255,255,255,.64));
  padding: 48px;
  overflow: hidden;
  color: #18181b;
}

.logo {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}

.logo-icon {
  width: 32px; height: 32px;
  background: rgba(0,0,0,.08);
  border-radius: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-icon svg { width: 100%; height: 100%; }

.chart-area {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 500px;
}
.chart-stage {
  position: relative;
  width: 550px;
  height: 400px;
}

.bar {
  position: absolute;
  bottom: 0;
  border-radius: 10px 10px 0 0;
  transform-origin: center bottom;
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.bar-1 { left: 70px; width: 180px; z-index: 1; background: #6c3ff5; border-radius: 10px 10px 0 0; height: 400px; }
.bar-2 { left: 240px; width: 120px; z-index: 2; background: #2d2d2d; border-radius: 8px 8px 0 0; height: 310px; }
.bar-3 { left: 0; width: 240px; z-index: 3; background: #ff9b6b; border-radius: 120px 120px 0 0; height: 200px; }
.bar-4 { left: 310px; width: 140px; z-index: 4; background: #e8d754; border-radius: 70px 70px 0 0; height: 230px; }

.bar-eyes {
  position: absolute;
  display: flex;
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.bar-1 .bar-eyes { gap: 32px; }
.bar-2 .bar-eyes { gap: 24px; }
.bar-3 .bar-eyes { gap: 32px; }
.bar-4 .bar-eyes { gap: 24px; }

.eye {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  transition: all 0.15s ease-out;
  background: white;
}
.eye-inner {
  border-radius: 50%;
  background: #2d2d2d;
  transition: transform 0.1s ease-out;
}

.bar-4 .bar-mouth {
  position: absolute;
  width: 80px; height: 4px;
  background: #2d2d2d;
  border-radius: 999px;
  transition: all 0.2s ease-out;
}

.footer-links {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 14px;
  color: #52525b;
}
.footer-links a { color: inherit; text-decoration: none; transition: color 0.2s; }
.footer-links a:hover { color: #18181b; }

.grid-overlay {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(0, 0, 0, .05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, .05) 1px, transparent 1px);
  background-size: 20px 20px;
  background-color: ;

}
.glow-1 {
  position: absolute; top: 25%; right: 25%;
  width: 256px; height: 256px;
  background: rgba(255,255,255,.08);
  border-radius: 50%;
  filter: blur(80px);
}
.glow-2 {
  position: absolute; bottom: 25%; left: 25%;
  width: 384px; height: 384px;
  background: rgba(255,255,255,.05);
  border-radius: 50%;
  filter: blur(80px);
}

.panel-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: #09090b;
}
.form-wrap { width: 100%; max-width: 420px; }

.mobile-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 48px;
}
.mobile-logo-icon {
  width: 32px; height: 32px;
  background: white; border-radius: 6px; padding: 4px;
  display: flex; align-items: center; justify-content: center;
}
.mobile-logo-icon svg { width: 100%; height: 100%; }

.form-header { text-align: center; margin-bottom: 40px; }
.form-header h1 { font-size: 30px; font-weight: 800; letter-spacing: -0.025em; margin-bottom: 8px; color: #fff }
.form-header p { color: #a1a1aa; font-size: 14px; }

.form { display: flex; flex-direction: column; gap: 20px; }
.field { display: flex; flex-direction: column; gap: 8px; }
.field label { font-size: 14px; font-weight: 500; }
.field input {
  width: 100%; height: 48px;
  border-radius: 9999px;
  border: 1px solid #27272a;
  background: #09090b;
  padding: 0 16px;
  font-size: 14px;
  font-family: inherit;
  color: #fafafa;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.field input:focus { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99,102,241,.2); }
.field input::placeholder { color: #a1a1aa; }

.form-error {
  font-size: 14px;
  color: #ef4444;
  text-align: center;
  padding: 8px 0;
}

.password-wrap { position: relative; }
.password-wrap input { padding-right: 40px; }
.password-toggle {
  position: absolute; right: 12px; top: 50%;
  transform: translateY(-50%);
  background: none; border: none;
  color: #a1a1aa; cursor: pointer;
  padding: 4px; display: flex;
  transition: color 0.2s;
}
.password-toggle:hover { color: #fafafa; }
.password-toggle svg { width: 20px; height: 20px; }

.form-row { display: flex; align-items: center; justify-content: space-between; }
.checkbox-wrap { display: flex; align-items: center; gap: 8px; }
.checkbox-wrap input[type="checkbox"] {
  appearance: none; -webkit-appearance: none;
  width: 16px; height: 16px;
  border: 1px solid #6366f1;
  border-radius: 3px;
  background: transparent;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: background 0.2s;
}
.checkbox-wrap input[type="checkbox"]:checked { background: #6366f1; }
.checkbox-wrap input[type="checkbox"]:checked::after {
  content: ''; position: absolute;
  left: 4px; top: 1px;
  width: 5px; height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.checkbox-wrap label { font-size: 14px; cursor: pointer; user-select: none; color: #a1a1aa; }
.forgot-link { font-size: 14px; color: #6366f1; text-decoration: none; font-weight: 500; }
.forgot-link:hover { text-decoration: underline; }

.btn {
  position: relative;
  width: 100%; height: 48px;
  border-radius: 9999px;
  border: 1px solid #27272a;
  background: #09090b;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  font-family: inherit;
  overflow: hidden;
}
.btn-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  position: relative;
  z-index: 1;
  color: #fff;
}
.btn:hover .btn-text { transform: translateX(48px); opacity: 0; }
.btn-overlay {
  position: absolute; inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #6366f1;
  color: white;
  border-radius: 9999px;
  opacity: 0;
  transition: opacity 0.3s;
}
.btn:hover .btn-overlay { opacity: 1; }
.btn-overlay svg { width: 16px; height: 16px; }

.guest-wrap { margin-top: 24px; }
.btn-guest svg { width: 18px; height: 18px; }

.signup-text {
  text-align: center;
  font-size: 14px;
  color: #a1a1aa;
  margin-top: 32px;
}
.signup-text a { color: #fafafa; font-weight: 500; text-decoration: none; }
.signup-text a:hover { text-decoration: underline; }

@media (min-width: 1024px) {
  .page { grid-template-columns: 1fr 1fr; }
  .panel-left { display: flex; }
  .mobile-logo { display: none; }
}
@media (max-width: 1023px) {
  .mobile-logo { display: flex; }
}
</style>
