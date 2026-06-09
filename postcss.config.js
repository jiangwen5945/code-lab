/**
 * PostCSS 配置文件
 */
export default {
    // 配置要使用的 PostCSS 插件
    plugins: {
        // 配置使用 autoprefixer 插件
        // 作用：生成浏览器 CSS 样式规则前缀
        // VueCLI 内部已经配置了 autoprefixer 插件
        // 所以又配置了一次，所以产生冲突了
        // 'autoprefixer': { // autoprefixer 插件的配置
        // 配置要兼容到的环境信息
        // browsers: ['Android >= 4.0', 'iOS >= 8']
        // },

        // 配置使用 postcss-pxtorem 插件
        // 作用：把 px 转为 rem
        // lib-flexible 的 REM 适配方案：把一行分为 10 份，每份就是十分之一
        // 所以 rootValue 应该设置为你的设计稿宽度的十分之一
        // 我们的设计稿是 750，所以应该设置为 750 / 10 = 75
        // 但是 Vant 建议设置为 37.5，为什么？因为 Vant 是基于 375 写的
        // 所以必须设置为 37.5，唯一的缺点就是使用我们设计稿的尺寸都必须 / 2
        // 有没有更好的办法？
        // 如果是 Vant 的样式，就按照 37.5 来转换
        // 如果是 我们自己 的样式，就按照 75 来转换
        // 通过查阅文档，我们发现 rootValue 支持两种类型：
        // 数字：固定的数值
        // 函数：可以动态处理返回
        // postcss-pxtorem 处理每个 CSS 文件的时候都会来调用这个函数
        // 它会把被处理的 CSS 文件相关的信息通过参数传递给该函数
        '@minko-fe/postcss-pxtorem': {
            mediaQuery: false, // 不处理媒体查询中的px
            minPixelValue: 12, // 小于12px的值不转换
            rootValue: 168, // 设计稿宽度 / 10（如750px设计稿 → 75，Vant建议37.5）
            propList: ['*'],
            selectorBlackList: ['norem'], // 忽略所有类名中包含 'norem' 的选择器
            exclude: (file) => {
                // 使用正则表达式精确匹配，兼容Windows/macOS路径格式
                // return /HomeView\.vue$/.test(file);
                return file.includes('HomeView')
            }
        }
    }
}