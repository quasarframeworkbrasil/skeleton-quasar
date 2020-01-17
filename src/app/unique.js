/**
 * @param {string} prefix
 * @param {boolean} entropy
 * @returns {string}
 */
module.exports = (prefix = '', entropy = false) => {
  let result
  const seed = (factor, width) => {
    factor = parseInt(factor, 10).toString(16)
    return width < factor.length
      ? factor.slice(factor.length - width) : (width > factor.length)
        ? new Array(1 + (width - factor.length)).join('0') + factor : factor
  }
  // noinspection JSCheckFunctionSignatures
  const start = seed(parseInt(new Date().getTime() / 100, 10), 8)
  const end = seed(Math.floor(Math.random() * 0x75bcd15) + 1, 5)
  result = prefix + start + end
  if (entropy) {
    result += (Math.random() * 10).toFixed(8).toString()
  }
  return result
}
