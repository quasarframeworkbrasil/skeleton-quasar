<template>
  <q-icon
    class="cursor-pointer"
    name="access_time"
  >
    <q-popup-proxy
      ref="qDatetimeProxy"
      transition-hide="scale"
      transition-show="scale"
      @before-show="datetimeBeforeShow"
    >
      <q-time
        :mask="format"
        :value="datetimeValue"
        @input="datetimeInput"
        format24h
      />
    </q-popup-proxy>
  </q-icon>
</template>

<script>
import AppDateMixinProps from 'src/app/Components/Date/MixinPropsDate'
import { now } from 'src/app/Util/date'

export default {
  /**
   */
  name: 'DateWidgetDatetime',
  /**
   */
  mixins: [AppDateMixinProps],
  /**
   */
  data: () => ({
    datetime: null
  }),
  /**
   */
  computed: {
    /**
     * @returns {string}
     */
    datetimeValue () {
      if (!this.value) {
        return this.datetime
      }
      return this.value
    }
  },
  /**
   */
  methods: {
    /**
     * @param value
     */
    datetimeInput (value) {
      this.$refs.qDatetimeProxy.hide()
      this.$emit('input', value)
    },
    /**
     */
    datetimeBeforeShow () {
      this.datetime = now()
    }
  }
}
</script>

<style scoped>

</style>
