import { parseValidations } from 'src/app/Components/Schema/Contracts/Helper/validation'
import { is } from 'src/app/Util/general'

/**
 * @mixin {FormValidation}
 */
export default {
  /**
   */
  validations () {
    const record = Object.keys(this.components).reduce(this.reduceValidations, {})
    return { record }
  },
  /**
   */
  methods: {
    /**
     * @param {Object} accumulator
     * @param {string} key
     * @returns {*}
     */
    reduceValidations (accumulator, key) {
      if (!is(this.components[key].$validations)) {
        return accumulator
      }

      accumulator[key] = parseValidations(this.components[key].$validations)
      return accumulator
    }
  },
  /**
   */
  watch: {
    /**
     * @param {Boolean} status
     * @param {Boolean} previous
     */
    '$v.$invalid' (status, previous) {
      if (!this.buttons) {
        return
      }
      Object.keys(this.buttons).forEach((key) => {
        if (!this.buttons[key].validate) {
          return
        }
        if (typeof this.buttons[key].validate !== 'function') {
          return
        }
        this.buttons[key].validate.call(this, this.buttons[key], !status)
      })
    }
  }
}
