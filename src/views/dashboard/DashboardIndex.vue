<template>
  <q-page
    class="DashboardIndex"
    padding
  >
    <div class="q-pa-md">
      <q-toolbar class="bg-primary text-white shadow-2 rounded-borders mono-font">
        <div class="col-6 text-white q-pa-sm">
          <small>{{ greetings }} <strong>{{ name }}</strong></small>
        </div>
        <q-space />
        <small class="float-right">Versão da aplicação: {{ version }}</small>
      </q-toolbar>
    </div>

    <div class="q-pa-md row q-col-gutter-md">
      <div class="col-xs-12 col-sm-6">
        <div class="DashboardIndex__docs text-white shadow-2 rounded-borders mono-font">
          <div class="DashboardIndex__label">
            Documentação
          </div>
          <a
            href="https://quasarframework-brasil.gitbook.io/skeleton-quasar"
            target="_blank"
          >
            <!--suppress HtmlUnknownTarget -->
            <img
              src="statics/dashboard/gitbook.png"
              alt="gitbook"
            />
          </a>
        </div>
      </div>

      <div class="col-xs-12 col-sm-6">
        <!--suppress CssUnknownTarget -->
        <div
          class="DashboardIndex__source text-white shadow-2 rounded-borders mono-font"
          style="background-image: url('/statics/dashboard/github.png')"
        >
          <div class="DashboardIndex__label">
            Código-fonte
          </div>
          <div class="DashboardIndex__source__logo">
            <a
              href="https://github.com/quasarframeworkbrasil/skeleton-quasar"
              target="_blank"
            >
              <svg
                height="96"
                width="96"
                viewBox="0 0 16 16"
                version="1.1"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
            </a>
          </div>
          <div
            class="DashboardIndex__source__shield"
          >
            <img
              src="https://img.shields.io/github/issues/quasarframeworkbrasil/skeleton-quasar"
              alt="issues"
            />
          </div>
          <div
            class="DashboardIndex__source__shield"
          >
            <img
              src="https://img.shields.io/github/forks/quasarframeworkbrasil/skeleton-quasar"
              alt="forks"
            />
          </div>
          <div
            class="DashboardIndex__source__shield"
          >
            <img
              src="https://img.shields.io/github/stars/quasarframeworkbrasil/skeleton-quasar"
              alt="stars"
            />
          </div>
          <div
            class="DashboardIndex__source__shield"
          >
            <img
              src="https://img.shields.io/github/license/quasarframeworkbrasil/skeleton-quasar"
              alt="license"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script type="text/javascript">
import $store from 'src/modules/General/version'
import allowed from 'src/modules/Auth/helper/allowed'
// noinspection ES6CheckImport
import { date } from 'quasar'

export default {
  /**
   */
  name: 'DashboardIndex',
  /**
   */
  data: () => ({
    shortcuts: [
      {
        label: 'Ocorrências',
        path: '/dashboard/support/incident'
      },
      {
        label: 'Ordens de Serviço',
        path: '/dashboard/support/order'
      }
    ]
  }),
  /**
   */
  computed: {
    /**
     * @returns {Object}
     */
    user () {
      return this.$store.getters['auth/getUser']
    },
    /**
     * @returns {string}
     */
    name () {
      return this.$util.get(this.$store.getters['auth/getUser'], 'name')
    },
    /**
     * @returns {string}
     */
    last () {
      const last = this.$util.get(this.$store.getters['auth/getUser'], 'last_login')
      const week = date.formatDate(last, 'dddd')
      const day = date.formatDate(last, 'DD/MM/YYYY')
      const hour = date.formatDate(last, 'HH:mm')
      return `${week}, ${day} às ${hour}`
    },
    /**
     * @returns {string}
     */
    greetings () {
      const hour = (new Date()).getHours()

      if (hour >= 0 && hour <= 12) {
        return this.$lang('app.greetings.morning')
      }
      if (hour > 12 && hour <= 18) {
        return this.$lang('app.greetings.afternoon')
      }
      return this.$lang('app.greetings.night')
    },
    /**
     * @returns {string}
     */
    version () {
      return $store.state.version || 'unknown'
    },
    /**
     * @returns {Array}
     */
    shortcutsAvailable () {
      return this.shortcuts.filter((shortcut) => allowed(shortcut.path))
    }
  },
  /**
   */
  methods: {
    openShortcut (shortcut) {
      if (!shortcut.path) {
        return
      }
      this.$browse(shortcut.path)
    }
  }
}
</script>

<style lang="stylus">
.DashboardIndex
  .DashboardIndex__card
    cursor pointer
    min-height 100%
    flex 1
    display flex
    flex-direction column
    justify-content center

    &.bg-white:hover
      background-color #f0f0f0 !important

  .DashboardIndex__docs
    position relative
    display flex
    align-items center
    justify-content center
    background #183055
    padding 69px 15px 50px 0
    min-height 200px

  .DashboardIndex__source
    position relative
    display grid
    background-color #24292E
    padding 30px 20px 15px 20px
    grid-template-columns repeat(100, 1fr)
    background-size 210px
    background-repeat no-repeat
    background-position right -20px
    min-height 200px

    > .DashboardIndex__source__logo
      grid-column auto / span 30
      grid-row auto / span 4
      display flex
      align-items center
      justify-content center
      > a > svg
        fill #fff
    > .DashboardIndex__source__shield
      grid-column auto / span 70
      text-align right
      padding 5px 0

  .DashboardIndex__label
    position absolute
    top 10px
    left 10px
    font-size 10px
</style>
