/**
 * @typedef {SchemaButtonSingle}
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
    renderButtonSingle (h, data, children) {
      return h('q-btn', data, children)
    }
  }
}
