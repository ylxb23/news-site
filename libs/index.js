// 仅在 index.html 加载


// 轮播图接口：http://ncyunhua.com:8088/banner
// 加载轮播图
$(function () {
    // 用jquery加载接口获取轮播图数据
    $.get("http://ncyunhua.com:8088/banner", function (data) {
        console.log("获取到Banner接口数据: " + JSON.stringify(data));
        var bannerHtml = "";

        var items = [];
        if(data.code == 200) {
            // 接口请求成功
            items = data.data;
        } else {
            alert("banner接口请求失败！将加载默认配置。");
            // 使用默认值
            items = [
                {
                    "ID": 1,
                    "Title": "广东深圳xxx大厦正式动工",
                    "Image": "http://ncyunhua.com:8088/file/banner/1.jpg"
                },
                {
                    "ID": 2,
                    "Title": "江西南昌xxx地铁正式动工",
                    "Image": "http://ncyunhua.com:8088/file/banner/2.jpg"
                },
                {
                    "ID": 3,
                    "Title": "北京xx广场xx大厦宣布倒闭",
                    "Image": "http://ncyunhua.com:8088/file/banner/3.jpg"
                },
                {
                    "ID": 4,
                    "Title": "上海陆家嘴xx电脑商城宣布倒闭",
                    "Image": "http://ncyunhua.com:8088/file/banner/4.jpg"
                }
            ];
        }
        for (const item of items) {
            bannerHtml = bannerHtml + 
                        `<div class="item">
                            <img src="${item.Image}" alt="">
                            <ul>
                                <li class="roll-title">${item.Title}</li>
                            </ul>
                        </div>`;
        }
        $("#carousel-banner").html(bannerHtml);
    });
});

// 推荐好物接口：http://ncyunhua.com:8088/recommend
// 加载推荐好物列表
$(function () {
    $.get("http://ncyunhua.com:8088/recommend", function (data) {
        console.log("获取到推荐好物接口数据：" + JSON.stringify(data));
        var recommendHtml = "";
        var items = [];
        if(data.code == 200) {
            items = data.data;
        } else {
            alert("推荐好物接口加载失败！");
        }
        for (var item of items) {
            recommendHtml += ` <div class="shop-item">
                                <ul>
                                    <li class="pic">
                                        <a href="javascript:;">
                                            <img src="${item.image}" alt="" />
                                        </a>
                                    </li>
                                    <li class="name">${item.name}</li>
                                </ul>
                            </div>`
        }
        $("#recommend-shops").html(recommendHtml);
    });
});


// 新闻信息接口：http://ncyunhua.com:8088/getNews
// 加载新闻信息
$(function () {
    $.get("http://ncyunhua.com:8088/getNews", function (data) {
        console.log("获取到新闻信息接口数据：" + JSON.stringify(data));
        
        // 新闻区分为4个模块，分别置于4个div中：id="news-id1" id="news-id2" id="news-id3" id="news-id4"
        var newsId1Html = "";
        var newsId2Html = "";
        var newsId3Html = "";
        var newsId4Html = "";
        
        var newsId1 = {};
        var newsId2 = {};
        var newsId3 = {};
        var newsId4 = {};
        if(data.code == 200) {
            var news = data.data;
            for (const item of news) {
                if(item.ID == 1) {
                    newsId1 = item;
                } else if(item.ID == 2) {
                    newsId2 = item;
                } else if(item.ID == 3) {
                    newsId3 = item;
                } else if(item.ID == 4) {
                    newsId4 = item;
                } else {
                    console.log("新闻信息接口数据ID未知！")
                }
            }
        } else {
            alert("新闻信息接口加载失败！");
        }
        // newsHtml 组装
        newsId1Html = assemblyNews(newsId1);
        newsId2Html = assemblyNews(newsId2);
        newsId3Html = assemblyNews(newsId3);
        newsId4Html = assemblyNews(newsId4);
        $("#news-id1").html(newsId1Html);
        $("#news-id2").html(newsId2Html);
        $("#news-id3").html(newsId3Html);
        $("#news-id4").html(newsId4Html);
    });

    function assemblyNews(item) {
        if(item == {} || item == undefined || item == null) {
            return "<h1>新闻内容为空</h1>";
        }
        var newsHtml = `
                        <div class="col-title-inline">
                            <div class="col-title">${item.Name}</div>
                            <div class="col-more">
                                <li><a href="javascript:;" >更多 &gt;&gt;&gt; </a></li>
                            </div>
                        </div>
                        <div class="col-body-info">
                            <div class="info-img">
                                <ul>
                                    <a href="javascript:;" >
                                        <img src="${item.Image}" alt="" />
                                    </a>
                                </ul>
                            </div>
                            <div class="info-content">
                                <ul>
                                    <li class="info-content-title"><a href="javascript:;">${item.Title}</a></li>
                                    <li class="info-content-summary">${item.Content}</li>
                                    <li class="info-content-view">已被查看${item.AccessNum}次</li>
                                </ul>
                            </div>
                        </div>
        `;
        newsHtml += `
        <div class="col-body-list">
            <ul>`
        for(var newsItem of item.ChildInfo) {
            newsHtml += `<li class=""><a href="javascript:;"><span class="location">[${newsItem.Region}]</span><span class="title">${newsItem.Title}</span><span class="viewed">被围观${newsItem.AccessNum}次</span></a></li>`
        }
        newsHtml += `
            </ul>
        </div>
        `;
        return newsHtml;
    }
});