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
  </q-page>
</template>

<script type="text/javascript">
import $store from 'src/modules/General/version'
import allowed from 'src/modules/Auth/service/allowed'
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
</style>
