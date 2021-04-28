<template>
  <div id="app">
    <Navbar/>
    <Connect/>

   
    <router-view></router-view>
    
  </div>
</template>

<script>

import Connect from './views/Connect'
import Navbar from './components/Navbar'


export default {

  name: 'App',
  components: {
    Navbar,
    Connect
  }
  
}

</script>

<style>

body {

  margin: 0;
  padding: 0;
  
}

</style>
