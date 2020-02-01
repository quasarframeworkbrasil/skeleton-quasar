import Skeleton from './Skeleton'

import DefaultsEvents from 'src/app/Agnostic/Schema/DefaultsEvents'
import DefaultsActions from 'src/app/Agnostic/Schema/DefaultsActions'

import Action from 'src/app/Agnostic/Schema/Action'

import Field from 'src/app/Agnostic/Schema/Field'
import FieldForm from 'src/app/Agnostic/Schema/FieldForm'
import FieldTable from 'src/app/Agnostic/Schema/FieldTable'
import FieldIs from 'src/app/Agnostic/Schema/FieldIs'
import FieldValidation from 'src/app/Agnostic/Schema/FieldValidation'

/**
 * @class {Schema}
 */
export default class Schema extends Skeleton {
  /**
   * @type {Array}
   */
  static mixins = [
    DefaultsEvents, DefaultsActions,
    Action,
    Field, FieldForm, FieldTable, FieldIs, FieldValidation
  ]

  /**
   * @type {boolean}
   */
  static useUuid = true

  /**
   * @type {boolean}
   */
  static userMasterDetail = false

  /**
   * available: ['edit', 'view', 'index']
   * @type {string}
   */
  afterCreate = 'index'

  /**
   * available: ['none', 'index']
   * @type {string}
   */
  afterUpdate = 'index'

  /**
   * @param {Object} property
   * @param {*} value
   * @returns {this}
   */
  setAttr (property, value) {
    this.__fields[this.__currentField].attrs[property] = value
    return this
  }

  /**
   * @return {Object}
   */
  getAttr (property) {
    return this.__fields[this.__currentField].attrs[property]
  }

  /**
   * Component before created hook
   * @override
   */
  beforeCreateHook () {
    // will override by prototypes
  }

  /**
   * Component created hook
   * @param schema
   * @override
   */
  createdHook (schema = undefined) {
    // will override by schemas
  }

  /**
   * Configs para quando o scope for 'index'
   */
  createdHookScopeIndex () {
    this.fetchRecords()
  }

  /**
   * Configs para quando o scope for 'add'
   */
  createdHookScopeAdd () {
    if (this.settings.uuid) {
      this.record[this.primaryKey] = this.$util.uuid()
    }
  }

  /**
   * Configs para quando o scope for 'edit'
   */
  createdHookScopeEdit () {
    this.fetchRecord(this.$route.params[this.primaryKey])
  }

  /**
   * Configs para quando o scope for 'view'
   */
  createdHookScopeView () {
    const setField = (key) => this.setFieldAttrs(key, { readonly: true, disable: true })
    Object.keys(this.components).forEach(setField)

    if (this.$route.query.trash) {
      this.$util.set(this.buttons, 'home.attrs.icon', 'restore')
    }

    this.fetchRecord(this.$route.params[this.primaryKey])
  }

  /**
   * Configs para quando o scope for 'index'
   */
  createdHookScopeTrash () {
    this.fetchRecords()
  }

  /**
   */
  defaults () {
    this.fieldAsPrimaryKey()

    // initialize lifecycle hooks related to scopes
    this.defaultCreated()

    // install hooks to handle the data events: fetchRecord and fetchRecords
    this.defaultRequestRecords()
    this.defaultRequestRecord()

    // initialize actions
    this.defaultActions()

    if (this.constructor.userMasterDetail) {
      // initialize actions
      this.defaultMasterDetailActions()
    }
  }
}
