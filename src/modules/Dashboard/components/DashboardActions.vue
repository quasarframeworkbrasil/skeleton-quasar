<template>
  <q-list
    bordered
    separator
  >
    <template v-for="action in actions">
      <DashboardAction
        :key="action.uuid"
        :action="action"
        @popup="openPopup"
      />
    </template>
  </q-list>
</template>

<script>
import DashboardAction from 'src/modules/Dashboard/components/DashboardAction'
import Popup from 'src/modules/General/Mixins/Popup'

export default {
  /**
   */
  name: 'DashboardActions',
  /**
   */
  components: { DashboardAction },
  /**
   */
  mixins: [Popup],
  /**
   */
  props: {
    actions: {
      type: [Array, Object],
      default: () => []
    }
  },
  /**
   */
  methods: {
    /**
     * @param {string} path
     */
    openPopup (path) {
      // Fixes dual-screen position                         Most browsers      Firefox
      const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
      const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

      const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
      const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

      const w = 1024
      const h = 600
      const systemZoom = width / window.screen.availWidth
      const left = (width - w) / 2 / systemZoom + dualScreenLeft
      const top = (height - h) / 2 / systemZoom + dualScreenTop
      const options = 'menubar=no,' +
        'location=no,' +
        'resizable=yes,' +
        'scrollbars=no,' +
        'status=no,' +
        'width=' + w / systemZoom + ',' +
        'height=' + h / systemZoom + ',' +
        'top=' + top + ',' +
        'left=' + left
      const url = `${window.location.origin}${window.location.pathname}#${path}?modal=true`
      const title = 'Popup'
      const newWindow = window.open(url, title, options)

      // Puts focus on the newWindow
      if (window.focus) {
        newWindow.focus()
      }
    }
  }
}
</script>

<style scoped>

</style>
