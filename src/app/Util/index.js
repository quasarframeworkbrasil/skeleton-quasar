import { clone, get, set, uuid, run } from './general'

/**
 * @param {Vue} Vue
 */
export default (Vue) => {
  return {
    clone, get, set, uuid, run
  }
}
