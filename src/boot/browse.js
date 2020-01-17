import { browse } from 'src/app/Util/general'

/**
 * @param {Vue} Vue
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$browse', {
    get () {
      return browse
    }
  })
}
