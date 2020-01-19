import Dynamic from 'src/app/Components/Schema/Contracts/Dynamic'
import Form from 'src/app/Components/Schema/Contracts/Form'
// mixins
import SchemaBody from 'src/app/Components/Schema/Form/Mixins/SchemaFormBody'
// app
import { POSITIONS } from 'src/app/Agnostic/enum'
import { primaryKey } from 'src/settings/schema'
import { $store } from 'src/store'
import { reportContext } from 'src/settings/components'
import { reportAction, reportLoading, reportMethod } from 'src/settings/report'

/**
 * @component {SchemaReport}
 */
export default {
  /**
   */
  name: 'SchemaReport',
  /**
   */
  mixins: [
    Dynamic, Form, SchemaBody
  ],
  /**
   */
  props: {
    /**
     */
    report: {
      type: String,
      required: true
    }
  },
  /**
   */
  data: () => ({
    submitting: false,
    printing: false,
    nonce: ''
  }),
  /**
   */
  methods: {
    /**
     * @param {Function} h
     */
    renderReport (h) {
      const data = { class: 'app-form-wrapper' }
      const children = [
        this.renderReportBody(h),
        this.renderReportIframe(h),
        this.renderSchemaButtons(h, POSITIONS.POSITION_FORM_FOOTER, { record: this.record })
      ]

      return h('div', data, children)
    },
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderReportBody (h) {
      const token = $store.getters['auth/getToken']
      const data = {
        ref: 'form',
        class: 'app-form-body',
        domProps: {
          action: reportAction(this.report, token, this.printing),
          method: reportMethod(this.report, token, this.printing),
          target: 'report'
        }
      }
      const fields = this.getComponents()
      const children = [
        this.renderFormBodyComponents(h, fields),
        this.renderFormBodyHidden(h, fields),
        this.renderFormBodyInfo(h, fields)
      ]
      return h('form', data, children)
    },
    /**
     * @param {Function} h
     * @param {Object} fields
     * @returns {Array}
     */
    renderFormBodyHidden (h, fields) {
      const map = (field) => {
        const name = field.$key
        const record = this.record[name]
        if (record === undefined || record === null) {
          return
        }
        const value = typeof record === 'object' ? record[primaryKey] : record
        const domProps = {
          type: 'hidden',
          name,
          value
        }
        return h('input', { domProps })
      }
      return Object.values(fields).map(map).filter((item) => item !== undefined)
    },
    /**
     * @param {Function} h
     * @param {Object} fields
     * @returns {Array}
     */
    renderFormBodyInfo (h, fields) {
      const map = (field) => {
        const name = field.$key
        const record = this.record[name]
        if (record === undefined || record === null) {
          return
        }
        const value = typeof record === 'object' ? record[field.attrs.keyLabel] : record
        const label = field.label
        const type = field.$type
        const options = field.attrs.options
        const domProps = {
          type: 'hidden',
          name: `__@info[${name}]`,
          value: JSON.stringify({ value, label, type, options })
        }
        return h('input', { domProps })
      }
      const filter = (item) => item !== undefined
      const info = Object.values(fields).map(map).filter(filter)
      info.push(reportContext(h))
      return info
    },
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderReportIframe (h) {
      const data = {
        ref: 'iframe',
        class: 'app-iframe-body',
        domProps: {
          src: reportLoading(this.report),
          id: 'report',
          name: 'report'
        }
      }
      return h('iframe', data)
    },
    /**
     * @param schema
     * @param printing
     */
    reportSubmit ({ schema }, printing = false) {
      this.$v.$touch()
      if (this.$v.$error || this.hasErrors) {
        this.$message.error(this.$lang('agnostic.actions.create.validation'))
        return
      }
      this.printing = printing
      this.$nextTick(() => {
        this.$refs.form.submit()
        this.submitting = true
      })
    },
    /**
     */
    reportBack () {
      this.submitting = false
      this.$refs.iframe.src = reportLoading(this.report)
    },
    /**
     */
    reportPrint () {
      window.frames['report'].focus()
      window.frames['report'].print()
    }
  },
  /**
   * @param {Function} h
   */
  render (h) {
    const data = {
      class: ['SchemaForm', 'SchemaReport', this.submitting ? 'submitting' : ''],
      attrs: {
        padding: true
      }
    }
    const children = [
      this.renderReport(h)
    ]

    return h('q-page', data, children)
  }
}
