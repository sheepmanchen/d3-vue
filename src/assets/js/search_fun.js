import * as jQuery from "jquery"

// 数据模型，实际环境可以根据 Ajax 来获取
let articles = [];
jQuery.ajax({
    dataType: "json",
    url: "lecture.json",
    async: false,
    success: function (data){
        data.forEach(function (d) {
            articles.push(d);
        });
    }
});

function search (word='None', year='None') {
    let articles_array = articles,
        searchString = word;
    if (year === "None")
        year = '';

    if (!searchString && !year) {
        return articles_array;
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
    return articles_array;
}
export {
    search,
}