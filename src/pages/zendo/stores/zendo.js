import { defineStore } from 'pinia'
// import menuList from '../data/menus'
// import autoMenuList from '../router/works'
import menus from '../router/menus'

// 分类图标映射对象
let iconMap = {
  css: 'MagicStick',
  demo: 'Dish',
  element: 'Eleme',
  echarts: 'DataAnalysis',
  directives: 'Paperclip'
}

let menuList = menus.reduce((acc, item) => {
  let f_item = acc.find((e) => e.name === item.meta.category)
  if (!f_item) {
    if (item.meta.category === true) {
      acc.push({
        ...item,
        icon: item.meta.icon || 'Document',
      })
    } else {
      acc.push({
        name: item.meta.category,
        icon: item.meta.icon || iconMap[item.meta.category] || 'Folder',
        children: [item]
      })
    }
  } else {
    f_item.children.push(item)
  }
  return acc
}, [])


export const useZendoStore = defineStore('zendo', {
  state: () => {
    return {
      isCollapse: false,
      isDark: false,
      isFullScreen: false,
      isBlurView: false,
      menuList,
      notes: '123',
      navList: [
        {
          component: 'HomelView',
          icon: '',
          name: '首页',
          path: '/home'
        }
      ]
    }
  },
  actions: {
    // 切换侧边菜单栏折叠
    toggleCollapse(status) {
      if (status === 'collapse') {
        this.isCollapse = true
      } else {
        this.isCollapse = !this.isCollapse
      }
    },

    // 切换主题
    toggleTheme() {
      this.isDark = !this.isDark
      document.documentElement.classList.toggle('dark')
      console.log('toggleTheme')
    },

    // 切换全屏
    toggleFullScreen() {
      this.toggleCollapse('collapse')
      this.isFullScreen = !this.isFullScreen
      if (!this.isFullScreen) {
        document.exitFullScreen && document.exitFullscreen()
        //兼容火狐
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        }
        //兼容谷歌等
        if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        }
        //兼容IE
        if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (document.documentElement.RequestFullScreen) {
          document.documentElement.RequestFullScreen()
        }
        //兼容火狐
        if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
        }
        //兼容谷歌等可以webkitRequestFullScreen也可以webkitRequestFullscreen
        if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen()
        }
        //兼容IE,只能写msRequestFullscreen
        if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen()
        }
      }
    },

    // 切换内容模糊
    toggleBlurView() {
      console.log('toggleBlurView');
      
      this.isBlurView = !this.isBlurView
    },

    // 更新导航栏数组数据
    updateNavList(item) {
      console.log('更新导航栏数组数据', item);
      
      if (this.navList.map((e) => e.path).includes(item.path)) return
      this.navList.push(item)
    },

    // 移除nav标签
    closeNav(item) {
      console.log('closeNav', item)
      const navIndex = this.navList.findIndex((e) => e.path === item.path)
      this.navList.splice(navIndex, 1)
    },

    // 更新当前显示笔记
    updateNotes(text){
      this.notes = text
    }
  }
})
