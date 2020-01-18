// mixins
import SchemaButton from 'src/app/Components/Schema/Buttons/Mixins/SchemaButton'
import SchemaButtonParse from 'src/app/Components/Schema/Buttons/Mixins/SchemaButtonParse'
// app
import { POSITIONS } from 'src/app/Agnostic/enum'

/**
 * @component {SchemaButtons}
 */
export default {
  name: 'SchemaButtons',
  /**
   */
  mixins: [
    SchemaButtonParse, SchemaButton
  ],
  /**
   */
  props: {
    buttons: {
      type: [Array, Object],
      default: () => ([])
    },
    position: {
      type: String,
      default: ''
    },
    scope: {
      type: String,
      default: ''
    },
    context: {
      type: Object,
      default: undefined
    },
    override: {
      type: Object,
      default: () => ({})
    }
  },
  /**
   */
  computed: {
    /**
     */
    actions () {
      return Object.values(this.buttons)
        .filter((button) => button.positions && button.positions.includes(this.position))
        .map((button) => this.parseButton(button))
    }
  },
  /**
   * @param {Function} h
   */
  render (h) {
    if (this.position !== POSITIONS.POSITION_TABLE_FLOAT) {
      const data = {
        class: 'app-form-buttons'
      }
      const children = Object.values(this.actions).map((button) => this.renderButton(h, button))

      return h('div', data, children)
    }

    const settings = { attrs: { direction: 'up', icon: 'apps', color: 'primary' } }
    const buttons = Object
      .values(this.actions)
      .map((button) => this.renderButton(h, { ...button, __floating: true }))

    const children = [
      h('q-fab', settings, buttons)
    ]
    const data = {
      attrs: {
        position: 'bottom-right',
        offset: [20, 60]
      }
    }
    return h('q-page-sticky', data, children)
  }
}
