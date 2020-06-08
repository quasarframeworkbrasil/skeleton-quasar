/**
 */
export default {
  /**
   */
  methods: {
    /**
     */
    install () {
      /**
       * @param {string} message
       * @param {Object} options
       * @returns {Promise}
       */
      this.$alert = (message, options = { title: '' }) => {
        if (!options.title) {
          options.title = this.$lang(`agnostic.dialog.alert.title`)
        }
        const _options = {
          message: this.$lang(message),
          ...options
        }

        return new Promise((resolve, reject) => {
          this.$q.dialog(_options)
            .onOk(() => resolve(true))
            .onCancel(() => reject({ type: 'cancel' }))
            .onDismiss(() => reject({ type: 'dismiss' }))
        })
      }

      /**
       * @param {string} message
       * @param {Object} options
       * @returns {Promise}
       */
      this.$confirm = (message, options = { title: '' }) => {
        if (!options.title) {
          options.title = this.$lang(`agnostic.dialog.confirm.title`)
        }
        const _options = {
          persistent: true,
          ok: {
            label: this.$lang(`agnostic.options.yesNo.yes`),
            flat: true
          },
          cancel: {
            label: this.$lang(`agnostic.options.yesNo.no`),
            flat: true
          },
          message: this.$lang(message),
          ...options
        }

        return new Promise((resolve, reject) => {
          this.$q.dialog(_options)
            .onOk(() => resolve(true))
            .onCancel(() => reject({ type: 'cancel' }))
            .onDismiss(() => reject({ type: 'dismiss' }))
        })
      }

      /**
       * @param {string} message
       * @param {Object} options
       * @returns {Promise}
       */
      this.$prompt = (message, options = { title: '' }) => {
        if (!options.title) {
          options.title = this.$lang(`agnostic.dialog.prompt.title`)
        }
        const _options = {
          cancel: true,
          persistent: true,
          prompt: {
            model: '',
            type: 'text'
          },
          message,
          ...options
        }

        return new Promise((resolve, reject) => {
          this.$q.dialog(_options)
            .onOk((data) => resolve(data))
            .onCancel(() => reject({ type: 'cancel' }))
            .onDismiss(() => reject({ type: 'dismiss' }))
        })
      }
    }
  },
  /**
   */
  created () {
    this.install()
  }
}
