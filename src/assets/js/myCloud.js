// var d3 = require("d3"),
import * as d3 from 'd3'
import cloud from './d3.layout.cloud.js'
//  import * as d3 from 'd3'
//     var cloud = require('./d3.layout.cloud.js').default();

export default function () {

    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 350 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    let frequency_list;

    var svg = d3.select("body")
        .append("div")
        .style("width", "50%")
        .style("height", height)
        // .attr("class","col-xs-3")
        // .attr("class","highlights-item col-md-12 col-sm-12 col-xs-12 ")
        .style("float", "left")
        .style("display", "inline")
        .append("svg")

        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class", "wordcloud")
        // .attr("transform",
        //     "translate(" + margin.left + "," + margin.top + ")");
        // .style("width", "50%")
        // .style("height", height)
        .attr("transform", "translate(" + margin.left * 7 + "," + margin.top * 7+ ")");

    d3.csv("topicData.csv").then(function(data) {
        frequency_list = data;


        var color = d3.scaleLinear()
            .domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100])
            .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);

        var layout = cloud().size([width, height])
            .words(frequency_list)
            .padding(0)        //space between words
            .rotate(0)
            // .rotate(function() { return ~~(Math.random() * 2) * 90; })
            .fontSize(function (d) {
                return d.size;
            })
            .on("end", draw);
        layout.start();

        function draw(words) {
            svg
                .append("g")
                // .attr("transform", "translate(200,100)")
                .attr("transform", "translate(" + layout.size()[0] / 3 + "," + layout.size()[1] / 3 + ")")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function (d) {
                    return d.size/2 + 5 + "px";
                })
                .style("fill", function (d, i) {
                    return color(i);
                })
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function (d) {
                    return d.text;
                });
        }
    })
}


