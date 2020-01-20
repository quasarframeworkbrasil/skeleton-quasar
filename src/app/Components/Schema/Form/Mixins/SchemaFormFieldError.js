import SchemaError from 'src/app/Components/Schema/Form/SchemaFormError'
import { replacement } from 'src/app/Util/string'

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
      const validations = this.$util.get(this.validations, `record.${key}`)
      if (validations) {
        const $params = Object.keys(validations.$params)
        $params.forEach((validation) => {
          this.errorValidation(validations, validation, errorMessages)
        })
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
     * @param {Object} validations
     * @param {string} rule
     * @param {Array} errorMessages
     */
    errorValidation (validations, rule, errorMessages) {
      // it is ok, no worries
      if (validations[rule]) {
        return
      }
      // create paths to i18n
      const paths = [
        `domains.${this.domain}.validations.${rule}`.replace(/\//g, '.'),
        `validation.${rule}`
      ]
      // get the i18n message
      const template = this.$lang(paths) || ''
      // prepare replaces to apply to message
      const replaces = validations.$params[rule] || {}
      // execute replacement to apply the parameters to message
      errorMessages.push(replacement(template, replaces))
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
