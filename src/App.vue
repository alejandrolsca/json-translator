<template>
  <div id="app" class="col-md-12">
    <header class="row">
      <img class="als-logo" src="./assets/az-logo.svg">
    </header>
    <sub-header class="row">
      <router-link class="btn btn-warning" to="/">Load Base JSON</router-link> | 
      <router-link class="btn btn-warning" to="Translator">Translator</router-link>
    </sub-header>
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
    header .als-logo {
      width:50px;
      height: auto;
    }
    footer .als-logo {
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
      display: block;
      position: relative;
      text-align: left;
      padding: 9pt;
      background-color: #2e3a47;
      z-index: 2;
    }
    sub-header {
      display: block;
      position: relative;
      text-align: left;
      padding: 9pt;
      background-color: #2e3a47;
      border-top:1px solid #545c67;
      box-shadow: 0 0 10px rgba(6,7,9,.6);
      z-index: 1;
    }
    footer {
      text-align: right;
      padding: 0 0 18pt 0;
    }
    a, a:visited {
      color:#fff;
    }
</style>