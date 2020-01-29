import SchemaError from 'src/app/Components/Schema/Form/SchemaFormError'

/**
 * @mixin {SchemaFormFieldError}
 */
export default {
  /**
   */
  props: {
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  components: {
    SchemaError
  },
  /**
   */
  methods: {
    /**
     * @param {string} key
     * @returns {string}
     */
    errorContent (key) {
      const errorMessages = []
      const forEach = (validation) => {
        if (!validations[validation]) {
          let paths = [
            `domains.${this.domain}.validations.${validation}`.replace(/\//g, '.'),
            `validation.${validation}`
          ]
          // validations.$params[validation]
          errorMessages.push(this.$lang(paths))
        }
      }

      const validations = this.$util.get(this.validations, `record.${key}`)
      if (validations) {
        Object.keys(validations.$params).forEach(forEach)
      }
      if (this.errors[key]) {
        const paths = [
          `domains.${this.domain}.validations.${this.errors[key]}`,
          `validation.${this.errors[key]}`,
          this.errors[key]
        ]
        errorMessages.push(this.$lang(paths) || this.errors[key])
      }
      return errorMessages.join(' / ')
    },
    /**
     * @param {Function} h
     * @param {string} key
     * @param {boolean} error
     * @returns {*}
     */
    renderFieldError (h, key, error) {
      return h('schema-error', { attrs: { show: error, message: this.errorContent(key) } })
    }
  }
}
