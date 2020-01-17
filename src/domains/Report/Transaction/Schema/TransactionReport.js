import Report from 'src/app/Agnostic/Report'
import UserSchema from 'src/domains/Admin/User/Schema/UserSchema'

/**
 * @class {TransactionReport}
 */
export default class TransactionReport extends Report {
  /**
   * @type {string}
   */
  static domain = 'report.transaction'

  /**
   */
  construct () {
    this.addField('merchant')
      .fieldIsSelectRemote(UserSchema.build().remote())
      .validationRequired()
  }
}
