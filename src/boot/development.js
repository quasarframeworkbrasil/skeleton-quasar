/**
 * @param Vue
 * @returns {Vue}
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$dev', {
    get () {
      /* return process.env.VUE_APP_DEV */
      return process.env.NODE_ENV !== 'production'
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$log', {
    get () {
      return process.env.NODE_ENV !== 'production' ? console.log : () => undefined
    }
  })
}
