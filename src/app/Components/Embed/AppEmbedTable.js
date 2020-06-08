import SchemaTable from 'src/app/Components/Schema/SchemaTable'

/**
 * @component {AppEmbedTable}
 */
export default {
  /**
   */
  extends: SchemaTable,
  /**
   */
  name: 'AppEmbedTable',
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
  /**
   */
  methods: {
    /**
     * @param masterValue
     */
    refreshMasterDetailTable (masterValue = undefined) {
      this.pagination.raw = { [this.masterKey]: this.masterValue }
      this.fetchRecords()
    }
  },
  /**
   */
  created () {
    if (this.masterValue) {
      this.refreshMasterDetailTable()
    }
    this.pagination.raw = { [this.masterKey]: this.masterValue }

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
      class: ['AppEmbedTable'],
      attrs: { padding: true }
    }
    const children = [
      this.renderTable(h, ['AppEmbedTable__container'], true),
      this.renderWhere(h),
      this.renderFloatActionButtons(h),
      this.renderTableDebuggers(h)
    ]

    return h('div', data, children)
  }
}
