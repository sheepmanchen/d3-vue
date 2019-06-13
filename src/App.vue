<template>
  <div id="app">
    <div class = "page-header">
      <b-navbar toggleable="lg" type="dark" class="fixed-top navbar-dark">
        <b-navbar-brand href="/">
          <img src="./assets/SLOGO.png" class="d-inline-block" alt="Logo" id="logo">
          Seminar
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!--<b-navbar-nav>-->
            <!--<b-nav-item href="#">Link</b-nav-item>-->
            <!--<b-nav-item href="#" disabled>Disabled</b-nav-item>-->
          <!--</b-navbar-nav>-->

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
<!--            <b-nav-form>-->
<!--              <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="searchString"></b-form-input>-->
<!--              <b-button size="sm" class="my-2 my-sm-0" pill v-on:click="sendString()">Search</b-button>-->
<!--            </b-nav-form>-->

            <b-nav-item-dropdown text="Department" right>
              <b-dropdown-item  v-for="dep in items" :key="dep.DPT" v-on:click="goto(dep.HTML)">
                {{dep.NAME}}
              </b-dropdown-item>
              <b-dropdown-item  v-for="dep in objects" :key="dep.DPT" v-on:click="goto(dep.HTML)">
                {{dep.NAME}}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    </div>
    <div class="jumbotron" id="jumbo">
      <h1 class="display-5">SUSTech's Seminar Visualization </h1>
      <!--<br> <br>-->
      <p>Update monthly based on data from
        <a href="https://www.sustech.edu.cn" target="_blank">sustech.edu.cn</a> </p>
      <p>Last Updated: 2019/06/03</p>
      <hr class="my-3">
      <b-container class="bv-example-row" style="align-content: center; align-items: center">
        <p>Department Name Reference: </p>
        <b-row align-h="center">
          <b-col cols="4">
            <b-table small :items="items"  :fields="fields" class="dpt-table"></b-table>
          </b-col>
          <b-col cols="4">
            <b-table small :items="objects"  :fields="fields" class="dpt-table"></b-table>
          </b-col>
        </b-row>
      </b-container>
    </div>

    <div class="row">
      <chart-container
        id="chart-container"
        style="width: 100%"
      ></chart-container>
      <search-bar
        id="search-bar"
        style="width: 100%"
      ></search-bar>

    </div>

    <footer class="footer">
      <p id="footer-text">Contact Us @ <a href="mailto:11611613@mail.sustech.edu.cn">Email</a>.<br> </p>
    </footer>
  </div>
</template>

<script>
import BarChart from './components/BarChart.vue';
// import WordCloud from './components/WordCloud';
import SearchBar from "./components/SearchBar";
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Bus from "./assets/js/Bus";
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
      searchString: "",
      fields: ['DPT', 'NAME'],
      items: [
        { isActive: true, DPT: 'BIO', NAME: '生物系', HTML: 'http://bio.sustc.edu.cn/'},
        { isActive: true, DPT: 'BME', NAME: '生物医学工程系', HTML: 'http://bme.sustech.edu.cn/'},
        { isActive: true, DPT: 'CHEM', NAME: '化学系', HTML: 'http://chem.sustc.edu.cn/'},
        { isActive: true, DPT: 'CSE', NAME: '计算机科学与工程系', HTML: 'http://cse.sustc.edu.cn/'},
        { isActive: true, DPT: 'EE', NAME: '电子与电气工程系', HTML: 'http://eee.sustc.edu.cn/'},
        { isActive: true, DPT: 'ESE', NAME: '环境科学与工程学院', HTML: 'http://ese.sustc.edu.cn/'},
        { isActive: true, DPT: 'ESS', NAME: '地球与空间科学系', HTML: 'http://ess.sustc.edu.cn/'},
      ],
      objects: [
        { isActive: true, DPT: 'FIN', NAME: '金融系', HTML: 'http://fin.sustc.edu.cn/'},
        { isActive: true, DPT: 'MAE', NAME: '力学与航空航天工程系', HTML: 'http://mae.sustc.edu.cn/'},
        { isActive: true, DPT: 'MATH', NAME: '数学系', HTML: 'http://math.sustech.edu.cn/'},
        { isActive: true, DPT: 'MEDICAL', NAME: '医学院', HTML: 'http://med.sustech.edu.cn/index.html'},
        { isActive: true, DPT: 'MEE', NAME: '机械与能源工程系', HTML: 'http://mee.sustc.edu.cn/'},
        { isActive: true, DPT: 'MSE', NAME: '材料科学与工程系', HTML: 'http://mse.sustc.edu.cn/'},
        { isActive: true, DPT: 'OCEAN', NAME: '海洋科学与工程系', HTML: 'http://ocean.sustc.edu.cn/'},
        { isActive: true, DPT: 'PHY', NAME: '物理系', HTML: 'http://phy.sustc.edu.cn/'},
      ]

    }
  },
  methods: {
      goto(html) {
          console.log(html);
          window.location.href = html;
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
.navbar-dark {
  /*padding: .5rem 1rem ;*/
  /*background-color: #512DA8;*/
  background-color: #2BB7B3;
}

#logo {
  height: 50px;
  /* put value of image height as your need */
  /*float: left;*/
  /*margin-right: 7px;*/
}

#jumbo {
  padding-bottom: 5px;
}

.dpt-table{
  font-size: 10px;
}

.display-5 {
  font-size: 45px;
  font-weight: 300;
  line-height: 1.5;
}

.footer {
  background-color: #2BB7B3;
  margin-top: 150px;
  margin-bottom: 10px;
  opacity: 50%;
  fill-opacity: 50%;
  flood-opacity: 50%;
  solid-opacity: 50%;
}
#footer-text {
  text-align: center;
  color: white;
}
</style>
