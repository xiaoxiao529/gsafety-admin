import pkg from './package'
import ApiConfig from './config/api'
// const webpack = require('webpack')

export default {
  mode: 'universal',

  env: {
    baseUrl: process.env.BASE_URL,
    //milieu: process.env.milieu
  },

  /**
   * 主机和端口的配置
   *  */
  server: {
    // port: 8088, // default: 3000
  },

  /*
   ** Headers of the page
   */
  head: {
    title: "云服后台管理系统",
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    // script: [
    //   { src: '/js/a.js' }
    // ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [
      { src: '/js/jquery.min.js' },
      { src: '/js/qrcode.min.js' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/common.scss',
    '~/assets/css/normailze.css',
    '~/assets/fonts/iconfont.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // '@/plugins/http'
    {
      src: '@/plugins/http',
      ssr: false
    },
    // '@/plugins/http'
    {
      src: '@/plugins/Storage',
      ssr: false
    },
    // '@/plugins/element-ui'
    {
      src: '@/plugins/element-ui',

      ssr: true
    },
    // '@/plugins/lodash'
    {
      src: '@/plugins/lodash',
      ssr: false
    },
    {
      src: '@/plugins/axios',
      ssr: true
    },
    {
      src: '~/plugins/vue-bus.js',
      ssr: false
    }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // proxy: true
    proxy: true,
    prefix: '/gsafetyclound',
    credentials: true
  },
  /*
   ** proxy module configuration
   */
  proxy: {
    '/gsafetyclound': {
      target: ApiConfig.apiHost,
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/gsafetyclound': ''
      }
    },
  },

  router: {
    //base: '/manage' //打包加

  },

  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    cache: true,
    parallel: true,
    loaders: [ //{
      //         test: /\.(scss|sass)$/,
      //         use: [{
      //             loader: "style-loader"
      //         }, {
      //             loader: "css-loader"
      //         }, {
      //             loader: "sass-loader"
      //         }]
      //     },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 1000,
      //     name: 'img/[name].[hash:7].[ext]'
      //   }
      // },
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 1000,
      //     name: 'fonts/[name].[hash:7].[ext]'
      //   }
      // }
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    vendor: ['element-ui']
  }
}
