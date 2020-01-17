import { get, is, serialize, unSerialize, withoutSeparator } from 'src/app/Util/general'
import { replacement } from 'src/app/Util/string'
import { storing as $store } from 'src/store'

import Http from './Http'

import { filterKey, primaryKey, searchKey } from 'src/settings/schema'
import { paginateResponse } from 'src/settings/rest'

/**
 * @type {Rest}
 */
export default class Rest extends Http {
  /**
   * @type {string}
   */
  path = '/api/v1'

  /**
   * @type {string}
   */
  resource = '/please/override/resource'

  /**
   * @type {String}
   */
  primaryKey = primaryKey

  /**
   * @type {number}
   */
  size = 10

  /**
   * @type {Object}
   */
  __resourceParams = {}

  /**
   * @type {Object}
   */
  $store = {}

  /**
   * @type {Array}
   */
  filterable = []

  /**
   * @param {Record<string, any>} record
   * @returns {Promise<any>}
   */
  create (record) {
    if ($store.getters['app/getOffline'] || this.offline) {
      return new Promise((resolve, reject) => {
        reject('Unsupported action create')
      })
    }
    return this.post(this.getResource(), record)
  }

  /**
   * @param {string | number | Record<string, any>} record
   * @param {boolean} trash
   * @returns {Promise<any>}
   */
  read (record, trash = false) {
    let queryString = ''
    if (trash) {
      queryString = '?trash=true'
    }

    if ($store.getters['app/getOffline'] || this.offline) {
      return this.readOffline(record, trash)
    }

    return this.get(`${this.getResource()}/${this.getId(record)}${queryString}`)
  }

  /**
   * @param {Record<string, any>} record
   * @returns {Promise<any>}
   */
  update (record) {
    if ($store.getters['app/getOffline'] || this.offline) {
      return this.updateOffline(record)
    }
    return this.patch(`${this.getResource()}/${this.getId(record)}`, record)
  }

  /**
   * @param {Record<string, any>} record
   * @returns {Promise<any>}
   */
  destroy (record) {
    if ($store.getters['app/getOffline'] || this.offline) {
      return new Promise((resolve, reject) => {
        reject('Unsupported action create')
      })
    }
    return this.delete(`${this.getResource()}/${this.getId(record)}`)
  }

  /**
   * @param {Record<string, any>} record
   * @returns {Promise<any>}
   */
  restore (record) {
    return this.patch(`${this.getResource()}/${this.getId(record)}/restore`)
  }

  /**
   * @param {Record<string, string | number>} parameters
   * @param {Array<string>} [filters] = []
   * @param {boolean} [trash] = false
   * @returns {Promise<any>}
   */
  paginate (parameters, filters, trash = false) {
    const { pagination, [filterKey]: filter, [searchKey]: where, raw } = parameters

    const size = get(pagination, 'rowsPerPage', this.size)
    const sortBy = get(pagination, 'sortBy')
    const descending = get(pagination, 'descending')
    const page = get(pagination, 'page', 1)

    let sort
    if (sortBy) {
      const direction = descending ? 'desc' : 'asc'
      sort = `${sortBy}.${direction}`
    }

    if ($store.getters['app/getOffline'] || this.offline) {
      return this.searchOffline({ page, size, sort, filter, where, raw, trash })
    }

    return this
      .search({ page, size, sort, filter, where, raw, trash })
      .then(paginateResponse({ rowsPerPage: size, sortBy, descending, page }))
  }

  /**
   * Ex.: query({ page, size, sort, filter, where })
   * @param {Record<string, string | number>} parameters
   * @returns {Promise<any>}
   */
  search (parameters = {}) {
    const queryString = this.searchQueryString(parameters, '&')
    return this.get(`${this.getResource()}?${queryString}`)
  }

  /**
   * @param {Object} parameters
   * @param {string} separator
   * @returns {string}
   */
  searchQueryString (parameters = {}, separator) {
    const elements = []
    const { raw, page, size, sort, filter, where, trash } = parameters
    if (is(page)) {
      elements.push(`page=${page}`)
    }
    if (is(size)) {
      elements.push(`size=${size}`)
    }
    if (is(sort)) {
      elements.push(`sort=${sort}`)
    }
    if (is(trash)) {
      elements.push('trash=true')
    }
    if (is(filter)) {
      elements.push(`${filterKey}=${filter}`)
    }
    if (is(raw)) {
      elements.push(typeof raw === 'string' ? raw : serialize(raw))
    }
    if (is(where)) {
      elements.push(typeof where === 'string' ? where : serialize(where, searchKey))
    }
    return elements.join(separator)
  }

