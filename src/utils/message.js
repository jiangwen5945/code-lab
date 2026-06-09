import { createApp, createElementVNode, ref, render, withModifiers } from 'vue'
import { styled } from '@styils/vue'

const DivModal = styled('div', {
  position: 'fixed',
  width: '100%',
  height: '100%',
  left: '0',
  top: '0',
  zIndex: '99',
  background: '#00000050',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  flexWrap: 'wrap'
})

const DivBox = styled('div', {
  position: 'relative',
  width: '500px',
  height: '200px',
  background: '#fff',
  padding: '10px',
  borderRadius: '14px'
})

const DivTitle = styled('div', {
  boxSizing: 'border-box',
  textAlign: 'center',
  fontSize: '16px',
  height: '20px'
})

const DivMsg = styled('div', {
  boxSizing: 'border-box',
  textAlign: 'center',
  padding: '20px'
})

const Btn = styled('button', {
  width: '100px',
  height: '40px',
  border: 'none',
  borderRadius: '6px',
  backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
  color: '#fff',
  fontSize: '16px',
  position: 'absolute',
  bottom: '16px',
  left: '50%',
  transform: 'translateX(-50%)'
})

// const isShow = ref(true)

// const handleClose = () => {
//   isShow.value = false
// }

const MessageBox = {
  props: {
    msg: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require: false
    }
  },
  render({ $props, $emit }) {
    return (
      <DivModal>
        <DivBox>
          <DivTitle>{$props.title}</DivTitle>
          <DivMsg>{$props.msg}</DivMsg>
          <Btn onClick={$emit('onClick')} id="ack">
            确定
          </Btn>
        </DivBox>
      </DivModal>
    )
  }
}

export function msg(msg, title = '', cb = (fn) => fn()) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const app = createApp(MessageBox, {
    msg,
    title,
    onClick(e) {
      if (e.target.id === 'ack') {
        cb(() => {
          app.mount()
          div.remove()
        })
      }
    }
  })

  app.mount(div)
}

// export default {
//   name: 'msgBox',
//   ...MessageBox
// }
