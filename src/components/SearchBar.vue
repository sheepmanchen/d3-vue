<template>
    <form id="main" v-cloak>
        <div>
            <div class="bar">
                <!-- searchString 模型与文本域创建绑定 -->
                <label>
                    <input type="text" v-model.trim="searchString" placeholder="输入搜索内容" />
                </label>
                &nbsp;
                <span style="color: white; ">年:</span>
                <label>
                    <select v-model="year">
                        <option v-for="year in years" :key="year">{{year}}</option>
                    </select>
                </label>
                &nbsp;
                <span style="color: white; ">页容量:</span>
                <label>
                    <select v-model="pageSize">
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    </select>
                </label>
            </div>

            <ul>
                <table id="table">
                    <thead>
                        <tr>
                            <th class="title"> Title </th>
                            <th class="speaker"> Speaker </th>
                            <th class="time"> Time </th>
                            <th class="dep"> Department </th>
                            <th class="place"> Place </th>
                        </tr>
                    </thead>
                    <!-- 循环输出数据 -->
                    <tbody>
                        <tr  v-for="article in filteredArticles" :key="article.id" :class="{'alt':article.id%2 !== 1}">
                            <td class="title"><a :href="article.link" target="new_window"> {{article.title}}</a> </td>
                            <td class="speaker">{{article.speaker}}</td>
                            <td class="time"> {{article.lecture_date}}</td>
                            <td class="dep"> {{article.department}}</td>
                            <td class="place"> {{article.venue}}</td>
                        </tr>
                    </tbody>
                </table>
            </ul>

            <span class="btn btn-default" v-on:click="setPage(1)" :class="{'disabled':fDisabled}">
                首页
            </span>
            <span class="btn btn-default" v-on:click="setPage(page-1)" :class="{'disabled':fDisabled}">
                上一页
            </span>
            <span v-for="i in showPageNumber" :key="i">
                <span class="btn btn-number" v-on:click="setPage(i)" :class="{'curPage': i === page}">
                    {{i}}
                </span>
            </span>
            <span class="btn btn-default" v-on:click="setPage(page+1)" :class="{'disabled':lDisabled}">
                下一页
            </span>
            <span class="btn btn-default" v-on:click="setPage(maxPage)" :class="{'disabled':lDisabled}">
                尾页
            </span>
            <span>{{page}}/{{maxPage}}</span>
        </div>
    </form>
</template>

<script>
    import Bus from '../assets/js/Bus'
    import {search, getPages} from "../assets/js/search_fun";
    export default {
        name: "SearchBar",
        methods: {
            setPage(pageIndex){
                if (pageIndex <= this.maxPage && pageIndex > 0)
                    this.page = pageIndex;
                this.fDisabled = this.page === 1;
                this.lDisabled = this.page === this.maxPage;
            }
        },
        data() {
            return {
                //为第一页或者最后一页时，首页，尾页不能点击
                fDisabled:true,
                lDisabled:false,

                searchString: "",
                year: "",
                page: 1,
                pageSize: 10,
                years: ['', '2015', '2016', '2017', '2018', '2019',],
                flag: false,
            }
        },
        computed: {
            // 计算数学，匹配搜索
            filteredArticles: function () {
                if (this.flag)
                    return search(this.searchString, this.year, this.page, this.pageSize);
                return [];
            },
            maxPage: function () {
                if (this.flag)
                    return getPages(this.pageSize);
                return 1
            },
            showPageNumber: function () {
                let start = this.page - 5;
                let shown = [];
                if (start < 1)
                    start = 1;
                let end = start + 9;
                if (end > this.maxPage)
                    end = this.maxPage;
                for (; start <= end; ++ start)
                    shown.push(start);
                return shown;
            }
        },
        watch: {
            pageSize() {
                this.page = 1;
            }
        },
        mounted() {
            Bus.$on("select_year", year => {
                this.year = year;
            });
            Bus.$on("read_over", flag => {
                this.flag = flag;
            })
        },
    };
