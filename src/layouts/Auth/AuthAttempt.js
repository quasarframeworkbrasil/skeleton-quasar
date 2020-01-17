import AuthService from 'src/domains/Auth/Service/AuthService'

export default {
  /**
   */
  service: AuthService.build(),
  /**
   */
  data: () => ({
    record: {},
    development: {},
    loading: false
  }),
  /**
   */
  methods: {
    /**
     */
    attemptFail () {
      // override
      console.warn('>>> override attemptFail')
    },
    /**
     */
    attempting () {
      // override
      console.warn('>>> override attempting')
    },
    /**
     * @param {Object} response
     */
    attemptSuccess (response) {
      // override
      console.warn('>>> override attemptSuccess')
    },
    /**
     */
    attemptError () {
      // override
      console.warn('>>> override attemptError')
    },
    /**
     */
    attempt () {
      this.$v.$touch()
      if (this.$v.$error) {
        this.attemptFail()
        return
      }
      this.setLoading(true)
      try {
        this.attempting()
          .then(this.attemptSuccess)
          .catch(this.attemptError)
          .finally(() => this.setLoading(false))
      } catch (e) {
        console.error(`You need implement 'attempting' and return a promise`)
      }
    },
    /**
     * @param {boolean} loading
     */
    setLoading (loading) {
      this.loading = !!loading
    },
    /**
     * @param {string} path
     */
    follow (path) {
      if (this.$route.query.redirect) {
        path = this.$route.query.redirect
      }
      this.$browse(path)
    },
    /**
     */
    fillRecordDevelopment () {
      Object.keys(this.development).forEach((key) => {
        this.record[key] = this.development[key]
      })
    }
  },
  /**
   */
  mounted () {
    if (!this.$dev && this.development && this.record) {
      return
    }
    this.fillRecordDevelopment()
  }
}
