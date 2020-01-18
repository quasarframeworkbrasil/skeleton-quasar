/**
 * @ref auth/login
 * @param {Object} context
 * @param {string} token
 */
export const login = (context, token) => {
  context.commit('mutateToken', token)
}

/**
 * @ref auth/logout
 * @param {Object} context
 */
export const logout = (context) => {
  context.commit('mutateToken', '')
}

/**
 * @ref auth/updateUser
 * @param {Object} context
 * @param {Object} user
 */
export const updateUser = (context, user) => {
  context.commit('mutateUser', user)
}

/**
 * @ref auth/setUserName
 * @param {Object} context
 * @param {string} name
 */
export const setNameUser = (context, name) => {
  context.commit('mutateNameUser', name)
}
