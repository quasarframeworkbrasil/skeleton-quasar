/**
 * @mixin {Form}
 */
export default {
  /**
   */
  recordName: 'record',
  /**
   */
  errorsName: 'errors',
  /**
   */
  props: {
    /**
     */
    service: {
      type: Object,
      required: true
    },
    /**
     */
    path: {
      type: String,
      default: ''
    },
    /**
     */
    fallback: {
      type: String,
      default: ''
    }
  },
  /**
   */
  computed: {
    /**
     */
    debuggers () {
      return this.$store.getters['app/getDebuggers']
    }
  },
  /**
   */
  data: () => ({
    record: {},
    errors: {},
    hooks: {}
  }),
  /**
   */
  methods: {
    /**
     * @param {Object} $event
     */
    actionSubmit ($event) {
      if (this.form().$hasError()) {
        this.$message.error(this.$t('agnostic.actions.save.validation'))
        return
      }

      this.$q.loading.show()
      if (this.debuggers) {
        window.alert(JSON.stringify(this[this.$options.recordName]))
      }
      this.attempt($event).finally(this.lastly)
    },
    /**
     */
    lastly () {
      this.$q.loading.hide()
    },
    /**
     * @param {Object} $event
     * @return {Promise}
     */
    attempt ($event) {
      // override
      throw new Error('Please override this method and answer a promise')
    },
    /**
     */
    actionBack () {
      this.$browse(-1)
    },
    /**
     */
    actionCancel () {
      this.$browse(this.fallback)
    },
    /**
     * @param {Object} errors
     */
    eventStatus (errors) {
      this[this.$options.errorsName] = errors
    },
    /**
     * @param {Object} $event
     */
    actionReset ($event) {
      this.form().$reset(this.$payload)
    },
    /**
     * @return {Vue}
     */
    form () {
      for (let key in this.$children) {
        if (!this.$children.hasOwnProperty(key)) {
          continue
        }
        if (this.$children[key].$options.name === 'AppForm') {
          return this.$children[key]
        }
      }
      throw new Error('This mixin need an "AppForm" to works')
    },
    /**
     * @param {string} name
     * @param {Function} hook
     */
    hook (name, hook) {
      this.hooks[name] = hook
    },
    /**
     * @param {string} hook
     */
    triggerHook (hook) {
      if (!this.hooks[hook]) {
        return
      }
      const action = this.hooks[hook]
      if (typeof action !== 'function') {
        return
      }
      action.call(this)
    }
  }
}
