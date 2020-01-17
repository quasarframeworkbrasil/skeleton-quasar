import { get } from 'src/app/Util/general'

/**
 * @param rowsPerPage
 * @param sortBy
 * @param descending
 * @param page
 * @returns {Object}
 */
export const paginateResponse = ({ rowsPerPage, sortBy, descending, page }) => {
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
