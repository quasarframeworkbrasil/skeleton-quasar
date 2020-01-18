import { get } from 'src/app/Util/general'

// noinspection JSUnusedLocalSymbols
/**
 * @param {Object} parameters
 * @returns {Function}
 */
export const parseResponseRecords = (parameters = {}) => {
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

// noinspection JSUnusedLocalSymbols
/**
 * @param {Object} parameters
 * @return {Function}
 */
export const parseResponseRecord = (parameters = {}) => {
  return (response) => response.data
}
