import Http from 'src/app/Services/Http'
import { promisify } from 'src/app/Util/general'

/**
 * @type {AuthService}
 */
export default class AuthService extends Http {
  /**
   * @type {string}
   */
  path = ''

  /**
   * @param {boolean} offline
   * @param {AxiosInstance} client
   * @returns {this}
   */
  static instance (offline = false, client = undefined) {
    if (!this.__instance) {
      this.__instance = new this(offline, client)
    }
    return this.__instance
  }

  /**
   * @param {string} login
   * @param {string} password
   * @returns {Promise}
   */
  login (login, password) {
    if (process.env.VUE_APP_FAKE_DATA) {
      return promisify(require('src/.fake/api.v1.auth.login.json'))
    }
    return this.post(`/api/v1/auth/login`, { login, password })
  }

  /**
   */
  logout () {
    return this.get('/api/v1/auth/logout')
  }

  /**
   * @param {Object} form
   * @returns {Promise}
   */
  register (form) {
    return this.post(`/api/v1/auth/register`, form)
  }

  /**
   * @param {string} login
   * @returns {Promise}
   */
  remember (login) {
    return this.post(`/api/v1/auth/remember`, { login })
  }

  /**
   * @param {string} password
   * @param {string} confirm
   * @param {Object} payload
   * @returns {Promise}
   */
  confirm (password, confirm, payload) {
    return this.post(`/api/v1/auth/confirm`, Object.assign(payload, { password, confirm }))
  }

  /**
   * @param {string} activation
   * @returns {Promise}
   */
  activate (activation) {
    return this.get(`/api/v1/auth/activate/${activation}`)
  }

  /**
   * @param {string} token
   * @returns {Promise}
   */
  reset (token) {
    return this.get(`/api/v1/auth/reset/${token}`)
  }

  /**
   * @param {string} token
   * @returns {Promise}
   */
  state (token) {
    return this.get(`/api/v1/auth/state/${token}`)
  }

  /**
   * @param {string} vendor
   * @param {Object} payload
   * @returns {Promise}
   */
  info (vendor, payload) {
    return this.post(`/api/v1/auth/info/${vendor}`, { payload })
  }
}
