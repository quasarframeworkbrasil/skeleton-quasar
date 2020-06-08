import $store from 'src/app/Util/store'

/**
 * @type {StoreObservable}
 */
const store = $store({
  // the states of store
  state: {
    version: window.localStorage.getItem('version')
  },
  // the mutations to call with commit
  // ex.: $store.commit('updateVersion')
  mutations: {
    /**
     * @param {StoreState} state
     * @param {string} version
     */
    updateVersion (state, version) {
      state.version = version
      window.localStorage.setItem('version', version)
    }
  }
})

export default store
