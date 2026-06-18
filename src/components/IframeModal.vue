<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  src: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const loading = ref(true)

watch(() => props.visible, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
  if (val) loading.value = true
})

function close() {
  emit('close')
}

function onIframeLoad() {
  loading.value = false
}
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="overlay" @click.self="close">
      <div class="modal">
        <button class="close-btn" @click="close">&times;</button>
        <div v-if="loading" class="loader">
          <div class="spinner"></div>
        </div>
        <iframe
          :src="src"
          frameborder="0"
          :class="{ hidden: loading }"
          @load="onIframeLoad"
        ></iframe>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  z-index: 100000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  position: relative;
  width: min(90vw, 900px);
  height: min(80vh, 600px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

  iframe {
    width: 100%;
    height: 100%;
    border: none;

    &.hidden {
      display: none;
    }
  }
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  font-size: 28px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
}

.loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e1e2e;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #363650;
    border-top-color: #89dceb;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
