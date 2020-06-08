import { dateFormatter, datetimeFormatter } from 'src/app/Util/formatter'

/**
 * @mixin {PrintableMixin}
 */
export default {
  methods: {
    /**
     * @param {string} key
     * @returns {String|Object}
     */
    label (key) {
      return this.$lang([
        `domains.${this.domain}.fields.${key}.label`,
        `domains.${this.domain}.fields.${key}`,
        `agnostic.fields.${key}`
      ])
    },
    /**
     * @param {*} value
     * @param {string} key
     * @returns {String|Object}
     */
    value (value, key) {
      const component = this.components[key] || this.arrays[key]
      const type = component.$type
      if (type === 'user') {
        // noinspection RegExpRedundantEscape
        const regex = /(.*) \[(.*)\]/g
        let matches
        if ((matches = regex.exec(value)) !== null) {
          return matches[1] || '-'
        }
        return value || '-'
      }
      if (type === 'boolean') {
        return value ? 'Sim' : 'Não'
      }
      if (type === 'currency') {
        return component.$layout.tableFormat(value)
      }
      if (type === 'date') {
        return dateFormatter(value) || '-'
      }
      if (type === 'datetime') {
        return datetimeFormatter(value) || '-'
      }
      // string, text, number, array
      if (type !== 'select') {
        return value || '-'
      }
      if (component.attrs.keyLabel) {
        return this.$util.get(value, component.attrs.keyLabel)
      }
      if (Array.isArray(component.attrs.options)) {
        const find = component.attrs.options.find((option) => String(option.value) === String(value))
        if (!find) {
          return value
        }
        return find.label
      }
      return component.attrs
    }
  }
}
