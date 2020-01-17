<template>
  <q-icon
    class="cursor-pointer"
    name="event"
  >
    <q-popup-proxy
      ref="qDateProxy"
      transition-hide="scale"
      transition-show="scale"
    >
      <q-date
        :mask="format"
        :value="value"
        @input="input"
      />
    </q-popup-proxy>
  </q-icon>
</template>

<script>
import AppDateMixinProps from 'src/app/Components/Date/MixinPropsDate'

export default {
  /**
   */
  name: 'DateWidgetDate',
  /**
   */
  mixins: [AppDateMixinProps],
  /**
   */
  methods: {
    /**
     * @param value
     */
    input (value) {
      this.$refs.qDateProxy.hide()
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>

</style>
