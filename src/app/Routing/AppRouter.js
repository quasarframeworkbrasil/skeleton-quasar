// noinspection NpmUsedModulesInstalled
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

/**
 * @extends VueRouter
 * @class AppRouter
 */
export default class AppRouter extends VueRouter {
  /**
   * @param middleware
   * @return {Function}
   */
  beforeEach (middleware) {
    return super.beforeEach(middleware)
  }

  /**
   * @param routes
   */
  addRoutes (routes) {
    super.addRoutes(routes)
  }

  /**
   * @param {string} path
   * @param {Function} callable
   */
  beforeThisRoute (path, callable) {
    if (typeof callable !== 'function') {
      throw new Error('AppRouter.match: callable must be a function')
    }
    this.beforeEach((to, from, next) => {
      if (to.path === path) {
        callable(to, from, next)
        return
      }
      next()
    })
  }
}
