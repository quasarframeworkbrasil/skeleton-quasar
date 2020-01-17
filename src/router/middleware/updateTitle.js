import $lang from 'src/lang'
import { storing as $store } from 'src/store'

/*
 * middleware:
 * - beforeEach(to: Route, from: Route, next: Function)
 * - afterEach(to: Route, from: Route)
 */

/** @var {string} */
const fallback = process.env.VUE_APP_DEFAULT_TITLE

/**
 * Perform the change of document title with title related to page
 * It will use i18n and route path to get the title
 * > It works better in afterEach
 * @param {Object} to
 */
export default (to) => {
  // get the last match
  const route = to.matched[to.matched.length - 1]

  const page = String(route.path)
    .replace(/^\/|\/$/g, '')
    .prepend('/')

  const namespace = to.meta.namespace || 'common'
  const scope = to.meta.scope || 'index'
  const scenario = route.meta.scenario || 'undefined'

  const paths = [
    `pages.${page}.title`,
    `domains.${namespace}.routes.${scenario}.title`,
    `domains.${namespace}.routes.${scope}.title`,
    `domains.${namespace}.${to.name}.title`
  ]

  $store.dispatch('dashboard/setTitle', $lang(paths, fallback))
}
