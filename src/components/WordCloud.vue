<template>
    <div class="wordCloud">

    </div>
    <!--<script src="https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/LIB/d3.layout.cloud.js"></script>-->
</template>


<script>
    // import * as d3 from "d3";
    import myCloud from '../assets/js/myCloud.js';
    export default {
        name: "WordCloud",
        props: ['cloud_year', 'cloud_dpt'],
        created() {
            // this.getlinear();
        },
        methods: {
            // //生成词云
            getWordCloud(c_dpt, c_year) {
                console.log("inwordcloud"+c_year);
                // myCloud 这个方法设置两个参数 一个year, 一个callback函数写在这里的methods里面？
                myCloud(c_dpt, c_year);
            }
        },
        mounted() {
            // console.log("inwordcloud"+this.cloud_year);
            this.getWordCloud(this.cloud_dpt, this.cloud_year);
        },
        watch: {
            cloud_year:{
                handler: function(){
                    console.log("wwwww111");
                    console.log("in watch"+this.cloud_year);
                    this.getWordCloud( this.cloud_dpt, this.cloud_year);
                },
                deep: true
            }
            ,
            cloud_dpt:{
                handler: function(){
                    console.log("部门change了");
                    console.log("in watch"+this.cloud_year);
                    this.getWordCloud(this.cloud_dpt, this.cloud_year);
                },
                deep: true
            }
        }
    }
</script>

<style>
    text:hover {
        opacity: .7;
        fill: #2BB7B3;
        cursor: pointer
    }
    text:active {
        fill: #2BB7B3;
    }
</style>