import Vue from 'vue'
import AppRouter from 'src/app/Routing/AppRouter'

import updateTitle from 'src/router/middleware/updateTitle'
import updateDevice from 'src/router/middleware/updateDevice'

import authRouteFile from 'src/modules/Auth/router/routeFile'
import dashboardRouteFile from 'src/modules/Dashboard/router/routeFile'

Vue.use(AppRouter)

/**
 * expose the router
 * use import { $router } from 'src/router'
 */
export let $router

/**
 * @type {string}
 */
export const otherwise = '/'

/**
 * @returns {AppRouter}
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
  $router = new AppRouter(options)

  // update device info
  $router.beforeEach(updateDevice)
  // just a simple middleware
  $router.afterEach(updateTitle)

  // inject router on auth layout
  authRouteFile($router)
  // inject router on dashboard layout
  dashboardRouteFile($router)

  return $router
}
