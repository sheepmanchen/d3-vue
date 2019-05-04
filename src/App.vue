<template>
  <div id="app">
    <div>
      <bar-chart></bar-chart>
      <word-cloud></word-cloud>
    </div>
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div class="row"></div>
  </div>
</template>

<script>
import BarChart from './components/BarChart.vue';
import WordCloud from './components/WordCloud';
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);

export default {
  name: 'app',
  components: {
    // "HelloWorld": HelloWorld
    "bar-chart": BarChart,
    "word-cloud": WordCloud
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
