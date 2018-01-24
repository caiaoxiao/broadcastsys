<template>
  <div>
    <topMenu></topMenu>
    <container></container>
    <footNav></footNav>
  </div>
</template>

<script>
  import { topMenu, footNav, container } from 'components'
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },

    components: {
      topMenu,
      footNav,
      container
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
