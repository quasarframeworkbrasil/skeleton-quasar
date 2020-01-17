import util from 'src/app/Util'

/**
 * @param Vue
 */
export default ({ Vue }) => {
  /**
   */
  Object.defineProperty(Vue.prototype, '$util', {
    get () {
      const base = util(this)
      if (this.$options && this.$options.util) {
        return Object.assign({}, base, this.$options.util)
      }
      if (this.$props && this.$props.util) {
        return Object.assign({}, base, this.$props.util)
      }
      return base
    }
  })

  /**
   */
  Object.defineProperty(Vue.prototype, '$user', {
    get () {
      return (property = '') => {
        if (!property) {
          return this.$store.getters['auth/getUser']
        }
        return this.$util.get(this.$store.getters['auth/getUser'], property)
      }
    }
  })
}
