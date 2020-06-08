import SchemaComponents from 'src/app/Components/Schema/Form/SchemaFormComponents'

let counter = 0

/**
 * @mixin {SchemaFormBody}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Object} fields
     * @returns {*}
     */
    renderFormBodyComponents (h, fields) {
      const data = {
        ref: `formBody-${counter++}`,
        domProps: { value: this.record },
        props: { value: this.record },
        attrs: { fields: fields, errors: this.errors, validations: this.$v },
        on: { input: this.receiveInput }
      }

      return h(SchemaComponents, data)
    },
    /**
     * @param {Function} h
     * @param {Object} groups
     * @returns {*}
     */
    renderFormBodySections (h, groups) {
      const children = []
      Object.keys(groups).forEach((key) => {
        const data = {
          key: key,
          class: 'app-form-body with-section'
        }

        const kid = this.renderFormBodySection(h, key, groups[key].label, groups[key].icon)
        if (!kid) {
          return
        }
        children.push(h('div', data, [kid]))
      })
      return children
    },
    /**
     * @param {Function} h
     * @param {string} key
     * @param {string} label
     * @param {string} icon
     * @returns {*}
     */
    renderFormBodySection (h, key, label, icon = undefined) {
      const _title = (span, icon) => {
        const data = { class: 'app-form-section-title' }
        const children = [h('span', span)]
        if (icon) {
          children.unshift(h('q-icon', { attrs: { name: icon } }))
        }

        return h('div', data, children)
      }

      const components = this.getComponents(key)
      if (!components) {
        return
      }

      const data = { key: `${key}-section`, class: 'app-form-section' }
      const children = [_title(label, icon), this.renderFormBodyComponents(h, components)]

      return h('div', data, children)
    },
    /**
     * @param h
     * @param groups
     * @return {*[]}
     */
    renderFormBodyTabs (h, groups) {
      const tabs = []
      const panes = []
      Object.keys(groups).forEach((key) => {
        if (!this.groupSelected) {
          this.groupSelected = key
        }
        const tab = {
          attrs: {
            key: key,
            name: key,
            slot: 'title',
            label: groups[key].label
          }
        }
        tabs.push(h('q-tab', tab))

        const pane = {
          style: groups[key].pane,
          attrs: {
            key: key,
            name: key
          }
        }
        const children = [
          this.renderFormBodyComponents(h, this.getComponents(key))
        ]
        panes.push(h('q-tab-panel', pane, children))
      })

      const tabsData = {
        domProps: { value: this.groupSelected },
        prop: { value: this.groupSelected },
        on: { input: ($event) => { this.groupSelected = $event } },
        attrs: {
          value: this.groupSelected,
          color: 'primary',
          swipeable: true,
          align: 'justify'
        }
      }

      const panelsData = {
        domProps: { value: this.groupSelected },
        prop: { value: this.groupSelected },
        on: { input: ($event) => { this.groupSelected = $event } },
        attrs: {
          value: this.groupSelected,
          animated: true,
          keepAlive: true
        }
      }

      return [h('q-tabs', tabsData, tabs), h('q-separator'), h('q-tab-panels', panelsData, panes)]
    },
    /**
     * @receiveInput {SchemaForm.@mixin:SchemaBody}
     * @param {field} field
     * @param {*} value
     */
    receiveInput ({ field, value }) {
      this.record[field] = value
      this.errors[field] = undefined
    }
  }
}
