<template>
    <div id="mydiv">
        <form id="myform" >
            <label><input type="radio" name="dataset" class="dataset" value="2016" checked> 2016</label>
            <label><input type="radio" name="dataset" class="dataset" value="2017"> 2017</label>
            <label><input type="radio" name="dataset" class="dataset" value="2018"> 2018</label>
        </form>
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
                // console.log("wgat");
                // const data = await d3.csv('2016.csv');
                // console.log(data);
                let width = 600;
                let height = 300;

                let svg = d3.select("body")
                    .append("svg")
                    .attr("width",width)
                    .attr("height",height);

                svg.append("g")
                    .attr("transform", "translate(10,100)");


                let xScale = d3.scaleLinear().range([0,width]);
                let yScale = d3.scaleBand().range([0, height]).padding(0.2);

                // d3.selectAll("input").on("change",selectDataset);
                // change("2016.csv");

                // function change(filename) {
                    d3.csv("2016.csv").then(function(data) {

                        console.log(data);

                        const xValue = d => parseInt(d.tv);
                        const yValue = d => d.dpt;

                        xScale.domain([0, d3.max(data, xValue)]);
                        yScale.domain(data.map(yValue));


                        svg.select(".y.axis").remove();
                        svg.select(".x.axis").remove();

                        svg.append("g")
                            .attr("class","x axis")
                            .attr("transform","translate(0," + height + ")")
                            .call(d3.axisBottom(xScale));

                        svg.append("g")
                            .attr("class", "y axis")
                            .call(d3.axisLeft(yScale));

                        svg.selectAll(".x.axis").transition().duration(10)
                            .call(d3.axisBottom(xScale));

                        var bar = svg.selectAll(".bar")
                            .data(data)
                            .enter()
                            .append("rect")
                            .attr("class","bar");

                        // svg.selectAll("rect")
                        //     .data(data)
                        bar.enter()
                        // .append("rect")
                        // .attr("class","bar")
                            .attr("y",d => yScale(yValue(d)))
                            .attr("x", 0)
                            .attr("width",d => xScale(xValue(d)))
                            .attr("height", yScale.bandwidth());

                        // bar.enter().append("rect").attr("y",50).attr("x",50).attr("height",100);

                        // bar.exit().remove();

                        var bars = svg.selectAll(".bar");
                        // updated data:
                        bars.transition()
                            .duration(750)
                            .attr("y",d => yScale(yValue(d)))
                            .attr("x", 0)
                            .attr("width",d => xScale(xValue(d)))
                            .attr("height", yScale.bandwidth());
                    })



            },

        }
    };
</script>

<style>

</style>