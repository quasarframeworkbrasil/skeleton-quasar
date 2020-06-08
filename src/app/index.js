/**
 * @param {Function} validation
 * @returns {Function}
 */
export const withValidation = (validation) => {
  return function (value) {
    if (!value) {
      return true
    }
    return validation.call(this, value)
  }
}
