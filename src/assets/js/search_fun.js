
    // 数据模型，实际环境可以根据 Ajax 来获取
let articles = [
        {
            "id": 1,
            "title": 'Intelligent Software Engineering: Synergy between AI and Software Engineering',
            "url": 'http://cse.sustech.edu.cn/cn/lecture/view/id/487',
            "time": '2019-5-17',
            "department": 'CSE',
            "speaker": 'Tao XIE',
            "place": 'Conference room 1008 IPARK A7 Building'
        },
        {
            "id": 2,
            "title": 'Challenges in applying Evolutionary Algorithms to real-world problems',
            "url": 'http://cse.sustech.edu.cn/cn/lecture/view/id/480',
            "time": '2019-4-22',
            "department": 'CSE',
            "speaker": 'Xiaodong LI',
            "place": '南山智园A7栋1008室'
        },
        {
            "id": 3,
            "title": '安全数据分析：若干重大安全事件响应实例及其背后支撑系统',
            "url": 'http://cse.sustech.edu.cn/cn/lecture/view/id/484',
            "time": '2019-4-19',
            "department": 'CSE',
            "speaker": '李丰沛',
            "place": '第一教学楼107室'
        },
        {
            "id": 4,
            "title": '基于隐马尔可夫模型的微铣削刀具 磨损监测与过程优化',
            "url": 'http://mee.sustc.edu.cn/2018/seminar_0509/313.html',
            "time": '2018-5-9',
            "department": 'MEE',
            "speaker": '刘同舜 博士',
            "place": '慧园5栋501会议室'
        },
        {
            "id": 5,
            "title": 'Pain in autism',
            "url": 'http://med.sustech.edu.cn/lecture/view/id-58.html',
            "time": '2017-3-23',
            "department": 'MED',
            "speaker": '纪如荣 ',
            "place": 'Room 215, Faculty Research Building 1'
        },
        {
            "id": 6,
            "title": 'Pulsar Timing and its Application in Fundamental Gravitation',
            "url": 'https://phy.sustc.edu.cn/index.php?s=/Show/index/cid/33/id/81.html',
            "time": '2016-4-28',
            "department": 'Physics',
            "speaker": '李柯伽',
            "place": '图书馆110报告厅'
        }
        ];

export default function search (word) {
    let articles_array = articles,
        searchString = word;

    if (!searchString) {
        return articles_array;
    }

    searchString = searchString.trim().toLowerCase();

    articles_array = articles_array.filter(function (item) {
        if (item.title.toLowerCase().indexOf(searchString) !== -1) {
            return item;
        }
        else
        if (item.speaker.toLowerCase().indexOf(searchString) !== -1) {
            return item;
        }
        else
        if (item.time.toLowerCase().indexOf(searchString) !== -1) {
            return item;
        }
        else
        if (item.department.toLowerCase().indexOf(searchString) !== -1) {
            return item;
        }
        else
        if (item.place.toLowerCase().indexOf(searchString) !== -1) {
            return item;
        }
    });

    // 返回过来后的数组
    return articles_array;
}