import Schema from 'src/app/Agnostic/Schema'

import MovieService from 'src/domains/Example/Movie/Schema/MovieService'
import { domain, path } from 'src/domains/Example/Movie/settings'

/**
 * @type {MovieSchema}
 */
export default class MovieSchema extends Schema {
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
  service = MovieService

  /**
   * @type {boolean}
   */
  useUuid = true

  /**
   */
  construct () {
    this.addField('name')
      .fieldTableShow()
      .fieldFormAutofocus()
      .validationRequired()
      .fieldFormWidth(100)
      .fieldOn('input', function () {
        // console.log('>>> arguments', arguments)
      })
      .validationAs('custom', function (value) {
        return value === 'W'
      })

    this.addField('description')
      .fieldIsText(5)
      .fieldTableShow()
      .fieldFormWidth(100)
      .fieldOn('input', function () {
        // console.log('>>> arguments', arguments)
      })
  }
}
