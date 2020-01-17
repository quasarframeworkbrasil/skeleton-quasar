import Basic from 'src/app/Components/Base/Contracts/Basic'

/**
 * @typedef {Static}
 */
export default {
  /**
   */
  mixins: [
    Basic
  ],
  /**
   */
  inject: [
    'path',
    'domain',
    'table',
    'form',
    'domains',
    'primaryKey',
    'displayKey',
    'fields',
    'actions',
    'hooks'
  ]
}
