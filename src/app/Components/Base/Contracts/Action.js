/**
 * @mixin {Action}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {string} key
     * @return {this}
     */
    $getAction (key) {
      this.__currentAction = key
      return this
    },

    /**
     * @param {Number} order
     * @returns {Schema}
     */
    $actionOrder (order) {
      const id = this.__currentAction
      Object.keys(this.buttons).forEach((key) => {
        if (key === this.__currentAction) {
          return
        }
        const action = this.buttons[key]
        if (action.order < order) {
          return
        }
        action.order = action.order + 1
      })
      if (this.buttons[id]) {
        this.buttons[id].order = order
      }
      return this
    },

    /**
     * @param {string} label
     * @returns {Schema}
     */
    $actionLabel (label) {
      const id = this.__currentAction
      if (this.buttons[id]) {
        this.buttons[id].attrs.label = label
      }
      return this
    },

    /**
     * @param {string} icon
     * @returns {Schema}
     */
    $actionIcon (icon = '') {
      const id = this.__currentAction
      if (this.buttons[id]) {
        this.buttons[id].attrs.icon = icon
      }
      return this
    },

    /**
     * @param {string} tooltip
     * @returns {Schema}
     */
    $actionTooltip (tooltip = '') {
      const id = this.__currentAction
      this.buttons[id].attrs.tooltip = this.$lang(tooltip)
      return this
    },

    /**
     * @param {string} color
     * @returns {Schema}
     */
    $actionColor (color) {
      const id = this.__currentAction
      if (this.buttons[id]) {
        this.buttons[id].attrs.color = color
      }
      return this
    },

    /**
     * @param {string} textColor
     * @returns {Schema}
     */
    $actionTextColor (textColor) {
      const id = this.__currentAction
      if (this.buttons[id]) {
        this.buttons[id].attrs.textColor = textColor
      }
      return this
    },

    /**
     * @param {Boolean} disabled
     * @returns {Schema}
     */
    $actionDisabled (disabled = true) {
      const id = this.__currentAction
      if (this.buttons[id]) {
        this.buttons[id].attrs.disabled = disabled
      }
      return this
    },

    /**
     * @returns {Schema}
     */
    $actionFloatRight () {
      return this.$actionAddClassName('button-position-right')
    },

    /**
     * @returns {Schema}
     */
    $actionFloatLeft () {
      return this.$actionAddClassName('button-position-left')
    },

    /**
     * @returns {Schema}
     */
    $actionNoMinWidth () {
      return this.$actionAddClassName('button-no-min-width')
    },

    /**
     * @param {string} className
     * @returns {Schema}
     */
    $actionAddClassName (className) {
      const id = this.__currentAction
      if (this.buttons[id]) {
        if (!this.buttons[id].class) {
          this.buttons[id].class = []
        }
        this.buttons[id].class.push(className)
      }
      return this
    },

    /**
     * @param {Boolean} hidden
     * @returns {Schema}
     */
    $actionHidden (hidden = true) {
      const id = this.__currentAction
      if (this.buttons[id]) {
        this.buttons[id].hidden = hidden
      }
      return this
    },

    /**
     * @param {Array} actions
     * @returns {Schema}
     */
    $actionDropdown (actions) {
      const id = this.__currentAction
      if (this.buttons[id]) {
        this.buttons[id].dropdown = true
        if (!Array.isArray(actions)) {
          actions = []
        }
        this.buttons[id].actions = actions
      }
      return this
    },

    /**
     * @param {Function} validate
     * @returns {Schema}
     */
    $actionValidate (validate) {
      const id = this.__currentAction
      if (this.buttons[id]) {
        this.buttons[id].validate = validate
      }
      return this
    },

    /**
     * @param {Function} configure
     * @returns {Schema}
     */
    $actionConfigure (configure) {
      const id = this.__currentAction
      if (this.buttons[id]) {
        this.buttons[id].configure = configure
      }
      return this
    },

    /**
     * @param {string} event
     * @param {Function} handler
     * @returns {Schema}
     */
    $actionOn (event, handler) {
      const id = this.__currentAction
      if (this.buttons[id]) {
        this.buttons[id].on[event] = handler
      }
      return this
    }
  }
}
