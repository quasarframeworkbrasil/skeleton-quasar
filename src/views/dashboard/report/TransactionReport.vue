<template>
  <SchemaReport v-bind="bind" />
</template>

<script type="text/javascript">
import View from 'src/app/Agnostic/Adapters/View'
import Report from 'src/domains/Report/Transaction/Schema/TransactionReport'

export default {
  /**
   */
  extends: View,
  /**
   */
  name: 'Transaction',
  /**
   */
  schema: Report
}
</script>

<style scoped>

</style>
