<template>
  <SchemaTable v-bind="bind" />
</template>

<script type="text/javascript">
import View from 'src/app/Agnostic/Adapters/View'
import Schema from 'src/domains/General/Category/Schema/CategorySchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'CategoryTable',
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
