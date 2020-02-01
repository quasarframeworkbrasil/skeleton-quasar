import SchemaForm from 'src/app/Components/Schema/SchemaForm'
import { SCOPES } from 'src/app/Agnostic/enum'

/**
 * @component {AppMasterDetailForm}
 */
export default {
  /**
   */
  extends: SchemaForm,
  /**
   */
  name: 'AppMasterDetailForm',
  /**
   */
  props: {
    masterKey: {
      type: String,
      default: undefined
    },
    masterValue: {
      required: true
    },
    clipboard: {
      type: Object,
      default: () => ({})
    },
    embed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * @param id
     */
    loadRecordMasterDetailForm (id) {
      const scopes = [SCOPES.SCOPE_MASTER_DETAIL_EDIT, SCOPES.SCOPE_MASTER_DETAIL_VIEW]
      if (!scopes.includes(this.scope)) {
        return
      }
      return this.fetchRecord(id)
    }
  },
  /**
   */
  created () {
    this.record[this.masterKey] = undefined

    this.$watch(`clipboard.${this.primaryKey}`, (id) => {
      return this.loadRecordMasterDetailForm(id)
    })

    this.$watch(`clipboard.forceClear`, (id) => {
      this.renderRecord()
      this.record[this.masterKey] = this.masterValue
    })

    this.$watch('masterValue', (value) => {
      this.record[this.masterKey] = value
    })
  },
  /**
   * @param {Function} h
   */
  render (h) {
    const data = {
      class: ['AppMasterDetailForm'],
      attrs: {
        padding: true
      }
    }
    const children = [
      this.renderForm(h),
      this.renderFormDebuggers(h)
    ]

    return h('div', data, children)
  }
}
