import { fieldsReorder } from 'src/app/Agnostic/Helper'

export default {
  /**
   * @param {Array} scopes
   * @returns {Schema}
   */
  fieldScopes (scopes) {
    const id = this.__currentField
    if (this.__fields[id]) {
      this.__fields[id].scopes = scopes
    }
    return this
  },

  /**
   * @param value
   * @returns {Schema}
   */
  fieldSection (value) {
    const id = this.__currentField
    if (this.__fields[id]) {
      this.__fields[id].section = value
    }
    return this
  },

  /**
   * @param {Function} configure
   * @returns {Schema}
   */
  fieldConfigure (configure) {
    const name = this.__currentField
    this.__fields[name].$configure = configure
    return this
  },

  /**
   * @param {string} type
   * @returns {Schema}
   */
  fieldType (type) {
    return this.setAttrs({ type })
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldAppendAttrs (attrs) {
    return this.setAttrs(attrs)
  },

  /**
   * @param {Boolean} primaryKey
   * @returns {Schema}
   */
  fieldPrimaryKey (primaryKey = true) {
    const name = this.__currentField
    this.__fields[name].$primaryKey = primaryKey
    return this
  },

  /**
   * @param {string} event
   * @param {Function} callable
   * @param {boolean} reset
   * @returns {Schema}
   */
  fieldOn (event, callable, reset = false) {
    return this.setOn(event, callable, reset)
  },

  /**
   * @param {string} reference
   * @param {Number} order
   * @private
   */
  __fieldOrderUpdate (reference, order) {
    fieldsReorder(this.__fields, this.__currentField, reference, order)
  }
}
