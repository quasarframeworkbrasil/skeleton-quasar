/**
 * @param {string} path
 * @param {Array} extra
 * @returns {boolean}
 */
export default function (path, extra = []) {
  const white = ['/', ...extra]
  return white.includes(path)
}
