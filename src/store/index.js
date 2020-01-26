import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import auth from 'src/modules/Auth/store'
import dashboard from 'src/modules/Dashboard/store'

Vue.use(Vuex)

/**
 * expose the store
 * use import { $store } from 'src/store'
 */
export let $store

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  // create store
  $store = new Vuex.Store({
    modules: {
      app,
      auth, // register auth router
      dashboard // register dashboard router
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  return $store
}
