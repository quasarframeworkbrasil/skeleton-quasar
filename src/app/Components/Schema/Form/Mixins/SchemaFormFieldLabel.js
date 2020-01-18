/**
 * @mixin {SchemaFormFieldLabel}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Object} field
     * @returns {*}
     */
    renderFieldLabel (h, field) {
      return h('label', { domProps: { innerHTML: this.labelContent(field) } })
    },
    /**
     * @param {Object} field
     * @returns {string}
     */
    labelContent (field) {
      // no label, no extra
      if (!field.label) {
        return ''
      }
      const manual = !!this.errors[field.$key]
      const automatic = this.$util.get(this.validations, `record.${field.$key}.$error`)
      // not validation, return without *
      if (!field.$hasValidation && !manual && !automatic) {
        return field.label
      }
      // lets validate, return with *
      return `${field.label} <i class="is-required"></i>`
    }
  }
}
