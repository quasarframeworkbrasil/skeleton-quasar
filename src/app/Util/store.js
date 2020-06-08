import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Helper to create dynamic stores
 * Useful to reduce boilerplate.. simple and functional
 * Besides the store is standalone and works fine in a lot of places
 * @param {*} options
 * @returns {Object}
 */
export default (options) => {
  const { state, mutations } = options
  return {
    state: Vue.observable(state),
    commit (mutation, ...args) {
      mutations[mutation](state, ...args)
    }
  }
}
