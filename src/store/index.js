import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import auth from 'src/layouts/Auth/store'
import dashboard from 'src/layouts/Dashboard/store'

Vue.use(Vuex)

/**
 * expose the store
 * use import { storing as $store } from 'src/store'
 */
export let storing

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  storing = new Vuex.Store({
    modules: {
      app,
      auth,
      dashboard
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  return storing
}
