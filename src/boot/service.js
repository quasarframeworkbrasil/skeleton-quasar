/**
 * @param Vue
 * @returns {Vue}
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$service', {
    get () {
      if (this.$options && this.$options.service) {
        return this.$options.service
      }
      if (this.service) {
        return this.service
      }
      throw new Error(`The component doesn't have a service`)
    }
  })
}
