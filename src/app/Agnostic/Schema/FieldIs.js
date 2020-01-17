import { yesNo } from 'src/app/Agnostic/options'
import { primaryKey } from 'src/settings/schema'
import { booleanFormatter, dateFormatter, optionFormatter, optionsFormatter } from 'src/app/Util/formatter'
import { currencyParseInput } from 'src/settings/components'

/**
 * @typedef {FieldIs}
 */
export default {
  /**
   * @param {Object} options
   * @returns {Schema}
   */
  fieldAsPrimaryKey (options = {}) {
    options = {
      tableWith: '80px',
      formWidth: 100,
      tableShow: false,
      key: primaryKey,
      label: '',
      hiddenForm: true,
      ...options
    }
    return this.addField(options.key, options.label, String)
      .fieldTableWidth(options.tableWith)
      .fieldFormWidth(options.formWidth)
      .fieldTableShow(options.tableShow)
      .fieldFormHidden(options.hiddenForm)
      .fieldFormDisabled(true)
      .fieldPrimaryKey()
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldAsZip (attrs = {}) {
    this.setAttrs({ mask: '#####-###', unmaskedValue: true, placeholder: 'ex.: 39500-201' })
    this.setType('string')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldAsPhone (attrs = {}) {
    this.setAttrs({ mask: '(##) ####-####', unmaskedValue: true, placeholder: 'ex.: (21) 3289-3950' })
    this.setType('string')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldAsCell (attrs = {}) {
    this.setAttrs({ mask: '(##) #####-####', unmaskedValue: true, placeholder: 'ex.: (44) 98956-3049' })
    this.setType('string')
    return this
  },

  /**
   * Mask tokens:
   * |------|----------------------------------------------------|
   * | #    | Numeric                                            |
   * |------|----------------------------------------------------|
   * | S    | Letter, a to z, case insensitive                   |
   * | N    | Alphanumeric, case insensitive for letters         |
   * | A    | Letter, transformed to uppercase                   |
   * | a    | Letter, transformed to lowercase                   |
   * | X    | Alphanumeric, transformed to uppercase for letters |
   * | x    | Alphanumeric, transformed to lowercase for letters |
   * |------|----------------------------------------------------|
   *
   * @param {string} mask
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldAsMasked (mask, attrs = {}) {
    let { placeholder } = attrs
    if (!placeholder) {
      placeholder = mask.replace(/#/g, '9')
    }
    this.setAttrs({
      mask,
      unmaskedValue: true,
      ...attrs,
      placeholder: `ex.: ${placeholder}`
    })
    this.setType('string')
    return this
  },

  /**
   * @param {number} maxlength
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsInput (maxlength = 255, attrs = {}) {
    this.setComponent('input')
    this.setAttrs({ ...attrs, maxlength })
    this.setType('string')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsNumber (attrs = {}) {
    this.setComponent('number')
    this.setAttrs({ ...attrs })
    this.setLayout({ tableWhere: 'eq' })
    this.setType('number')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsPassword (attrs = {}) {
    this.setComponent('password')
    this.setAttrs({ ...attrs })
    this.setType('string')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsEmail (attrs = {}) {
    this.setComponent('email')
    this.setAttrs({ ...attrs })
    this.setType('string')
    return this
  },

  /**
   * @param {Number} rows
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsText (rows = 4, attrs = {}) {
    this.setComponent('text')
    this.setAttrs({ ...attrs, rows })
    this.setType('text')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsCheckbox (attrs = {}) {
    this.setComponent('checkbox')
    if (!attrs.label) {
      attrs.label = this.$lang(`domains.${this.constructor.domain}.fields.${this.__currentField}.info`)
    }
    this.setAttrs({ ...attrs })
    this.setLayout({ tableFormat: booleanFormatter })
    this.setType('boolean')
    return this
  },

  /**
   * @param {Array} options
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsRadio (options = undefined, attrs = {}) {
    if (!Array.isArray(options)) {
      options = yesNo
    }
    this.setComponent('radio')
    this.setAttrs({ ...attrs, options })
    this.setLayout({ tableFormat: optionsFormatter(options) })
    this.setType('select')
    return this
  },

  /**
   * @param {Array} options
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsSelect (options = undefined, attrs = {}) {
    if (!options) {
      options = this.$lang(`domains.${this.constructor.domain}.fields.${this.__currentField}.options`)
    }
    this.setComponent('select')
    this.setAttrs({
      mapOptions: true,
      emitValue: true,
      useChips: false,
      clearable: true,
      ...attrs,
      options,
      original: options
    })
    if (attrs.allowNew) {
      this.setAttrs({ useInput: true, useChips: true })
      this.setOn('filter', function ({ $event, field, parameters }) {
        const original = field.attrs.original
        const update = parameters[0]
        update(() => {
          if ($event === '') {
            field.attrs.options = original
            return
          }
          const needle = $event.toLowerCase()
          field.attrs.options = original.filter(
            (candidate) => candidate.toLowerCase().indexOf(needle) > -1
          )
        })
      })
      this.setOn('new-value', function ({ $event, field, parameters }) {
        const done = parameters[0]
        if ($event.length > 2) {
          if (!field.attrs.options.includes($event)) {
            done($event, 'add-unique')
          }
        }
      })
    }
    this.setLayout({ tableFormat: optionsFormatter(options), tableWhere: 'eq' })
    this.setType('select')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsSelectRemote (attrs = {}) {
    this.setComponent('remote')
    this.setAttrs(attrs)
    this.setLayout({ tableFormat: optionFormatter(attrs.keyLabel), tableWhere: 'eq' })
    this.setType('select')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsSelectRemoteMultiple (attrs = {}) {
    this.setComponent('remoteMultiple')
    this.setAttrs(attrs)
    this.setType('array')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsToggle (attrs = {}) {
    this.setComponent('toggle')
    this.setAttrs({ ...attrs })
    this.setLayout({ tableFormat: booleanFormatter })
    this.setType('boolean')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsDate (attrs = {}) {
    this.setComponent('date')
    this.setAttrs({ ...attrs })
    this.setType('date')
    this.__configureDateTableFormat()
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsDatetime (attrs = {}) {
    this.setComponent('datetime')
    this.setAttrs({ ...attrs })
    this.setType('datetime')
    this.__configureDateTableFormat()
    return this
  },

  /**
   * @private
   */
  __configureDateTableFormat () {
    const name = this.__currentField
    const { display, format } = this.__fields[name].attrs
    this.setLayout({
      tableFormat: (value) => dateFormatter(value, display, format) || ''
    })
  },

  /**
   * @param {number} maxlength
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsInputPlan (maxlength = 255, attrs = {}) {
    this.setComponent('plan')
    this.setAttrs({ ...attrs, maxlength })
    this.setType('string')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsArray (attrs = {}) {
    this.setIs('app-array')
    this.setAttrs({ ...attrs })
    this.setType('array')
    return this
  },

  /**
   * @param {Object} attrs
   * @returns {Schema}
   */
  fieldIsCurrency (attrs = {}) {
    this.setComponent('currency')
    this.setAttrs({ value: 0, ...attrs })
    this.setLayout({
      tableFormat: currencyParseInput,
      tableAlign: 'right'
    })
    this.setType('currency')
    return this
  },

  /**
   * @param {Function} click
   * @param {Object} options
   * @returns {Schema}
   */
  fieldIsButton (click, options = {}) {
    this.setIs('AppButton')
    if (!options.label) {
      options.label = `buttons.${this.__currentField}.label`
    }
    options.label = this.$lang(options.label)
    const attrs = { ...options, click }
    this.setAttrs(attrs)
    return this
  }
}
