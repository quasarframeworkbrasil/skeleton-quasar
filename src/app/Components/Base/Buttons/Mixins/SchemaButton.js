import SchemaButtonDropdown from 'src/app/Components/Base/Buttons/Renders/SchemaButtonDropdown'
import SchemaButtonFloating from 'src/app/Components/Base/Buttons/Renders/SchemaButtonFloating'
import SchemaButtonSingle from 'src/app/Components/Base/Buttons/Renders/SchemaButtonSingle'

/**
 * @mixin {SchemaButton}
 */
export default {
  /**
   */
  mixins: [
    SchemaButtonDropdown, SchemaButtonFloating, SchemaButtonSingle
  ],
  /**
   */
  methods: {
    /**
     * @param {string} key
     */
    buttonRef (key) {
      return `form:button-${key}`
    },
    /**
     * @param {Function} h
     * @param {Object} button
     * @returns {*}
     */
    renderButton (h, button) {
      if (button.hidden) {
        return
      }

      const data = {
        key: button.$key,
        ref: button.reference ? this.buttonRef(button.reference) : undefined,
        class: button.class,
        attrs: { ...button.attrs },
        on: { ...button.listeners },
        style: button.style
      }
      const children = []
      if (button.attrs.tooltip) {
        children.push(h('q-tooltip', button.attrs.tooltip))
      }
      if (button.dropdown) {
        return this.renderButtonDropdown(h, data)
      }
      if (button.__floating) {
        return this.renderButtonFloating(h, data, children)
      }
      return this.renderButtonSingle(h, data, children)
    }
  }
}
