<template>
    <form id="main" v-cloak>

        <div class="bar">
            <!-- searchString 模型与文本域创建绑定 -->
            <label>
                <input type="text" v-model="searchString" placeholder="输入搜索内容" />
            </label>
            &nbsp;
            <label>
                <select v-model="year">
                    <option v-for="year in years" :key="year">{{year}}</option>
                </select>
            </label>
        </div>

        <ul>
            <table>
                <tr>
                    <th> Title </th>
                    <th> Speaker </th>
                    <th> Time </th>
                    <th> Department </th>
                    <th> Place </th>
                </tr>
                <!-- 循环输出数据 -->
                <tr  v-for="article in filteredArticles" :key="article.id" :class="{'alt':article.id%2 !== 1}">
                    <td><a :href="article.url" target="new_window"> {{article.title}}</a> </td>
                    <td>{{article.speaker}}</td>
                    <td> {{article.time}}</td>
                    <td> {{article.department}}</td>
                    <td> {{article.place}}</td>
                </tr>
            </table>
        </ul>

    </form>
</template>

<script>
    import search from '../assets/js/search_fun';
    import Bus from '../assets/js/Bus'
    export default {
        name: "SearchBar",
        methods: {
        },
        data() {
            return {
                searchString: "",
                year: "",
                years: [
                    '',
                    '2015',
                    '2016',
                    '2017',
                    '2018',
                    '2019',
                ]
            }
        },
        computed: {
            // 计算数学，匹配搜索
            filteredArticles: function () {
                return search(this.searchString, this.year);
            }
        },
        mounted() {
            Bus.$on("select_year", year => {
                this.year = year;
            })
        }
    };
</script>

<style scoped>
    /* 隐藏未编译的变量 */

    [v-cloak] {
        display: none;
    }

    *{
        margin:0;
        padding:0;
    }

    body{
        font:15px/1.3 'Open Sans', sans-serif;
        color: #5e5b64;
        text-align:center;
    }

    a, a:visited {
        outline:none;
        color:#389dc1;
    }

    a:hover{
        text-decoration:none;
    }

    section, footer, header, aside, nav{
        display: block;
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