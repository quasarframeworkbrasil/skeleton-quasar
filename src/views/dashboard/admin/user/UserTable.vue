<template>
  <SchemaTable v-bind="bind" />
</template>

<script type="text/javascript">
import View from 'src/app/Agnostic/Adapters/View'
import Schema from 'src/domains/Admin/User/Schema/UserSchema'

/**
 */
export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'UserTable',
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
