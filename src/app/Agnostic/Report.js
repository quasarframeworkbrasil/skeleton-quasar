import Schema from 'src/app/Agnostic/Schema'
import Action from 'src/app/Agnostic/Schema/Action'
import Field from 'src/app/Agnostic/Schema/Field'
import FieldForm from 'src/app/Agnostic/Schema/FieldForm'
import FieldTable from 'src/app/Agnostic/Schema/FieldTable'
import FieldIs from 'src/app/Agnostic/Schema/FieldIs'
import FieldValidation from 'src/app/Agnostic/Schema/FieldValidation'
import { POSITIONS } from 'src/app/Agnostic/enum'

/**
 * @class {Report}
 */
export default class Report extends Schema {
  /**
   * @type {Array}
   */
  static mixins = [
    Action,
    Field, FieldForm, FieldTable, FieldIs, FieldValidation
  ]

  /**
   * @type {boolean}
   */
  service = true

  /**
   */
  defaults () {
    const schema = this

    this.addHook('created:default', function () {
      // call component initialize method
      if (this.initialize && typeof this.initialize === 'function') {
        this.initialize()
      }

      // call configure of each field
      this.configure()

      // call global prototype configure
      schema.beforeCreateHook.call(this)

      // call global prototype configure
      /**
       * @fires.createdHook
       */
      schema.createdHook.call(this, schema)
    })

    this.addAction('submit')
      .actionLabel('Visualizar')
      .actionColor('primary')
      .actionIcon('search')
      .actionScopes(['report'])
      .actionFloatRight()
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionOn('click', function (payload) {
        this.reportSubmit(payload)
      })

    this.addAction('printing')
      .actionLabel('Imprimir')
      .actionColor('white')
      .actionIcon('print')
      .actionScopes(['report'])
      .actionFloatRight()
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionOn('click', function (payload) {
        this.reportSubmit(payload, true)
      })

    this.addAction('return')
      .actionLabel('Voltar')
      .actionColor('white')
      .actionIcon('undo')
      .actionScopes(['report'])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionOn('click', function ({ $event }) {
        $event.stopPropagation()
        $event.preventDefault()
        this.reportBack()
      })

    this.addAction('printer')
      .actionLabel('Imprimir')
      .actionColor('white')
      .actionIcon('print')
      .actionScopes(['report'])
      .actionPositions([POSITIONS.POSITION_FORM_FOOTER])
      .actionOn('click', function ({ $event }) {
        $event.stopPropagation()
        $event.preventDefault()
        this.reportPrint()
      })
  }

  /**
   * @returns {[string]}
   */
  initScopes () {
    return ['report']
  }

  /**
   * @returns {Object}
   */
  provide () {
    return {
      report: String(this.constructor.domain).replace('report.', ''),
      path: this.constructor.path,
      domain: this.constructor.domain,
      settings: {},
      primaryKey: this.primaryKey,
      displayKey: this.displayKey,
      hooks: () => this.getHooks(),
      actions: () => this.getActions(),
      fields: () => this.getFields(),
      watches: () => this.getWatches()
    }
  }
}
