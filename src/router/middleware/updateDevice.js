import Fingerprint2 from 'fingerprintjs2'
import { storing as $store } from 'src/store'

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 *
 * BeforeEach middleware
 */
export default (to, from, next) => {
  if ($store.getters['app/getDevice']) {
    next()
    return
  }

  Fingerprint2.get({}, (components) => {
    const values = components.map((component) => component.value)
    const device = Fingerprint2.x64hash128(values.join(''), 31)

    $store.dispatch('app/setDevice', device)
      .then(() => next())
  })
}
