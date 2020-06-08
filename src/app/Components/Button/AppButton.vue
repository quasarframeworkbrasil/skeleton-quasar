<template>
  <q-btn
    :class="classNames"
    :color="color"
    v-bind="$attrs"
    @click="click"
  />
</template>

<script>
export default {
  /**
   */
  name: 'AppButton',
  /**
   */
  props: {
    /**
     */
    click: {
      type: Function,
      default: () => undefined
    },
    /**
     */
    classes: {
      type: [String, Array],
      default: () => undefined
    },
    /**
     */
    color: {
      type: String,
      default: 'primary'
    }
  },
  /**
   */
  computed: {
    /**
     * @returns {Array}
     */
    classNames () {
      const classNames = ['AppButton full-width']
      if (typeof this.classes === 'string') {
        classNames.push(this.classes)
        return classNames
      }
      if (Array.isArray(this.classes)) {
        classNames.push(...this.classes)
      }
      return classNames
    }
  }
}
</script>

<style scoped>
.AppButton {
  margin-top: 19px;
  min-height: 38px;
}
</style>
