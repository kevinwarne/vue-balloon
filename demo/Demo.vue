<template>
  <div id = 'demo'>
    <div class = 'links'>
      <router-link :to = '{name: "single" }'>Single Balloon</router-link>
      <router-link :to = '{name: "multiple" }'>Multiple Balloons</router-link>
      <a href = 'https://github.com/kevinwarne/vue-balloon'>Github</a>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  export default { }
</script>

<style>
  a {
    padding: 10px;
    border: 1px solid black;
    border-radius: 2em;
    padding: 0.75em 2em;
    background: white;
    text-decoration: none;
    color: #4fc08d;
    border: 1px solid #4fc08d;
    transition: all 0.15s ease;
    font-family: 'Arial';
    margin: 0px 10px;
    display: inline-block;
    margin-top: 30px;
    width: 140px;
  }

  a.router-link-exact-active {
    background-color: #4fc08d;
    color: white;
  }

  .links {
    text-align: center;
  }
</style>
