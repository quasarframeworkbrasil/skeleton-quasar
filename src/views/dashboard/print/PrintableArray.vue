<template>
  <table>
    <thead>
      <tr>
        <th style="width: 30px">
          *
        </th>
        <th
          v-for="(field, key) in components"
          :key="key"
        >
          {{ label(field.$key) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(record, index) in items"
        :key="record[component.attrs.keyValue]"
      >
        <td class="disabled">
          <small>{{ index + 1 }}</small>
        </td>
        <td
          v-for="(field, key) in components"
          :key="key"
        >
          {{ value(record[field.$key], field.$key) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PrintableMixin from 'src/views/dashboard/print/PrintableMixin'

export default {
  /**
   */
  name: 'PrintableArray',
  /**
   */
  mixins: [PrintableMixin],
  /**
   */
  props: {
    component: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  /**
   */
  computed: {
    /**
     * @returns {*}
     */
    components () {
      const fields = this.component.attrs.fields
      return Object.keys(fields).reduce((accumulator, key) => {
        if (fields[key].$layout.tableHidden || fields[key].$type === 'text') {
          return accumulator
        }
        accumulator[key] = fields[key]
        return accumulator
      }, {})
    },
    /**
     * @returns {string}
     */
    domain () {
      return this.component.attrs.domain
    }
  }
}
</script>

<style
  lang="stylus"
  scoped
>
table, th, td
  border 1px solid #333
  border-collapse collapse

table
  width 100%
  max-width 100%
  overflow hidden

th, td
  padding 4px 8px
</style>
