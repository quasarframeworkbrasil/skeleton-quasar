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
      default: '##/##/#### ##:##'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm'
    },
    display: {
      type: String,
      default: 'DD/MM/YYYY HH:mm'
    }
  }
}
