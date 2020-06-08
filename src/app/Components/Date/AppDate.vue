<template>
  <q-input
    :mask="mask"
    :value="inputValue"
    @input="inputUpdateValue($event)"
    v-bind="inputAttrs"
  >
    <template v-slot:append>
      <DateWidgetDate
        :format="format"
        :value="widgetValue"
        @input="widgetUpdateValue($event)"
      />
    </template>
  </q-input>
</template>

<script>
import MixinPropsDate from 'src/app/Components/Date/MixinPropsDate'
import MixinBehaviour from 'src/app/Components/Date/MixinBehaviour'
import DateWidgetDate from 'src/app/Components/Date/DateWidgetDate'

export default {
  /**
   */
  name: 'AppDate',
  /**
   */
  components: { DateWidgetDate },
  /**
   */
  mixins: [MixinPropsDate, MixinBehaviour]
}
</script>

<style scoped>

</style>
