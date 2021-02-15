这是一个展示拉取新闻列表的页ReduxDemo

接口:查看某个公众号历史数据

https://wanandroid.com/wxarticle/list/408/1/json

方法：GET
参数：
	公众号 ID：拼接在 url 中，eg:405
	公众号页码：拼接在url 中，eg:1
	
列表数据如下
{
	"data": {
		"curPage": 1,
		"datas": [{
			"apkLink": "",
			"audit": 1,
			"author": "鸿洋",
			"canEdit": false,
			"chapterId": 408,
			"chapterName": "鸿洋",
			"collect": false,
			"courseId": 13,
			"desc": "",
			"descMd": "",
			"envelopePic": "",
			"fresh": false,
			"host": "",
			"id": 17015,
			"link": "https://mp.weixin.qq.com/s/T2FYhz1KbzXVvmh65nz94g",
			"niceDate": "1天前",
			"niceShareDate": "16小时前",
			"origin": "",
			"prefix": "",
			"projectLink": "",
			"publishTime": 1611244800000,
			"realSuperChapterId": 407,
			"selfVisible": 0,
			"shareDate": 1611332729000,
			"shareUser": "",
			"superChapterId": 408,
			"superChapterName": "公众号",
			"tags": [{
				"name": "公众号",
				"url": "/wxarticle/list/408/1"
			}],
			"title": "这交互炸了系列，炫酷跳动的闪屏Logo标题",
			"type": 0,
			"userId": -1,
			"visible": 1,
			"zan": 0
		}],
		"offset": 0,
		"over": false,
		"pageCount": 56,
		"size": 20,
		"total": 1106
	},
	"errorCode": 0,
	"errorMsg": ""
}
