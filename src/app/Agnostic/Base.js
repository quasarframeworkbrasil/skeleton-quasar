import components from 'src/settings/components'
import { displayKey, primaryKey } from 'src/settings/schema'
import { clone } from 'src/app/Util/general'
import { SCOPES, scopes } from 'src/app/Agnostic/enum'
import $lang from 'src/lang'

/**
 * @class {Base}
 */
export default class Base {
  // http://jsfiddle.net/wilcorrea/q6m35asu

  /**
   * @type {string}
   */
  static domain = ''

  /**
   * @type {string}
   */
  static path = ''

  /**
   * @type {Array}
   */
  static mixins = []

  /**
   * @type {Object}
   */
  static buttons = {
    color: 'white',
    textColor: 'grey-10'
  }

  /**
   * @type {string}
   */
  primaryKey = primaryKey

  /**
   * @type {string}
   */
  displayKey = displayKey

  /**
   * @type {Http|OrderService}
   */
  service = undefined

  /**
   * @type {String[]}
   */
  scopes = []

  /**
   * @type {Object}
   */
  table = {}

  /**
   * @type {Object}
   */
  form = {}

  /**
   * @type {Object}
   */
  components = components

  /**
   * @type {string}
   */
  is = 'input'

  /**
   * @type {Array}
   */
  basics = [
    { name: 'createdAt', type: 'datetime' },
    { name: 'updatedAt', type: 'datetime' },
    { name: 'deletedAt', type: 'datetime' },
    { name: 'createdBy', type: 'user' },
    { name: 'updatedBy', type: 'user' },
    { name: 'deletedBy', type: 'user' }
  ]

  /**
   * @type {string}
   * @private
   */
  __currentField = ''

  /**
   * @param {Object} options
   * @returns {Schema}
   */
  static build (options = {}) {
    // noinspection JSValidateTypes
    return new this(options)
  }

  /**
   * @param {Object} options
   */
  constructor (options = {}) {
    this.options = options

    this.__loaded = {}

    this.__hooks = {}
    this.__fields = {}
    this.__actions = {}
    this.__groups = {}

    this.scopes = this.initScopes()

    this.init()

    // noinspection JSUnresolvedVariable
    if (this.defaults && typeof this.defaults === 'function') {
      // noinspection JSUnresolvedFunction
      this.defaults()
    }

    // noinspection JSUnresolvedVariable
    if (this.construct && typeof this.construct === 'function') {
      // noinspection JSUnresolvedFunction
      this.construct()

      this.basics.forEach((element, index) => {
        if (this.__fields[element.name]) {
          return
        }

        // noinspection JSUnresolvedFunction
        this.addField(element.name)
          .fieldScopes([SCOPES.SCOPE_VIEW])
          .fieldAppendAttrs({ borderLess: true, printable: true })
          .fieldFormDisabled()
          .fieldFormHidden()
          .fieldFormWidth(index === 0 || index === 3 ? 34 : 33)
          .fieldFormOrder(200 + index)
          .setType(element.type)
      })

      return
    }

    throw new Error('Invalid `construct` method on Schema instance')
  }

  /**
   */
  init () {
    this.constructor.mixins.forEach((mixin) => this.mixin(mixin))
  }

  /**
   * @return {Array}
   */
  initScopes () {
    return scopes()
  }

  /**
   * @param {Object} mixin
   */
  mixin (mixin) {
    if (typeof mixin !== 'object') {
      return
    }
    for (let fragment in mixin) {
      if (this[fragment]) {
        continue
      }
      Base.prototype[fragment] = mixin[fragment]
    }
  }

  /**
   * @param {String|Array} key
   * @param {string} [fallback]
   * @returns {String|Object}
   */
  $lang (key, fallback = '') {
    if (typeof key === 'string') {
      key = [key, `domains.${this.constructor.domain}.${key}`]
    }
    return $lang(key, fallback)
  }

  /**
   * @returns {Http}
   */
  $service () {
    if (this.options && this.options.offline) {
      return this.service.build(this.options.offline)
    }
    return this.service.instance()
  }

  /**
   * @param {*} element
   * @param {Function} action
   * @returns {*}
   */
  $clone (element, action = (value) => value) {
    return clone(element, action)
  }

  /**
   * @param {string} component
   * @returns {this}
   */
  setComponent (component) {
    const properties = this.components[component]
    if (!properties) {
      this.setIs(component)
      return this
    }
    this.setIs(properties.is)
    this.setParseOutput(properties.parseOutput)
    this.setParseInput(properties.parseInput)
    this.setAttrs(properties.attrs)
    this.setListeners(properties.listeners)
    return this
  }

  /**
   * @param {string|Object} component
   * @returns {this}
   */
  setIs (component) {
    const name = this.__currentField
    const field = this.__fields[name]
    field.is = component
    return this
  }

  /**
   * @param {Function} parseOutput
   * @returns {this}
   */
  setParseOutput (parseOutput) {
    const name = this.__currentField
    const field = this.__fields[name]
    field.$parseOutput = parseOutput
    return this
  }

  /**
   * @param {Function} parseInput
   * @returns {this}
   */
  setParseInput (parseInput) {
    const name = this.__currentField
    const field = this.__fields[name]
    field.$parseInput = parseInput
    return this
  }

  /**
   * @param {string} type
   * @returns {this}
   */
  setType (type) {
    const $key = this.__currentField
    this.__fields[$key].$type = type
    return this
  }

  /**
   * @param {string} chars
   * @returns {this}
   */
  setChars (chars) {
    const name = this.__currentField
    const field = this.__fields[name]
    field.chars = chars
    return this
  }

  /**
   * @param {Object} layout
   * @returns {this}
   */
  setLayout (layout) {
    const name = this.__currentField
    const field = this.__fields[name]
    this.__fields[name].$layout = Object.assign(field.$layout, layout)
    return this
  }

  /**
   * @return {Object}
   */
  getLayout () {
    return this.__fields[this.__currentField].$layout
  }

  /**
   * @param {Object} attrs
   * @returns {this}
   */
  setAttrs (attrs) {
    const name = this.__currentField
    const field = this.__fields[name]
    this.__fields[name].attrs = Object.assign(field.attrs, attrs || {})
    return this
  }

  /**
   * @return {Object}
   */
  getAttrs () {
    return this.__fields[this.__currentField].attrs
  }

  /**
   * @param {Object} listeners
   * @returns {this}
   */
  setListeners (listeners) {
    const name = this.__currentField
    const field = this.__fields[name]
    this.__fields[name].on = Object.assign(field.on, listeners || {})
    return this
  }

  /**
   * @return {Object}
   */
  getListeners () {
    return this.__fields[this.__currentField].on
  }

  /**
   * @param {string} event
   * @param {Function} callable
   * @param {Boolean} reset
   * @returns {this}
   */
  setOn (event, callable, reset = false) {
    const name = this.__currentField
    if (!this.__fields[name].on[event] || reset) {
      this.__fields[name].on[event] = []
    }
    this.__fields[name].on[event].push(callable)
    return this
  }
}
