/**
 * @param {Object} context
 * @param {string} transition
 */
export const setTransition = (context, transition) => {
  context.commit('mutateTransition', transition)
}

/**
 * @param {Object} context
 * @param {string} report
 */
export const setReport = (context, report) => {
  context.commit('mutateReport', report)
}

/**
 * @param {Object} context
 * @param {string} title
 */
export const setTitle = (context, title) => {
  context.commit('mutateTitle', title)
}
