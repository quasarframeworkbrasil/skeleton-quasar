<template>
  <div id="root">
    <div id="q-app">
      <router-view />
    </div>
    <div
      v-if="printing"
      id="printable"
    >
      <Printable />
    </div>
  </div>
</template>

<script type="text/javascript">
import $store from 'src/layouts/General/version'
import Local from 'src/app/Services/Local'
import Dialog from 'src/app/Components/Schema/Contracts/Dialog'
import Printable from 'src/views/dashboard/print/Printable'

export default {
  /**
   */
  name: 'App',
  /**
   */
  components: { Printable },
  /**
   */
  mixins: [Dialog],
  /**
   */
  computed: {
    /**
     * @returns {*}
     */
    printing () {
      return this.$store.getters['app/getPrint']
    }
  },
  /**
   */
  methods: {
    /**
     * This is a simple method to ask user to update the version
     */
    notify () {
      if (this.confirmed) {
        return
      }
      this.confirmed = this.$confirm(this.$lang('app.version.notify'))
      if (this.confirmed) {
        // noinspection JSDeprecatedSymbols
        window.location.reload(true)
      }
    },
    /**
     * Receive the version fetched from server
     * @param {AxiosResponse} result
     */
    receiveVersion (result) {
      if (this.version && this.version !== result.data) {
        this.notify()
      }
      $store.commit('updateVersion', result.data)
    },
    /**
     * Fetch the current app version from server
     */
    fetchVersion () {
      if (this.$dev) {
        return
      }
      Local
        .instance()
        .get('statics/version')
        .then(this.receiveVersion)
        .catch(() => {})
    }
  },
  /**
   */
  watch: {
    printing (value) {
      if (value) {
        this.title = window.document.title
        const domain = this.$util.get(value, 'domain', 'none')
        window.document.title = this.$lang(`domains.${domain}.print.title`)
        return
      }
      if (!this.title) {
        return
      }
      window.document.title = this.title
      this.title = undefined
    }
  },
  /**
   */
  created () {
    // wait 1 second to take a breath
    window.setTimeout(this.fetchVersion, 1000)
  }
}
</script>

<style>
</style>
