/**
 * @mixin {Field}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {string} field
     * @returns {String|*}
     */
    parseFieldLabel (field) {
      if (field.$layout.tableLabel) {
        return field.$layout.tableLabel
      }
      return this.$lang([
        `domains.${this.domain}.fields.${field.$key}.label`,
        `domains.${this.domain}.fields.${field.$key}`,
        `agnostic.fields.${field.$key}`
      ])
    },
    /**
     * @param {Object} field
     * @returns {Array|*}
     */
    parseFieldOptions (field) {
      if (!field.attrs.options) {
        return []
      }
      if (!Array.isArray(field.attrs.options)) {
        return field.attrs.options
      }
      const map = (option) => {
        if (typeof option === 'object' && option.label) {
          option.label = this.$lang(option.label, option.label)
        }
        return option
      }
      return field.attrs.options.map(map)
    },
    /**
     * @param {string} $key
     * @returns {*}
     * @private
     */
    __getField ($key) {
      if (this.components && this.components[$key]) {
        return this.components[$key]
      }
      const field = Array.isArray(this.columns) ? this.columns.find((column) => column.field === $key) : undefined
      if (field) {
        return field
      }
      throw Error(`Field '${$key}' not found`)
    },
    /**
     * @param {string} $key
     * @param {string|Object} is
     * @returns {this}
     */
    setFieldIs ($key, is) {
      const field = this.__getField($key)
      field.is = is
      return this
    },
    /**
     * @param {string} $key
     */
    getFieldIs ($key) {
      const field = this.__getField($key)
      return field.is
    },
    /**
     * @param {string} component
     * @param {Object} attrs
     * @returns {this}
     */
    setFieldAttrs (component, attrs) {
      Object.keys(attrs).forEach((attr) => this.setFieldAttr(component, attr, attrs[attr]))
      return this
    },
    /**
     * @param {string} $key
     * @param {string} attr
     * @param {*} value
     * @returns {this}
     */
    setFieldAttr ($key, attr, value) {
      const field = this.__getField($key)
      if (field.attrs) {
        field.attrs[attr] = value
        return this
      }
      field[attr] = value
      return this
    },
    /**
     * @param {string} $key
     * @returns {Object}
     */
    getFieldAttrs ($key) {
      const field = this.__getField($key)
      if (field.attrs) {
        return field.attrs
      }
      return field
    },
    /**
     * @param {string} $key
     * @param {string} attr
     * @returns {*}
     */
    getFieldAttr ($key, attr) {
      const field = this.__getField($key)
      if (field.attrs) {
        return field.attrs[$key]
      }
      return field[$key]
    },
    /**
     * @param {string} component
     * @param {Object} layouts
     * @returns {this}
     */
    setFieldLayouts (component, layouts) {
      Object.keys(layouts).forEach((attr) => this.setFieldLayout(component, attr, layouts[attr]))
      return this
    },
    /**
     * @param {string} $key
     * @param {string} layout
     * @param {*} value
     * @returns {this}
     */
    setFieldLayout ($key, layout, value) {
      const field = this.__getField($key)
      field.$layout[layout] = value
      return this
    },
    /**
     * @param {string} $key
     * @returns {Object}
     */
    getFieldLayouts ($key) {
      const field = this.__getField($key)
      return field.$layout
    },
    /**
     * @param {string} component
     * @param {string} attr
     * @returns {*}
     */
    getFieldLayout (component, attr) {
      return this.getFieldLayouts(component)[attr]
    },
    /**
     * @param {string} $key
     * @return {this}
     */
    $getField ($key) {
      this.__currentField = $key
      return this
    },
    /**
     * @param {*} value
     * @return {Form}
     */
    $setValue (value) {
      this.record[this.__currentField] = value
      return this
    },
    /**
     * @return {*}
     */
    $getValue () {
      return this.record[this.__currentField]
    },
    /**
     * @param {string|Object} is
     * @return {this}
     */
    $setIs (is) {
      this.setFieldIs(this.__currentField, is)
      return this
    },
    /**
     * @param {string} property
     * @param {*} value
     * @return {this}
     */
    $setLayout (property, value) {
      this.setFieldLayout(this.__currentField, property, value)
      return this
    },
    /**
     * @param {string} property
     * @return {Object}
     */
    $getLayout (property) {
      return this.getFieldLayout(this.__currentField, property)
    },
    /**
     * @param {string} property
     * @param {*} value
     * @return {this}
     */
    $setAttr (property, value) {
      this.setFieldAttr(this.__currentField, property, value)
      return this
    },
    /**
     * @param {string} property
     * @return {*}
     */
    $getAttr (property) {
      return this.getFieldAttr(this.__currentField, property)
    },
    /**
     * @param {string} name
     */
    $setFocus (name) {
      if (!this.components[name]) {
        return
      }
      const field = this.components[name]
      const ref = this.generateComponentRef(field)
      const component = this.getComponentByRef(ref)
      if (!component) {
        return
      }
      const focusable = ['focus', 'show']
      let done = false
      focusable.forEach((method) => {
        if (done) {
          return
        }
        if (component[method] && typeof component[method] === 'function') {
          done = true
          window.setTimeout(component[method], 300)
        }
      })
    }
  }
}
