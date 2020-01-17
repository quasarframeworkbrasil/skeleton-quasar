import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

import customState from './custom/state'
import * as customGetters from './custom/getters'
import * as customMutations from './custom/mutations'
import * as customActions from './custom/actions'

export default {
  namespaced: true,
  state: { ...state, ...customState },
  getters: { ...getters, ...customGetters },
  mutations: { ...mutations, ...customMutations },
  actions: { ...actions, ...customActions }
}
