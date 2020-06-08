import Dynamic from 'src/app/Components/Schema/Contracts/Dynamic'
import Table from 'src/app/Components/Schema/Contracts/Table'
// mixins
import SchemaTableSlots from 'src/app/Components/Schema/Table/Mixins/SchemaTableSlots'
// components
import SchemaDebugger from 'src/app/Components/Schema/Debugger/SchemaDebugger'
import SchemaTableWhere from 'src/app/Components/Schema/Table/Where/SchemaTableWhere'
// app
import { POSITIONS, SCOPES } from 'src/app/Agnostic/enum'
// settings
import { searchKey } from 'src/settings/schema'

/**
 * @component {SchemaTable}
 */
export default {
  name: 'SchemaTable',
  /**
   */
  mixins: [
    Dynamic, Table, SchemaTableSlots
  ],
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Array} classes
     * @param {boolean} embed
     * @returns {*}
     */
    renderTable (h, classes = ['SchemaTable'], embed = false) {
      if (this.scope === SCOPES.SCOPE_TRASH) {
        classes.push('trash')
      }

      const attrs = {
        ...this.bind,
        dense: this.$q.platform.is.desktop,
        data: this.data,
        columns: this.columns,
        visibleColumns: this.visibleColumns,
        loading: this.loading,
        binaryStateSort: true
      }

      const props = {
        pagination: this.pagination,
        selected: this.selected,
        selectedRowsLabel: () => {
          return this.selected.length === 0
            ? ''
            : `${this.selected.length} / ${this.data.length}`
        }
      }

      const on = {
        'update:pagination': (pagination) => { this.pagination = pagination },
        'update:selected': (selected) => { this.selected = selected },
        'request': (parameters) => this.requestState(parameters)
      }

      const scopedSlots = this.renderTableSlots(h)

      return h('AppTable', { class: classes, props, attrs, on, scopedSlots })
    },
    /**
     * @param {Function} h
     */
    renderWhere (h) {
      const attrs = {
        primaryKey: this.primaryKey,
        displayKey: this.displayKey,
        value: this[searchKey],
        domain: this.domain,
        fields: this.fields,
        actions: this.actions,
        scope: this.scope
      }
      const on = { input: (value) => this.applySearch(value) }
      return h(SchemaTableWhere, { attrs, on })
    },
    /**
     * @param {Function} h
     */
    renderFloatActionButtons (h) {
      return this.renderSchemaButtons(
        h,
        POSITIONS.POSITION_TABLE_FLOAT,
        { floating: true, record: this.record, records: this.selected }
      )
    },
    /**
     * @param {Function} h
     */
    renderTableDebuggers (h) {
      if (!this.debuggers) {
        return
      }

      return h('div', [
        h(SchemaDebugger, { attrs: { label: 'Data', inspect: this.data } }),
        h(SchemaDebugger, { attrs: { label: 'Columns', inspect: this.columns } }),
        h(SchemaDebugger, { attrs: { label: 'Buttons', inspect: this.buttons } })
      ])
    }
  },
  /**
   * @param {Function} h
   */
  render (h) {
    const data = {
      attrs: { padding: true }
    }
    const children = [
      this.renderTable(h),
      this.renderWhere(h),
      this.renderFloatActionButtons(h),
      this.renderTableDebuggers(h)
    ]

    return h('q-page', data, children)
  }
}
