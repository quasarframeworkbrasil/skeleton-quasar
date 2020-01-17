<template>
  <div>
    <router-view />

    <div class="fullscreen-bg">
      <video
        loop
        muted
        autoplay
        poster="statics/auth/background.jpg"
        class="fullscreen-bg__video"
      >
        <source
          src="statics/auth/background.webm"
          type="video/webm"
        >
        <source
          src="statics/auth/background.mp4"
          type="video/mp4"
        >
        <source
          src="statics/auth/background.ogv"
          type="video/ogg"
        >
      </video>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'AuthLayout'
}
</script>

<style
  lang="stylus"
  scoped
>
.fullscreen-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: -100;
}

.fullscreen-bg__video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (min-aspect-ratio: 16 / 9) {
  .fullscreen-bg__video {
    height: 300%;
    top: -100%;
  }
}

@media (max-aspect-ratio: 16 / 9) {
  .fullscreen-bg__video {
    width: 300%;
    left: -100%;
  }
}
</style>
