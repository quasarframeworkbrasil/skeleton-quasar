/**
 * @mixin {AppSelectRemote}
 */
import { withSeparator } from 'src/app/Util/general'
import Popup from 'src/modules/General/Mixins/Popup'

export default {
  /**
   */
  multiple: undefined,
  /**
   */
  mixins: [Popup],
  /**
   */
  props: {
    value: {
      type: Array, // [Number, String, Object, Array]
      default: () => []
    },
    remote: {
      type: Function,
      required: true
    },
    widget: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Object,
      default: () => undefined
    },
    domain: {
      type: String,
      default: ''
    },
    keyValue: {
      type: String,
      required: true
    },
    keyLabel: {
      type: String,
      required: true
    },
    component: {
      type: [String, Function, Object],
      default: () => undefined
    },
    query: {
      type: Object,
      default: () => ({})
    },
    format: {
      type: Function,
      default: undefined
    },
    path: {
      default: undefined
    }
  },
  /**
   */
  computed: {
    arriving () {
      return this.value
    },
    bind () {
      const attrs = { ...this.$attrs }
      delete attrs.value
      if (this.value) {
        delete attrs.placeholder
      }
      return {
        'use-input': true,
        'map-options': true,
        'clearable': true,
        'use-chips': this.$options.multiple,
        'multiple': this.$options.multiple,
        'popup-content-class': 'uppercase',
        loading: this.loading,
        ...attrs
      }
    },
    /**
     * @return {boolean}
     */
    hideSelected () {
      if (this.$options.multiple) {
        return false
      }
      return this.searching
    },
    /**
     * @return {String|Object}
     */
    noResults () {
      let path = 'agnostic.components.remote.noResults'
      if (this.loading) {
        path = 'agnostic.components.remote.searching'
      }
      return this.$lang(path)
    }
  },
  /**
   */
  data: () => ({
    options: [],
    loading: false,
    searching: false
  }),
  /**
   */
  methods: {
    /**
     * @param filter
     * @param update
     * @param abort
     */
    async filterRemote (filter, update, abort) {
      this.loading = true
      try {
        let query = { ...this.query }
        if (Array.isArray(this.value)) {
          const values = this.value.map((item) => item[this.keyValue]).join(',')
          query = { [this.keyValue]: withSeparator(values, 'nin') }
        }
        let options = await this.remote(filter, undefined, query)
        if (!Array.isArray(options)) {
          options = []
        }
        this.loading = false
        this.__options = options
        update(() => this.updateOptions())
      } catch (e) {
        this.loading = false
        abort(() => {
          this.options = []
        })
      }
    },
    /**
     */
    filterAbortRemote () {
      this.options = []
    },
    /**
     * @param value
     */
    goingOut (value) {
      let input = value
      if (Array.isArray(value)) {
        input = value.map((selected) => selected.__meta)
      }
      this.$emit('input', input)
    },
    /**
     */
    updateOptions () {
      if (!this.__options) {
        return
      }

      const options = this.__options.map((row) => this.parseOptions(row))
      if (Array.isArray(this.value)) {
        const selected = this.value.map((selected) => selected[this.keyValue])
        this.options = options.filter((option) => !selected.includes(option.value))
        return
      }
      this.options = options
    },
    /**
     * @param {Object} row
     */
    parseOptions (row) {
      const value = row[this.keyValue]
      const label = this.format ? this.format(row, row[this.keyLabel]) : row[this.keyLabel]
      return { value, label, __meta: row }
    },
    /**
     */
    hideCurrentValue () {
      this.searching = true
    },
    /**
     */
    showCurrentValue (value) {
      this.searching = false
    },
    /**
     * @param {Event} $event
     */
    widgetOpen ($event) {
      $event.preventDefault()
      $event.stopPropagation()
      this.showCurrentValue()

      if (this.path) {
        this.openPopup(this.path)
        return
      }
      this.openDialog = true
    }
  },
  /**
   */
  watch: {
    value () {
      this.updateOptions()
    }
  }
}
