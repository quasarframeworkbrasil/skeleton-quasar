import { read } from 'src/app/Util/storage'

export default {
  name: process.env.VUE_APP_NAME,
  subTitle: process.env.VUE_APP_SUB_TITLE,
  drawer: read('appDrawer') || [],
  offline: !!read('appOffline'),
  options: [],
  clipboard: {},
  query: {},
  print: undefined,
  debuggers: false,
  device: undefined
}
