/**
 * @mixin {View}
 */
export default {
  /**
   */
  data: () => ({
    bind: {
      columns: []
    }
  }),
  /**
   */
  methods: {
    /**
     * @param provide
     */
    updateBind (provide) {
      this.bind = {
        key: this.$util.uuid(),
        scope: this.$route.meta.scope,
        ...provide
      }
    },
    /**
     */
    init () {
      if (this.$options.schema) {
        this.updateBind(this.$options.schema.build().provide())
        return
      }
      if (this.$route.meta.schema) {
        this.updateBind(this.$route.meta.schema.build().provide())
        return
      }
      throw new Error(`No schema defined to ${this.$options.name}`)
    }
  },
  /**
   */
  watch: {
    '$route.fullPath' () {
      if (this.schema) {
        this.construct()
      }
    }
  },
  /**
   */
  created () {
    this.init()
  }
}
