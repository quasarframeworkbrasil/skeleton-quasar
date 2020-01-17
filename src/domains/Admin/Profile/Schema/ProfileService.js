import Rest from 'src/app/Services/Rest'
import { resource } from '../settings'

/**
 * @type {ProfileService}
 */
export default class ProfileService extends Rest {
  /**
   * @type {String}
   */
  resource = resource
}
