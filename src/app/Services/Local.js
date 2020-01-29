import http from 'src/settings/local'

import Http from './Http'

/**
 * @class {Local}
 */
export default class Local extends Http {
  /**
   * @param {AxiosInstance} client
   */
  constructor (client = undefined) {
    super(client || http)
  }
}
