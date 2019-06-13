<template>
    <div id="mydiv">
        <div id="bar-chart"></div>
        <word-cloud :cloud_year="cloud_year" :cloud_dpt="cloud_dpt" id="my-cloud"></word-cloud>
    </div>
</template>


<script>
    import * as d3 from "d3";
    import WordCloud from './WordCloud';
    import Bus from "../assets/js/Bus"

    export default {
        components: {
            'word-cloud': WordCloud
        },
        data(){
          var select_year = 2015;
          var select_dpt = 'ALL';
          return {
              cloud_year: select_year,
              cloud_dpt: select_dpt
          }
        },
        mounted() {
            this.testDraw();
        },
        created() {

        },
        methods: {
             testDraw(){
                 var margin = {top:20, right: 50, bottom: 50, left:150};
                 // var width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
                 var width = 600 - margin.left - margin.right;
                 // var height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;
                 var height = 400 - margin.top - margin.bottom;
                 let buttonYears = [2015, 2016, 2017, 2018, 2019];

                 // var div = d3.select("body").append("div").attr("class", "toolTip");

                 var svg = d3.select("body").select("#bar-chart")
                     .append("div")
                     .attr("class","outbox")
                     .style("float", "left")
                     .style("display", "inline")
                     .style("width", "50%");
                     // .style("height", "500px");

                     // .attr("class","custom-card header-card card highlights-item col-md-12 col-sm-12 col-xs-12 border-top");

                 var div = svg.append("div").attr("class","toolTip");

                 var play_button_clicked=false;
                 svg =  svg.append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.bottom + margin.top);
                     svg = svg.append("g")
                     .attr("transform","translate(" + margin.left +","+margin.top+")");

                 // var form = d3.select("#myform").style("transform","translate(150px, 30px)");
                 this.cloud_year = 2015;
                 this.cloud_dpt = 'ALL';

                 let playButton = d3.select(".outbox").append("div")
                     .attr("class", "play-button button")
                     .style("transform","translate(10px,10px)")
                     .text("Auto")
                     .attr("id","playButton")
                     .style("transform","translate(" + 40 +"px ,"+ -10 +"px)");

                 let buttonContainer = d3.select(".outbox").append("div").attr("class", "container")
                     .style("width", "500px")
                     .style("height", "50px")
                     .style("transform","translate(" + 20 +"px ,"+ -20 +"px)");


                 let buttons = buttonContainer.selectAll("div")
                     .data(buttonYears)
                     .enter()
                     .append("div")
                     .text(function(d){return d;})
                     .attr("class", function(d){
                         if(d===this.cloud_year){
                             return "myButton selected";
                         }
                         else{
                             return "myButton";
                         }
                     })
                     .attr("value", function(d){return d;});

                 var playInterval;
                 buttons.on("click", function(d){
                     clearInterval(playInterval);
                     this.cloud_year = d;
                     update(this.cloud_year);
                 });

                 function clickPlayButton() {
                     var i = 0;
                     play_button_clicked = true;
                     clickPlay();
                 }

                 playButton.on("click",clickPlayButton);

                function clickPlay(){
                    var i = 0;
                    playInterval = setInterval(function(){
                        update(buttonYears[i]);
                        i++;
                        if(i>buttonYears.length-1){
                            clearInterval(playInterval);
                        }
                    }, 1000);
                }

                 var xScale = d3.scaleLinear().range([0,width]);
                 var yScale = d3.scaleBand().range([0, height]).padding(0.2);

                const self = this;
                 function update(updateYear){

                     d3.select(".selected").classed("selected", false);
                     buttons.filter(function(d){
                         return d==updateYear;
                     }).classed("selected", true);
                     self.cloud_dpt = 'ALL';
                     self.cloud_year = updateYear;
                     changeYear(self.cloud_year);
                     Bus.$emit("select_year", updateYear);
                 }

                 var dpt_data = [] ;

                 let temp_year = parseInt(this.cloud_year.toString());

                 d3.csv("department_change.csv").then(function(data){
                     // dpt_data.push(data);
                    data.forEach(function (d) {
                        dpt_data.push(d);
                    });
                    // dpt_data = data;
                    changeYear(temp_year);
                 });
                 //

                 // changeYear(this.cloud_year);
                 update(this.cloud_year);
                 function changeYear(cur_year) {

                     let dataSet;
                         dataSet = dpt_data.filter(function (e) {
                             let b = cur_year === parseInt(e.year);
                             return b;
                         });

                         // fDta=data.filter(function(e){return e.dpt==="Mathematics"});
                         dataSet.sort(function (x, y) {
                             return d3.ascending(parseInt(y.totalNum), parseInt(x.totalNum));
                         });

                         const xValue = dataSet => parseInt(dataSet.totalNum);
                         const yValue = dataSet => dataSet.department;

                         xScale.domain([0, d3.max(dataSet, xValue)+10]);
                         // xScale.domain([0, 130]);
                         yScale.domain(dataSet.map(yValue));


                         svg.select(".y.axis").remove();
                         svg.select(".x.axis").remove();

                         svg.selectAll(".text-value").remove();

                         let xAxis = d3.axisBottom(xScale);
                         let yAxis = d3.axisLeft(yScale);

                         svg.append("g")
                             .attr("class", "x axis")
                             .attr("transform", "translate(0," + height + ")")
                             .call(xAxis);

                         svg.append("g")
                             .attr("class", "y axis")
                             .call(yAxis);

                         svg.selectAll(".x.axis")
                             .call(d3.axisBottom(xScale));

                         svg.selectAll(".y.axis")
                             .call(d3.axisLeft(yScale))
                             .attr("opacity", '0')
                             // .transition()
                             // .duration(100)
                             .attr("opacity", '1');


                         var bars = svg.selectAll(".bar").data(dataSet);
                         bars = bars.enter().append("g").attr("class", "temp-g")
                         ;

                         bars.append("rect")
                             .attr("class", "bar")
                             // .enter()
                             // bar.enter()
                             .attr("y", d => yScale(yValue(d)))
                             .attr("x", 0)
                             .attr("width", function (d) {
                                 return d.totalNum;
                             });
                         // .attr("width",d => xScale(xValue(d)))

                         bars = svg.selectAll(".temp-g").data(dataSet);
                        bars.attr("fill", function(d, i){
                            console.log("d="+d);
                            if (d.department=='CSE') {
                                return "#0066CC";
                            } else if (d.department=='Math') {
                                return "#FF6600";
                            }else if (d.department=='EE') {
                                return "#7A739E";
                            }else if (d.department=='ESE') {
                                return "#419E6E";
                            }else if (d.department=='MEE') {
                                return "#ff1000";
                            }else if (d.department=='Physics') {
                                return "#CC317E";
                            }else if (d.department=='BME') {
                                return "#FFCCCC";
                            }else if (d.department=='Ocean') {
                                return "#8CD8FF";
                            }else if (d.department=='FIN') {
                                return "#FFEB36";
                            }else if (d.department=='MAE') {
                                return "#938CFF";
                            }else if (d.department=='MSE') {
                                return "#FF6600";
                            }else if (d.department=='MED') {
                                return "#39403C";
                            }else if (d.department=='BIO') {
                                return "#8FBC8F";
                            }else if (d.department=='Chemistry') {
                                return "#FFC4AB";
                            }
                            return "yellow";
                        });
                         var barText = bars.append("text")
                             .transition()
                             .duration(500)
                             .ease(d3.easeLinear)
                             .attr("class", "text-value")
                             .attr("x", d => xScale(xValue(d)) - 3)
                             .attr("y", d => yScale(yValue(d)) + 3)
                             .attr("dy", "1em")
                             .attr("text-anchor", "middle")
                             .attr("font-size", "11px")
                             .attr("fill", "#555")
                             .attr("opacity", '0')
                             // .attr("transform", function(d) { return "translate(20, -20)"; })
                             .text(function (d) {
                                 if(d.totalNum!=0)
                                 return d.totalNum;
                             });

                         barText.transition()
                             .duration(500).attr("opacity", '1');

                         bars.on("mousemove", function (d) {
                             div.style("left", d3.event.pageX - 40 + "px");
                             div.style("top", d3.event.pageY - 45 + "px");
                             div.style("display", "inline-block");
                             div.html((d.department) + "<br>" + (d.totalNum));

                         }).on("click", function(d){
                             console.log("监控到bar被点击"+(d.department));
                             self.cloud_dpt = d.department;
                             Bus.$emit("sendDep", d.department);
                         });
                         bars.on("mouseout", function () {
                             div.style("display", "none");
                         });

                         // bar.exit();

                         bars = svg.selectAll(".bar");
                         // updated data:
                         bars.transition()
                             .duration(1000)
                             .ease(d3.easeLinear)
                             .attr("y", d => yScale(yValue(d)))
                             .attr("x", 0)
                             .attr("width", d => xScale(xValue(d)))
                             .attr("height", yScale.bandwidth());


                     // })
                 }

            },

        }
    };
