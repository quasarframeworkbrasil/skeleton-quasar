import Basic from 'src/app/Components/Schema/Contracts/Basic'

/**
 * @typedef {Object} FormDynamic
 */
export default {
  /**
   */
  mixins: [
    Basic
  ],
  /**
   */
  props: {
    groupType: {
      type: String,
      default: () => 'sections'
    },
    path: {
      type: String,
      default: () => ''
    },
    domain: {
      type: String,
      default: () => ''
    },
    table: {
      type: Object,
      default: () => ({})
    },
    form: {
      type: Object,
      default: () => ({})
    },
    settings: {
      type: Object,
      default: () => ({})
    },
    primaryKey: {
      type: String,
      default: () => 'id'
    },
    displayKey: {
      type: String,
      default: () => ''
    },
    fields: {
      type: Function,
      default: () => ({})
    },
    groups: {
      type: Function,
      default: () => () => ({})
    },
    actions: {
      type: Function,
      default: () => ({})
    },
    hooks: {
      type: Function,
      default: () => ({})
    },
    watches: {
      type: Function,
      default: () => ({})
    }
  }
}
