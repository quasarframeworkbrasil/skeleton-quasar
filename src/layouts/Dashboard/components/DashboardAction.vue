<template>
  <q-expansion-item
    :key="action.uuid"
    v-if="action.children && action.children.length"
    :icon="action.icon"
    :label="action.name"
    :value="expanded"
  >
    <template v-for="(kid, key) in action.children">
      <DashboardAction
        :key="key"
        :action="kid"
        @active="expanded = true"
        @popup="$emit('popup', $event)"
      />
    </template>
  </q-expansion-item>
  <q-item
    v-else
    @click="openAction(action)"
    clickable
    v-ripple
    :active="isActive"
    :class="{ 'resource-not-implemented': !action.path, 'resource-separated': action.separated }"
  >
    <q-item-section avatar>
      <q-icon :name="action.icon" />
    </q-item-section>
    <q-item-section>
      {{ action.name }}
    </q-item-section>
    <q-item-section
      side
      style="padding: 0"
      class="open-in-popup"
    >
      <q-btn
        icon="open_in_new"
        flat
        dense
        round
        size="0.6rem"
        @click="openInPopup($event, action)"
      />
    </q-item-section>
  </q-item>
</template>

<script type="text/javascript">
export default {
  /**
   */
  name: 'DashboardAction',
  /**
   */
  props: {
    action: {
      type: Object,
      required: true
    }
  },
  /**
   */
  computed: {
    /**
     * @returns {boolean}
     */
    isActive () {
      const route = this.$route.path
      const path = this.action.path
      return route.includes(`${this.action.path}/`) || route === path
    }
  },
  /**
   */
  data: () => ({
    expanded: false
  }),
  /**
   */
  methods: {
    /**
     * @param {Object} action
     */
    openAction (action) {
      const path = action.path.split('?').shift()
      this.$router.push({ path })
    },
    /**
     * @param {Event} $event
     * @param {Object} action
     */
    openInPopup ($event, action) {
      $event.stopPropagation()
      $event.preventDefault()
      this.$emit('popup', action.path)
    }
  },
  /**
   */
  watch: {
    isActive: {
      immediate: true,
      handler (isActive) {
        if (!isActive) {
          return
        }
        this.$emit('active', true)
      }
    }
  }
}
</script>

<style scoped>

</style>
