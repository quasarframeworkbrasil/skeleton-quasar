<template>
  <q-btn-dropdown
    stretch
    flat
    content-class="DashboardLayout__dropdown_menu"
  >
    <template v-slot:label="">
      <small class="DashboardLayout__user q-pl-sm q-pr-md">{{ name }}</small>
      <q-avatar
        color="white"
        text-color="primary"
      >
        {{ letter }}
      </q-avatar>
    </template>
    <q-list>
      <q-item
        clickable
        v-ripple
        to="/dashboard/home/profile"
      >
        <q-item-section>
          <q-item-label>{{ $lang('app.menu.profile.label') }}</q-item-label>
          <q-item-label caption>
            {{ $lang('app.menu.profile.caption') }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        @click="exit"
      >
        <q-item-section>
          <q-item-label>{{ $lang('app.menu.logout.label') }}</q-item-label>
          <q-item-label caption>
            {{ $lang('app.menu.logout.caption') }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item v-if="$dev">
        <q-item-section>
          <q-toggle
            v-if="$dev"
            class="desktop-only hide-in-1200"
            v-model="debugging"
            label="Debugger"
            color="red"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { otherwise } from 'src/router'

export default {
  /**
   */
  name: 'DashboardMenu',
  /**
   */
  data: () => ({
    debugging: false
  }),
  /**
   */
  computed: {
    /**
     * @returns {Object}
     */
    name () {
      return this.$util.get(this.$store.getters['auth/getUser'], 'login')
    },
    /**
     * @returns {Object}
     */
    letter () {
      const username = this.$util.get(this.$store.getters['auth/getUser'], 'name')
      if (!username) {
        return ''
      }
      return String(username).substring(0, 1).toLocaleUpperCase()
    }
  },
  /**
   */
  methods: {
    /**
     */
    exit () {
      this.$store.dispatch('auth/updateUser', undefined).then(this.logout)
    },
    /**
     */
    logout () {
      this.$store.dispatch('auth/logout').then(() => this.$browse(otherwise))
    }
  },
  /**
   */
  created () {
    if (this.$dev) {
      this.debugging = this.$store.getters['app/getDebuggers']
      this.$watch('debugging', (debugging) => {
        this.$store.dispatch('app/setDebuggers', debugging)
      })
    }
  }
}
</script>

<style lang="stylus">
.q-item
  & > .q-item__section.open-in-popup
    transform scale(0)
    transition transform .3s

  &:hover
    & > .q-item__section.open-in-popup
      transform scale(1)
</style>
