/**
 * @param {Object} state
 * @param {string} transition
 */
export const mutateTransition = (state, transition) => {
  state.transition = transition
}

/**
 * @param {Object} state
 * @param {string} report
 */
export const mutateReport = (state, report) => {
  state.report = report
}

/**
 * @param {Object} state
 * @param {string} title
 */
export const mutateTitle = (state, title) => {
  state.title = title
}
