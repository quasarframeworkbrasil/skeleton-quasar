import http from 'src/settings/http'
import { is, serialize } from 'src/app/Util/general'
import { searchKey } from 'src/settings/schema'

/**
 * @type {Http}
 */
export default class Http {
  /**
   * @type {string}
   */
  path = '/'

  /**
   * @type {Object}
   */
  __fixedValue = {}

  /**
   * @type {Object}
   */
  __fixedFilter = {}

  /**
   * @type {boolean}
   */
  offline = false

  /**
   * @param {boolean} offline
   * @param {AxiosInstance} client
   * @returns {this}
   */
  static instance (offline = false, client) {
    if (!this.__instance) {
      this.__instance = new this(offline, client)
    }
    return this.__instance
  }

  /**
   * @param {boolean} offline
   * @param {AxiosInstance} client
   * @returns {this}
   */
  static build (offline = false, client) {
    return new this(offline, client)
  }

  /**
   * @param {boolean} offline
   * @param {AxiosInstance} client
   */
  constructor (offline = false, client) {
    this.offline = offline
    this.client = client || http
  }

  /**
   * @param {string} url
   * @param {Record<any, string>} data
   * @param {Record<string, any>} config
   * @returns {Promise<*>}
   */
  post (url = '', data, config) {
    const path = this.parseUrl(this.path, url)
    const payload = this.parseData(data)
    return this.client.post(path, payload, config)
  }

  /**
   * @param {string} url
   * @param {Record<string, any>} config
   * @returns {Promise<*>}
   */
  get (url = '', config) {
    const path = this.parseUrl(this.path, url, true)
    return this.client.get(path, config)
  }

  /**
   * @param {string} url
   * @param {Record<string, any>} config
   * @returns {Promise<*>}
   */
  head (url, config) {
    const path = this.parseUrl(this.path, url, true)
    return this.client.head(path, config)
  }

  /**
   * @param {string} url
   * @param {Record<any, string>} data
   * @param {Record<string, any>} config
   * @returns {Promise<*>}
   */
  put (url, data, config) {
    const path = this.parseUrl(this.path, url)
    const payload = this.parseData(data)
    return this.client.put(path, payload, config)
  }

  /**
   * @param {string} url
   * @param {Record<any, string>} data
   * @param {Record<string, any>} config
   * @returns {Promise<*>}
   */
  patch (url, data, config) {
    const path = this.parseUrl(this.path, url)
    const payload = this.parseData(data)
    return this.client.patch(path, payload, config)
  }

  /**
   * @param {string} url
   * @param {Record<string, any>} config
   * @returns {Promise<*>}
   */
  delete (url, config) {
    const path = this.parseUrl(this.path, url, true)
    return this.client.delete(path, config)
  }

  /**
   * @param {Record<string, any>} fixedValue
   * @returns {this}
   */
  fixedValue (fixedValue) {
    this.__fixedValue = fixedValue
    return this
  }

  /**
   * @param {Record<string, any>} fixedFilter
   * @returns {this}
   */
  fixedFilter (fixedFilter) {
    this.__fixedFilter = fixedFilter
    return this
  }

  /**
   * @param {string} first
   * @param {string} last
   * @param {boolean} fixed
   * @returns {string}
   */
  parseUrl (first, last, fixed = false) {
    let path = `${first}${last}`.replace(/([^:]\/)\/+/g, '$1')

    const configure = (path, parameters) => {
      const fixed = serialize(parameters, searchKey)
      const separator = path.includes('?') ? '&' : '?'
      return `${path}${separator}${fixed}`
    }

    if (fixed && is(this.__fixedValue)) {
      path = configure(path, this.__fixedValue)
    }

    if (is(this.__fixedFilter)) {
      path = configure(path, this.__fixedFilter)
    }

    return path
  }

  /**
   * @param {Record<any, string>} record
   * @returns {Record<any, string>}
   */
  parseData (record) {
    if (is(this.__fixedValue)) {
      return { ...record, ...this.__fixedValue }
    }
    return record
  }
}
