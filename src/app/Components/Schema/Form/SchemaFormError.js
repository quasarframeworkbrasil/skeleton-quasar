/**
 * @component {SchemaFormError}
 */
export default {
  /**
   */
  name: 'SchemaError',
  /**
   */
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  },
  /**
   */
  methods: {
    /**
     * @param h
     * @returns {*}
     */
    small (h) {
      return h('small', {
        style: {
          display: !this.show ? 'none' : ''
        },
        domProps: {
          innerHTML: this.message
        }
      })
    }
  },
  /**
   * @param h
   * @returns {*}
   */
  render (h) {
    return h('div', { class: 'field-error' }, [this.small(h)])
  }
}
