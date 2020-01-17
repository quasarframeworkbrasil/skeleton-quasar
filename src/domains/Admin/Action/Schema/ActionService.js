import Rest from 'src/app/Services/Rest'
import { resource } from '../settings'
import { promisify, uuid, get } from 'src/app/Util/general'

/**
 * @type {ActionService}
 */
export default class ActionService extends Rest {
  /**
   * @type {String}
   */
  resource = resource

  /**
   * @param {Object} record
   * @returns {Promise}
   */
  create (record) {
    return promisify({ ...record, id: uuid() })
  }

  /**
   * @param {Object} record
   * @returns {Promise}
   */
  update (record) {
    return promisify({ ...record })
  }

  /**
   * @param {string | number | Record<string, any>} record
   * @param {boolean} trash
   * @returns {Promise}
   */
  read (record, trash = false) {
    const counter = typeof record === 'object' ? 1 : String(record)
    return promisify({
      data: {
        id: uuid(),
        name: 'Name fake',
        icon: 'icon_' + Math.ceil(Math.random() * 100),
        path: 'path/' + Math.ceil(Math.random() * 100),
        namespace: `namespace ${counter}`,
        assortment: counter,
        separator: Math.ceil(Math.random() * 100) % 2 === 0
      }
    })
  }

  /**
   * @param {Object} record
   * @returns {Promise}
   */
  destroy (record) {
    return promisify({ ...record })
  }

  /**
   * @param {Record<string, string | number>} parameters
   * @param {Array<string>} [filters] = []
   * @param {boolean} [trash] = false
   * @returns {Promise<any>}
   */
  paginate (parameters, filters, trash = false) {
    const { pagination } = parameters

    const rowsPerPage = get(pagination, 'rowsPerPage', this.size)
    const sortBy = get(pagination, 'sortBy')
    const descending = get(pagination, 'descending')
    const page = get(pagination, 'page', 1)

    const rowsNumber = 32
    const pagesNumber = Math.ceil(rowsNumber / rowsPerPage)
    let length = rowsPerPage
    if (page === pagesNumber) {
      length = rowsNumber % (pagesNumber - 1)
    } else if (page > pagesNumber) {
      length = 0
    }

    const generator = (value, index) => {
      const counter = (page - 1) * rowsPerPage + index + 1
      return {
        id: uuid(),
        name: `Name fake ${counter}`,
        icon: 'icon_' + Math.ceil(Math.random() * 100),
        path: 'path/' + Math.ceil(Math.random() * 100),
        namespace: `namespace ${counter}`,
        assortment: counter,
        separator: Math.ceil(Math.random() * 100) % 2 === 0
      }
    }

    return promisify({
      rowsPerPage: rowsPerPage,
      rowsNumber: rowsNumber,
      pagesNumber: pagesNumber,
      sortBy: sortBy,
      descending: descending,
      page: page,
      rows: Array.from({ length }, generator)
    })
  }
}
