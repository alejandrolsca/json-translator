<template>
  <div id="app" class="col-md-12">
    <header class="row">
      <img src="./assets/az-logo.svg">
    </header>
    <router-view></router-view>
    <footer>
      <a class="als-logo" href="https://als.astrazeneca.net" target="_blank">Built by ALS</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
    body {
        padding: 0 0 10pt 0;
        background: #f0f3f6 !important;
    }
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .als-logo {
      font-size: 1px;
      color: transparent;
      display: inline-block;
      width: 71px;
      height: 30px;
      background-image: url(./assets/als-logo.svg);
      background-position: 0 0;
      background-repeat: no-repeat;
    }
    header {
      text-align: center;
      padding: 9pt 0 9pt 0;
      margin: 0 0 9pt 0;
      background-color: #2e3a47;
    }
    footer {
      text-align: right;
      padding: 0 0 18pt 0;
    }
</style>