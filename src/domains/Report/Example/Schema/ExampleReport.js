import Report from 'src/app/Agnostic/Report'
import UserSchema from 'src/domains/Admin/User/Schema/UserSchema'
import ProfileSchema from 'src/domains/Admin/Profile/Schema/ProfileSchema'

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
      .fieldIsSelectRemote(UserSchema.build().provideRemote())
      .fieldFormWidth(60)
      .validationRequired()

    this.addField('notes')
      .fieldIsText()
      .fieldFormWidth(40)
      .fieldFormHeight(2)

    this.addField('profile')
      .fieldIsSelectRemote(ProfileSchema.build().provideRemote())
      .fieldFormWidth(60)

    this.addField('restrict')
      .fieldIsCheckbox()
      .fieldFormDefaultValue(true)
  }
}
