<template>
  <div id="app">
      <!--<word-cloud></word-cloud>-->
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div class="row">
      <chart-container
        id="chart-container"
        style="width: 100%"
      ></chart-container>
      <!--<div id="wordCloud"></div>-->
      <!--<form-container-->
        <!--id="form-container"-->
        <!--style="width: 100%"-->
      <!--&gt;</form-container>-->
      <search-bar
        id="search-bar"
        style="transform: translate(30px,10px)"
      ></search-bar>

    </div>
  </div>
</template>

<script>
import BarChart from './components/BarChart.vue';
// import WordCloud from './components/WordCloud';
import SearchBar from "./components/SearchBar";

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);

export default {
  name: 'app',
  components: {
    // "HelloWorld": HelloWorld
    "chart-container": BarChart,
    "search-bar":SearchBar,
    // "word-cloud": WordCloud
  },
  data(){
    return{

    }
  },
  mounted() {
    axios.get('HTTP://10.21.91.207:8080/exer/lecture').then((response)=>{
      console.log(response.data);//成功回调
    },(response)=>{
      //失败回调
      console.log("fail");
      console.log(response);

    });
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
