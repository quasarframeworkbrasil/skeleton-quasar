// mixin
import Button from 'src/app/Components/Schema/Contracts/Button'
// component
import SchemaTableWhereForm from 'src/app/Components/Schema/Table/Where/SchemaTableWhereForm'
import SchemaButtons from 'src/app/Components/Schema/Buttons/SchemaButtons'
// app
import { POSITIONS } from 'src/app/Agnostic/enum'
import { is, isObject, serialize, unSerialize, withoutSeparator, withSeparator } from 'src/app/Util/general'
// settings
import { searchKey } from 'src/settings/schema'

/**
 * @component {SchemaTableWhere}
 */
export default {
  /**
   */
  name: 'SchemaTableWhere',
  /**
   */
  mixins: [
    Button
  ],
  /**
   */
  props: {
    primaryKey: {
      type: String,
      default: () => 'id'
    },
    displayKey: {
      type: String,
      default: () => ''
    },
    value: {
      type: String,
      default: () => ''
    },
    domain: {
      type: String,
      default: () => ''
    },
    scope: {
      type: String,
      default: () => ''
    },
    fields: {
      type: [Function, Object],
      default: () => ({})
    },
    actions: {
      type: Function,
      default: () => ([])
    }
  },
  /**
   */
  data () {
    const components = this.$util.run(this.fields)
    const record = {}
    Object.keys(components).forEach((key) => {
      record[key] = undefined
    })
    return {
      open: false,
      components: components,
      record: record,
      activeSearching: false,
      errors: {}
    }
  },
  /**
   */
  computed: {
    /**
     * @returns {[string]}
     */
    classNames () {
      const classNames = ['SchemaTableWhere']
      if (this.open) {
        classNames.push('SchemaTableWhere--open')
      }
      return classNames
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderToggle (h) {
      const className = 'SchemaTableWhere__toggle'
      const data = {
        class: className + (this.activeSearching ? ` ${className}--searching` : ''),
        on: { click: this.toggleWhere }
      }
      const children = [
        this.renderToggleIcon(h)
      ]
      return h('div', data, children)
    },
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderToggleIcon (h) {
      const color = 'white'
      const size = '1.4rem'
      return [
        h('q-icon', { domProps: { id: 'search' }, attrs: { color, size, name: 'search' } }),
        h('q-icon', { domProps: { id: 'arrow' }, attrs: { color, size, name: 'arrow_back' } })
      ]
    },
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderSide (h) {
      const data = {
        class: 'SchemaTableWhere__side',
        on: { submit: this.searchSubmit }
      }
      const children = [
        this.renderSideForm(h),
        this.renderSideButtons(h)
      ]
      return h('form', data, children)
    },
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderSideBackdrop (h) {
      const data = {
        class: 'SchemaTableWhere__backdrop',
        on: { click: this.dismissWhere }
      }
      return h('div', data)
    },
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderSideForm (h) {
      const data = {
        attrs: { domain: this.domain, fields: this.fields },
        domProps: { value: this.record },
        props: { value: this.record },
        on: { input: this.receiveInput, submit: this.searchApply }
      }
      return h(SchemaTableWhereForm, data)
    },
    /**
     * @param {Function} h
     * @returns {*}
     */
    renderSideButtons (h) {
      const attrs = {
        scope: this.scope,
        buttons: this.buttons,
        context: { record: this.record },
        position: POSITIONS.POSITION_TABLE_SEARCH
      }
      const data = { attrs }
      return h(SchemaButtons, data)
    },
    /**
     * @receiveInput {SchemaTableWhere}
     * @param {field} field
     * @param {*} value
     */
    receiveInput ({ field, value }) {
      this.record[field] = value
    },
    /**
     */
    toggleWhere () {
      if (this.open === false) {
        this.backup = this.$util.clone(this.record)
      }
      this.open = !this.open
    },
    /**
     */
    dismissWhere () {
      this.open = false
      window.setTimeout(() => {
        this.record = this.backup
      }, 500)
    },
    /**
     * @param {Event} $event
     */
    searchSubmit ($event) {
      $event.preventDefault()
      $event.stopPropagation()
      this.searchApply()
    },
    /**
     */
    searchApply () {
      const query = {}
      for (const field in this.record) {
        if (!this.record.hasOwnProperty(field)) {
          continue
        }
        if (this.record[field] === undefined || this.record[field] === null || this.record[field] === '') {
          continue
        }
        const component = this.components[field]

        let value = this.record[field]
        if (isObject(value)) {
          const attrs = component.attrs
          value = JSON.stringify({
            [attrs.keyValue]: value[attrs.keyValue],
            [attrs.keyLabel]: value[attrs.keyLabel]
          })
        }
        if (typeof value === 'boolean') {
          value = value ? 1 : 0
        }
        let operator
        if (component.$layout.tableWhere !== 'automatic') {
          operator = component.$layout.tableWhere
        }
        query[field] = withSeparator(value, operator)
      }
      this.activeSearching = true
      this.$emit('input', serialize(query, searchKey))
      this.toggleWhere()
    },
    /**
     */
    searchCancel () {
      this.activeSearching = false
      this.$emit('input', '')
      this.toggleWhere()
    },
    /**
     * @param {string} value
     */
    hydrateRecord (value) {
      const unSerialized = unSerialize(value, searchKey)
      Object.keys(this.record).forEach((key) => {
        if (!unSerialized[key]) {
          this.record[key] = undefined
          return
        }
        this.record[key] = this.hydrateRecordValue(key, withoutSeparator(unSerialized[key]))
      })
    },
    /**
     * @param {string} key
     * @param {*} value
     */
    hydrateRecordValue (key, value) {
      if (!this.activeSearching) {
        this.activeSearching = true
      }
      const component = this.components[key]
      if (component.$type === 'number') {
        return Number(value)
      }
      if (component.$type === 'boolean') {
        return !!value
      }
      const isSelect = component.$type === 'select'
      if (isSelect) {
        return value
      }
      if (component.attrs.options) {
        return isNaN(Number(value)) ? String(value) : Number(value)
      }
      const payload = JSON.parse(value)
      return {
        [component.attrs.keyValue]: payload[component.attrs.keyValue],
        [component.attrs.keyLabel]: payload[component.attrs.keyLabel]
      }
    }
  },
  /**
   */
  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.hydrateRecord(value)
      }
    }
  },
  /**
   */
  created () {
    this.renderButtons()
    if (is(this.buttons)) {
      return
    }
    this.buttons = {
      search: {
        positions: [POSITIONS.POSITION_TABLE_SEARCH],
        scopes: [''],
        attrs: {
          label: this.$lang('agnostic.actions.search.label'),
          tooltip: this.$lang('agnostic.actions.search.tooltip'),
          color: 'primary',
          icon: 'search'
        },
        listeners: { click: this.searchApply }
      },
      cancel: {
        positions: [POSITIONS.POSITION_TABLE_SEARCH],
        scopes: [''],
        attrs: {
          label: this.$lang('agnostic.actions.search-clear.label'),
          tooltip: this.$lang('agnostic.actions.search-clear.tooltip'),
          icon: 'cancel'
        },
        listeners: { click: this.searchCancel }
      }
    }
  },
  /**
   * @param {Function} h
   * @returns {*}
   */
  render (h) {
    const data = { class: this.classNames }
    const children = [
      this.renderSideBackdrop(h),
      this.renderToggle(h),
      this.renderSide(h)
    ]

    return h('div', data, children)
  }
}
