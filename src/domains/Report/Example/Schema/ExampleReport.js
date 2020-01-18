import Report from 'src/app/Agnostic/Report'
import UserSchema from 'src/domains/Admin/User/Schema/UserSchema'

/**
 * @class {ExampleReport}
 */
export default class ExampleReport extends Report {
  /**
   * @type {string}
   */
  static domain = 'report.example'

  /**
   */
  construct () {
    this.addField('user')
      .fieldIsSelectRemote(UserSchema.build().remote())
      .validationRequired()
  }
}
