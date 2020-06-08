<template>
  <div class="AppArray">
    <q-markup-table
      class="AppArray__table"
      dense
      bordered
      flat
    >
      <thead>
        <tr>
          <th v-if="!disable">
            <div style="width: 45px;">
              *
            </div>
          </th>
          <th
            v-for="(field, key) in components"
            :key="`label-${key}`"
            :style="widths[field.$key]"
          >
            <div
              :style="`padding: 4px 8px;
                ${widths[field.$key]};
                text-align: ${field.attrs.align ? field.attrs.align : 'left'}`"
            >
              {{ $lang(`domains.${domain}.fields.${field.$key}`) }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!items.length">
          <td :colspan="Object.keys(components).length + 1">
            <div
              class="AppArray__empty"
              v-html="empty"
            />
          </td>
        </tr>
        <template v-for="(item, index) in items">
          <tr :key="item[primaryKey]">
            <td
              v-if="!disable"
              style="width: 45px; padding: 0 0 0 6px;"
            >
              <q-btn
                icon="close"
                dense
                flat
                @click="removeItem(index)"
              />
            </td>
            <template v-for="(field, key) in components">
              <td
                :key="key"
                :style="widths[field.$key]"
              >
                <div :style="widths[field.$key]">
                  <div
                    v-if="(field.attrs.static && item[field.$key] !== undefined) || field.attrs.disable"
                    :style="`padding: 4px 8px; text-align: ${field.attrs.align ? field.attrs.align : 'left'}`"
                    :disabled="disable"
                  >
                    {{ valueItem(field, item) }}
                  </div>
                  <component
                    v-else
                    :is="field.is"
                    :class="field.classNames"
                    v-bind="field.attrs"
                    :value="item[field.$key]"
                    @input="inputItem(index, field, $event)"
                  />
                </div>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </q-markup-table>
    <div style="padding: 0 0 0 6px;">
      <q-btn
        v-if="!disable"
        icon="add"
        dense
        flat
        @click="addItem"
      />
    </div>
    <q-resize-observer
      :debounce="300"
      @resize="onResize"
    />
  </div>
</template>

<script type="text/javascript">
import { uuid } from 'src/app/Util/general'
import { primaryKey } from 'src/settings/schema'
import { replacement } from 'src/app/Util/string'

export default {
  /**
   */
  name: 'AppArray',
  /**
   */
  props: {
    domain: {
      type: String,
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      default: () => ([])
    },
    primaryKey: {
      type: String,
      default: primaryKey
    },
    disable: {
      type: Boolean,
      default: undefined
    },
    optimize: {
      type: Boolean,
      default: false
    },
    useUuid: {
      type: Boolean,
      default: false
    }
  },
  /**
   */
  data: () => ({
    width: 0,
    components: {},
    items: []
  }),
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    empty () {
      const template = this.$lang('agnostic.components.array.empty')
      const replaces = {
        button: '<strong style="font-size: 1.4rem">+</strong>'
      }
      return replacement(template, replaces)
    },
    /**
     * @returns {Object}
     */
    widths () {
      if (this.disable) {
        return {}
      }
      return Object.values(this.fields)
        .filter((field) => !field.$layout.formHidden)
        .reduce((accumulator, field) => {
          let width
          if (this.width) {
            const math = Math.floor((field.$layout.formWidth * (this.width - 74)) / 100)
            width = `width: ${math}px`
          }
          accumulator[field.$key] = width
          return accumulator
        }, {})
    }
  },
  /**
   */
  methods: {
    /**
     */
    addItem () {
      const newest = {}
      if (this.useUuid) {
        newest[this.primaryKey] = uuid()
      }
      Object.keys(this.components).forEach((key) => {
        newest[key] = this.components[key].attrs.value
      })
      const input = [...this.value, newest]
      this.$emit('input', input)
    },
    /**
     * @param {number} index
     * @param {string} field
     * @param {*} value
     */
    inputItem (index, field, value) {
      const input = [...this.value]
      input[index][field.$key] = field.$parseOutput ? field.$parseOutput(value) : value
      this.triggerEventInputInline(index, field, input[index])
      this.$emit('input', input)
    },
    /**
     * @param {number} index
     * @param {string} field
     * @param {*} item
     */
    triggerEventInputInline (index, field, item) {
      if (!field.on) {
        return
      }
      if (!Array.isArray(field.on['input-inline'])) {
        return
      }
      const forEach = (event) => {
        event.call(this, { item })
        this.items.splice(index, 1, item)
      }
      field.on['input-inline'].forEach(forEach)
    },
    /**
     * @param {number} index
     */
    removeItem (index) {
      const input = [...this.value]
      input.splice(index, 1)
      this.$emit('input', input)
    },
    /**
     * @param {Object} field
     * @param {Object} item
     * @returns {string|number}
     */
    valueItem (field, item) {
      const value = item[field.$key]
      if (typeof value === 'object') {
        return value[field.attrs.keyLabel]
      }
      return value
    },
    /**
     * @param {Object} size
     */
    onResize (size) {
      this.width = size.width
    }
  },
  /**
   */
  watch: {
    fields: {
      immediate: true,
      handler (fields) {
        this.components = Object.values(fields)
          .filter((field) => !field.$layout.formHidden)
          .reduce((accumulator, field) => {
            if (this.disable === true || field.attrs.disable === true) {
              field.attrs.disable = true
            }
            const classNames = [`$key-${field.$key}`]
            if (field.attrs.uppercase) {
              classNames.push('uppercase')
            }
            if (field.attrs.borderLess) {
              classNames.push('border-less')
            }
            field.classNames = classNames
            accumulator[field.$key] = field
            return accumulator
          }, {})
      }
    },
    value: {
      immediate: true,
      handler (value) {
        if (this.optimize) {
          let diff = false
          const references = this.items.map((item) => item[this.primaryKey])
          for (let element of value) {
            if (references.includes(element[this.primaryKey])) {
              continue
            }
            diff = true
            break
          }
          if (diff && value.length === this.items.length) {
            return
          }
        }

        if (!Array.isArray(value)) {
          this.items = []
          return
        }

        this.items = value.map((item) => {
          Object.keys(item).forEach((key) => {
            if (this.components[key] && this.components[key].$parseInput) {
              item[key] = this.components[key].$parseInput(item[key])
            }
          })
          return item
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.AppArray
  .AppArray__table.q-table--dense .q-table th, .AppArray__table.q-table--dense .q-table td
    padding 4px 2px

  .AppArray__empty
    padding 10px
    text-align center
    color #797979

  .q-field__native.row.items-center
    flex-wrap nowrap
</style>
