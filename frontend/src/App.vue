<template>
  <div id="app">

    <Navbar/>
  
    <router-view></router-view>
    
  </div>
</template>

<script>

import Navbar from './components/Navbar'


export default {

  name: 'App',

  components: {
    Navbar
  }
  
}

</script>

<style>

body {
  background-color: #f0f0f0 !important;
  margin: 0;
  padding: 0;
}

</style>
