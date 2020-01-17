/**
 * @type {Object}
 */
import { read } from 'src/app/Util/storage'

export default {
  token: read('token'),
  user: read('user')
}
