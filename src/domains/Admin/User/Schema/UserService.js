import Rest from 'src/app/Services/Rest'

/**
 * @type {UserService}
 */
export default class UserService extends Rest {
  /**
   * @type {String}
   */
  resource = '/admin/user'
}
