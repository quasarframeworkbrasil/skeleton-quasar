/**
 * @mixin {AppSelectRemote}
 */
import { withSeparator } from 'src/app/Util/general'

export default {
  /**
   */
  multiple: undefined,
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
      type: [String, Function],
      required: true
    },
    component: {
      type: [String, Function, Object],
      default: () => undefined
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
    noResults () {
      let path = 'agnostic.components.appSelectRemote.noResults'
      if (this.loading) {
        path = 'agnostic.components.appSelectRemote.searching'
      }
      return this.$lang(path)
    }
  },
  /**
   */
  data: () => ({
    options: [],
    loading: false
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
        let query = {}
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
      const label = typeof this.keyLabel === 'function' ? this.keyLabel(row, value) : row[this.keyLabel]
      return { value, label, __meta: row }
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
