/**
 * @typedef {SchemaButtonDropdown}
 */
export default {
  /**
   */
  methods: {
    /**
     * @param {Function} h
     * @param {Object} data
     * @returns {*}
     */
    renderButtonDropdown (h, data) {
      // TODO: implement dropdown items
      /*
      <q-list link>
        <q-item
          v-bind="button.attrs"
          v-for="(action, key) in button.actions"
          :key="key"
          v-close-overlay
          @click.native="action.native"
        >
          <q-item-main>
            <q-item-tile label>{{ action.label }}</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      */
      data.attrs.split = true

      return h('q-btn-dropdown', data)
    }
  }
}
