/**
 * @mixin {SchemaButtonParse}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Object} button
     * @returns {Object}
     */
    parseAttrs (button) {
      return { ...button.attrs, ...this.override }
    },
    /**
     * @param {Object} button
     * @returns {Object}
     */
    parseListeners (button) {
      if (typeof button.listeners !== 'object') {
        return button.listeners
      }
      let context = {}
      if (this.context) {
        context = this.$util.clone(this.context)
      }
      const reduce = (listeners, key) => {
        listeners[key] = ($event) => {
          button.listeners[key]($event, { context })
        }
        return listeners
      }
      return Object.keys(button.listeners).reduce(reduce, {})
    },
    /**
     * @param {Object} button
     */
    parseButton (button) {
      let action = button
      if (button.configure && typeof button.configure === 'function') {
        const clone = this.$util.clone(button)
        const parameters = { context: this.context, position: this.position, scope: this.scope }
        action = button.configure.call(this, clone, parameters)
      }
      return {
        ...action,
        attrs: this.parseAttrs(action),
        listeners: this.parseListeners(action)
      }
    }
  }
}
