import FormComponent from 'src/app/Components/Base/Contracts/Form/FormComponent'
import { is } from 'src/app/Util/general'

/**
 * @mixin {FormComponents}
 */
export default {
  /**
   */
  mixins: [
    FormComponent
  ],
  /**
   */
  computed: {
    /**
     * @returns {boolean}
     */
    hasSections () {
      return is(this.grouping) && this.groupType === 'sections'
    },
    /**
     * @returns {boolean}
     */
    hasTabs () {
      return is(this.grouping) && this.groupType === 'tabs'
    }
  },
  /**
   */
  methods: {
    /**
     */
    configure () {
      Object.keys(this.components).forEach(key => {
        if (this.components[key].$configure && typeof this.components[key].$configure === 'function') {
          const field = this.components[key].$configure.call(this, this.components[key], this.scope)
          if (!field || field['$key'] !== this.components[key]['$key']) {
            throw Error('The configure return must be the field')
          }
          this.components[key] = field
        }
      })
    },
    /**
     */
    renderComponents () {
      this.grouping = this.groups()
      const fields = this.$util.clone(this.fields())
      this.components = this.performRenderComponents(fields)
    },
    /**
     * @param {Object} fields
     */
    performRenderComponents (fields) {
      return Object.values(fields)
        .sort(this.sortComponents)
        .reduce(this.reduceComponents, {})
    },
    /**
     */
    reloadComponents () {
      this.components = this.performRenderComponents(this.components)
    },
    /**
     * @param {Object} a
     * @param {Object} b
     * @returns {number}
     */
    sortComponents (a, b) {
      if (a.$layout.formOrder < b.$layout.formOrder) {
        return -1
      }
      if (a.$layout.formOrder > b.$layout.formOrder) {
        return 1
      }
      return 0
    },
    /**
     * @param {Array} components
     * @param {Object} field
     * @returns {*}
     */
    reduceComponents (components, field) {
      const hasScopes = field.scopes && Array.isArray(field.scopes)
      if (this.scope && hasScopes && !field.scopes.includes(this.scope)) {
        return components
      }

      components[field.$key] = this.parseField(field)

      return components
    },
    /**
     * @param {string} section
     */
    getComponents (section = undefined) {
      if (section === undefined) {
        const reduce = (accumulator, key) => {
          const field = this.components[key]
          if (!field.section || this.groupType === 'none') {
            accumulator[key] = field
          }
          return accumulator
        }
        return Object.keys(this.components).reduce(reduce, {})
      }

      const reduce = (accumulator, key) => {
        const field = this.components[key]
        if (field.section === section) {
          accumulator[key] = field
        }
        return accumulator
      }
      return Object.keys(this.components).reduce(reduce, {})
    },
    /**
     * @param {string} $key
     * @param {string} listener
     * @param {*} $event
     * @param {Array} parameters
     */
    fieldApplyListener ($key, listener, $event, parameters) {
      if (!Array.isArray(this.components[$key].on[listener])) {
        throw Error(`The event '${listener}' is not an array`)
      }
      this.components[$key].on[listener].forEach((callable) => {
        callable.call(this, { $event, field: this.components[$key], parameters })
      })
    },
    /**
     * @param {Object} $event
     * @param {Object} field
     * @param {Object} action
     * @param {Boolean} stop
     * @param {Object} parameters
     */
    fieldApplyAction ($event, field, action, stop = false, parameters = {}) {
      if (stop && $event && $event.stopPropagation) {
        $event.preventDefault()
        $event.stopPropagation()
      }
      if (typeof action !== 'object') {
        return
      }
      if (typeof action.original !== 'function') {
        return
      }
      action.original.call(this, { $event, field, ...parameters })
    },
    /**
     * @param {string} name
     */
    fieldFocus (name) {
      if (!this.components[name]) {
        return
      }
      const field = this.components[name]
      const ref = this.generateComponentRef(field)
      const component = this.getComponentByRef(ref)
      if (!component) {
        return
      }
      const focusable = ['focus', 'show']
      let done = false
      focusable.forEach((method) => {
        if (done) {
          return
        }
        if (component[method] && typeof component[method] === 'function') {
          done = true
          window.setTimeout(component[method], 300)
        }
      })
    }
  }
}
