// 公共的js脚本，即所有页面都需要导入的

const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Ijg5NGNkYWEzLTAyYWItNGFjYS1iYTYyLWE5OWQ2YTczMzQzMiJ9.YeahmlEqBVYiciHlihoOeveFYoCtnocdIO1jAIMcaEvbM5ydichQbjXy4v_LiJzWTAyDgRQ35gq-DMB-Xx-8Iw";
localStorage.setItem("authorization", "Bearer " + TOKEN);


// logo接口地址：http://ncyunhua.com:8088/logo
// 加载logo
$(function () {
    $.ajax({
        url: "http://ncyunhua.com:8088/logo", 
        type: "GET",
        redirect: "follow",
        headers: {
            "Authorization": localStorage.getItem("authorization"),
        },
        success: function (data) {
            console.log("获取到Logo接口数据: " + JSON.stringify(data));
            var logoUri = "";
            if(data.code == 200) {
                logoUri = data.data.Image;
            } else {
                alert("Logo接口请求失败！将加载默认图片。");
                logoUri = "imgs/head-icon.png";
            }
            $("#logo").attr("src", logoUri);
        }
    });
});

// 加载导航栏
$(function () {
    // 用jquery加载接口获取导航栏数据
    $.ajax({
        url: "http://ncyunhua.com:8088/title",
        type: "GET",
        headers: {
            "Authorization": localStorage.getItem("authorization"),
        },
        success: function(data) {
            console.log("获取到Title接口数据: " + JSON.stringify(data));
            var nagativesHtml = "";
            // 获取当前路径的最后一级目录
            var paths = window.location.pathname.split("/");
            var currPath = decodeURIComponent(paths[paths.length - 1]);
            var items = [];
            if(data.code == 200) {
                // 接口请求成功
                items = data.data;
            } else {
                alert("导航栏接口请求失败！将加载默认配置。");
                // 使用默认值
                items = [
                    {
                        "ID": 1,
                        "Name": "首页",
                        "Url": "index.html"
                    },
                    {
                        "ID": 2,
                        "Name": "建筑图集",
                        "Url": "建筑图集.html"
                    },
                    {
                        "ID": 3,
                        "Name": "求职招聘",
                        "Url": "求职招聘.html"
                    },
                    {
                        "ID": 4,
                        "Name": "环球资讯",
                        "Url": "环球资讯.html"
                    },
                    {
                        "ID": 5,
                        "Name": "班组信息",
                        "Url": "班组信息.html"
                    },
                    {
                        "ID": 6,
                        "Name": "联盟公司",
                        "Url": "联盟公司.html"
                    }
                ];
            }
            for (const item of items) {
                var liClazz = "";
                if(item.Url === currPath) {
                    liClazz = "active";
                }
                nagativesHtml = nagativesHtml + `<li class="${liClazz}"><a href="./${item.Url}">${item.Name}</a></li>`;
            }
            $("#nagatives").html(nagativesHtml);
        }
    });
    // $.get("http://ncyunhua.com:8088/title", function (data) {
        
    // });
});

// 加载 banner


