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
        created() {
            // this.getlinear();
        },
        methods: {
            // //生成词云
            getWordCloud() {
                myCloud();
            }
        },

        mounted() {

            this.getWordCloud();
            console.log("wwwww111");

        }

    }
</script>

<style>

</style>