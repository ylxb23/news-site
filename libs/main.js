// 公共的js脚本，即所有页面都需要导入的

const TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImI0Nzk1Y2NlLWE0MDQtNGFkMy1iYWJkLTM3OGNlZjlmODE4YyJ9.UlAP364c40H4cGOu6qwKHfoqPSvw2vTtqnbIoc5TpInREfHW9W7CQbKE94KbXlS8pSMFTC2Mtp5jO30HrWKcpQ";

localStorage.setItem("authorization", "Bearer " + TOKEN);


function fetchImageWithToken(url, _$img) {
    // 创建一个新的Headers对象
    const myHeaders = new Headers();
    // 将Authorization头添加到Headers对象中
    myHeaders.append("Authorization", "Bearer " + TOKEN);

    let imageURL = "";
    // 设置请求选项
    const requestOptions = {
        method: "GET", // 请求方法为GET
        headers: myHeaders, // 设置请求头
        redirect: "follow" // 设置重定向策略
    };
    fetch(url, requestOptions)
        .then((response) => {
            return response.blob();
        }) // 将响应转换为Blob对象
        .then(blob => {
            imageURL = URL.createObjectURL(blob);
            console.log("inner获取到图片URL: " + imageURL);
            return _$img.attr("src", imageURL);
        })
        .catch((error) => {
            // 捕获错误并在控制台中输出错误信息
            console.error("There was an error!", error);
            // 提示用户加载图片失败
            alert("Failed to load image: " + error.message);
        });
} 

function reloadImageSrcWithToken(_$item) {
    let _images = $(_$item).find("img");
    for (let i = 0; i < _images.length; i++) {
        const _$img = $(_images[i]);
        fetchImageWithToken(_$img.prop("src"), _$img);
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
            $("#logo").attr("src", logoUri);
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

