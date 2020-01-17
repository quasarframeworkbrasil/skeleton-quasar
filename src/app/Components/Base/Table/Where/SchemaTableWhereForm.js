import FormComponent from 'src/app/Components/Base/Contracts/Form/FormComponent'
import SchemaFieldLabel from 'src/app/Components/Base/Form/Mixins/SchemaFormFieldLabel'
import SchemaFieldComponent from 'src/app/Components/Base/Form/Mixins/SchemaFormFieldComponent'

/**
 * @component {SchemaTableWhereForm}
 */
export default {
  /**
   */
  name: 'SchemaTableWhereForm',
  /**
   */
  mixins: [
    FormComponent, SchemaFieldLabel, SchemaFieldComponent
  ],
  /**
   */
  props: {
    domain: {
      type: String,
      default: () => ''
    },
    fields: {
      type: [Function, Object],
      default: () => ({})
    }
  },
  /**
   */
  data () {
    const fields = this.$util.run(this.fields)
    const record = {}
    Object.keys(fields).forEach((key) => {
      record[key] = undefined
    })
    return {
      record: record,
      errors: {}
    }
  },
  /**
   */
  methods: {
    /**
     * @param $event
     */
    fieldKeyup ($event) {
      if ($event.keyCode !== 13) {
        return
      }
      this.$emit('submit')
    },
    /**
     * @param {Function} h
     * @param {Object} field
     * @returns {*}
     */
    renderWhereFormComponent (h, field) {
      field.label = this.parseFieldLabel(field)
      if (field.attrs.options) {
        field.attrs.options = this.parseFieldOptions(field)
      }
      field.attrs.label = ''
      field.attrs.clearable = true
      ;(['disable', 'borderLess', 'disabled', 'readonly', 'autofocus']).forEach((property) => {
        field.attrs[property] = false
      })
      field.listeners = { keyup: this.fieldKeyup }

      if (field.$type === 'boolean') {
        field.attrs['indeterminate-value'] = undefined
        field.attrs['toggle-indeterminate'] = true
      }

      const data = { class: 'SchemaTableWhere__component' }
      const children = [
        this.renderFieldLabel(h, field),
        this.renderFieldComponent(h, field)
      ]
      return h('div', data, children)
    }
  },
  /**
   * @param {Function} h
   * @returns {*}
   */
  render (h) {
    const data = { class: 'SchemaTableWhere__form' }
    const fields = this.$util.run(this.fields)
    const children = Object.values(fields)
      .filter((field) => field.$layout.tableWhere)
      .map((field) => this.renderWhereFormComponent(h, field))
    return [h('div', data, children)]
  }
}
