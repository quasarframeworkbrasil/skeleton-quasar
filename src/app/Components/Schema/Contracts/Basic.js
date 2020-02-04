import Trigger from 'src/app/Components/Schema/Contracts/Hook'
import Button from 'src/app/Components/Schema/Contracts/Button'
import Dialog from 'src/app/Components/Schema/Contracts/Dialog'
import Field from 'src/app/Components/Schema/Contracts/Field'
import Action from 'src/app/Components/Schema/Contracts/Action'
import Operation from 'src/app/Components/Schema/Contracts/Operation'
import SchemaButtons from 'src/app/Components/Schema/Buttons/SchemaButtons'

/**
 * @typedef {Object} Basic
 */
export default {
  /**
   */
  mixins: [
    Trigger, Button, Dialog, Field, Action, Operation
  ],
  /**
   */
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  /**
   * @returns {Object}
   */
  data: () => ({
    customActionPath: undefined
  }),
  /**
   */
  computed: {
    /**
     */
    debuggers () {
      return this.$store.getters['app/getDebuggers']
    }
  },
  /**
   */
  methods: {
    /**
     * @override
     */
    initialize () {
      // will override by specialists
    },
    /**
     * @param {Function} h
     * @param {string} position
     * @param {Object} context
     * @param {Object} override
     * @returns {*}
     */
    renderSchemaButtons (h, position, context, override = {}) {
      const attrs = {
        scope: this.scope,
        locked: this.locked,
        buttons: this.buttons,
        context: context,
        position: position,
        override: override
      }
      const data = {
        attrs
      }
      return h(SchemaButtons, data)
    },
    /**
     * @param {Function} h
     * @param {string} position
     * @param {Object} context
     * @returns {*}
     */
    renderSchemaButtonsCompact (h, position, context) {
      const override = { dense: true, label: '', flat: true }
      return this.renderSchemaButtons(h, position, context, override)
    },
    /**
     * @param {Object} field
     */
    generateComponentRef (field) {
      return `form:component-${field.$layout.formOrder}`
    },
    /**
     * @param {string} ref
     * @returns {*}
     */
    getComponentByRef (ref) {
      const component = this.findComponentByRef(ref)
      if (!component) {
        return null
      }
      if (Array.isArray(component) && component[0]) {
        return component[0]
      }
      return component
    },
    /**
     * @param {string} ref
     * @return {Vue | Element | Vue[] | Element[] | undefined}
     */
    findComponentByRef (ref) {
      const reduce = (accumulator, formBody) => {
        if (accumulator) {
          return accumulator
        }
        if (!formBody) {
          return accumulator
        }
        if (formBody.$refs[ref]) {
          accumulator = formBody.$refs[ref]
        }
        return accumulator
      }
      return Object.values(this.$refs).reduce(reduce, undefined)
    },
    /**
     * @returns {*}
     */
    getActionPath () {
      return this.customActionPath || this.path
    }
  }
}
