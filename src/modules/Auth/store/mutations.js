import { erase, write } from 'src/app/Util/storage'

/**
 * @param {Object} state
 * @param {string} token
 */
export const mutateToken = (state, token) => {
  state.token = token
  if (token) {
    write('token', state.token)
    return
  }
  erase('token')
}

/**
 * @param {Object} state
 * @param {Object} user
 */
export const mutateUser = (state, user) => {
  state.user = user
  if (user) {
    write('user', state.user)
    return
  }
  erase('user')
}

/**
 * @param {Object} state
 * @param {string} name
 */
export const mutateNameUser = (state, name) => {
  state.user.name = name
  mutateUser(state, state.user)
}
