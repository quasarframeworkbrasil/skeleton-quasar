import Dynamic from 'src/app/Components/Schema/Contracts/Dynamic'
import Form from 'src/app/Components/Schema/Contracts/Form'
// mixins
import SchemaBody from 'src/app/Components/Schema/Form/Mixins/SchemaFormBody'
// components
import SchemaDebugger from 'src/app/Components/Schema/Debugger/SchemaDebugger'
// app
import { POSITIONS } from 'src/app/Agnostic/enum'

/**
 * @component {SchemaForm}
 */
export default {
  /**
   */
  name: 'SchemaForm',
  /**
   */
  mixins: [
    Dynamic, Form, SchemaBody
  ],
  /**
   */
  data: () => ({
    groupSelected: ''
  }),
  /**
   */
  methods: {
    /**
     * @param {Function} h
     */
    renderForm (h) {
      const data = { class: 'app-form-wrapper' }
      const children = [
        this.renderFormBody(h),
        this.renderSchemaButtons(h, POSITIONS.POSITION_FORM_FOOTER, { record: this.record })
      ]

      return h('div', data, children)
    },
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderFormBody (h) {
      const data = {
        class: 'app-form-body'
      }
      const children = [
        this.renderFormBodyComponents(h, this.getComponents())
      ]
      if (this.hasSections) {
        children.push(this.renderFormBodySections(h, this.grouping))
      }
      if (this.hasTabs) {
        children.push(this.renderFormBodyTabs(h, this.grouping))
      }

      return h('div', data, children)
    },
    /**
     * @param {Function} h
     */
    renderFormDebuggers (h) {
      if (!this.debuggers) {
        return
      }

      return h('div', [
        h(SchemaDebugger, { attrs: { label: 'Validation', inspect: this.$v } }),
        h(SchemaDebugger, { attrs: { label: 'Record', inspect: this.record } }),
        h(SchemaDebugger, { attrs: { label: 'Components', inspect: this.components } }),
        h(SchemaDebugger, { attrs: { label: 'Buttons', inspect: this.buttons } })
      ])
    }
  },
  /**
   * @param {Function} h
   */
  render (h) {
    const data = {
      class: 'SchemaForm',
      attrs: {
        padding: true
      }
    }
    const children = [
      this.renderForm(h),
      this.renderFormDebuggers(h)
    ]

    return h('q-page', data, children)
  }
}
