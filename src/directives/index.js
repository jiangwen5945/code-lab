import slideIn from './slideIn'
import waterMarker from './waterMarker'
import draggable from './draggable'
import debounce from './debounce'
import throttle from './throttle'
import hover3d from './hover3d'

const directives = {
  slideIn,
  waterMarker,
  draggable,
  debounce,
  throttle,
  hover3d
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  }
}
