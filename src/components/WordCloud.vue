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
        props: ['cloud_year'],
        created() {
            // this.getlinear();
        },
        methods: {
            // //生成词云
            getWordCloud(c_year) {
                // myCloud 这个方法设置两个参数 一个year, 一个callback函数写在这里的methods里面？
                myCloud(c_year);
            }
        },

        mounted() {
            this.getWordCloud(this.cloud_year);

        },

        watch: {
            cloud_year:{
                handler: function(){
                    this.getWordCloud(this.cloud_year);
                },
                deep: true
            }
        }
    }
</script>

<style>

</style>