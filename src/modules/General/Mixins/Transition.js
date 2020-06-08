/**
 * @mixin {Transition}
 */
export default {
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    transitionName () {
      return this.$store.getters['dashboard/getTransition']
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Element} element
     */
    beforeLeave (element) {
      this.prevHeight = window.getComputedStyle(element).height
    },
    /**
     * @param {Element} element
     */
    enter (element) {
      const { height } = window.getComputedStyle(element)

      element.style.height = this.prevHeight

      window.setTimeout(() => {
        element.style.height = height
      })
    },
    /**
     * @param {Element} element
     */
    afterEnter (element) {
      element.style.height = 'auto'
    }
  }
}
