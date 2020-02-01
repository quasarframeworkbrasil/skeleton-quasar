import { filterKey, searchKey } from 'src/settings/schema'
import { is } from 'src/app/Util/general'

/**
 * @mixin {TableFetch}
 */
export default {
  /**
   */
  methods: {
    /**
     */
    loadingShow () {
      this.loading = true
      this.$q.loading.show({ delay: 100 })
    },
    /**
     */
    loadingHide () {
      this.$q.loading.hide()
      this.loading = false
    },
    /**
     * @param {Object} options
     */
    fetchRecords (options = {}) {
      this.loadingShow()

      if (options === undefined || !is(options)) {
        const page = this.parsePageToFetch()
        options = {
          pagination: { ...this.pagination, page: page }
        }
      }

      if (options.pagination) {
        this.pagination = options.pagination
      }

      this.sorter = this.pagination.sortBy
      this.filters = [this.sorter]

      const { raw } = options

      const parameters = {
        pagination: this.pagination,
        sorter: this.sorter,
        [filterKey]: this[filterKey],
        [searchKey]: this[searchKey],
        raw: raw
      }

      this.triggerHook('request:records', { parameters, filters: this.filters })
        .then(this.successFetchRecords)
        .catch(this.errorFetchRecords)
    },
    /**
     * @return {number}
     */
    parsePageToFetch () {
      if (!this.embed) {
        return this.$route.query.page ? Number(this.$route.query.page) : 1
      }
      return this.pagination.page
    },
    /**
     * @param {Object} response
     */
    successFetchRecords (response) {
      this.loadingHide()

      this.data = response.rows
      this.pagination.rowsPerPage = response.rowsPerPage
      this.pagination.pagesNumber = response.pagesNumber
      this.pagination.page = response.page
      this.pagination.rowsNumber = response.rowsNumber
      /* "sortBy": null, "descending": false, "page": 1, "": 5  */

      if (!this.data.length && !this.embed) {
        const query = {}
        if (this.$route.query.page >= 2) {
          query.page = this.$route.query.page - 1
        }
        this.tableFetchApply(query, true)
        return
      }

      if (!this.triggerHook) {
        return
      }
      this.triggerHook('fetch:records')
    },
    /**
     * // @param {Object} error
     */
    errorFetchRecords (/* error */) {
      this.loadingHide()

      this.data = []
    },
    /**
     */
    firstPage () {
      this.goToPage(1)
    },
    /**
     */
    previousPage () {
      this.goToPage(Number(this.pagination.page) - 1)
    },
    /**
     */
    nextPage () {
      this.goToPage(Number(this.pagination.page) + 1)
    },
    /**
     */
    lastPage () {
      this.goToPage(Number(this.pagination.pagesNumber))
    },
    /**
     * @param {number} page
     */
    goToPage (page) {
      const query = { page }
      if (this[filterKey]) {
        query[filterKey] = this[filterKey]
      }
      if (this[searchKey]) {
        query[searchKey] = this[searchKey]
      }
      if (this.$route.query.sort) {
        query.sort = this.$route.query.sort
      }
      this.tableFetchApply(query)
    },
    /**
     * @param {string} filter
     */
    applyFilter (filter = undefined) {
      if (filter !== undefined) {
        this[filterKey] = filter
      }
      let query = {}
      if (this[filterKey]) {
        query = { [filterKey]: this[filterKey] }
      }
      this.tableFetchApply(query)
    },
    /**
     * @param {string} search
     */
    applySearch (search = undefined) {
      if (search !== undefined) {
        this[searchKey] = search
      }
      let query = {}
      if (this[searchKey]) {
        query = { [searchKey]: this[searchKey] }
      }
      this.tableFetchApply(query)
    },
    /**
     * @param {Object} parameters
     */
    requestState (parameters) {
      if (!parameters.pagination.sortBy) {
        return
      }
      const direction = parameters.pagination.descending ? 'desc' : 'asc'
      const sort = `${parameters.pagination.sortBy}.${direction}`
      this.tableFetchApply({ sort }, true)
    },
    /**
     * @param query
     * @param options
     */
    tableFetchApply (query, options = undefined) {
      if (!this.embed) {
        this.$browse({ query: query }, options)
        return
      }
      const { page } = query
      if (page) {
        this.pagination.page = page
      }
      this.fetchRecords()
    }
  }
}
