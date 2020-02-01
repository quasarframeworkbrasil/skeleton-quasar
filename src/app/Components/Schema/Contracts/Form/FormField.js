/**
 * @typedef {Object} FormField
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {string} component
     * @param {Boolean} error
     * @param {string} [message
     */
    setFieldError (component, error = true, message = '') {
      if (!error) {
        this.errors[component] = ''
        return
      }
      let fallback = message
      const paths = [`domains.${this.domain}.errors.${component}`]
      if (message.split('.').length > 1) {
        paths.push(message)
        fallback = ''
      }
      this.errors[component] = this.$lang(paths, fallback)
    }
  }
}
