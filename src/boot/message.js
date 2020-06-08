import { toast, success, error } from 'src/app/message'

/**
 * @param Vue
 * @returns {Object}
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$message', {
    get () {
      return {
        toast, success, error
      }
    }
  })
}
