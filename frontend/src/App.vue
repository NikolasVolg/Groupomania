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
  background-image: url("../../Groupomania-images/icon.png");
  background-repeat: no-repeat;
  background-position: center top 50px;
  margin: 0;
  padding: 0;
  
}

</style>
