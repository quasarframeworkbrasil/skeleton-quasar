import SchemaFieldComponent from 'src/app/Components/Base/Form/Mixins/SchemaFormFieldComponent'
import SchemaFieldLabel from 'src/app/Components/Base/Form/Mixins/SchemaFormFieldLabel'
import SchemaFieldError from 'src/app/Components/Base/Form/Mixins/SchemaFormFieldError'

/**
 * @mixin {SchemaFormField}
 */
export default {
  /**
   */
  mixins: [
    SchemaFieldLabel, SchemaFieldComponent, SchemaFieldError
  ],
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Object} field
     */
    renderField (h, field) {
      const key = field.$key

      const error = this.fieldHasError(key)
      const data = {
        key: key,
        class: this.fieldClass(field.$layout.formWidth, field.$layout.formHeight, error),
        style: { display: field.$layout.formHidden ? 'none' : '' }
      }

      const children = [
        this.renderFieldLabel(h, field),
        this.renderFieldComponent(h, field),
        this.renderFieldError(h, key, error),
        this.renderFieldUtilities(h)
      ]

      return h('div', data, children)
    },
    /**
     * @param {Function} h
     */
    renderFieldUtilities (h) {
      const children = []
      if (this.$scopedSlots.resizer) {
        children.push(this.$scopedSlots.resizer())
      }
      if (children.length) {
        return h('div', { class: 'field-utilities' }, children)
      }
    },
    /**
     * @param {string|number} width
     * @param {string|number} height
     * @param {Boolean} error
     * @returns {Array}
     */
    fieldClass (width, height, error = false) {
      const classNames = [`field width-${width} height-${height}`]
      if (error) {
        classNames.push('has-error')
      }
      return classNames
    },
    /**
     * @param {string} key
     */
    fieldHasError (key) {
      if (this.errors[key]) {
        return true
      }
      const record = this.$util.get(this.validations, 'record', {})
      if (record[key] === undefined) {
        return false
      }
      return record[key].$error
    }
  }
}
