export default {
  /**
   * @param {Number} formWidth
   * @returns {Schema}
   */
  fieldFormWidth (formWidth) {
    return this.setLayout({ formWidth })
  },

  /**
   * @param {Boolean} disable
   * @returns {Schema}
   */
  fieldFormDisabled (disable = true) {
    return this.setAttrs({ disable })
  },

  /**
   * @param {Number} formHeight
   * @returns {Schema}
   */
  fieldFormHeight (formHeight) {
    return this.setLayout({ formHeight })
  },

  /**
   * @param {Boolean} formHidden
   * @returns {Schema}
   */
  fieldFormHidden (formHidden = true) {
    return this.setLayout({ formHidden })
  },

  /**
   * @param {string} formName
   * @returns {Schema}
   */
  fieldFormName (formName) {
    return this.setLayout({ formName })
  },

  /*
  * @param {Boolean} type
  * @returns {Screen}
  */
  fieldFormAutofocus (autofocus = true) {
    return this.setAttrs({ autofocus })
  },

  /**
   * @param {*} value
   * @returns {Schema}
   */
  fieldFormDefaultValue (value) {
    return this.setAttrs({ value })
  },

  /**
   */
  fieldFormErrorHide () {
    this.setLayout({ formError: false })
  },

  /**
   */
  fieldFormErrorShow () {
    this.setLayout({ formError: true })
  },

  /**
   * @param {Boolean} upperCase
   * @returns {Schema}
   */
  fieldFormUpperCase (upperCase = true) {
    return this.setAttrs({ upperCase })
  },

  /**
   * @param {string} placeholder
   * @returns {Schema}
   */
  fieldFormPlaceholder (placeholder = '') {
    if (!placeholder) {
      placeholder = this.$lang(`fields.${this.__currentField}.placeholder`)
    }
    return this.setAttrs({ placeholder })
  },

  /**
   * @param {Number} order
   * @param {boolean} updateOthers
   * @returns {Schema}
   */
  fieldFormOrder (order, updateOthers = false) {
    this.setLayout({ formOrder: order })
    if (updateOthers) {
      this.__fieldOrderUpdate('formOrder', order)
    }
    return this
  }
}
