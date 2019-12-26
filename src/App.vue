<template>
  <div id="app">
    <layout/>
  </div>
</template>

<script>
import layout from './components/layout.vue';

export default {
  name: 'app',
  components: {
    layout,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
}
</style>
