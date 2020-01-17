import AuthService from 'src/app/Services/Http'

/**
 * @returns {Promise}
 */
export function me () {
  return AuthService.build().get('/api/v1/auth/me').then(({ data }) => data)
}
