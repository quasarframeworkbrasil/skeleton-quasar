/**
 * messages to routes
 * crumb is used in breadcrumb
 * @see AppBreadcrumb
 * title is used to update the document.title for update router middleware
 * @sse updateTitle
 */
export default {
  '/': {
    title: 'Entrar | Quasar Skeleton'
  },
  '/dashboard': {
    crumb: 'Início'
  },
  '/dashboard/home': {
    title: 'Bem vindo à Quasar Skeleton'
  }
}
