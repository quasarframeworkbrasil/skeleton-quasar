// noinspection ES6CheckImport
import { QCheckbox, QTable } from 'quasar'

export default {
  extends: QTable,
  name: 'AppTable',
  methods: {
    getTableBody (h) {
      const
        body = this.$scopedSlots.body,
        bodyCell = this.$scopedSlots['body-cell'],
        topRow = this.$scopedSlots['top-row'],
        bottomRow = this.$scopedSlots['bottom-row']
      let
        child = []

      if (body !== void 0) {
        child = this.computedRows.map(row => {
          const
            key = row[this.rowKey],
            selected = this.isRowSelected(key)

          return body(this.addBodyRowMeta({
            key,
            row,
            cols: this.computedCols,
            colsMap: this.computedColsMap,
            __trClass: selected ? 'selected' : ''
          }))
        })
      } else {
        child = this.computedRows.map(row => {
          const
            key = row[this.rowKey],
            selected = this.isRowSelected(key),
            child = bodyCell
              ? this.computedCols.map(col => bodyCell(this.addBodyCellMetaData({ row, col })))
              : this.computedCols.map(col => {
                let value = this.getCellValue(col, row)
                const domProps = {}
                if (col.format) {
                  domProps.innerHTML = value
                  value = undefined
                }
                const properties = {
                  staticClass: col.__tdClass,
                  style: col.style,
                  class: col.classes,
                  domProps
                }
                const slot = this.$scopedSlots[`body-cell-${col.name}`]
                if (!slot) {
                  return h('td', properties, value)
                }
                return slot(this.addBodyCellMetaData({ row, col: col }))
              })

          this.hasSelectionMode === true && child.unshift(
            h('td', { staticClass: 'q-table--col-auto-width' }, [
              h(QCheckbox, {
                props: {
                  value: selected,
                  color: this.color,
                  dark: this.dark,
                  dense: this.dense
                },
                on: {
                  input: adding => {
                    this.__updateSelection([key], [row], adding)
                  }
                }
              })
            ])
          )

          return h('tr', { key, class: { selected } }, child)
        })
      }

      if (topRow !== void 0) {
        child.unshift(topRow({ cols: this.computedCols }))
      }
      if (bottomRow !== void 0) {
        child.push(bottomRow({ cols: this.computedCols }))
      }

      return h('tbody', child)
    },
    /**
     * @param {Object} col
     * @param {Object} row
     * @returns {*}
     */
    getCellValue (col, row) {
      const value = typeof col.field === 'function' ? col.field(row) : row[col.field]
      if (col.format === void 0) {
        return value
      }
      return col.format(value, row, col)
    }
  }
}
