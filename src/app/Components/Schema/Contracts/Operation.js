/**
 * @mixin Operation
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Object} payload
     * @param {Function} success
     * @param {Function} noItems
     * @param {Function} tooManySelected
     */
    withRecord (payload, success, noItems = undefined, tooManySelected = undefined) {
      let { record, records } = payload
      if (!record && !(Array.isArray(records) && records.length)) {
        noItems ? noItems() : this.$alert(this.$lang(`agnostic.actions.view.noItems`))
        return
      }
      if (Array.isArray(records) && records.length) {
        if (records.length > 1) {
          tooManySelected ? tooManySelected() : this.$alert(this.$lang(`agnostic.actions.view.tooManySelected`))
          return
        }
        record = records[0]
      }
      success(record)
    },
    /**
     * @param {Object} payload
     * @param {Function} success
     * @param {Function} noItems
     */
    withRecords (payload, success, noItems = undefined) {
      let { record, records } = payload
      if (!record && !(Array.isArray(records) && records.length)) {
        noItems ? noItems() : this.$alert(this.$lang(`agnostic.actions.view.noItems`))
        return
      }
      if (record) {
        success(record)
        return
      }
      success(records, true)
    },
    /**
     */
    actionSchemaAttempt () {
      this.$q.loading.show()
    },
    /**
     * @param {Object} response
     * @param {string} success
     * @returns {string}
     */
    actionSchemaSuccess (response, success) {
      this.$q.loading.hide()
      if (this.debuggers) {
        window.alert(JSON.stringify(response))
      }
      let message = response.message
      if (!message) {
        message = this.$lang(success)
      }
      this.$message.success(message)
      let id = response[this.primaryKey]
      if (!id) {
        id = this.$util.get(response, 'data.ticket')
      }
      return id
    },
    /**
     * @param {Object} error
     * @param {string} fail
     */
    actionSchemaFail (error, fail) {
      this.$q.loading.hide()
      if (!error.response) {
        return Promise.reject(error)
      }
      if (error.type) {
        this.$message.error(this.$lang(`validation.${error.type}`))
        return
      }
      this.$message.error(this.$lang(fail))
    },
    /**
     * @param {Object} payload
     * @param {Function} action
     * @param {string} success
     * @param {string} question
     * @param {boolean} prompt
     */
    actionSchemaPerform (payload, action, success, question, prompt = false) {
      this.withRecord(payload, (record) => {
        const then = () => {
          this.$message.success(this.$lang(success))
          if (this.fetchRecords) {
            this.fetchRecords()
          }
        }
        const accept = (text) => {
          if (!text) {
            this.$message.error('Preencha os campos corretamente e tente novamente')
            return
          }
          this.$q.loading.show()
          action(record, text)
            .then(then)
            .finally(() => this.$q.loading.hide())
        }
        const ignore = () => '// silent is gold'

        if (prompt) {
          this.$prompt(this.$lang(question))
            .then(accept)
            .catch(ignore)
          return
        }
        this.$confirm(this.$lang(question))
          .then(accept)
          .catch(ignore)
      })
    }
  }
}
