/**
 * @typedef {Hook}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {string} hook
     * @param {Object} context
     */
    triggerHook (hook, context) {
      const hooks = this.hooks()

      if (!hooks) {
        return
      }
      if (!hooks[hook]) {
        return
      }
      const action = hooks[hook]
      if (typeof action !== 'function') {
        return
      }
      return action.call(this, context)
    }
  },
  /**
   */
  created () {
    /**
     * @trigger created:default
     */
    this.triggerHook('created:default')
    /**
     * @trigger created
     */
    this.triggerHook('created')
  },
  /**
   */
  mounted () {
    /**
     * @trigger mounted:default
     */
    this.triggerHook('mounted:default')
    /**
     * @trigger mounted
     */
    this.triggerHook('mounted')
  },
  /**
   */
  beforeMount () {
    /**
     * @trigger beforeMount
     */
    this.triggerHook('beforeMount:default')
    /**
     * @trigger beforeMount
     */
    this.triggerHook('beforeMount')
  },
  /**
   */
  beforeDestroy () {
    /**
     * @trigger beforeDestroy:app
     */
    this.triggerHook('beforeDestroy:default')
    /**
     * @trigger beforeDestroy
     */
    this.triggerHook('beforeDestroy')
  },
  /**
   */
  destroyed () {
    /**
     * @trigger destroyed
     */
    this.triggerHook('destroyed:default')
    /**
     * @trigger destroyed
     */
    this.triggerHook('destroyed')
  }
}
