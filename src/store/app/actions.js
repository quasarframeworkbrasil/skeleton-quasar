import { is } from 'src/app/Util/general'

/**
 * @param {Object} context
 * @param {Array} menu
 */
export const setName = (context, menu) => {
  context.commit('mutateName', menu)
}

/**
 * @param {Object} context
 * @param {Array} subTitle
 */
export const setSubTitle = (context, subTitle) => {
  context.commit('mutateSubTitle', subTitle)
}

/**
 * @param {Object} context
 * @param {Array} drawer
 */
export const setDrawer = (context, drawer) => {
  context.commit('mutateDrawer', drawer)
}

/**
 * @param {Object} context
 * @param {Array} options
 */
export const setOptions = (context, options) => {
  context.commit('mutateOptions', options)
}

/**
 * @param {Object} context
 * @param {Object} clipboard
 */
export const setClipboard = (context, clipboard) => {
  context.commit('mutateClipboard', clipboard)
}

/**
 * @param {Object} context
 */
export const clearClipboard = (context) => {
  context.commit('mutateClipboard', {})
}

/**
 * @param {Object} context
 * @param {Object} query
 */
export const setQuery = (context, query) => {
  if (is(context.getters.getQuery)) {
    return
  }
  context.commit('mutateQuery', query)
}

/**
 * @param {Object} context
 */
export const clearQuery = (context) => {
  context.commit('mutateQuery', {})
}

/**
 * @param {Object} context
 * @param {Object} print
 */
export const setPrint = (context, print) => {
  context.commit('mutatePrint', print)
}

/**
 * @param {Object} context
 * @param {Boolean} debuggers
 */
export const setDebuggers = (context, debuggers) => {
  context.commit('mutateDebuggers', debuggers)
}

/**
 * @param {Object} context
 * @param {Boolean} offline
 */
export const setOffline = (context, offline) => {
  context.commit('mutateOffline', offline)
}

/**
 * @param {Object} context
 * @param {string} device
 */
export const setDevice = (context, device) => {
  context.commit('mutateDevice', device)
}
