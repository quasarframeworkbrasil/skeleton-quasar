import http from 'src/settings/http'

/**
 * @returns {Promise}
 */
export function me () {
  return http.get('/api/v1/auth/me').then(({ data }) => data)
}
