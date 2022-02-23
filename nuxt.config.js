let development = process.env.NODE_ENV !== 'production'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Univente',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Высшее образование в России - Учись за 2000$ в год!\n' +
          'Гарантия поступления от представителей университетов.\n' +
          'Вся информация в одном месте. Выбери 5 из 8000 программ и подай документы. Возьмите куратора на полное сопровождение. Удобный фильтр поиска. 20+ менторов. Международный диплом.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
       { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', integrity: 'sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T', crossOrigin: 'anonymous'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/globals.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    `~/plugins/vue-tel-input`
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/i18n',
      { /* module options */ }
    ]
  ],

  i18n: {
    locales: ['en', 'sp'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome',
          title: 'title'
        },
        sp: {
          welcome: 'Bienvenido'
        }
      }
    }
  },

  server: {
    port: 4000,
    host: 'localhost'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: development ? 'https://univente.me' : 'https://univente.me'
  },

  proxy: {
    '/images': { target: 'https://www.univente.me', pathRewrite: {'^/images': ''} },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
}
