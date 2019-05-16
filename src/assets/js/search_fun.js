import * as d3 from "d3"
import Bus from "./Bus"

// 数据模型，实际环境可以根据 Ajax 来获取
let articles = [];
let articles_array = [];
d3.json('lecture.json').then(function(data){
    data.forEach(function (d) {
        articles.push(d);
    });
    Bus.$emit("read_over", true);
});

function min(a, b) {
    if (a < b)
        return a;
    return b;
}

function search (word='None', year='None', page=1, pageSize = 10) {
    articles_array = articles;
    let searchString = word;
    if (year === "None")
        year = '';
    if (!searchString && !year) {
        return articles_array.slice(pageSize*(page-1), min(pageSize*page, articles_array.length));
    }

    searchString = searchString.trim().toLowerCase();

    articles_array = articles_array.filter(function (item) {
        if ((item.title.toLowerCase().indexOf(searchString) !== -1 ||
            item.speaker.toLowerCase().indexOf(searchString) !== -1 ||
            item.lecture_date.toLowerCase().indexOf(searchString) !== -1 ||
            item.department.toLowerCase().indexOf(searchString) !== -1 ||
            item.venue.toLowerCase().indexOf(searchString) !== -1 || !searchString) &&
            (!year || item.lecture_date.toLowerCase().indexOf(year) !== -1)) {
            return item;
        }
    });

    // 返回过来后的数组
    return articles_array.slice(pageSize*(page-1), min(pageSize*page, articles_array.length));
}

function getPages(pageSize=10) {
    return parseInt(articles_array.length / pageSize + 1);
}

export {
    search,
    getPages
}