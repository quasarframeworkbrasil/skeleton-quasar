import SchemaField from 'src/app/Components/Base/Form/Mixins/SchemaFormField'

/**
 * @component {SchemaFormComponents}
 */
export default {
  /**
   */
  name: 'SchemaFormComponents',
  /**
   */
  mixins: [
    SchemaField
  ],
  /**
   */
  props: {
    fields: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   * @param {Function} h
   * @returns {*}
   */
  render (h) {
    const data = { class: 'form form-grid' }
    const children = Object.values(this.fields).map((field) => this.renderField(h, field))

    return h('div', data, children)
  }
}
