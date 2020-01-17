/**
 * @component {AppSeparator}
 */
export default {
  /**
   */
  name: 'AppSeparator',
  /**
   */
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  /**
   * @param {CreateElement} h
   * @returns {VNode}
   */
  render (h) {
    const innerHTML = this.label
    return h('div', { class: 'app-separator', domProps: { innerHTML } })
  }
}
