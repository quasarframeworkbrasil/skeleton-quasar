import Schema from 'src/app/Agnostic/Schema'
import Service from 'src/domains/General/Category/Schema/CategoryService'
import { path, domain } from 'src/domains/General/Category/settings'

/**
 * @class {CategorySchema}
 */
export default class CategorySchema extends Schema {
  /**
   * @type {string}
   */
  static domain = domain

  /**
   * @type {string}
   */
  static path = path

  /**
   * @type {Rest}
   */
  service = Service

  /**
   * Configure schema
   */
  construct () {
    this.addField('name')
      .fieldTableShow()
      .fieldTableWhere()
      .fieldFormAutofocus()
      .validationRequired()
      .validationMinLength()
  }
}
