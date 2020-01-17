import AuthService from 'src/app/Services/Http'
import { promisify } from 'src/app/Util/general'

/**
 * @returns {Promise}
 */
export function me () {
  if (process.env.VUE_APP_FAKE_DATA) {
    const { data } = require('src/.fake/api.v1.auth.me.json')
    return promisify(data)
  }
  return AuthService.build().get('/api/v1/auth/me').then(({ data }) => data)
}
