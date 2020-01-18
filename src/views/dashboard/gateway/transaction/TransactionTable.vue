<template>
  <SchemaTable v-bind="bind" />
</template>

<script type="text/javascript">
import View from 'src/app/Agnostic/Adapters/View'
import Schema from 'src/domains/Gateway/Example/Schema/TransactionSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'TransactionTable',
  /**
   */
  schema: Schema
}
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
>
</style>
