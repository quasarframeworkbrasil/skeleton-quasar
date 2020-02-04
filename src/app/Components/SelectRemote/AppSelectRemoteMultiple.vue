<template src="src/app/Components/SelectRemote/appSelectRemote.html" />

<script type="text/javascript">
import MixinTableColumn from 'src/app/Components/Schema/Contracts/Table/TableColumns'
import Field from 'src/app/Components/Schema/Contracts/Field'
import AppSelectRemote from './appSelectRemote'
import SelectRemoteWidgetTable from './SelectRemoteWidgetTable'
import SchemaTableWhere from 'src/app/Components/Schema/Table/Where/SchemaTableWhere'
import { unSerialize } from 'src/app/Util/general'
import { searchKey } from 'src/settings/schema'

export default {
  /**
   */
  name: 'AppSelectRemoteMultiple',
  /**
   */
  multiple: true,
  /**
   */
  mixins: [
    Field, MixinTableColumn, AppSelectRemote
  ],
  /**
   */
  components: { SelectRemoteWidgetTable, SchemaTableWhere },
  /**
   */
  props: {
    value: {
      type: Array,
      default: () => null
    }
  },
  /**
   */
  computed: {
    arriving () {
      if (this.value && Array.isArray(this.value)) {
        return this.value.map((row) => this.parseOptions(row))
      }
      return this.value
    }
  },
  /**
   */
  data: () => ({
    openDialog: false,
    maximizedToggle: false,
    columns: [],
    visibleColumns: [],
    data: [],
    widgetQuery: {},
    widgetSearchPhrase: ''
  }),
  /**
   */
  methods: {
    /**
     * @param value
     */
    goingOut (value) {
      if (!Array.isArray(value)) {
        this.$emit('input', value)
        return
      }
      this.$emit('input', value.map((selected) => selected.__meta))
    },
    /**
     * @param {Object} options
     */
    widgetRequest (options = {}) {
      const { filter, done, page, rowsPerPage, rowsNumber, sortBy, descending } = options

      this.remote(filter, { page, rowsPerPage, rowsNumber, sortBy, descending }, this.widgetQuery)
        .then((response) => {
          let data = []
          if (Array.isArray(response.rows)) {
            data = response.rows
          }
          this.data = data
          const rowsPerPage = response.rowsPerPage
          const pagesNumber = response.pagesNumber
          const page = response.page
          const rowsNumber = response.rowsNumber
          done({ rowsPerPage, pagesNumber, page, rowsNumber, sortBy, descending })
        })
    },
    /**
     * @param {Array} value
     */
    widgetConfirm (value) {
      this.$emit('input', value)
      this.openDialog = false
    },
    /**
     */
    widgetCancel () {
      this.openDialog = false
    },
    /**
     * @param {string} phrase
     */
    widgetSearch (phrase) {
      this.widgetSearchPhrase = phrase
      this.widgetQuery = unSerialize(phrase, searchKey)
    }
  },
  /**
   */
  watch: {
    fields: {
      immediate: true,
      handler () {
        this.renderColumns()
      }
    }
  }
}
</script>

<style lang="stylus">
.AppSelectRemote__widget
  .SchemaTableSide__absolute, .SchemaTableWhere,
  .SchemaTableWhere > .SchemaTableWhere__side,
  .SchemaTableWhere > .SchemaTableWhere__toggle
    top -16px

  .SchemaTableWhere > .SchemaTableWhere__side
    height 100vh

  .SchemaTableWhere > .SchemaTableWhere__side .SchemaTableWhere__form
    height calc(100vh - 55px)

  .SchemaTableWhere > .SchemaTableWhere__backdrop
    height 100vh
    margin-top -30px

  .SchemaTableWhere > .SchemaTableWhere__toggle
    height 100px
    width 100px
    border-radius 100px
    padding 40px 0 0 10px
    top calc(50vh - 100px)
    right -65px

.q-dialog__inner--minimized
  .SchemaTableWhere > .SchemaTableWhere__side .SchemaTableWhere__form
    height calc(100vh - 107px) !important
</style>
