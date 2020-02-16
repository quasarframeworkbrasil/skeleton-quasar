import { getLocale } from 'src/lang'

/**
 * @param {boolean} native
 * @returns {Object}
 */
const currency = (native = true) => {
  const style = native ? 'style' : 'mode'
  const currencyDisplay = native ? 'currencyDisplay' : 'display'
  return {
    [style]: 'currency',
    [currencyDisplay]: 'symbol',
    currency: process.env.VUE_APP_CURRENCY
  }
}

/**
 * @param value
 * @returns {string|*}
 */
export const currencyParseOutput = (value) => {
  if (typeof value !== 'string') {
    return value
  }
  return Number(value.replace(/\./g, '').replace(/,/g, '.'))
}

/**
 * @param value
 * @returns {string|*}
 */
export const currencyParseInput = (value) => {
  if (typeof value !== 'number') {
    return value
  }
  const formatter = new Intl.NumberFormat(getLocale(), currency())
  // noinspection JSUnresolvedFunction
  return formatter.format(value)
}

/**
 * @type {{is: string, attrs: {name: string}}}
 */
export const home = { is: 'q-icon', attrs: { name: 'important_devices' } } // home_work, desktop_windows

/**
 * @type {number}
 */
export const tableOuterHeight = 250

/**
 * @type {number}
 */
export const tableMinRowsPerPage = 10

/**
 * @type {Object}
 */
export const attrs = { dense: true, clearable: true, outlined: true, uppercase: false, useReadonly: true }

/**
 * @param value
 * @returns {string}
 */
export const parseOutputUpperCase = (value) => typeof value === 'string' ? value.toUpperCase() : value

/**
 * @type {Object}
 */
export default {
  input: {
    is: 'q-input',
    attrs: { maxlength: 255, ...attrs, uppercase: true },
    parseOutput: parseOutputUpperCase
  },
  plan: {
    is: 'q-input',
    attrs: { maxlength: 255, ...attrs },
    parseOutput: undefined
  },
  number: {
    is: 'q-input',
    attrs: { type: 'number', ...attrs },
    parseOutput: undefined
  },
  password: {
    is: 'q-input',
    attrs: { type: 'password', maxlength: 255, ...attrs },
    parseOutput: undefined
  },
  email: {
    is: 'q-input',
    attrs: { type: 'email', maxlength: 255, ...attrs },
    parseOutput: undefined
  },
  text: {
    is: 'q-input',
    attrs: { type: 'textarea', rows: 4, maxlength: 4000, ...attrs },
    parseOutput: parseOutputUpperCase
  },
  checkbox: {
    is: 'q-checkbox',
    attrs: { ...attrs, useReadonly: false, 'indeterminate-value': 'maybe' },
    parseOutput: undefined
  },
  radio: {
    is: 'q-option-group',
    attrs: { inline: true, ...attrs, useReadonly: false },
    parseOutput: undefined
  },
  select: {
    is: 'q-select',
    attrs: { popupContentClass: 'uppercase', ...attrs, uppercase: true },
    parseOutput: undefined
  },
  toggle: {
    is: 'q-toggle',
    attrs: { ...attrs, useReadonly: false },
    parseOutput: undefined
  },
  remote: {
    is: 'AppSelectRemoteSingle',
    attrs: { ...attrs, uppercase: true },
    parseOutput: undefined
  },
  remoteMultiple: {
    is: 'AppSelectRemoteMultiple',
    attrs: { ...attrs, uppercase: true },
    parseOutput: undefined
  },
  date: {
    is: 'AppDate',
    attrs: {
      mask: '##/##/####',
      format: 'YYYY-MM-DD',
      display: 'DD/MM/YYYY',
      ...attrs
    },
    parseOutput: undefined
  },
  datetime: {
    is: 'AppDatetime',
    attrs: {
      mask: '##/##/#### ##:##',
      format: 'YYYY-MM-DD HH:mm',
      display: 'DD/MM/YYYY HH:mm',
      ...attrs
    },
    parseOutput: undefined
  },
  currency: {
    is: 'q-decimal',
    attrs: {
      maxlength: 14,
      inputStyle: 'text-align: right',
      hideBottomSpace: true,
      ...attrs,
      clearable: false,
      lang: getLocale(),
      ...currency(false)
    },
    parseOutput: undefined
  },
  image: {
    is: 'AppCloudinaryImage',
    parseOutput: undefined
  },
  file: {
    is: 'AppFile',
    parseOutput: undefined
  }
}