  /**
   * @param {records} records
   * @returns {Promise<any>}
   */
  remove (records) {
    const callback = (record) => this.getId(record)
    const list = records.map(callback).join(',')
    return this.delete(`${this.getResource()}/[${list}]`)
  }

  /**
   * @param {Record<string, any>} resourceParams
   * @param {boolean} override
   * @returns {this}
   */
  resourceParams (resourceParams, override = true) {
    if (!override && is(this.__resourceParams)) {
      return this
    }
    this.__resourceParams = resourceParams
    return this
  }

  /**
   * @returns {string}
   */
  getResource () {
    if (is(this.__resourceParams)) {
      return replacement(this.resource, this.__resourceParams)
    }
    return this.resource
  }

  /**
   * @param {string | number | Record<string, any>} record
   * @returns {String}
   */
  getId (record) {
    if (typeof record === 'object') {
      return record[this.primaryKey]
    }
    return String(record)
  }

  /**
   * @param {string | number | Record<string, any>} record
   * @param {boolean} trash
   * @returns {Promise<any>}
   */
  readOffline (record, trash = false) {
    const executor = (resolve) => {
      const read = () => {
        const id = this.getId(record)
        const data = this.getOfflineRecord(id)
        const response = { data }
        resolve(response)
      }
      window.setTimeout(read, 100)
    }
    return new Promise(executor)
  }

  /**
   * @param {Record<string, any>} record
   * @returns {Promise<any>}
   */
  updateOffline (record) {
    const executor = (resolve, reject) => {
      const update = () => {
        const id = this.getId(record)
        const data = this.getOfflineRecord(id)
        if (!data) {
          reject({ type: 'notFound' })
          return
        }
        record = { ...data, ...record }
        const response = this.setOfflineRecord(id, record)
        resolve(response)
      }
      window.setTimeout(update, 100)
    }
    return new Promise(executor)
  }

  /**
   * @param {Object} parameters
   * @returns {Array}
   */
  searchOffline (parameters) {
    const executor = (resolve) => {
      const search = () => {
        // sort, raw, trash
        const { page, size: rowsPerPage, where, filter } = parameters

        const records = this.getOfflineRecords().filter((record) => {
          if (is(where)) {
            return this.searchOfflineWhere(record, where)
          }
          if (is(filter)) {
            return this.searchOfflineFilter(record, filter)
          }
          return true
        })

        const rowsNumber = records.length
        const pagesNumber = Math.ceil(rowsNumber / rowsPerPage)
        const offset = (page - 1) * rowsPerPage
        const rows = records.slice(offset, offset + rowsPerPage)

        resolve({ rows, rowsPerPage, rowsNumber, pagesNumber, page })
      }
      window.setTimeout(search, 100)
    }
    return new Promise(executor)
  }

  /**
   * @param {Record<string, any>} record
   * @param {string} where
   * @returns {boolean}
   */
  searchOfflineWhere (record, where) {
    const unSerialized = unSerialize(where, searchKey)
    for (let key in unSerialized) {
      if (!unSerialized.hasOwnProperty(key)) {
        continue
      }
      let value = withoutSeparator(unSerialized[key])
      if (String(record[key]).toLowerCase().indexOf(String(value).toLowerCase()) === -1) {
        return false
      }
    }
    return true
  }

  /**
   * @param {Record<string, any>} record
   * @param {string} filter
   * @returns {boolean}
   */
  searchOfflineFilter (record, filter) {
    for (let field in record) {
      if (!record.hasOwnProperty(field)) {
        continue
      }
      if (!this.filterable.includes(field)) {
        continue
      }
      if (String(record[field]).toLowerCase().indexOf(String(filter).toLowerCase()) !== -1) {
        return true
      }
    }
    return false
  }

  /**
   * @returns {Promise}
   * @private
   */
  getOfflineRecords () {
    if (!this.$store) {
      return []
    }
    if (!Array.isArray(this.$store.state.records)) {
      return []
    }
    return this.$store.state.records
  }

  /**
   * @param id
   * @returns {Object}
   * @private
   */
  getOfflineRecord (id) {
    const records = this.getOfflineRecords()
    return records.find((record) => record[this.primaryKey] === id)
  }

  /**
   * @param {string} id
   * @param {Object} record
   * @returns {Object}
   * @private
   */
  setOfflineRecord (id, record) {
    if (!this.$store) {
      return undefined
    }
    this.$store.commit('updateRecord', record)
    return { data: { ticket: id } }
  }
}
