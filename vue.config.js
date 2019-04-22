// const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
var path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  publicPath: '/', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: 'dist', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: '', // 放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  lintOnSave: true, // 是否在保存的时候检查
  productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
  runtimeCompiler: true,
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    modules: false, // 启用 CSS modules for all css / pre-processor files.
    // css预设器配置项
    loaderOptions: {
      // css: {
      //   // 这里的选项会传递给 css-loader
      // },
      // postcss: {
      //   // 这里的选项会传递给 postcss-loader
      // },
      // sass: {

      // },
      // scss: {

      // }
    }
  },
  parallel: require('os').cpus().length > 1,
  configureWebpack: config => {
    //   // 确保静态资源
    //   config.entry = ['babel-polyfill', './src/main.js']
    //   // config.resolve.extensions = ['.js', '.vue', '.json', '.css']
    //   // config.plugins.push(
    //   //   new CopyWebpackPlugin([{ from: 'public/', to: 'public' }])
    //   // )
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    } else {
      // 为开发环境修改配置...
    }
    // jquery全局引入
    config.module.rules.push({
      // 处理jquery
      test: require.resolve('jquery'),
      use: [{
        loader: 'expose-loader',
        options: 'jquery'
      }, {
        loader: 'expose-loader',
        options: '$'
      }, {
        loader: 'expose-loader',
        options: 'jQuery'
      }]
    })
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = false
        return options
      })
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('src', path.resolve(__dirname, 'src'))
      .set('assets', path.resolve(__dirname, 'src/assets'))
      .set('components', path.resolve(__dirname, 'src/components'))
      .set('views', path.resolve(__dirname, 'src/views'))
      .set('styles', path.resolve(__dirname, 'src/styles'))
      .set('api', path.resolve(__dirname, 'src/api'))
      .set('utils', path.resolve(__dirname, 'src/utils'))
      .set('store', path.resolve(__dirname, 'src/store'))
      .set('router', path.resolve(__dirname, 'src/router'))
      .set('mock', path.resolve(__dirname, 'src/mock'))
      .set('vendor', path.resolve(__dirname, 'src/vendor'))
      .set('static', path.resolve(__dirname, 'src/static'))
    config.externals({ 'jquery': 'jQuery' })
  },
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项
  devServer: {
    port: 9527, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      '/jwt': {
        target: 'http://10.8.78.188:8765',
        pathRewrite: {
          '^/jwt': '/jwt'
        }
      },
      '/api': {
        target: 'http://10.8.78.188:8765',
        pathRewrite: {
          '^/api': '/api'
        }
      }
      // '/foo': {
      //   target: '<other_url>'
      // }
    } // 配置多个代理
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
