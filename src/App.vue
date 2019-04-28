<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <bar-chart></bar-chart>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import BarChart from './components/BarChart.vue';
import * as d3 from 'd3';

export default {
  name: 'app',
  components: {
    // "HelloWorld": HelloWorld
    "bar-chart": BarChart
  },
  data(){
    return{

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
