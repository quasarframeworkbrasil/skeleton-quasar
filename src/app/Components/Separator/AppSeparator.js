import './style.styl'

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
    const className = ['app-separator']
    let innerHTML
    if (this.label) {
      innerHTML = `<small>${this.label}</small>`
      className.push('app-separator--with-label')
    }
    return h('hr', { class: className, domProps: { innerHTML } })
  }
}