</script>

<style scoped>
    *{
        margin:0;
        padding:3px;
    }
    /*-------------------------
        搜索输入框
    --------------------------*/
    .bar{
        background-color:#5c9bb7;

        box-shadow: 0 1px 1px #ccc;
        border-radius: 2px;
        width: 100%;
        padding: 14px;
        margin: 45px auto 20px;
        position:relative;
    }
    .bar label{
        height: 20px;
    }
    .bar input{
        background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU5NEY0RTlFMTA4NzExRTM5RTEzQkFBQzMyRjkyQzVBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU5NEY0RTlGMTA4NzExRTM5RTEzQkFBQzMyRjkyQzVBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTk0RjRFOUMxMDg3MTFFMzlFMTNCQUFDMzJGOTJDNUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTk0RjRFOUQxMDg3MTFFMzlFMTNCQUFDMzJGOTJDNUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4DjA/RAAABK0lEQVR42pTSQUdEURjG8dOY0TqmPkGmRcqYD9CmzZAWJRHVRIa0iFYtM6uofYaiEW2SRJtEi9YxIklp07ZkWswu0v/wnByve7vm5ee8M+85zz1jbt9Os+WiGkYdYxjCOx5wgFeXUHmtBSzpcCGa+5BJTCjEP+0nKWAT8xqe4ArPGEEVC1hHEbs2oBwdXkM7mj/JLZrad437sCGHOfUtcziutuYu2v8XUFF/4f6vMK/YgAH1HxkBYV60AR31gxkBYd6xAeF3VzMCwvzOBpypX8V4yuFRzX2d2gD/l5yjH4fYQEnzkj4fae5rJulF2sMXVrAsaTWttRFu4Osb+1jEDT71/ZveyhouTch2fINQL9hKefKjuYFfuznXWzXMTabyrvfyIV3M4vhXgAEAUMs7K0J9UJAAAAAASUVORK5CYII=) no-repeat 8px 50%;

        border: none;
        width: 300px;
        line-height: 19px;
        padding: 3px 0;

        border-radius: 2px;
        text-align: left;
        font-size: 14px;
        font-family: inherit;
        color: #738289;
        font-weight: bold;
        outline: none;
        text-indent: 40px;
    }
    .bar select{
        width: 100%;
        text-align: center;
        padding: 3px 0;
        border: none;
        border-radius: 2px;
        font-size: 14px;
        font-family: inherit;
        color: #738289;
        margin: 0 auto;
    }
    .bar option{
        font-size: 14px;
        color: #738289;
        font-family: inherit;
    }
    ul{
        list-style: none;
        width: 100%;
        margin: 0 auto;
        text-align: left;
    }
    table{
        font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
        width:100%;
        border-collapse:collapse;
        font-size: 13px;
    }
    td, th{
        font-size:1em;
        border:1px solid #98bf21;
        padding:3px 7px 2px 7px;
    }
    .title{
        width: 50%;
        overflow: hidden;
    }
    .speaker{
        width: 20%;
        overflow: auto;
    }
    .time {
        width: 50px;
    }
    .dep{
        width: 100px;
        text-align: center;
    }
    .place{
        width: auto;
        overflow: hidden;
    }
    .btn-default{
        width: 60px;
        border: 1px solid #e1e2e3;
        cursor: pointer;
        display: inline-block;
        margin: 3px;
    }
    .btn-number{
        width: 30px;
        border: 1px solid #e1e2e3;
        cursor: pointer;
        display: inline-block;
        margin: 3px;
    }
    .curPage{
        border: 0;
        font-weight: bold;
    }
    a {
        padding: 3px 7px 2px 7px;
    }
    th {
        font-size:1.1em;
        text-align:center;
        padding-top:5px;
        padding-bottom:4px;
        background-color:#A7C942;
        color:#ffffff;
    }
    tr.alt td{
        color:#000000;
        background-color:#EAF2D3;
    }

</style>