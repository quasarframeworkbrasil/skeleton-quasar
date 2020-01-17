import Schema from 'src/app/Agnostic/Schema'

import Service from './ActionService'
import { domain, path } from '../settings'

/**
 * @type {ActionSchema}
 */
export default class ActionSchema extends Schema {
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
    this.addField('parent')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsSelectRemote(this.remote())
      .fieldFormWidth(35)

    this.addField('name')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsInputPlan()
      .fieldFormAutofocus()
      .validationRequired()
      .fieldFormWidth(35)

    this.addField('icon')
      .fieldIsInput()
      .fieldTableWhere()
      .fieldFormWidth(30)
      .fieldIsInputPlan()

    this.addField('namespace')
      .fieldTableShow()
      .fieldFormWidth(30)
      .fieldIsInputPlan()

    this.addField('path')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldIsInputPlan()
      .fieldFormWidth(40)

    this.addField('assortment')
      .fieldTableShow()
      .fieldFormWidth(30)
      .fieldIsNumber()

    this.addField('separated')
      .fieldIsCheckbox()
      .fieldFormDefaultValue(false)
  }
}
