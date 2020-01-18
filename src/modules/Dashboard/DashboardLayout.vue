<template>
  <q-layout
    class="DashboardLayout"
    :class="{ 'DashboardLayout--modal': modal }"
    view="hHh LpR fff"
  >
    <q-header
      v-if="!modal"
      elevated
      class="DashboardLayout__header bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <img
          class="DashboardLayout__header_logo hide-in-1024"
          src="statics/dashboard/header-logo.png"
        >
        <q-space />
        <div class="DashboardLayout__header_details row no-wrap items-center">
          <app-breadcrumb />
        </div>
        <q-space />
        <DashboardMenu />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawer"
      side="left"
      elevated
      content-class="bg-white"
    >
      <q-scroll-area class="fit">
        <div class="DashboardLayout__drawer_header">
          <img
            src="statics/dashboard/header-logo.png"
          >
        </div>
        <DashboardActions :actions="actions" />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <transition
        :name="transitionName"
        mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <router-view :key="key" />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script lang="js">
import Transition from 'src/modules/General/Mixins/Transition'
import DashboardActions from 'src/modules/Dashboard/components/DashboardActions'
import DashboardMenu from 'src/modules/Dashboard/components/DashboardMenu'
import AppBreadcrumb from 'src/app/Components/Breadcrumb/AppBreadcrumb'

/**
 */
export default {
  /**
   */
  name: 'DashboardLayout',
  /**
   */
  components: { AppBreadcrumb, DashboardMenu, DashboardActions },
  /**
   */
  mixins: [
    Transition
  ],
  /**
   */
  data: () => ({
    leftDrawer: false,
    modal: false,
    offline: false
  }),
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    key () {
      return this.$route.fullPath
    },
    /**
     * @returns {Object}
     */
    actions () {
      return this.$store.getters['auth/getActions']
    },
    /**
     * @returns {string}
     */
    title () {
      return this.$store.getters['dashboard/getTitle']
    }
  },
  /**
   */
  watch: {
    /**
     */
    leftDrawer (leftDrawer) {
      window.localStorage.setItem('leftDrawer', leftDrawer ? 'true' : 'false')
    },
    /**
     */
    title: {
      immediate: true,
      handler (title) {
        window.document.title = title
      }
    }
  },
  /**
   */
  created () {
    this.offline = this.$store.getters['app/getOffline']
    this.$watch('offline', (offline) => {
      this.$store.dispatch('app/setOffline', offline)
    })

    if (this.$route.query.modal) {
      this.modal = true
      return
    }
    const stored = window.localStorage.getItem('leftDrawer')
    this.leftDrawer = stored === null ? true : stored === 'true'
  },
  /**
   */
  mounted () {
    this.$q.loading.hide()
  }
}
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl'

.DashboardLayout
  background-color #f5f5f5

  .DashboardLayout__header

    small
      text-shadow 1px 1px 1px rgba(255, 255, 255, 0.45)
      text-transform lowercase
      color #555

    .DashboardLayout__header_logo
      height 40px
      margin 0 15px

    .DashboardLayout__header_details
      background #fff
      color #555
      border-radius 26px
      padding 10px 20px 10px 20px
      margin 0 10px
      text-shadow 1px 1px 1px rgba(255, 255, 255, 0.45)
      position relative
      width calc(100vw - 500px)
      box-shadow 0 1px 1.5px 0 rgba(0, 0, 0, 0.12), 0 1px 4px 0 rgba(0, 0, 0, 0.24)
      overflow-x auto
      overflow-y hidden

      .q-toggle__label
        color #d9534f
        font-weight bold
        text-transform uppercase
        font-size 0.8rem

  .DashboardLayout__drawer_header
    padding 10px
    background $primary
    border-bottom 1px solid #cacaca
    display flex
    justify-content center

  @media (min-width 1024px)
    .DashboardLayout__drawer_header
      display none

  .q-drawer__content
    i
      color #616161 !important

    .q-list--bordered, .q-list--separator > .q-item-type + .q-item-type, .q-list--separator > .q-virtual-scroll__content > .q-item-type + .q-item-type
      border-color rgba(0, 0, 0, 0.06)

    .q-item
      position relative

      &.q-router-link--active, &.q-item--active
        background rgba(215, 215, 215, 0.5)
        color #181818

      &.resource-not-implemented
        opacity 0.7

      &.resource-separated:after
        content: ''
        position absolute
        background-image linear-gradient(90deg, rgba(0, 0, 0, .04), #ddd, #ddd, rgba(0, 0, 0, .04))
        height 1px
        bottom 0
        width 86%
        left 7%

    .q-expansion-item
      position relative

      &.q-expansion-item--expanded:after
        content ''
        position absolute
        background-image linear-gradient(90deg, rgba(0, 0, 0, 0.04), #ddd, #ddd, rgba(0, 0, 0, 0.04))
        height 1px
        top 48px
        width 96%
        left 2%

    .q-expansion-item.q-expansion-item--expanded > .q-expansion-item__container > .q-item
      box-shadow 0 2px 5px rgba(0, 0, 0, 0.2), 0 -1px 1px 1px rgba(150, 150, 150, 0.1)

    .q-expansion-item__content
      background-color #f2f2f2
      box-shadow inset 0 3px 3px rgba(0, 0, 0, 0.16), inset 2px -3px 5px 1px rgba(177, 177, 177, 0.35), inset 2px 0 5px 1px rgba(177, 177, 177, 0.35)

    .q-expansion-item__content
      > .q-item
        padding 8px 8px 8px 26px

  @media (max-width 768px)
    .DashboardLayout__header_logo
      height 35px
      margin 0

    .DashboardLayout__user
      display none

  @media (max-width 1200px)
    .hide-in-1200
      display none

  @media (max-width 1024px)
    .DashboardLayout__header_details
      width calc(100vw - 250px) !important

    .hide-in-1024
      display none

  @media (max-width 768px)
    .DashboardLayout__header_details
      width calc(100vw - 180px) !important

    .hide-in-768
      display none

  @media (max-width 425px)
    .DashboardLayout__header
      > .q-toolbar
        padding 0
        > .q-btn.q-btn-dropdown
          padding 0

      .DashboardLayout__header_details
        width calc(100vw - 120px) !important
        margin 0 10px 0 0

    .hide-in-425
      display none

  @media (max-width 320px)
    .DashboardLayout__header_details
      .q-toggle__label
        font-size 0.6rem !important

    .hide-in-320
      display none

.DashboardLayout__dropdown_menu
  border-radius 0 0 4px 4px
  box-shadow 0 5px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 0px 1px -2px rgba(0, 0, 0, 0.12)
  border-top 1px solid #f3f1f1
</style>
