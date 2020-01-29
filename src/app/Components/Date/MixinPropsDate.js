/**
 * @typedef {Object} AppDateMixinProps
 */
export default {
  /**
   */
  props: {
    value: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: '##/##/####'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    display: {
      type: String,
      default: 'DD/MM/YYYY'
    }
  }
}
