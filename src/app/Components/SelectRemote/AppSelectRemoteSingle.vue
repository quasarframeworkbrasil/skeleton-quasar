<template src="src/app/Components/SelectRemote/appSelectRemote.html" />

<script type="text/javascript">
import AppSelectRemote from './appSelectRemote'

export default {
  /**
   */
  name: 'AppSelectRemoteSingle',
  /**
   */
  multiple: false,
  /**
   */
  mixins: [
    AppSelectRemote
  ],
  /**
   */
  props: {
    value: {
      type: Object,
      default: () => null
    }
  },
  /**
   */
  computed: {
    arriving () {
      if (this.value) {
        return this.parseOptions(this.value)
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
    goingOut (value) {
      this.$emit('input', value ? value.__meta : null)
    }
  }
}
</script>
