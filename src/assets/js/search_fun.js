import * as d3 from "d3"
import Bus from "./Bus"

// 数据模型，实际环境可以根据 Ajax 来获取
let articles = [];
let articles_array = [];

// d3.json('http://10.21.91.207:8080/exer/lecture').then(function(data){
//     data.forEach(function (d) {
//         articles.push(d);
//     });
//     Bus.$emit("read_over", true);
//     console.log("服务器数据获取成功");
// });

d3.json('lecture.json').then(function(data){
    data.forEach(function (d) {
        articles.push(d);
    });
    Bus.$emit("read_over", true);
    console.log("从本地获取了数据");
});

function min(a, b) {
    if (a < b)
        return a;
    return b;
}

function search (word="", year="", month="",department="", page=1, pageSize = 10) {
    articles_array = articles;
    let searchString = word;
    if (!searchString && !year && !month && !department) {
        return articles_array.slice(pageSize*(page-1), min(pageSize*page, articles_array.length));
    }
    searchString = searchString.trim().toLowerCase();

    articles_array = articles_array.filter(function (item) {
        if ((item.title.toLowerCase().indexOf(searchString) !== -1 ||
            item.speaker.toLowerCase().indexOf(searchString) !== -1 ||
            item.lecture_date.toLowerCase().indexOf(searchString) !== -1 ||
            item.department.toLowerCase().indexOf(searchString) !== -1 ||
            item.venue.toLowerCase().indexOf(searchString) !== -1 || !searchString) &&
            (!year || item.lecture_date.toLowerCase().indexOf(year) === 0) &&
            (!month || item.lecture_date.toLowerCase().indexOf(month) === 5) &&
            (!department || item.department.toUpperCase() === department)) {
            return item;
        }
    });
    // 返回过来后的数组
    return articles_array.slice(pageSize*(page-1), min(pageSize*page, articles_array.length));
}

function getPages(pageSize=10) {
    if (articles_array.length === 0)
        return 1;
    if (articles_array.length % pageSize !== 0)
        return parseInt(articles_array.length / pageSize + 1);
    return parseInt(articles_array.length / pageSize);
}

export {
    search,
    getPages
}