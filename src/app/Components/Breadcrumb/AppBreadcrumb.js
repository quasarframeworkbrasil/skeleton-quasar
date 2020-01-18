import { $router } from 'src/router'
import $lang from 'src/lang'
import { browse } from 'src/app/Util/general'
import { home } from 'src/settings/components'

/**
 * @type {string}
 */
const block = 'app-breadcrumb'

/**
 * @param {CreateElement} h
 * @param {Record<string, any>} data
 * @param {Array<RouteRecord>} routes
 * @returns {VNode}
 */
const ul = (h, data, routes) => {
  data = { ...data, class: block }

  const children = routes
    .map((route) => li(h, route))
    .filter((li) => li !== undefined)

  children.unshift(root(h))

  return h('ul', data, children)
}

/**
 * @param {CreateElement} h
 * @returns {VNode}
 */
const root = (h) => {
  return h(
    'li',
    { class: `${block}__item` },
    [h(home.is, { props: home.attrs })]
  )
}

/**
 * @param {CreateElement} h
 * @param {RouteRecord} route
 * @returns {VNode|undefined}
 */
const li = (h, route) => {
  const namespace = route.meta.namespace || 'common'
  const scope = route.meta.scope || 'index'
  const scenario = route.meta.scenario || 'undefined'
  const paths = [
    `domains.${namespace}.routes.${scenario}.crumb`,
    `domains.${namespace}.routes.${scope}.crumb`,
    `pages.${route.path}.crumb`
  ]
  let expression = $lang(paths)
  if (!expression) {
    return
  }

  if (typeof expression === 'function') {
    expression = expression({ route: $router.currentRoute })
  }
  const crumb = String(expression)
  if (!crumb) {
    return
  }
  const name = String(route.name) || ''

  const data = { class: `${block}__item` }
  const children = [a(h, crumb, route.path, name, route.meta.bread)]

  return h('li', data, children)
}

/**
 * @param {CreateElement} h
 * @param {string} crumb
 * @param {string} path
 * @param {string} name
 * @param bread
 * @returns {VNode}
 */
const a = (h, crumb, path, name, bread = true) => {
  const data = {
    class: `${block}__item__a ${name}`,
    on: { click: () => {} }
  }
  if (bread) {
    data.on = { click: () => browse(path, true) }
  }

  return h('a', data, crumb)
}

/**
 * @component {AppBreadcrumb}
 */
const AppBreadcrumb = {
  /**
   */
  functional: true,
  /**
   */
  name: 'AppBreadcrumb',
  /**
   * @param {CreateElement} h
   * @param {RenderContext} context
   * @returns {VNode}
   */
  render (h, context) {
    const { parent, props } = context
    const routes = parent.$route ? parent.$route.matched : props.routes
    const data = context.data ? context.data : {}
    return ul(h, data, routes)
  }
}

export default AppBreadcrumb
