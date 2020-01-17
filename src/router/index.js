// noinspection NpmUsedModulesInstalled
import Vue from 'vue'
// noinspection NpmUsedModulesInstalled
import AppRouter from 'src/app/Routing/AppRouter'

import updateTitle from 'src/router/middleware/updateTitle'
import updateDevice from 'src/router/middleware/updateDevice'

import authRouteFile from 'src/layouts/Auth/router/routeFile'
import dashboardRouteFile from 'src/layouts/Dashboard/router/routeFile'

Vue.use(AppRouter)

/**
 * expose the router
 * use import { storing as $router } from 'src/router'
 */
export let routing

/**
 * @type {string}
 */
export const otherwise = '/'

/**
 * @returns {VueRouter}
 */
export default function (/* { store, ssrContext } */) {
  // the router options
  const options = {
    scrollBehavior: () => ({ x: 0, y: 0 }),
    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  }
  // create router
  routing = new AppRouter(options)

  // update device info
  routing.beforeEach(updateDevice)
  // just a simple middleware
  routing.afterEach(updateTitle)

  authRouteFile(routing)
  dashboardRouteFile(routing)

  return routing
}
