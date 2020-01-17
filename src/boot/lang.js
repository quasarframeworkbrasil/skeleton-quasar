import $lang from 'src/lang'

/**
 * @param {Vue} Vue
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$lang', {
    get () {
      /**
       * @param {string|array} path
       * @param {string} fallback
       * @returns {*}
       */
      return (path, fallback = '') => {
        if (typeof path === 'string') {
          fallback = path
          path = [path, `domains.${this.domain}.${path}`]
        }
        return $lang(path, fallback)
      }
    }
  })
}
