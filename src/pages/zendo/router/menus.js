// 本地菜单
const routeFiles = import.meta.glob('../views/works/**/*.vue', { eager: false })
const localMenus = []
for (const path in routeFiles) {
  const routerPath = path.replace(/.vue*$/g, '').split('../views/works')[1]
  const isNullCategory = routerPath.split('/').length === 2
  // 设置该文件分类（没有分类｜自动生成）
  const category = isNullCategory || routerPath.split('/')[1]
  const routerName = routerPath.split('/').reverse()[0]
  const element = {
    path: encodeURI(routerPath), //处理中文路径乱码问题
    name: routerName,
    component: routeFiles[path],
    meta: {
      category,
      icon: routerName === 'Home' ? 'House' : undefined
    }
  }
  localMenus.push(element)
}
console.log('本地菜单', localMenus)

// 在线菜单
const onlineMenus = [
  {
    path: encodeURI('/online/子元素左右伸出父元素'),
    name: '子元素左右伸出父元素',
    component: () => import(`@/pages/zendo/components/onlineWindow.vue`),
    meta: {
      date: '2024-09-18',
      cover: 'https://iili.io/dP08thN.gif',
      link: 'https://juejin.cn/post/xxxxxx',
      src: 'https://code.juejin.cn/pen/7402148162982739994',
      info: `通过伪元素让子元素在视觉上左右伸出父元素`,
      category: 'online',
      icon: 'MostlyCloudy'
    }
  }
]
console.log('在线菜单', onlineMenus)
// export {
//   localMenus,
//   onlineMenus,
// }

const menuList = [...localMenus, ...onlineMenus]

console.log('合并菜单', menuList)
export default menuList
