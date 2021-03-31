<template>
  <div id="app">
    <Navbar></Navbar>
    <Connect></Connect>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
  </div>
</template>

<script>
import Connect from './components/Connect'
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
