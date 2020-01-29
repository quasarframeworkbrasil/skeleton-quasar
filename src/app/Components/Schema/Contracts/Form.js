import FormComponents from 'src/app/Components/Schema/Contracts/Form/FormComponents'
import FormError from 'src/app/Components/Schema/Contracts/Form/FormError'
import FormFetch from 'src/app/Components/Schema/Contracts/Form/FormFetch'
import FormField from 'src/app/Components/Schema/Contracts/Form/FormField'
import FormRecord from 'src/app/Components/Schema/Contracts/Form/FormRecord'
import FormValidation from 'src/app/Components/Schema/Contracts/Form/FormValidation'
import { fieldsReorder } from 'src/app/Agnostic/Helper'

/**
 * @typedef {Object} Form
 */
export default {
  /**
   */
  mixins: [
    FormComponents, FormError, FormFetch, FormField, FormRecord, FormValidation
  ],
  /**
   */
  data: () => ({
    components: {},
    record: {},
    payload: {},
    grouping: {},
    errors: {}
  }),
  /**
   */
  methods: {
    /**
     */
    initialize () {
      this.record = {}
      this.components = {}

      this.renderComponents()
      this.renderErrors()
      this.renderRecord()
      this.renderButtons()
    },
    /**
     * @param {Schema} schema
     * @param {string} fail
     * @returns {boolean}
     */
    formCheckIntegrity (schema, fail) {
      this.$v.$touch()
      if (this.$v.$error || this.hasErrors) {
        this.$message.error(this.$lang(fail))
        return false
      }
      if (this.debuggers) {
        window.alert(JSON.stringify(this.getRecord()))
      }
      return !!schema.service
    },
    /**
     * @param {boolean} formHidden
     * @return {this}
     */
    $fieldFormHidden (formHidden = true) {
      return this.$setLayout('formHidden', formHidden)
    },
    /**
     * @param {number} formWidth
     * @return {this}
     */
    $fieldFormWidth (formWidth) {
      return this.$setLayout('formWidth', formWidth)
    },
    /**
     * @param {number} formHeight
     * @return {this}
     */
    $fieldFormHeight (formHeight) {
      return this.$setLayout('formHeight', formHeight)
    },
    /**
     * @param {string} property
     * @param {*} value
     * @return {this}
     */
    $fieldAttr (property, value) {
      return this.$setAttr(property, value)
    },
    /**
     * @param {boolean} disable
     * @return {this}
     */
    $fieldFormDisabled (disable = true) {
      return this.$setAttr('disable', disable)
    },
    /**
     * @param {number} formOrder
     * @param {boolean} updateOthers
     * @return {this}
     */
    $fieldFormOrder (formOrder, updateOthers = false) {
      this.$setLayout('formOrder', formOrder)
      if (updateOthers) {
        fieldsReorder(this.components, this.__currentField, 'formOrder', formOrder)
      }
      return this
    }
  }
}
