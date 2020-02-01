import SchemaTable from 'src/app/Components/Schema/SchemaTable'

/**
 * @component {AppMasterDetailTable}
 */
export default {
  /**
   */
  extends: SchemaTable,
  /**
   */
  name: 'AppMasterDetailTable',
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
  /**
   */
  methods: {
    /**
     * @param masterValue
     */
    refreshMasterDetailTable (masterValue = undefined) {
      this.fetchRecords({ raw: { [this.masterKey]: masterValue || this.masterValue } })
    }
  },
  /**
   */
  created () {
    if (this.masterValue) {
      this.refreshMasterDetailTable()
    }

    this.$watch('clipboard.forceRefresh', (value) => {
      if (value === false) {
        return
      }
      return this.refreshMasterDetailTable()
    })

    this.$watch('masterValue', (value) => {
      return this.refreshMasterDetailTable(value)
    })
  },
  /**
   * @param {Function} h
   */
  render (h) {
    const data = {
      class: ['AppMasterDetailTable'],
      attrs: { padding: true }
    }
    const children = [
      this.renderTable(h, ['AppMasterDetailTable__container'], true),
      this.renderWhere(h),
      this.renderFloatActionButtons(h),
      this.renderTableDebuggers(h)
    ]

    return h('div', data, children)
  }
}
