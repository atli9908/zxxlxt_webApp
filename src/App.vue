<template>
  <div id="app">
    <Home msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Home from './components/Home.vue'

// 禁止用户缩放浏览器
window.onload = function() {
  document.body.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, false); 
  document.addEventListener('touchstart', function(event) {
    event.preventDefault();
  }, false);
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault();
  }, false);
}

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>


