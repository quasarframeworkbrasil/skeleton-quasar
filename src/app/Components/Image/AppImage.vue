<template>
  <div
    class="AppUploader AppImage"
    ref="container"
  >

    <div
      class="preview"
      :style="{ backgroundImage: `url('${value}')` }"
    />

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
  name: 'AppImage',
  /**
   */
  mixins: [File],
  /**
   */
  methods: {
    /**
     * @param {File} file
     */
    startFileUpload (file) {
      const cloudName = 'dncyvvphv'
      const unsignedUploadPreset = 'tkv2icks'

      const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
      this.xhr.open('POST', url, true)
      this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

      const formData = new FormData()
      formData.append('upload_preset', unsignedUploadPreset)
      formData.append('tags', 'browser_upload') // Optional - add tag for image admin in Cloudinary
      formData.append('file', file)
      this.xhr.send(formData)
    },
    /**
     * @param {Object} response
     */
    finishFileUpload (response) {
      const { 'secure_url': value } = response
      return value
    }
  }
}
</script>

<style lang="stylus">
.AppImage

  .preview
    background-color #a8a8a8
    height 203px
    background-size contain
    background-repeat no-repeat
    background-position center
    margin 0 0 10px 0
</style>
