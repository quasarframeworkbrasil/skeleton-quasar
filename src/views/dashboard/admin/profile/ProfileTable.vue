<template>
  <SchemaTable v-bind="bind" />
</template>

<script type="text/javascript">
import View from 'src/app/Agnostic/Adapters/View'
import Schema from 'src/domains/Admin/Profile/Schema/ProfileSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'ProfileTable',
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
