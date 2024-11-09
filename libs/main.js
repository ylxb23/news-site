// 公共的js脚本，即所有页面都需要导入的

const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImE3OTQ2OGIwLWUzMTctNGYwMS1iMmIyLTlhNTVkNWYzMTYyZCJ9.8Vx3tGoB_WvhfO__RVgPGC5su6cWgZMJ43lmw7wzcRKKy-VsEEX1Q8OXZAwZcvlgVAvVMiu4MgxCwO_AeFQ7xg";

localStorage.setItem("authorization", "Bearer " + TOKEN);

// 创建一个新的Headers对象
const myHeaders = new Headers();
// 将Authorization头添加到Headers对象中
myHeaders.append("Authorization", localStorage.getItem("authorization"));

// 设置请求选项
const requestOptions = {
    method: "GET", // 请求方法为GET
    headers: myHeaders, // 设置请求头
    redirect: "follow" // 设置重定向策略
};

/**
 * 获取图片并设置src属性
 */
function fetchImageWithToken(url, _$img) {
    fetch(url, requestOptions)
        .then((response) => {
            return response.blob();
        }) // 将响应转换为Blob对象
        .then(blob => {
            return _$img.attr("src", URL.createObjectURL(blob));
        })
        .catch((error) => {
            // 提示用户加载图片失败
            console.error("Failed to load image: " + error.message);
        });
} 

function reloadImageSrcWithToken(_$item) {
    let _images = $(_$item).find("img");
    for (let i = 0; i < _images.length; i++) {
        const _$img = $(_images[i]);
        fetchImageWithToken(_$img.prop("alt"), _$img);
    }
}

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
            }
            $("#logo").attr("alt", logoUri);
            // 重新根据图片路径，通过加入Authorization头加载图片
            reloadImageSrcWithToken($(".head-icon"));
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
});




// POST接口
 $(function () {
    var title = $('#title').value;
    var content = $('#content').value;
    $.ajax({
        url: "http://ncyunhua.com:8088/logo", 
        type: "POST",
        redirect: "follow",
        data: { // 需要提交的内容
            "title": title,
            "content": content
        },
        headers: {
            "Authorization": localStorage.getItem("authorization"),
        },
        success: function (data) {
            console.log("获取到Logo接口数据: " + JSON.stringify(data));
            
            confirm("提交成功！");
        }
    });
});