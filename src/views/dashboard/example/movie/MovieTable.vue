<template>
  <SchemaTable v-bind="bind" />
</template>

<script type="text/javascript">
import View from 'src/app/Agnostic/Adapters/View'
import Schema from 'src/domains/Example/Movie/Schema/MovieSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'MovieTable',
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
