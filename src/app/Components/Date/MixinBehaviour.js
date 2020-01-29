import { dateFormatter } from 'src/app/Util/formatter'

/**
 * @typedef {Object} AppDateMixin
 */
export default {
  /**
   */
  computed: {
    /**
     * @returns {Object}
     */
    inputAttrs () {
      return { ...this.$attrs }
    },
    /**
     * @returns {string}
     */
    inputValue () {
      const value = dateFormatter(this.value, this.display, this.format)
      if (!value) {
        return ''
      }
      return value
    },
    /**
     * @returns {string}
     */
    widgetValue () {
      const value = dateFormatter(this.value, this.format, this.format)
      if (!value) {
        return ''
      }
      return value
    }
  },
  /**
   */
  methods: {
    /**
     * @param {string} value
     */
    inputUpdateValue (value) {
      const input = dateFormatter(value, this.format, this.display)
      if (input) {
        this.$emit('input', input)
        return
      }
      this.$emit('input', '')
    },
    /**
     * @param {string} value
     */
    widgetUpdateValue (value) {
      this.$emit('input', value)
    }
  }
}
