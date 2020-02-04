import Schema from 'src/app/Agnostic/Schema'

import Service from './ProfileService'
import { domain, path } from '../settings'

import ActionSchema from 'src/domains/Admin/Action/Schema/ActionSchema'

/**
 * @type {ProfileSchema}
 */
export default class ProfileSchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {string}
   */
  static path = path

  /**
   * @type {Http}
   */
  service = Service

  /**
   */
  construct () {
    this.addField('name')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormAutofocus()
      .fieldFormWidth(50)
      .validationRequired()

    this.addField('reference')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsSelect()
      .fieldFormWidth(50)
      .validationRequired()

    this.addField('price')
      .fieldIsCurrency()
      .fieldFormWidth(20)

    this.addField('actions')
      .fieldIsSelectRemoteMultiple(ActionSchema.build().provideRemote())
      .fieldFormWidth(80)
  }
}
