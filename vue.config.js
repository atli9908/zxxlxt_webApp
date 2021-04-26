const webpack = require('webpack');
// npm install --save-dev compression-webpack-plugin
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
  
// vue-cli 项目可以做的优化
// 屏蔽sourceMap
// 删除 console.log
// 启用 gzip 压缩
// 代码分割
  
// const compress = new CompressionWebpackPlugin(
//   {
//     filename: (asset) => {
//       return `${asset.file}.gz${asset.query}`
//     },
//     algorithm: 'gzip', 
//     threshold: 10240,//10kb
//     test: new RegExp(
//       '\\.(' +
//       ['js'].join('|') +
//       ')$'
//     ),
//     minRatio: 0.8,
//     deleteOriginalAssets: false
//   }
// )

module.exports = {
    publicPath: './',
    // css: {
    //     extract: true
    // },
    productionSourceMap: false,//这里关闭Source Maps
    // chainWebpack: config => {
    //   config.optimization.minimize(true);// 压缩代码
    //   config.optimization.splitChunks({// 分割代码
    //     chunks: 'all'
    //   })
    //   // 用cdn方式引入
    //   // config.externals({
    //   //   'vue': 'Vue',
    //   //   'vuex': 'Vuex',
    //   //   'vue-router': 'VueRouter',
    //   //   'axios': 'axios'
    //   // })
    // },
    configureWebpack: {
        

        plugins: [
 
           new webpack.ProvidePlugin({
 
             $:"jquery",
 
             jQuery:"jquery",
 
             "windows.jQuery":"jquery"
 
           }),
          //  compress
 
         ],
 
    },
    // devServer:{
    //   proxy:{
    //     '/api':{
    //       target:'http://127.0.0.1',
    //       changeOrigin:true
    //     }
    //   }
    // }
    
    // devServer: {
    //     open: true,
    //     host: '0.0.0.0',
    //     port: 8080,
    //     https: false,
    //     hotOnly: false,
    //     disableHostCheck: true,
    //     //配置代理
    //     proxy: null
    //     // proxy: {
    //     //   //以'/api'开头的接口会转接到下面的target的ip
    //     //     '/api/': {
    //     //         target: 'http://192.168.1.217/', // target host
    //     //         secure: false,
    //     //         changeOrigin: true, // needed for virtual hosted sites
    //     //         ws: false, // proxy websockets
    //     //         pathRewrite: {
    //     //             //路径重写
    //     //             '^/api/': '', // rewrite path
    //     //         },
    //     //         logLevel: "debug"
    //     //     },
    //     // }
    // }
}