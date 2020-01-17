/**
 * @param state
 * @returns {string}
 */
export const getName = (state) => state.name

/**
 * @param state
 * @returns {string}
 */
export const getSubtitle = (state) => state.subTitle

/**
 * @param state
 * @returns {Array}
 */
export const getDrawer = (state) => state.drawer

/**
 * @param state
 * @returns {Array}
 */
export const getOptions = (state) => state.options

/**
 * @param state
 * @returns {Object}
 */
export const getClipboard = (state) => state.clipboard

/**
 * @param state
 * @returns {Object}
 */
export const getQuery = (state) => state.query

/**
 * @param state
 * @returns {Object}
 */
export const getPrint = (state) => state.print

/**
 * @param state
 * @returns {Boolean}
 */
export const getDebuggers = (state) => state.debuggers

/**
 * @param state
 * @returns {Boolean}
 */
export const getOffline = (state) => state.offline

/**
 * @param state
 * @returns {string}
 */
export const getDevice = (state) => state.device
