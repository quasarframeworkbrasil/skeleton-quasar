import { helpers } from 'vuelidate/lib/validators'
import { withValidation } from 'src/app/index'

/**
 */
export default {
  /**
   * @param {string} alias
   * @param {Function|Object|Array|number|string} options
   * @returns {Schema}
   */
  validationAdd (alias, options) {
    const name = this.__currentField
    this.__fields[name].$validations[alias] = options
    return this
  },
  /**
   * Register custom validator to field
   * @param {string} alias
   * @param {Function} handler
   * @returns {*|Schema}
   */
  validationAs (alias, handler) {
    return this.validationAdd(alias, withValidation(handler))
  },
  /**
   * Requires non-empty data. Checks for empty arrays and strings containing only whitespaces.
   * @param {Boolean} required
   * @returns {Schema}
   */
  validationRequired (required = true) {
    return this.validationAdd('required', required)
  },
  /**
   * Requires non-empty data only if provided property or predicate is true.
   * @params locator
   */
  validationRequiredIf (locator) {
    return this.validationAdd('requiredIf', locator)
  },
  /**
   * Requires non-empty data only if provided property or predicate is true.
   * @params {Function} criteria
   */
  validationRequiredWhen (criteria) {
    return this.validationAdd('requiredIf', function (value) {
      const validate = criteria.call(this)
      if (!validate) {
        return true
      }
      return !!value
    })
  },
  /**
   * Requires non-empty data only if provided property or predicate is false.
   * @params locator
   */
  validationRequiredUnless (locator) {
    return this.validationAdd('requiredUnless', locator)
  },
  /**
   * Requires the input to have a minimum specified length, inclusive. Works with arrays.
   * @param {Number} minLength
   * @returns {Schema}
   */
  validationMinLength (minLength = 3) {
    return this.validationAdd('minLength', [minLength])
  },
  /**
   * Requires the input to have a maximum specified length, inclusive. Works with arrays.
   * @param {Number} maxLength
   * @returns {Schema}
   */
  validationMaxLength (maxLength = 10) {
    return this.validationAdd('maxLength', [maxLength])
  },
  /**
   * Requires entry to have a specified minimum numeric value or Date.
   * @params min
   */
  validationMinValue (min) {
    return this.validationAdd('minValue', [min])
  },
  /**
   * Requires entry to have a specified maximum numeric value or Date.
   * @params max
   */
  validationMaxValue (max) {
    return this.validationAdd('maxValue', [max])
  },
  /**
   * Checks if a number or Date is in specified bounds. Min and max are both inclusive.
   * @params min
   * @params max
   */
  validationBetween (min, max) {
    return this.validationAdd('between', [min, max])
  },
  /**
   * Accepts only alphabet characters.
   */
  validationAlpha () {
    return this.validationAdd('alpha', true)
  },
  /**
   * Accepts only alphanumerics.
   */
  validationAlphaNum () {
    return this.validationAdd('alphaNum', true)
  },
  /**
   * Accepts only numerics.
   */
  validationNumeric () {
    return this.validationAdd('numeric', true)
  },
  /**
   * Accepts positive and negative integers.
   */
  validationInteger () {
    return this.validationAdd('integer', true)
  },
  /**
   * Accepts positive and negative decimal numbers.
   */
  validationDecimal () {
    return this.validationAdd('decimal', true)
  },
  /**
   * Accepts valid email addresses. Keep in mind you still have to carefully verify it on your server, as it is impossible to tell if the address is real without sending verification email.
   */
  validationEmail () {
    return this.validationAdd('email', true)
  },
  /**
   * Accepts valid IPv4 addresses in dotted decimal notation like 127.0.0.1.
   */
  validationIpAddress () {
    return this.validationAdd('ipAddress', true)
  },
  /**
   * Accepts valid MAC addresses like 00:ff:11:22:33:44:55. Don't forget to call it macAddress(), as it has optional parameter. You can specify your own separator instead of ':'. Provide empty separator macAddress('') to validate MAC addresses like 00ff1122334455.
   * @params separator=':'
   */
  validationMacAddress () {
    return this.validationAdd('macAddress', true)
  },
  /**
   * Test if value is a password
   */
  validationPassword () {
    return this.validationAdd('password', helpers.regex('password', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#$^+=!*()@%&]?).{6,}$/))
  },
  /**
   * Checks for equality with a given property.
   * @params locator
   */
  validationSameAs (locator) {
    return this.validationAdd('sameAs', locator)
  },
  /**
   * Accepts only URLs.
   */
  validationUrl () {
    return this.validationAdd('url', true)
  },
  /**
   * Passes when at least one of provided validators passes.
   * @params validators...
   */
  validationOr () {},
  /**
   * Passes when all of provided validators passes.
   * @params validators...
   */
  validationAnd () {},
  /**
   * Passes when provided validator would not pass, fails otherwise. Can be chained with other validators like not(sameAs('field')).
   * @params validator
   */
  validationNot () {},
  /**
   * Not really a validator, but a validator modifier. Adds a $params object to the provided validator. Can be used on validation functions or even entire nested field validation objects. Useful for creating your own custom validators.
   * @params $params, validator
   */
  validationWithParams () {},
  /**
   * @return this
   */
  validationClear () {
    const name = this.__currentField
    this.__fields[name].$validations = {}
    return this
  },
  /**
   * @param {string} validation
   * @return this
   */
  validationRemove (validation) {
    const name = this.__currentField
    delete this.__fields[name].$validations[validation]
    return this
  }
}
