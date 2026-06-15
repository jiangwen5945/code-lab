import { defineStore } from 'pinia'
import menus from '../router/menus'
import { supabase } from '../utils/supabase'

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
  state: () => ({
    isCollapse: false,
    menuList,
    notes: '123',
    navList: [
      {
        component: 'HomelView',
        icon: '',
        name: '首页',
        path: '/home'
      }
    ],
    hasSeenWelcome: true,
    hasSeenTour: true,
    userInfo: null,
    sessionReady: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.userInfo,
  },
  actions: {
    toggleCollapse(status) {
      if (status === 'collapse') {
        this.isCollapse = true
      } else {
        this.isCollapse = !this.isCollapse
      }
    },

    updateNavList(item) {
      console.log('更新导航栏数组数据', item);

      if (this.navList.map((e) => e.path).includes(item.path)) return
      this.navList.push(item)
    },

    closeNav(item) {
      console.log('closeNav', item)
      const navIndex = this.navList.findIndex((e) => e.path === item.path)
      this.navList.splice(navIndex, 1)
    },

    updateNotes(text){
      this.notes = text
    },

    setWelcomeSeen() {
      if (!this.userInfo?.id) return
      this.hasSeenWelcome = true
      localStorage.setItem(`zendo_hasSeenWelcome_${this.userInfo.id}`, 'true')
    },

    setTourSeen() {
      if (!this.userInfo?.id) return
      this.hasSeenTour = true
      localStorage.setItem(`zendo_hasSeenTour_${this.userInfo.id}`, 'true')
    },

    async initSession() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        this.setSession(session.user)
      }
      this.sessionReady = true
    },

    setSession(user) {
      if (user) {
        this.userInfo = {
          id: user.id,
          email: user.email,
          nickname: user.user_metadata?.nickname || user.email?.split('@')[0] || '用户',
          avatar: user.user_metadata?.avatar_url || '',
        }
        this.hasSeenWelcome = localStorage.getItem(`zendo_hasSeenWelcome_${user.id}`) === 'true'
        this.hasSeenTour = localStorage.getItem(`zendo_hasSeenTour_${user.id}`) === 'true'
      } else {
        this.userInfo = null
        this.hasSeenWelcome = true
        this.hasSeenTour = true
      }
    },

    async login(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      this.setSession(data.user)
    },

    async logout() {
      await supabase.auth.signOut()
      this.userInfo = null
      this.sessionReady = false
    },

    setupAuthListener() {
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          this.setSession(session?.user || null)
        } else if (event === 'SIGNED_OUT') {
          this.userInfo = null
          this.sessionReady = false
        }
      })
    }
  }
})
