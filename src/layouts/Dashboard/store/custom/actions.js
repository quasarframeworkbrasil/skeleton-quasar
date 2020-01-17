/**
 * @param {Object} context
 * @param {string} unit
 */
export const setUnit = (context, unit) => {
  context.commit('mutateUnit', unit)
}
