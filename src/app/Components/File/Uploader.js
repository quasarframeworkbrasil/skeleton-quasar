import './uploader.styl'

/**
 * @mixin Uploader
 */
export default {
  /**
   */
  props: {
    value: {
      default: ''
    },
    readonly: {
      default: false
    },
    disable: {
      default: false
    }
  },
  /**
   */
  computed: {
    /**
     * @return {boolean}
     */
    locked () {
      return this.readonly || this.disable
    }
  },
  /**
   */
  methods: {
    /**
     * @param {Event} event
     */
    onClick (event) {
      const file = this.$refs.file
      if (file) {
        file.click()
      }
      event.preventDefault()
    },
    /**
     */
    handleFiles () {
      const file = this.$refs.file.files[0]
      this.uploadFile(file)
    },
    /**
     * @param {File} file
     */
    uploadFile (file) {
      if (this.locked) {
        return
      }

      this.resetUploadProgress()
      this.startFileUpload(file)
    },
    /**
     * @param {File} file
     */
    onFileUploadStarted (file) {
      throw new Error('need override `onFileUploadStarted`')
    },
    /**
     * @param {Object} response
     */
    finishFileUpload (response) {
      throw new Error('need override `finishFileUpload`')
    },
    /**
     * @param {Object} event
     */
    onUploadProgress (event) {
      const progress = Math.round((event.loaded * 100.0) / event.total)
      this.$refs.progress.style.width = (100 - progress) + '%'
    },
    /**
     * @param {Object} event
     */
    onReadyStateChange (event) {
      if (this.xhr.readyState !== 4 || this.xhr.status !== 200) {
        return
      }
      const response = JSON.parse(this.xhr.responseText)
      const value = this.onFileUploadFinished(response)
      this.$emit('input', value)
      window.setTimeout(this.resetUploadProgress, 4000)
    },
    /**
     */
    resetUploadProgress () {
      this.$refs.progress.style.width = '100%'
    },
    /**
     * @param {Event} event
     */
    onDragEnter (event) {
      event.stopPropagation()
      event.preventDefault()
    },
    /**
     * @param {Event} event
     */
    onDragOver (event) {
      event.stopPropagation()
      event.preventDefault()
    },
    /**
     * @param {Event} event
     */
    onDrop (event) {
      event.stopPropagation()
      event.preventDefault()

      this.uploadFile(event.dataTransfer.files[0])
    }
  },
  /**
   */
  created () {
    this.xhr = new XMLHttpRequest()
    this.xhr.upload.addEventListener('progress', this.onUploadProgress)
    this.xhr.onreadystatechange = this.onReadyStateChange
  },
  /**
   */
  mounted () {
    this.$refs.container.addEventListener('dragenter', this.onDragEnter, false)
    this.$refs.container.addEventListener('dragover', this.onDragOver, false)
    this.$refs.container.addEventListener('drop', this.onDrop, false)
  },
  beforeDestroy () {
    this.$refs.container.removeEventListener('dragenter', this.onDragEnter)
    this.$refs.container.removeEventListener('dragover', this.onDragOver)
    this.$refs.container.removeEventListener('drop', this.onDrop)
  }
}
