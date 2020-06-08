/**
 * @typedef {Object} SchemaButtonSingle
 * @link https://codepen.io/wilcorrea/pen/BaBJpjR?editors=0010s
 * TODO: use label as static tooltips
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Object} data
     * @param {Array} children
     * @returns {*}
     */
    renderButtonFloating (h, data, children) {
      return h('q-fab-action', data, children)
    }
  }
}
