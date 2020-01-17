<template>
  <q-input
    :mask="mask"
    :value="inputValue"
    @input="inputUpdateValue($event)"
    v-bind="inputAttrs"
  >
    <template v-slot:prepend>
      <DateWidgetDate
        :format="format"
        :value="widgetValue"
        @input="widgetUpdateValue($event)"
      />
    </template>
    <template v-slot:append>
      <DateWidgetDatetime
        :format="format"
        :value="widgetValue"
        @input="widgetUpdateValue($event)"
      />
    </template>
  </q-input>
</template>

<script>
import MixinPropsDatetime from 'src/app/Components/Date/MixinPropsDatetime'
import MixinBehaviour from 'src/app/Components/Date/MixinBehaviour'
import DateWidgetDate from 'src/app/Components/Date/DateWidgetDate'
import DateWidgetDatetime from 'src/app/Components/Date/DateWidgetDatetime'

export default {
  /**
   */
  name: 'AppDate',
  /**
   */
  components: { DateWidgetDate, DateWidgetDatetime },
  /**
   */
  mixins: [MixinPropsDatetime, MixinBehaviour]
}
</script>

<style scoped>

</style>
