<template>
  <div
    class="AppUploader AppFile"
    ref="container"
  >

    <div class="actions">
      <input
        type="file"
        ref="file"
        accept="image/*"
        style="display:none"
        @change="handleFiles"
      >

      <q-btn
        :disabled="locked"
        @click="onClick"
        color="primary"
        icon="attach_file"
        round
        flat
      />

      <q-btn
        :disabled="locked"
        color="negative"
        icon="delete"
        @click="$emit('input', undefined)"
        round
        flat
      />

      <div class="content">
        {{ content }}
      </div>
    </div>

    <div class="progress-bar">
      <div
        class="progress"
        ref="progress"
      />
    </div>
  </div>
</template>

<script>
import File from 'src/app/Components/File/Uploader'

export default {
  /**
   */
  name: 'AppFile',
  /**
   */
  mixins: [File],
  /**
   */
  computed: {
    /**
     * @return {string}
     */
    content () {
      return String(this.value).split('/').pop()
    }
  },
  /**
   */
  methods: {
    /**
     * @param {File} file
     */
    startFileUpload (file) {
      throw new Error('need override `onFileUploadStarted`')
    },
    /**
     * @param {Object} response
     */
    finishFileUpload (response) {
      throw new Error('need override `finishFileUpload`')
    }
  }
}
</script>

<style lang="stylus">
.AppFile
  > .actions
    display flex
    justify-content flex-start
    align-items center
    flex-wrap nowrap

    > .content
      border 1px solid #dddddd
      border-radius 4px
      padding 7px 10px 0 10px
      flex 1
      color #737373
      font-size 0.8rem
      height 35px
</style>
