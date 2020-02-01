import Base from 'src/app/Agnostic/Base'
import field from 'src/settings/field'
import { searchKey } from 'src/settings/schema'

/**
 * @class {Skeleton}
 */
export default class Skeleton extends Base {
  /**
   * @type {Boolean}
   */
  safe = true

  /**
   * @type {string}
   */
  groupType = 'sections'

  /**
   * @param {string} $key
   * @param {string} label
   * @param {*} type
   * @returns {Schema|Skeleton}
   */
  addField ($key, label = '', type = undefined) {
    if (this.__fields[$key]) {
      throw new Error(`Field '${$key}' already exists`)
    }
    this.__currentField = $key

    let is = this.is
    const attrs = { value: undefined, disable: false }

    const keydown = function ({ $event, field }) {
      if (!field.chars) {
        return
      }

      const key = String($event.key)
      if (key.length > 1) {
        return
      }
      const regex = new RegExp(field.chars)
      if (!regex.test(key)) {
        $event.preventDefault()
        $event.stopPropagation()
      }
    }

    const on = {
      keydown: [keydown]
    }
    const order = Object.keys(this.__fields).length
    const options = { label, order, type, scopes: this.scopes }

    this.__fields[$key] = field($key, options, attrs, on)
    this.setComponent(is)
    return this
  }

  /**
   * @param {string} $key
   * @returns {Schema|Skeleton}
   */
  getField ($key) {
    if (!this.__fields[$key]) {
      throw new Error(`Field '${$key}' not exists`)
    }
    this.__currentField = $key
    return this
  }

  /**
   * @returns {Object}
   */
  getFields () {
    if (this.safe) {
      return this.$clone(this.__fields)
    }
    return this.__fields
  }

  /**
   * @param {string} id
   * @param {string} label
   * @returns {Schema|Skeleton}
   */
  addAction (id, label = '') {
    if (this.__actions[id]) {
      throw new Error(`Action '${id}' already exists`)
    }
    this.__currentAction = id

    const color = this.constructor.buttons.color // 'white'
    const textColor = this.constructor.buttons.textColor // 'grey-10'

    const schema = this
    const handler = function ({ context }) {
      if (!schema[id]) {
        return
      }
      if (typeof schema[id] === 'function') {
        schema[id].call(this, context)
      }
    }

    this.__actions[id] = {
      $key: id,
      order: Object.keys(this.__actions).length,
      hidden: false,
      dropdown: false,
      validate: undefined,
      scopes: this.scopes,
      attrs: { id, label, color, textColor, disabled: false },
      on: { click: handler },
      positions: []
      // configure: (button, context) => button
    }
    return this
  }

  /**
   * @param {string} id
   * @returns {Schema|Skeleton}
   */
  getAction (id) {
    if (!this.__actions[id]) {
      throw new Error(`Action '${id}' not exists`)
    }
    this.__currentAction = id
    return this
  }

  /**
   * @returns {Array}
   */
  getActions () {
    if (this.safe) {
      return this.$clone(Object.values(this.__actions))
    }
    return Object.values(this.__actions)
  }

  /**
   * @param {string} name
   * @param {Function} handler
   * @returns {Schema|Skeleton}
   */
  addHook (name, handler) {
    this.__hooks[name] = handler
    return this
  }

  /**
   * @param {string} name
   * @returns {Schema|Skeleton}
   */
  removeHook (name) {
    delete this.__hooks[name]
    return this
  }

  /**
   * @returns {Object}
   */
  getHooks () {
    if (this.safe) {
      return this.$clone(this.__hooks)
    }
    return this.__hooks
  }

  /**
   * @param {string} name
   * @param {Function} handler
   * @returns {Schema|Skeleton}
   */
  addWatch (name, handler) {
    if (!this.__watches[name]) {
      this.__watches[name] = handler
      return this
    }
    this.__watches[name] = [this.__watches[name]]
    this.__watches[name].push(handler)
    return this
  }

  /**
   * @returns {Object}
   */
  getWatches () {
    if (this.safe) {
      return this.$clone(this.__watches)
    }
    return this.__watches
  }

  /**
   * @param {string} id
   * @param {Object} options
   * @returns {Schema|Skeleton}
   */
  addGroup (id, options = {}) {
    this.__groups[id] = {
      label: this.$lang(`domains.${this.constructor.domain}.groups.${id}`),
      ...options
    }
    return this
  }

  /**
   * @returns {Object}
   */
  getGroups () {
    if (this.safe) {
      return this.$clone(this.__groups)
    }
    return this.__groups
  }

  /**
   * @param {Object} options
   * @returns {Object}
   */
  array (options = {}) {
    const fields = this.arrayFields ? this.arrayFields(this.getFields()) : this.$clone(this.getFields())
    return {
      domain: this.constructor.domain,
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      fields: fields,
      ...options
    }
  }

  /**
   * @param {boolean} widget
   * @param {Object} query
   * @returns {Object}
   */
  remote (widget = false, query = {}) {
    const fields = this.remoteFields ? this.remoteFields(this.getFields()) : this.$clone(this.getFields())
    return {
      widget: widget,
      query: query,
      keyValue: this.primaryKey,
      keyLabel: this.displayKey,
      domain: this.constructor.domain,
      format: (row, value) => value,
      fields: fields,
      remote: (filter, pagination = undefined, query = {}) => {
        if (pagination) {
          return this.$service()
            .paginate({ filter, pagination, [searchKey]: query })
        }
        return this.$service()
          .paginate({ filter, [searchKey]: query })
          .then((response) => response.rows)
      }
    }
  }

  /**
   * @param {string} field
   * @returns {Schema|Skeleton}
   */
  addAvoid (field) {
    this.__avoids.push(field)
    return this
  }

  /**
   * @return {Array}
   */
  getAvoids () {
    return this.__avoids
  }

  /**
   * @param {Object} record
   * @return {Object}
   */
  removeAvoids (record) {
    return this.__avoids.reduce(function (carry, avoid) {
      if (carry[avoid]) {
        delete carry[avoid]
      }
      return carry
    }, { ...record })
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {Object}
   */
  tableEvents () {
    return {}
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @returns {Object}
   */
  formEvents () {
    return {}
  }

  /**
   * @param {string} masterKey
   * @returns {Object}
   */
  detail (masterKey) {
    return {
      masterKey: masterKey,
      groupType: this.groupType,
      domain: this.constructor.domain,
      settings: {
        toast: this.useToast,
        uuid: this.useUuid
      },
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      hooks: () => this.getHooks(),
      actions: () => this.getActions(),
      groups: () => this.getGroups(),
      fields: () => this.getFields(),
      watches: () => this.getWatches()
    }
  }

  /**
   * @returns {Object}
   */
  provide () {
    const table = {
      title: this.titleTable,
      on: this.tableEvents()
    }
    const form = {
      title: this.titleForm,
      on: this.formEvents()
    }
    return {
      groupType: this.groupType,
      path: this.constructor.path,
      domain: this.constructor.domain,
      settings: {
        toast: this.useToast,
        uuid: this.useUuid
      },
      table: Object.assign(table, this.table),
      form: Object.assign(form, this.form),
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      hooks: () => this.getHooks(),
      actions: () => this.getActions(),
      groups: () => this.getGroups(),
      fields: () => this.getFields(),
      watches: () => this.getWatches()
    }
  }
}
