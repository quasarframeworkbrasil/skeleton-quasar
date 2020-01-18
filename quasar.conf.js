// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
const DotEnv = require('dotenv-webpack')
const VersionFile = require('webpack-version-file-plugin')
const Path = require('path')

const unique = require('./src/app/unique')

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      '@components',
      'browse',
      'database',
      'development',
      'lang',
      'message',
      'polyfill',
      'sentry',
      'service',
      'util',
      'vuelidate'
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.styl'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      // iconSet: 'ionicons-v4',
      lang: 'pt-br', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QSpace',
        'QAjaxBar',
        'QLayout',
        'QPageContainer',
        'QPage',
        'QHeader',
        'QFooter',
        'QDrawer',
        'QPageSticky',
        'QToolbar',
        'QToolbarTitle',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QSeparator',
        'QBtn',
        'QBtnDropdown',
        'QIcon',
        'QField',
        'QInput',
        'QCheckbox',
        'QSelect',
        'QRadio',
        'QOptionGroup',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QPopupProxy',
        'QScrollArea',
        'QDate',
        'QTime',
        'QTable',
        'QTd',
        'QAvatar',
        'QImg',
        'QToggle',
        'QDialog',
        'QBar',
        'QTabs',
        'QTab',
        'QTabPanels',
        'QTabPanel',
        'QFab',
        'QFabAction',
        'QExpansionItem',
        'QChip',
        'QTooltip',
        'QMarkupTable',
        'QResizeObserver'
      ],

      directives: [
        'Ripple',
        'ClosePopup'
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'AppFullscreen',
        'Loading',
        'LocalStorage',
        'SessionStorage'
      ]
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: true,

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      publicPath: process.env.BUILD_PUBLIC_PATH || '',
      preloadChunks: false,
      extractCSS: true,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })

        let environment = ''
        if (ctx.prod) {
          environment = '.production'

          cfg.plugins.push(new VersionFile({
            packageFile: Path.join(__dirname, 'package.json'),
            template: Path.join(__dirname, 'version.ejs'),
            extras: { build: unique() },
            outputFile: Path.join(__dirname, 'src', 'statics', 'version')
          }))
        }
        if (process.env.BUILD_ENV) {
          environment = '.' + process.env.BUILD_ENV
        }
        const path = `./.env${environment}`
        cfg.plugins.push(new DotEnv({ path }))
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Quasar Framework Brazil - Skeleton',
        short_name: 'Skeleton',
        description: 'Rapid development with Vue and Quasar',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'br.com.connectronic.visual-on'
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'visualon'
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  }
}
