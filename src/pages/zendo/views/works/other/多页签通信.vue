<!--
核心逻辑：

1. BroadcastChannel 跨页签通信： 创建名为 "myChannel" 的命名通道，同一页面打开多个标签页共享该通道
2. 消息收发： channel.onmessage 监听接收，channel.postMessage() 发送，消息序列化为 JSON 携带来源 Tab ID
3. 生命周期管理： onMounted 时建立通道并广播 join 事件，onUnmounted 时广播 leave 并 channel.close() 清理

功能：多标签页实时通信 + 可视化消息流
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const TAB_ID = `标签页-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
const msg = ref('')
const connected = ref(false)
const messages = ref([])

let channel = null

onMounted(() => {
  channel = new BroadcastChannel('myChannel')

  channel.onmessage = (e) => {
    const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
    if (!data.text) return
    messages.value.push({
      id: Date.now(),
      from: data.from,
      text: data.text,
      time: new Date().toLocaleTimeString(),
      isSelf: data.from === TAB_ID
    })
  }

  channel.postMessage(JSON.stringify({ type: 'join', from: TAB_ID }))
  connected.value = true
})

onUnmounted(() => {
  if (channel) {
    channel.postMessage(JSON.stringify({ type: 'leave', from: TAB_ID }))
    channel.close()
  }
})

const openNewTab = () => {
  window.open(location.href, '_blank')
}

const send = () => {
  const text = msg.value.trim()
  if (!text || !channel) return

  const data = { from: TAB_ID, text }
  channel.postMessage(JSON.stringify(data))

  messages.value.push({
    id: Date.now(),
    from: TAB_ID,
    text,
    time: new Date().toLocaleTimeString(),
    isSelf: true
  })
  msg.value = ''
}
</script>

<template>
  <div class="demo-wrapper">
    <!-- 页签标识 & 状态 -->
    <div class="header">
      <span class="tab-badge">{{ TAB_ID }}</span>
      <span class="status-dot" :class="{ active: connected }" />
      <span class="status-text">{{ connected ? '通道已连接' : '连接中...' }}</span>
      <button class="open-btn" @click="openNewTab">+ 新标签页</button>
    </div>

    <!-- 提示 -->
    <p class="hint">打开多个标签页，在任意一个中输入消息，所有标签页实时同步</p>

    <!-- 消息列表 -->
    <div class="message-list">
      <div
        v-for="m in messages"
        :key="m.id"
        class="message"
        :class="{ self: m.isSelf }"
      >
        <div class="msg-header">
          <span class="msg-from">{{ m.isSelf ? '我' : m.from }}</span>
          <span class="msg-time">{{ m.time }}</span>
        </div>
        <div class="msg-body">{{ m.text }}</div>
        <div class="msg-arrow" />
      </div>
      <div v-if="messages.length === 0" class="empty">
        暂无消息，在输入框中发送一条吧
      </div>
    </div>

    <!-- 输入区 -->
    <div class="input-area">
      <input
        v-model="msg"
        type="text"
        placeholder="输入消息..."
        @keyup.enter="send"
      />
      <button :disabled="!msg.trim()" @click="send">发送</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-wrapper {
  max-width: 600px;
  margin: 80px auto;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  font-size: 14px;
  background: #fff;
}

.header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
}

.tab-badge {
  background: #3b82f6;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;

  &.active {
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
  }
}

.open-btn {
  margin-left: auto;
  padding: 6px 10px;
  border: 1px solid #3b82f6;
  background: transparent;
  color: #3b82f6;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #3b82f6;
    color: #fff;
  }
}

.status-text {
  color: #6b7280;
  font-size: 12px;
}

.hint {
  margin: 0;
  padding: 10px 16px;
  background: #eff6ff;
  color: #3b82f6;
  font-size: 13px;
  border-bottom: 1px solid #e5e7eb;
}

.message-list {
  min-height: 240px;
  max-height: 320px;
  overflow-y: auto;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 8px;
  background: #f3f4f6;
  position: relative;
  align-self: flex-start;

  &.self {
    background: #eff6ff;
    align-self: flex-end;
  }
}

.msg-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}

.msg-from {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;

  .self & {
    color: #3b82f6;
  }
}

.msg-time {
  font-size: 11px;
  color: #9ca3af;
}

.msg-body {
  color: #1f2937;
  line-height: 1.5;
  word-break: break-word;
}

.msg-arrow {
  display: none;
}

.empty {
  color: #9ca3af;
  font-size: 13px;
  text-align: center;
  padding: 48px 0;
}

.input-area {
  display: flex;
  border-top: 1px solid #e5e7eb;

  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 12px 16px;
    font-size: 14px;
    background: #fff;
    color: #1f2937;
  }

  button {
    padding: 0 20px;
    border: none;
    background: #3b82f6;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.15s;

    &:hover {
      background: #2563eb;
    }

    &:disabled {
      background: #93c5fd;
      cursor: not-allowed;
    }
  }
}
</style>
