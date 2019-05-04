<template>
    <div id="mydiv">

    </div>
</template>


<script>
    import * as d3 from "d3";

    export default {
        mounted() {
            this.testDraw();
        },
        created() {
            // this.getlinear();
        },
        methods: {
             testDraw(){
                 var margin = {top:50, right: 50, bottom: 50, left:150};
                 // var width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right;
                 var width = 600 - margin.left - margin.right;
                 // var height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;
                 var height = 300 - margin.top - margin.bottom;
                 let buttonYears = [2015, 2016, 2017, 2018];

                 // var div = d3.select("body").append("div").attr("class", "toolTip");

                 var svg = d3.select("body")
                     .append("div")
                     .attr("class","outbox")
                     .style("float", "left")
                     .style("display", "inline")
                     .style("width", "50%");
                     // .style("height", "500px");

                     // .attr("class","custom-card header-card card highlights-item col-md-12 col-sm-12 col-xs-12 border-top");

                 var div = svg.append("div").attr("class","toolTip");

                 svg =  svg.append("svg")
                     .attr("width", width + margin.left + margin.right)
                     .attr("height", height + margin.bottom + margin.top)
                     .append("g")
                     .attr("transform","translate(" + margin.left +","+margin.top+")");

                 // var form = d3.select("#myform").style("transform","translate(150px, 30px)");
                 let year = 2015;

                 let playButton = d3.select(".outbox").append("div")
                     .attr("class", "play-button button")
                     .style("transform","translate(10px,10px)")
                     .text("PLAY!")
                     .style("transform","translate(" + 20 +"px ,"+ 20 +"px)");

                 let buttonContainer = d3.select(".outbox").append("div").attr("class", "container")
                     .style("width", "500px")
                     .style("height", "50px")
                     .style("transform","translate(" + 10 +"px ,"+ 10 +"px)");


                 let buttons = buttonContainer.selectAll("div")
                     .data(buttonYears)
                     .enter()
                     .append("div")
                     .text(function(d){return d;})
                     .attr("class", function(d){
                         if(d===year){
                             return "myButton selected";
                         }
                         else{
                             return "myButton";
                         }
                     })
                     .attr("value", function(d){return d;});

                 var playInterval;
                 buttons.on("click", function(d){
                     // d3.select(".selected").classed("selected",false);
                     // d3.select(this).classed("selected", true);
                     clearInterval(playInterval);
                     year = d;
                     update(year);
                     // changeYear();
                 });

                 playButton.on("click", function(){
                     var i = 0;
                     playInterval = setInterval(function(){
                         update(buttonYears[i]);
                         console.log(buttonYears[i]);
                         i++;
                         if(i>buttonYears.length-1){
                             clearInterval(playInterval);
                         }
                     }, 1000);
                 });


                 var xScale = d3.scaleLinear().range([0,width]);
                 var yScale = d3.scaleBand().range([0, height]).padding(0.2);

                 // d3.select("input[value=\"2016\"]").property("checked", true);
                 changeYear();

                 function update(updateYear){

                     d3.select(".selected").classed("selected", false);
                     buttons.filter(function(d){
                         return d==updateYear;
                     }).classed("selected", true);

                     year = updateYear;
                     changeYear();

                 }

                 function changeYear() {
                     // var bar = svg.selectAll(".bar");
                     // bar.remove();
                     // svg.remove()

                     let dataSet;
                     d3.csv("department_change.csv").then(function (data) {
                         //
                         console.log(data);
                         dataSet = data.filter(function (e) {
                             return parseInt(e.year) == parseInt(year);
                         });
                         // fDta=data.filter(function(e){return e.dpt==="Mathematics"});
                         console.log(dataSet);
                         dataSet.sort(function (x, y) {
                             return d3.ascending(parseInt(y.totalNum), parseInt(x.totalNum));
                         });
                         // dataSet.forEach(function (d) {
                             // d.deparment = d.department;
                             //  d.totalNum = parseInt(d.totoalNum);
                             //     const xValue = parseInt(d.tv);
                             //     const yValue = d.dpt;
                         // });

                         const xValue = dataSet => parseInt(dataSet.totalNum);
                         const yValue = dataSet => dataSet.department;

                         xScale.domain([0, d3.max(dataSet, xValue)]);
                         yScale.domain(dataSet.map(yValue));


                         svg.select(".y.axis").remove();
                         svg.select(".x.axis").remove();
                         // svg.selectAll(".temp-g").remove();
                         // svg.select(".temp-svg").remove();
                         // svg.selectAll(".text-g").remove();
                         // svg.selectAll(".bar").remove();

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
                             .transition()
                             .duration(100)
                             .attr("opacity", '1');


                         var bars = svg.selectAll(".bar").data(dataSet);
                         bars = bars.enter().append("g").attr("class", "temp-g");
                         // bars.exit()
                         //     .remove();


                         // bars = svg.selectAll(".bar");
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
                         var barText = bars.append("text")
                             .transition()
                             .duration(500)
                             .ease(d3.easeLinear)
                             .attr("class", "text-value")
                             .attr("x", d => xScale(xValue(d)) - 15)
                             .attr("y", d => yScale(yValue(d)) + 5)
                             .attr("dy", "1em")
                             .attr("text-anchor", "middle")
                             .attr("font-size", "14px")
                             .attr("fill", "lightyellow")
                             .attr("opacity", '0')
                             // .attr("transform", function(d) { return "translate(20, -20)"; })
                             .text(function (d) {
                                 return d.totalNum;
                             });

                         barText.transition()
                             .duration(500).attr("opacity", '1');

                         bars.on("mousemove", function (d) {
                             div.style("left", d3.event.pageX - 40 + "px");
                             div.style("top", d3.event.pageY - 45 + "px");
                             div.style("display", "inline-block");
                             div.html((d.department) + "<br>" + (d.totalNum));

                         });
                         bars.on("mouseout", function () {
                             div.style("display", "none");
                         });

                         // bar.exit();

                         bars = svg.selectAll(".bar");
                         // updated data:
                         bars.transition()
                             .duration(750)
                             .ease(d3.easeLinear)
                             .attr("y", d => yScale(yValue(d)))
                             .attr("x", 0)
                             .attr("width", d => xScale(xValue(d)))
                             .attr("height", yScale.bandwidth());


                     })
                 }

            },

        }
    };
