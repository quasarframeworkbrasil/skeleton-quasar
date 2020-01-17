<template>
  <SchemaTable v-bind="bind" />
</template>

<script type="text/javascript">
import View from 'src/app/Agnostic/Adapters/View'
import Schema from 'src/domains/Gateway/Shop/Schema/ShopSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'ShopTable',
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
