import UserSchema from 'src/domains/Admin/User/Schema/UserSchema.js'

/**
 * @class {AccountSchema}
 */
export default class AccountSchema extends UserSchema {
  /**
   * available: ['none', 'index']
   * @type {string}
   */
  afterUpdate = 'none'

  /**
   */
  construct () {
    super.construct()

    // fields

    this.getField('name')
      .fieldFormWidth(60)

    this.getField('email')
      .fieldFormWidth(60)

    this.getField('profile')
      .fieldFormHidden()
      .validationClear()

    this.getField('active')
      .fieldFormHidden()

    // actions

    this.getAction('home')
      .actionScopes([])

    this.getAction('print')
      .actionScopes([])

    this.getAction('destroy')
      .actionScopes([])

    // hooks

    this.addHook('after:update.click', function () {
      return this.$store.dispatch('auth/setNameUser', this.$getField('name').$getValue())
    })
  }

  /**
   * Component created hook
   * @param schema
   * @override
   */
  createdHook (schema = undefined) {
    const user = this.$store.getters['auth/getUser']

    const fields = [this.primaryKey, 'name', 'email', 'profile', 'integration']
    fields.forEach((field) => this.$getField(field).$setValue(user[field]))
  }
}