</script>


<style>
    .bar {
        fill: steelblue;
        fill-opacity: .5;

    }

    body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        /*width: 600px;*/
        /*height: 300px;*/
        position: relative;
    }
    svg {
        width: 100%;
        height: 100%;
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



    /*text.value{*/
    /*font-size: 200%;*/
    /*fill: white;*/
    /*}*/
    /**/
    /*text.label{*/
    /*font-size: 100%;*/
    /*}*/

    .axis text {
        font: 14px sans-serif;
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
    .myButton{
        float: left;
        margin-left: 30px;
        font-size: 14px;
        height: 30px;
        font-weight: lighter;
        cursor: pointer;

    }

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

    /*.selected{*/
        /*background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #80b5ea), color-stop(1, #bddbfa));*/
        /*background:-moz-linear-gradient(top, #80b5ea 5%, #bddbfa 100%);*/
        /*background:-webkit-linear-gradient(top, #80b5ea 5%, #bddbfa 100%);*/
        /*background:-o-linear-gradient(top, #80b5ea 5%, #bddbfa 100%);*/
        /*background:-ms-linear-gradient(top, #80b5ea 5%, #bddbfa 100%);*/
        /*background:linear-gradient(to bottom, #80b5ea 5%, #bddbfa 100%);*/
        /*filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#80b5ea', endColorstr='#bddbfa',GradientType=0);*/
        /*background-color:#80b5ea;    }*/
    /*form {*/
    /*transform: translate(150px, 150px);*/
    /*}*/
    /*label {*/
    /*transform: translate(150px, 150px);*/
    /*}*/
</style>