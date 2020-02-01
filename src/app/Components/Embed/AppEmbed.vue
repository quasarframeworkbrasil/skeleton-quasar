<template>
  <div class="AppMasterDetail">
    <transition name="slide-right">
      <AppMasterDetailForm
        v-show="form"
        v-bind="bind"
        @change="change"
      />
    </transition>
    <transition name="slide-left">
      <AppMasterDetailTable
        v-show="table"
        v-bind="bind"
        @change="change"
      />
    </transition>
  </div>
</template>

<script lang="js">
import AppMasterDetailTable from 'src/app/Components/Embed/AppEmbedTable'
import AppMasterDetailForm from 'src/app/Components/Embed/AppEmbedForm'
import { SCOPES } from 'src/app/Agnostic/enum'

export default {
  /**
   */
  name: 'AppMasterDetail',
  /**
   */
  components: {
    AppMasterDetailTable, AppMasterDetailForm
  },
  /**
   */
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    masterKey: {
      type: String,
      required: true
    }
  },
  /**
   */
  data () {
    return {
      scope: SCOPES.SCOPE_MASTER_DETAIL_INDEX,
      clipboard: {}
    }
  },
  /**
   */
  computed: {
    /**
     * @return {Object}
     */
    bind () {
      const attrs = this.$attrs
      const props = this.$props
      return {
        ...attrs,
        ...props,
        embed: true,
        masterKey: this.masterKey,
        masterValue: this.value,
        scope: this.scope,
        clipboard: this.clipboard
      }
    },
    /**
     * @return {boolean}
     */
    table () {
      return this.scope === SCOPES.SCOPE_MASTER_DETAIL_INDEX
    },
    /**
     * @return {boolean}
     */
    form () {
      const scopes = [
        SCOPES.SCOPE_MASTER_DETAIL_ADD,
        SCOPES.SCOPE_MASTER_DETAIL_EDIT,
        SCOPES.SCOPE_MASTER_DETAIL_VIEW
      ]
      return scopes.includes(this.scope)
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Object} payload
     */
    change ({ scope, clipboard }) {
      if (scope) {
        this.scope = scope
      }
      if (clipboard) {
        this.$set(this, 'clipboard', clipboard)
      }
    }
  }
}
</script>

<style lang="stylus">
.AppMasterDetail
  height calc(100vh - 210px)
  overflow-x hidden
  overflow-y auto

  > .AppMasterDetailForm
    .app-form-wrapper
      height calc(100vh - 212px)
      box-shadow none
      border 1px solid #dddddd

      .app-form-body
        height calc(100vh - 275px)
        padding 15px 10px 0 10px

  > .AppMasterDetailTable
    .q-page-sticky
      z-index 2000

    .app-form-buttons
      button
        min-width auto

    > .AppMasterDetailTable__container
      box-shadow none
      border 1px solid #dddddd

      .app-form-buttons
        padding 0 !important
        .q-icon
          color #767676

      > .q-table__middle
        height calc(100vh - 337px)
        min-height 300px

      thead tr:first-child th
        border-top 1px solid #dddddd
        height 40px !important
        background #f5f5f5

      // background linear-gradient(180deg, #f7f7f7 0, #f1f1f1 20px, #ecebeb 39px, #c1c1c1 40px) !important

      thead tr th
        position sticky
        z-index 1001

      thead tr:first-child th
        top 0

      tbody > tr
        height 40px

        > td
          > .app-form-buttons
            padding 2px 0 0 0 !important
            height 38px
            transition 0.05s
            position absolute
            transform scale(0)
            top 0
            left 0
            background linear-gradient(90deg, #f7f7f7 0%, rgba(239, 239, 239, 0.9) 60%, rgba(239, 239, 239, 0) 100%)
            z-index 1000

          i.q-icon-inline
            font-size 1.6rem
            color #767676

          .q-checkbox, .q-toggle
            padding 0 !important

        &:hover
          .app-form-buttons
            transform scale(1)
            transition-property transform
            transition-duration 0.15s
            transition-timing-function ease-out
            padding 10px

    .SchemaTableWhere
      > .SchemaTableWhere__side
        height calc(100vh - 205px)
        .SchemaTableWhere__form
          height: calc(100vh - 261px)
        .app-form-buttons
          padding 10px 0 10px 10px

  + .field-error
    display none
</style>
