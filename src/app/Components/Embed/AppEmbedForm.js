import SchemaForm from 'src/app/Components/Schema/SchemaForm'
import { SCOPES } from 'src/app/Agnostic/enum'

/**
 * @component {AppEmbedForm}
 */
export default {
  /**
   */
  extends: SchemaForm,
  /**
   */
  name: 'AppEmbedForm',
  /**
   */
  props: {
    readonly: {
      default: false
    },
    disable: {
      default: false
    },
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
  /**
   */
  computed: {
    /**
     * @return {boolean}
     */
    locked () {
      if (this.readonly) {
        return true
      }
      return !this.masterValue
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

    this.$watch(`scope`, (scope) => {
      if (scope === SCOPES.SCOPE_MASTER_DETAIL_INDEX) {
        return
      }
      this.reloadComponents()

      if (scope !== SCOPES.SCOPE_MASTER_DETAIL_VIEW) {
        return
      }
      const setField = (key) => this.setFieldAttrs(key, { readonly: true, disable: true })
      Object.keys(this.components).forEach(setField)
    })

    this.$watch(`clipboard.${this.primaryKey}`, (id) => {
      return this.loadRecordMasterDetailForm(id)
    })

    this.$watch(`clipboard.forceClear`, () => {
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
      class: ['AppEmbedForm'],
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
