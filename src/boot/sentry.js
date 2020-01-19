import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import { $store } from 'src/store'

/**
 * @param Vue
 * @returns {*}
 */
export default ({ Vue }) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }
  let error = {}
  Vue.config.errorHandler = function (err, vm) {
    error.componentName = vm.$options.name
    error.componentData = vm.$data
    error.componentContent = String(vm.$options.__file)
      .replace(/\//g, '.')
      .split('.')
    error.message = String(err)
  }
  // noinspection JSCheckFunctionSignatures
  Sentry.init({
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Request failed with status code 401'
    ],
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.Vue({
      Vue,
      attachProps: true
    })],
    beforeSend (event) {
      event.extra = {
        ...event.extra,
        ...error,
        user: $store.getters['auth/getUser']
      }
      error = {}
      return event
    }
  })
}