</script>


<style>
    .bar {
        /*fill: steelblue;*/
        fill-opacity: .4;

    }

    /*body {*/
        /*font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;*/
        /*width: 600px;*/
        /*height: 300px;*/
        /*position: relative;*/
    /*}*/
    svg {
        /*width: 100%;*/
        /*height: 100%;*/
        position: center;
    }

    /*path.slice{*/
    /*stroke-width:2px;*/
    /*}*/

    text{
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    polyline{
        opacity: .3;
        stroke: black;
        stroke-width: 2px;
        fill: none;
    }

    label {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-weight: normal;
    }

    .toolTip {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        position: absolute;
        display: none;
        width: auto;
        height: auto;
        background: none repeat scroll 0 0 white;
        border: 0 none;
        border-radius: 8px 8px 8px 8px;
        box-shadow: -3px 3px 15px #888888;
        color: black;
        font: 12px sans-serif;
        padding: 5px;
        text-align: center;
    }

    rect {
        stroke-width: 2;
    }

    rect:hover{
        opacity: .7;
        fill: #b6b7b2;
        cursor: pointer
    }

    /*text.value{*/
    /*font-size: 200%;*/
    /*fill: white;*/
    /*}*/
    /**/
    /*text.label{*/
    /*font-size: 100%;*/
    /*}*/

    .axis text {
        font: 12px sans-serif;
        font-weight: bold;
    }

    .axis path{
        fill: none;
        stroke: #000;
    }

    .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }

    .axis .tick line {
        stroke-width: 1;
        stroke: rgba(0, 0, 0, 0.2);
    }

    .axisHorizontal path{
        fill: none;
    }

    .axisHorizontal line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }

    .axisHorizontal .tick line {
        stroke-width: 1;
        stroke: rgba(0, 0, 0, 0.2);
    }

    .container{
        /*width: 1000px;*/
        margin-bottom: 15px;
        margin-top: 10px;
        margin-left: 80px;
        /*background: antiquewhite;*/
        overflow-x:hidden;
        overflow-y:hidden;
    }
    /*.myButton{*/
        /*float: left;*/
        /*margin-left: 30px;*/
        /*font-size: 14px;*/
        /*height: 30px;*/
        /*font-weight: lighter;*/
        /*cursor: pointer;*/

    /*}*/

    .play-button {
    position: absolute;
    text-align: center;
    text-align-all: center;
    /*top: 140px;*/
    /*left: 50px;*/
    font-size: 14px;
    background: #f08080;
    /*padding-right: 26px;*/
    border-radius: 3px;
    border: none;
    color: white;
    margin: 0;
    padding: 0 12px;
    /*width: 60px;*/
    cursor: pointer;
    /*height: 30px;*/
    }

    .myButton {
        float: left;
        margin-left: 30px;
        height: 20px;
        -moz-box-shadow:inset 0px 1px 0px 0px #ffffff;
        -webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;
        box-shadow:inset 0px 1px 0px 0px #ffffff;
        background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #ffffff), color-stop(1, #f6f6f6));
        background:-moz-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
        background:-webkit-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
        background:-o-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
        background:-ms-linear-gradient(top, #ffffff 5%, #f6f6f6 100%);
        background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#f6f6f6',GradientType=0);
        background-color:#ffffff;
        -moz-border-radius:4px;
        -webkit-border-radius:4px;
        border-radius:4px;
        border:1px solid #dcdcdc;
        display:inline-block;
        cursor:pointer;
        color:#666666;
        /*font-family:Arial;*/
        font-size:11px;
        font-weight:bold;
        padding:0px 10px;
        text-decoration:none;
        text-align: center;
        text-align-all: center;
        /*text-shadow:0px 1px 0px #ffffff;*/
    }
    .myButton:hover {
        background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f6f6f6), color-stop(1, #ffffff));
        background:-moz-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
        background:-webkit-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
        background:-o-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
        background:-ms-linear-gradient(top, #f6f6f6 5%, #ffffff 100%);
        background:linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#f6f6f6', endColorstr='#ffffff',GradientType=0);
        background-color:#f6f6f6;
    }
    .myButton:active {
        position:relative;
        top:1px;
    }
    .selected{
        background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #80b5ea), color-stop(1, #bddbfa));
        background:-moz-linear-gradient(top, #80b5ea 5%, #bddbfa 100%);
        background:-webkit-linear-gradient(top, #80b5ea 5%, #bddbfa 100%);
        background:-o-linear-gradient(top, #80b5ea 5%, #bddbfa 100%);
        background:-ms-linear-gradient(top, #80b5ea 5%, #bddbfa 100%);
        background:linear-gradient(to bottom, #80b5ea 5%, #bddbfa 100%);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#80b5ea', endColorstr='#bddbfa',GradientType=0);
        background-color:#80b5ea;
    }
    /*form {*/
    /*transform: translate(150px, 150px);*/
    /*}*/
    /*label {*/
    /*transform: translate(150px, 150px);*/
    /*}*/
</style>