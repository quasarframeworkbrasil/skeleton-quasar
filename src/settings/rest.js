import { get } from 'src/app/Util/general'

/**
 * @param {ContainerComponent} context
 * @return {number}
 */
export const delayLoading = (context = {}) => 250

/**
 * @param {Object} parameters
 * @returns {Function}
 */
export const parseRestRecords = (parameters = {}) => {
  const { rowsPerPage, sortBy, descending, page } = parameters
  return (response) => {
    let rows = []
    if (Array.isArray(response.data)) {
      rows = response.data
    }

    const rowsNumber = get(response, 'meta.total', rows.length)
    const pagesNumber = rowsNumber > rowsPerPage
      ? Math.ceil(rowsNumber / rowsPerPage)
      : 1

    return { rows, rowsNumber, pagesNumber, rowsPerPage, sortBy, descending, page }
  }
}

/**
 * @param {Object} parameters
 * @return {Function}
 */
export const parseRestRecord = (parameters = {}) => {
  return (response) => response.data
}
