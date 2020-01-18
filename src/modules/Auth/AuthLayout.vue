<template>
  <div class="landing">
    <a
      href="https://github.com/quasarframeworkbrasil/skeleton"
      data-ribbon="Fork me on GitHub"
      title="Fork me on GitHub"
      class="github-fork-ribbon left-top fixed"
    >
      Fork me on GitHub
    </a>
    <div class="landing__content">
      <router-view />
    </div>
    <div class="landing__space" />
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
.landing
  background #111111
  position relative
  width 100vw
  height 100vh

.landing__content
  position absolute
  z-index 2
  width: 100vw

.landing__space
  z-index 1
  position absolute
  width 400vw
  height 400vh
  top 50%
  left 50%
  margin-top -200vh
  margin-left -200vw
  animation rotate 200s linear infinite
  background-size 240px
  backface-visibility visible
  background-image url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMjQwIj48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTA2IDkwaDJ2MmgtMnpNNzQgNjNoMXYxaC0xek0yMyA2NmgxdjFoLTF6TTUwIDExMGgxdjFoLTF6TTYzIDEyOGgxdjFoLTF6TTQ1IDE0OWgxdjFoLTF6TTkyIDE1MWgxdjFoLTF6TTU4IDhoMXYxaC0xek0xNDcgMzNoMnYyaC0yek05MSA0M2gxdjFoLTF6TTE2OSAyOWgxdjFoLTF6TTE4MiAxOWgxdjFoLTF6TTE2MSA1OWgxdjFoLTF6TTEzOCA5NWgxdjFoLTF6TTE5OSA3MWgzdjNoLTN6TTIxMyAxNTNoMnYyaC0yek0xMjggMTYzaDF2MWgtMXpNMjA1IDE3NGgxdjFoLTF6TTE1MiAyMDBoMXYxaC0xek01MiAyMTFoMnYyaC0yek0wIDE5MWgxdjFIMHpNMTEwIDE4NGgxdjFoLTF6Ii8+PC9zdmc+')

@keyframes rotate {
  to {
    transform: rotate(-360deg);
  }
}
</style>
