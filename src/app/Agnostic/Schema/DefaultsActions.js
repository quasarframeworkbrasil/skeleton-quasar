import { POSITIONS, SCOPES } from 'src/app/Agnostic/enum'
import { reject } from 'src/app/Util/general'
import { primaryKey } from 'src/settings/schema'

/**
 */
export default {
  /**
   */
  actionBack () {
    this.$browse(-1)
  },

  /**
   */
  actionPrint () {
    const name = this.$options.name
    if (name === 'SchemaForm') {
      this.$store.dispatch('app/setPrint', {
        domain: this.domain,
        components: this.components,
        record: this.record
      })
    }
  },

  /**
   * @returns {Object}
   */
  actionHome () {
    if (this.$route.meta.scope === SCOPES.SCOPE_VIEW && this.$route.query.trash) {
      this.$browse(`${this.getActionPath()}/trash`, { keep: true, exclude: 'trash' })
      return
    }
    this.$browse(this.getActionPath(), true)
  },

  /**
   * @param {Schema} schema
   * @param {string} scope
   * @param {Object} record
   * @returns {Object}
   */
  actionCreate ({ schema, record }) {
    const ok = this.formCheckIntegrity(schema, 'agnostic.actions.create.validation')
    if (!ok) {
      return
    }

    const success = (response) => {
      const id = this.actionSchemaSuccess(response, 'agnostic.actions.create.success')
      const path = this.getActionPath()
      if (schema.afterCreate === 'view') {
        this.$browse(`${path}/${id}`, true)
        return
      }
      if (schema.afterCreate === 'edit') {
        this.$browse(`${path}/${id}/edit`, true)
        return
      }
      this.$browse(path, true)
    }

    const fail = (error) => {
      this.actionSchemaFail(error, 'agnostic.actions.create.fail')
      if (!error.response) {
        return
      }
      const response = error.response
      if (response.status !== 400) {
        return
      }
      const errors = this.$util.get(response, 'data.meta.errors')
      if (!Array.isArray(errors)) {
        return
      }
      this.errors = errors.reduce((accumulator, error) => {
        if (!this.components[error['property_path']]) {
          this.triggerHook('validate:error', { error })
          return accumulator
        }
        accumulator[error['property_path']] = error['message']
        return accumulator
      }, {})
    }

    this.actionSchemaAttempt()
    const __record = schema.removeAvoids(record)
    return schema.$service().create(__record)
      .then(success)
      .catch(fail)
  },

  /**
   * @param {Schema} schema
   * @param {string} scope
   * @param {Object} record
   * @returns {Object}
   */
  actionUpdate ({ schema, record }) {
    const ok = this.formCheckIntegrity(schema, 'agnostic.actions.update.validation')
    if (!ok) {
      return
    }

    const prepare = () => this.actionSchemaAttempt()

    const success = (response) => {
      this.actionSchemaSuccess(response, 'agnostic.actions.update.success')
      const path = this.getActionPath()
      if (schema.afterUpdate !== 'index') {
        return
      }
      this.$browse(path, true)
    }

    const fail = (error) => this.actionSchemaFail(error, 'agnostic.actions.update.fail')

    prepare()
    const __record = schema.removeAvoids(record)
    return schema.$service().update(__record)
      .then(success)
      .catch(fail)
  },

  /**
   * @param {Object} payload
   */
  actionView (payload) {
    const trash = this.$route.meta.scope === SCOPES.SCOPE_TRASH
    const view = (record) => {
      const target = { path: `${this.getActionPath()}/${record[this.primaryKey]}` }
      if (trash) {
        target.query = { trash }
      }
      this.$browse(target, true)
    }
    this.withRecord(payload, view)
  },

  /**
   * @param {Object} payload
   */
  actionEdit (payload) {
    const edit = (record) => this.$browse(`${this.getActionPath()}/${record[this.primaryKey]}/edit`, true)
    this.withRecord(payload, edit)
  },

  /**
   * @param {Object} payload
   * @returns {Promise<any>|undefined}
   */
  actionDestroy (payload) {
    const { schema } = payload
    if (!schema.service) {
      return reject({ error: 'destroy.invalid-service' })
    }

    const destroy = (data, isArray) => {
      // perform after destroy or remove
      const success = (response) => {
        this.actionSchemaSuccess(response, 'agnostic.actions.destroy.success')
        if (this.fetchRecords) {
          this.fetchRecords()
        }
      }
      // if destroy or remove fail
      const fail = (error) => this.actionSchemaFail(error, 'agnostic.actions.destroy.fail')
      // if user confirm
      const confirm = () => {
        this.actionSchemaAttempt()
        const instance = schema.$service()
        if (isArray) {
          return instance.remove(data)
            .then(success)
            .catch(fail)
        }
        return instance.destroy(data)
          .then(success)
          .catch(fail)
      }
      // if user don't confirm the action
      const ignore = () => '// silent is gold'

      return this.$confirm(this.$lang(`agnostic.actions.destroy.confirm`))
        .then(confirm)
        .catch(ignore)
    }
    this.withRecords(payload, destroy)
  },

  /**
   */
  actionSortClear () {
    if (!this.$route.query.sort) {
      this.$alert(this.$lang('agnostic.actions.sort-clear.noSort'))
      return
    }
    this.$browse({ query: { sort: undefined } }, true)
  },

  /**
   */
  actionRefresh () {
    this.fetchRecords()
  },

  /**
   */
  actionTrash () {
    this.$browse(`${this.getActionPath()}/trash`, false)
  },

  /**
   * @param {Object} payload
   * @returns {Promise<any>|undefined}
   */
  actionRestore (payload) {
    const { schema } = payload
    if (!schema.service) {
      return reject({ error: 'restore.invalid-service' })
    }

    const restore = (data, isArray) => {
      // perform after restore or remove
      const success = (response) => {
        this.actionSchemaSuccess(response, 'agnostic.actions.restore.success')
        if (this.fetchRecords) {
          this.fetchRecords()
        }
      }
      // if restore or remove fail
      const fail = (error) => this.actionSchemaFail(error, 'agnostic.actions.restore.fail')
      // if user confirm
      const confirm = () => {
        this.actionSchemaAttempt()
        if (isArray) {
          const callback = (record) => record[primaryKey]
          const list = data.map(callback).join(',')
          data = `[${list}]`
        }
        return schema.$service()
          .restore(data)
          .then(success)
          .catch(fail)
      }
      // if user don't confirm the action
      const ignore = () => '// silent is gold'

      return this.$confirm(this.$lang(`agnostic.actions.restore.confirm`))
        .then(confirm)
        .catch(ignore)
    }
    this.withRecords(payload, restore)
  },

  /**
   */
  actionAdd () {
    this.$browse(`${this.getActionPath()}/add`, true)
  },

  /**
   * @component {SchemaTableWhere}
   */
  actionSearch () {
    this.searchApply()
  },

  /**
   * @component {SchemaTableWhere}
   */
  actionSearchCancel () {
    this.searchCancel()
  },

  /**
   */
  defaultActions () {
    const schema = this

    const readonly = schema.constructor.readonly

    this.addAction('back')
      .actionScopes([SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('reply')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionBack.call(this, { $event, schema, ...context })
      })

    this.addAction('print')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionIcon('print')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionPrint.call(this, { $event, schema, ...context })
      })

    this.addAction('home')
      .actionFloatRight()
      .actionScopes([SCOPES.SCOPE_TRASH, SCOPES.SCOPE_ADD, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER, POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('dvr')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionHome.call(this, { $event, schema, ...context })
      })

    this.addAction('create')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_ADD])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionFloatRight()
      .actionIcon('save')
      .actionColor('primary')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionCreate.call(this, { $event, schema, ...context })
      })

    this.addAction('update')
      .actionScopes([SCOPES.SCOPE_EDIT])
      .actionPositions(readonly ? [] : [POSITIONS.POSITION_FORM_FOOTER])
      .actionFloatRight()
      .actionIcon('save')
      .actionColor('primary')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionUpdate.call(this, { $event, schema, ...context })
      })

    this.addAction('view')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_TRASH])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT, POSITIONS.POSITION_TABLE_CELL])
      .actionIcon('visibility')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionView.call(this, { $event, schema, ...context })
      })

    this.addAction('edit')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions(readonly ? [] : [POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT, POSITIONS.POSITION_TABLE_CELL])
      .actionColor('primary')
      .actionIcon('edit')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionEdit.call(this, { $event, schema, ...context })
      })

    this.addAction('destroy')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_INDEX, SCOPES.SCOPE_VIEW, SCOPES.SCOPE_EDIT])
      .actionPositions([
        POSITIONS.POSITION_TABLE_CELL,
        POSITIONS.POSITION_TABLE_FLOAT,
        POSITIONS.POSITION_TABLE_TOP,
        POSITIONS.POSITION_FORM_FOOTER
      ])
      .actionConfigure(function (action, { context: { record }, position }) {
        if ([POSITIONS.POSITION_TABLE_CELL, POSITIONS.POSITION_FORM_FOOTER].includes(position)) {
          action.hidden = record['deletedAt']
        }
        return action
      })
      .actionColor('negative')
      .actionIcon('delete')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionDestroy.call(this, { $event, schema, ...context })
      })

    this.addAction('sort-clear')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_TRASH])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP])
      .actionIcon('layers_clear')
      .actionNoMinWidth()
      .actionOn('click', function ({ context, $event }) {
        return schema.actionSortClear.call(this, { $event, schema, ...context })
      })

    this.addAction('refresh')
      .actionScopes([SCOPES.SCOPE_INDEX, SCOPES.SCOPE_TRASH])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('refresh')
      .actionNoMinWidth()
      .actionOn('click', function ({ context, $event }) {
        return schema.actionRefresh.call(this, { $event, schema, ...context })
      })

    this.addAction('add')
      .actionScopes(readonly ? [] : [SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_TOP, POSITIONS.POSITION_TABLE_FLOAT])
      .actionIcon('add')
      .actionColor('primary')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionAdd.call(this, { $event, schema, ...context })
      })

    this.addAction('search')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_SEARCH])
      .actionIcon('search')
      .actionColor('primary')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionSearch.call(this, { $event, schema, ...context })
      })

    this.addAction('search-clear')
      .actionScopes([SCOPES.SCOPE_INDEX])
      .actionPositions([POSITIONS.POSITION_TABLE_SEARCH])
      .actionIcon('cancel')
      .actionOn('click', function ({ context, $event }) {
        return schema.actionSearchCancel.call(this, { $event, schema, ...context })
      })
  }
}
