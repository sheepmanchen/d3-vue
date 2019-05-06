// var d3 = require("d3"),
import * as d3 from 'd3'
import cloud from './d3.layout.cloud.js'



let lecture_data = [];
d3.json('lecture.json').then(function(data){
    console.log(data);
    data.forEach(function (d) {
        lecture_data.push(d);
    });
    filter_data_by_year(2015);
    w(2015);
});

// let dataSet;
// // d3.csv("department_change.csv").then(function (data) {
// //
// // console.log(dpt_data);
// dataSet = dpt_data.filter(function (e) {
//     let b = cur_year === parseInt(e.year);
//     return b;
// });

function filter_data_by_year (y){
    let dataSet;
    dataSet = lecture_data.filter(function (e) {
        var str = y.toString();
        return e.lecture_date.match(str)!=null;
    });
    console.log(dataSet);
    let map = {};
    dataSet.forEach(function(d){
        var temp_str = d.title.toString().split(" ");
        for(var i=0; i<temp_str.length; i++){
            var strWord = temp_str[i];
            if(!map[strWord]){
                map[strWord]=1;
            }
            else{
                map[strWord]++;
            }
        }
        // for(var word in map){
        //     console.log(word + "-------"+map[word])
        // }

    });
    let stop_words = ["method","【金融系学术讲座】","size","Beyond","new","systems","电子与电气工程系系列学术讲座：","云计算安全的挑战与实践","during","【Math","之","recent","-","using","based","value","analysis","use","TBA","–","cells","towards","","via","&","application","applications","On","theory", "Design","Challenges", "Research", "A", "a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your","ain't","aren't","can't","could've","couldn't","didn't","doesn't","don't","hasn't","he'd","he'll","he's","how'd","how'll","how's","i'd","i'll","i'm","i've","isn't","it's","might've","mightn't","must've","mustn't","shan't","she'd","she'll","she's","should've","shouldn't","that'll","that's","there's","they'd","they'll","they're","they've","wasn't","we'd","we'll","we're","weren't","what'd","what's","when'd","when'll","when's","where'd","where'll","where's","who'd","who'll","who's","why'd","why'll","why's","won't","would've","wouldn't","you'd","you'll","you're","you've"];
    stop_words.forEach(function (d) {
        map[d] = 0;
        let to_up = d.charAt(0).toUpperCase() + d.slice(1);
        map[to_up] = 0;
    });
    var items = Object.keys(map).map(function(key){
        return [key, map[key]];
    });
    items.sort(function(first, second){
        return second[1] - first[1];
    });
    console.log(items.slice(0,items.length/13));
    let cut_items = items.slice(0, items.length/13);

    let filter_data = [];
    cut_items.forEach(function (d) {
        let temp = new Object();
        temp.text=d[0];
        if(y==2015 ) {
            temp.size = d[1] * 15;
        }
        else if( y==2016){
            temp.size = d[1] * 7;
        }
        else if( y==2017 || y==2018){
            temp.size = d[1] * 5;
        }
        else if(y==2019){
            temp.size = d[1] * 10;
        }
        filter_data.push(temp);
    });

    var temp_arr = filter_data.map(function(d){
        return [d.size];
    });



    console.log("temp arr: "+temp_arr);
    // filter_data = filter_data.map(function(obj){

        // return [obj[0]]
    // });
    // console.log("filter:"+filter_data);
    filter_data.forEach(function (d) {
        console.log("here words: "+d.text+ "---" +d.size);
    });
    return filter_data;
}

export default function w(c_year) {
    console.log("in myCloud.js"+c_year);

    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 450 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    let frequency_list;

    frequency_list = filter_data_by_year(c_year);
    // console.log("here"+typeof frequency_list);
    d3.select(".cloud-svg").remove();
    var svg = d3.select("body").select("#my-cloud")
        .append("div")
        .style("width", "50%")
        .style("height", height)
        .attr("class","cloud-svg")
        // .attr("class","highlights-item col-md-12 col-sm-12 col-xs-12 ")
        .style("float", "left")
        .style("display", "inline")
        .append("svg")

        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class", "wordcloud")
        .attr("transform", "translate(" + margin.left * 6 + "," + margin.top * 8 + ")");

    d3.csv("topicData.csv").then(function(data) {
        // frequency_list = data;
        // console.log(typeof frequency_list);

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
            // console.log("here words:"+words.text + words.size);
            words.forEach(function (d) {
               console.log("here words: "+d.text+ "---" +d.size);
            });
            svg
                .append("g")
                // .attr("transform", "translate(200,100)")
                .attr("transform", "translate(" + layout.size()[0] / 3 + "," + layout.size()[1] / 3 + ")")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .selectAll("text")
                .data(words)
                .enter()
                .append("text")
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
                })
                .on("click", function (d) {
                    // callback(d);
                    // // console.log(d);
                    // this.axios.get('10.21.91.207:8080/exer/lecture').then((response)=>{
                    //     console.log(response.data);//成功回调
                    // },(response)=>{
                    //     //失败回调
                    //     console.log("fail");
                    //     console.log(response);
                    //
                    // })
                    // d.style("fill","red");
                });
        }

        function callback(d){
            // d.style("color","red");
            console.log(d);
            // d.text="www";
        }



    })
}


