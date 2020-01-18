import { counter } from 'src/settings/schema'

/**
 * @mixin {TableColumns}
 */
export default {
  /**
   */
  methods: {
    /**
     */
    configure () {
      Object.keys(this.columns).forEach((key) => {
        if (!(this.columns[key].$configure && typeof this.columns[key].$configure === 'function')) {
          return
        }
        let field = this.columns[key].$configure.call(this, this.columns[key], this.scope)
        if (!field || field['$key'] !== this.components[key]['$key']) {
          throw Error('The configure return must be the field')
        }
        this.columns[key] = field
      })
    },
    /**
     * @param {string} ignore
     * @param {boolean} primaryKeyLast
     */
    renderColumns (ignore = undefined, primaryKeyLast = false) {
      const filter = (column) => {
        if (column.$layout.tableFilter) {
          return false
        }
        return column[ignore] !== true
      }

      const reduce = (accumulator, field) => {
        const label = this.parseFieldLabel(field)
        const options = this.parseFieldOptions(field)
        accumulator.push({
          label: label,
          options: options,
          $remoteKey: field.$layout.tableRemoteKey || field.$key,
          $type: field.$type,
          name: field.$layout.tableName || field.$key,
          field: field.$key,
          $primaryKey: field.$primaryKey,
          required: field.$layout.tableRequired,
          style: `width: ${field.$layout.tableWidth}`,
          align: field.$layout.tableAlign || 'left',
          sortable: field.$layout.tableSortable,
          format: field.$layout.tableFormat ? field.$layout.tableFormat.bind(this) : undefined,
          classes: [`$key-${field.$key}`, field.attrs.uppercase ? 'text-uppercase' : ''],
          hidden: field.$layout.tableHidden,
          __order: field.$layout.tableOrder
        })
        return accumulator
      }

      const sort = (a, b) => {
        if (primaryKeyLast && b.$primaryKey) {
          return -1
        }
        if (a.__order < b.__order) {
          return -1
        }
        if (a.__order > b.__order) {
          return 1
        }
        return 0
      }

      const fields = this.$util.run(this.fields)
      const columns = Object
        .values(fields)
        .filter(filter)
        .reduce(reduce, [])
        .sort(sort)

      /** @counter */
      columns.unshift(counter)

      this.columns = columns

      this.visibleColumns = this.columns.filter(column => !column.hidden).map(column => column.name)
    }
  }
}
