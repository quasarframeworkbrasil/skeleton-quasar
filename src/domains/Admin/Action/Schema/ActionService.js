import Rest from 'src/app/Services/Rest'
import { resource } from '../settings'

/**
 * @type {ActionService}
 */
export default class ActionService extends Rest {
  /**
   * @type {String}
   */
  resource = resource
}
