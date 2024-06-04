/*
 * uCharts®
 * 高性能跨平台图表库，支持H5、APP、小程序（微信/支付宝/百度/头条/QQ/360）、Vue、Taro等支持canvas的框架平台
 * Copyright (c) 2021 QIUN®秋云 https://www.ucharts.cn All rights reserved.
 * Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * 复制使用请保留本段注释，感谢支持开源！
 * 
 * uCharts®官方网站
 * https://www.uCharts.cn
 * 
 * 开源地址:
 * https://gitee.com/uCharts/uCharts
 * 
 * uni-app插件市场地址：
 * http://ext.dcloud.net.cn/plugin?id=271
 * 
 */

// 通用配置项

// 主题颜色配置：如每个图表类型需要不同主题，请在对应图表类型上更改color属性
const color = ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'];
const colorList = ['rgba(211, 68, 53, 1)', 'rgba(228, 133, 48, 1)', 'rgba(231, 185, 44, 1)', 'rgba(23, 165, 213, 1)'];
const cfe = {
	//demotype为自定义图表类型
	"type": ["pie", "ring", "rose", "funnel", "line", "column", "column2","column3", "area", "radar", "gauge", "candle", "demotype"],
	//增加自定义图表类型，如果需要categories，请在这里加入您的图表类型例如最后的"demotype"
	"categories": ["line", "column", "column2","column3", "area", "radar", "gauge", "candle", "demotype"],
	//instance为实例变量承载属性，option为eopts承载属性，不要删除
	"instance": {},
	"option": {},
	//下面是自定义format配置，因除H5端外的其他端无法通过props传递函数，只能通过此属性对应下标的方式来替换
	"formatter": {
		"tooltipDemo1": function (res) {
			let result = ''
			for (let i in res) {
				if (i == 0) {
					result += res[i].axisValueLabel + '年销售额'
				}
				let value = '--'
				if (res[i].data !== null) {
					value = res[i].data
				}
				// #ifdef H5
				result += '\n' + res[i].seriesName + '：' + value + ' 万元'
				// #endif

				// #ifdef APP-PLUS
				result += '<br/>' + res[i].marker + res[i].seriesName + '：' + value + ' 万元'
				// #endif
			}
			return result;
		},
		legendFormat: function (name) {
			return "自定义图例+" + name;
		},
		yAxisFormatDemo: function (value, index) {
			return value + '元';
		},
		seriesFormatDemo: function (res) {
			return res.name + '年' + res.value + '元';
		}
	},
	//这里演示了自定义您的图表类型的option，可以随意命名，之后在组件上 type="demotype" 后，组件会调用这个花括号里的option，如果组件上还存在eopts参数，会将demotype与eopts中option合并后渲染图表。
	"demotype": {
		"color": color,
		//在这里填写echarts的option即可

	},
	//下面是自定义配置，请添加项目所需的通用配置
	"column": {
		"color": color,
		"title": {
			"text": ''
		},
		// "grid": {
		// 	"top": 30,
		// 	"bottom": 50,
		// 	"right": 15,
		// 	"left": 40
		// },
		"grid": {
			"top": "15%",
			"left": "1%",
			"width": "95%",
			"height": "80%",
			"containLabel": true,
		},
		"tooltip": {
			"trigger": 'axis',
			"backgroundColor": '#5D7EA0E0',
			"padding": [5, 8],
			"position": function (pos, params, dom, rect, size) {
				// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
				var obj = { top: 100 };
				obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
				return obj;
			},
			"textStyle": {
				"color": "#FFFFFF",
				"fontWeight": "lighter",
				"fontSize": 10
			},

			"axisPointer": { // 坐标轴指示器，坐标轴触发有效
				// 方法一
				"type": 'shadow', // 默认为直线，可选为：'line' | 'shadow'
				"shadowStyle": {
					"color": 'rgba(102, 102, 102, 0.3)'
				},
				
				label: {
					show: true,
					color: "#333333",
					backgroundColor: '#fff',
					shadowColor: 'transparent'
				},
				// // 方法二
				// type: 'line',
				// lineStyle: {
				//   color: 'rgba(140, 150, 160, 0.2)',
				//   width: 60,
				// 	shadowColor: 'rgba(0, 0, 0, 0.5)',
				// 	shadowBlur: 10
				// }
			}
		},
		"legend": {
			"top": 10,
			'right': 0,
			"icon": "circle",
			"itemGap": 16,
			"itemHeight": 8
		},
		"toolbox": {
			"show": false,
		},
		"xAxis": {
			"type": 'category',
			"axisLabel": {
				"margin": 4,
				"fontSize": 10,
				"color": '#8C99A7'
			},
			"axisLine": {
				"lineStyle": {
					"type": "dashed",
					"color": '#E5EAEF7F'
				}
			},
			"axisTick": { "show": false },
			"boundaryGap": true,
			"data": []
		},
		"yAxis": {
			"type": 'value',
			"axisTick": {
				"show": false,
			},
			"axisLabel": {
				"margin": 4,
				"fontSize": 10,
				"color": '#8C99A7'
			},
			"axisLine": {
				"show": false,
			},
			"splitLine": {
				"lineStyle": {
					"type": "dashed",
					"color": ['#E5EAEF7F']
				}
			}
		},
		"dataZoom": [
			{
				"type": 'inside',
				"startValue": 0,
				"endValue": 8,
			}
		],
		"seriesTemplate": {
			"name": '',
			"type": 'bar',
			"data": [],
			"barGap": 0,
			"barCategoryGap": "30%",
			"label": {
				"show": false,
				"color": "#666666",
				"position": 'top',
				"distance": 5
			},
			"itemStyle": {
				"barBorderRadius": [2, 2, 2, 2],
				// normal: {
				// 	"barBorderRadius": [2, 2, 2, 2],
				// },
				// 移入当前的柱状图时改变颜色
				// emphasis: {
				// 	shadowColor: '#666666',
				// 	shadowBlur: 10,
				// 	borderWidth: 4
				// }
			},
			"selectedMode": true,
			"select": {
				"disabled": false,
				"label": {
					"show": false
				},
				"itemStyle": {
					"borderWidth": 0,
					"shadowBlur": 6,
					"opacity": 1
				}
			}
		},
	},
	//下面是自定义配置，请添加项目所需的通用配置
	"column2": {
		"color": color,
		"title": {
			"text": ''
		},
		"grid": {
			"top": "15%",
			"left": "1%",
			"width": "95%",
			"height": "80%",
			"containLabel": true,
		},
		"tooltip": {
			"trigger": 'axis',
			"backgroundColor": '#5D7EA0E0',
			"padding": [5, 8],
			//   "position": function (pos, params, dom, rect, size) {
			// 		// 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
			// 		var obj = {top: 100};
			// 		obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
			// 		return obj;
			//   },
			"textStyle": {
				"color": "#FFFFFF",
				"fontWeight": "lighter",
				"fontSize": 10
			},

			"axisPointer": { // 坐标轴指示器，坐标轴触发有效
				// 方法一
				"type": 'shadow', // 默认为直线，可选为：'line' | 'shadow'
				"shadowStyle": {
					"color": 'rgba(102, 102, 102, 0.3)'
				}

				// // 方法二
				// type: 'line',
				// lineStyle: {
				//   color: 'rgba(140, 150, 160, 0.2)',
				//   width: 60
				// }
			}
		},
		"legend": {
			"top": 2,
			'right': 0,
			"icon": "circle",
			"itemGap": 20,
			"itemHeight": 8
		},
		"toolbox": {
			"show": false,
		},
		"xAxis": {
			"type": 'category',
			"axisLabel": {
				"margin": 4,
				"fontSize": 10,
				"color": '#8C99A7'
			},
			"axisLine": {
				"lineStyle": {
					"type": "dashed",
					"color": '#E5EAEF7F'
				}
			},
			"axisTick": { "show": false },
			"boundaryGap": true,
			"data": []
		},
		"yAxis": {
			"type": 'value',
			"scale":true,
			"axisTick": {
				"show": false,
			},
			"axisLabel": {
				"margin": 4,
				"fontSize": 10,
				"color": '#8C99A7'
			},
			"axisLine": {
				"show": false,
			},
			"splitLine": {
				"lineStyle": {
					"type": "dashed",
					"color": ['#E5EAEF7F']
				}
			}
		},
		"dataZoom": [
			{
				"type": 'inside',
				"startValue": 0,
				"endValue": 8,
			}
		],
		"seriesTemplate": {
			"name": '',
			"type": 'bar',
			"data": [],
			"barCategoryGap": "55%",
			"barMaxWidth": 30,
			"barGap": "-100%",
			"label": {
				"show": false,
				"color": "#666666",
				"position": 'top',
				"distance": 5
			},
			"itemStyle": {
				"barBorderRadius": [2, 2, 2, 2],
			},
			"selectedMode": true,
			"select": {
				'disabled': false,
				"label": {
					"show": true
				},
				"itemStyle": {
					"borderWidth": 0,
					"shadowBlur": 6,
					"opacity": 1
				}
			}
		},
	},
	
	//下面是自定义配置，请添加项目所需的通用配置
	"column3": {
		"color": color,
		"title": {
			"text": ''
		},
		grid: {
			left: 0,
			right: 30,
			containLabel: true,
		},
		tooltip: {
			show: false,
			trigger: 'axis',
			axisPointer: {
				type: 'shadow',
			},
		},
		legend: {
			show: false,
		},
		"toolbox": {
			"show": false,
		},
		xAxis: {
			show: true,
			type: 'value',
			axisLine: {
				show: true,
				lineStyle: {
					color: ['rgba(62, 113, 157, 0.5)']
				}
			},
			splitLine: {
				lineStyle: {
					color: 'rgba(62, 113, 157, 0.5)'
				}
			},
			axisLabel: {
				color: 'rgba(62, 113, 157, 1)'
			}
		},
		yAxis: [
			{
				type: 'category',
				inverse: true,
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisPointer: {
					label: {
						show: true,
						margin: 30,
					},
				},
				"data": [],
				axisLabel: {
					margin: 100,
					fontSize: 14,
					align: 'left',
					color: '#fff',
					rich: {
						a1: {
							color: '#fff',
							backgroundColor: colorList[0],
							width: 20,
							height: 20,
							align: 'center',
							borderRadius: 10,
						},
						a2: {
							color: '#fff',
							backgroundColor: colorList[1],
							width: 20,
							height: 20,
							align: 'center',
							borderRadius: 10,
						},
						a3: {
							color: '#fff',
							backgroundColor: colorList[2],
							width: 20,
							height: 20,
							align: 'center',
							borderRadius: 10,
						},
						b: {
							color: '#fff',
							backgroundColor: colorList[3],
							width: 20,
							height: 20,
							align: 'center',
							borderRadius: 10,
						},
					},
					formatter: function (params) {
						console.log(params,'"data": []')
						// var index = datas.map((item) => item.name).indexOf(params);
						// index = index + 1;
						// if (index - 1 < 3) {
						// 	return ['{a' + index + '|' + index + '}' + '  ' + params].join('\n');
						// } else {
						// 	return ['{b|' + index + '}' + '  ' + params].join('\n');
						// }
					},
				},
			}
		],
		"seriesTemplate": {
	 z: 2,
			name: 'value',
			type: 'bar',
			barWidth: 8,
			zlevel: 1,
			"data": [],
			// data: datas.map((item, i) => {
			// 	itemStyle = {}
			// 	itemStyle.color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
			// 		{
			// 			offset: 0,
			// 			color: 'rgba(24, 103, 222, 0.4)',
			// 		},
			// 		{
			// 			offset: 1,
			// 			color: i < 3 ? colorList[i] : colorList[3],
			// 		},
			// 	])
			// 	return {
			// 		value: item.value,
			// 		itemStyle: itemStyle,
			// 	};
			// }),
			label: {
				show: true,
				position: 'right',
				color: '#fff',
				fontSize: 14,
			},
			itemStyle: {
				barBorderRadius: [0, 15, 15, 0],
			}
		},
	},
	"line": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'axis'
		},
		"grid": {
			"top": 30,
			"bottom": 50,
			"right": 15,
			"left": 40
		},
		"legend": {
			"bottom": 'left',
		},
		"toolbox": {
			"show": false,
		},
		"xAxis": {
			"type": 'category',
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
			"boundaryGap": true,
			"data": []
		},
		"yAxis": {
			"type": 'value',
			"axisTick": {
				"show": false,
			},
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
		},
		"seriesTemplate": {
			"name": '',
			"type": 'line',
			"data": [],
			"barwidth": 20,
			"label": {
				"show": true,
				"color": "#666666",
				"position": 'top',
			},
		},
	},
	"area": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'axis'
		},
		"grid": {
			"top": 30,
			"bottom": 50,
			"right": 15,
			"left": 40
		},
		"legend": {
			"bottom": 'left',
		},
		"toolbox": {
			"show": false,
		},
		"xAxis": {
			"type": 'category',
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
			"boundaryGap": true,
			"data": []
		},
		"yAxis": {
			"type": 'value',
			"axisTick": {
				"show": false,
			},
			"axisLabel": {
				"color": '#666666'
			},
			"axisLine": {
				"lineStyle": {
					"color": '#CCCCCC'
				}
			},
		},
		"seriesTemplate": {
			"name": '',
			"type": 'line',
			"data": [],
			"areaStyle": {},
			"label": {
				"show": true,
				"color": "#666666",
				"position": 'top',
			},
		},
	},
	"pie": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item'
		},
		"grid": {
			"top": 40,
			"bottom": 30,
			"right": 15,
			"left": 15
		},
		"legend": {
			"bottom": 'left',
		},
		"seriesTemplate": {
			"name": '',
			"type": 'pie',
			"data": [],
			"radius": '50%',
			"label": {
				"show": true,
				"color": "#666666",
				"position": 'top',
			},
		},
	},
	"ring": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item'
		},
		"grid": {
			"top": 40,
			"bottom": 30,
			"right": 15,
			"left": 15
		},
		"legend": {
			"bottom": 'left',
		},
		"seriesTemplate": {
			"name": '',
			"type": 'pie',
			"data": [],
			"radius": ['40%', '70%'],
			"avoidLabelOverlap": false,
			"label": {
				"show": true,
				"color": "#666666",
				"position": 'top',
			},
			"labelLine": {
				"show": true
			},
		},
	},
	"rose": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item'
		},
		"legend": {
			"top": 'bottom'
		},
		"seriesTemplate": {
			"name": '',
			"type": 'pie',
			"data": [],
			"radius": "55%",
			"center": ['50%', '50%'],
			"rosetype": 'area',
		},
	},
	"funnel": {
		"color": color,
		"title": {
			"text": ''
		},
		"tooltip": {
			"trigger": 'item',
			"formatter": "{b} : {c}%"
		},
		"legend": {
			"top": 'bottom'
		},
		"seriesTemplate": {
			"name": '',
			"type": 'funnel',
			"left": '10%',
			"top": 60,
			"bottom": 60,
			"width": '80%',
			"min": 0,
			"max": 100,
			"minSize": '0%',
			"maxSize": '100%',
			"sort": 'descending',
			"gap": 2,
			"label": {
				"show": true,
				"position": 'inside'
			},
			"labelLine": {
				"length": 10,
				"lineStyle": {
					"width": 1,
					"type": 'solid'
				}
			},
			"itemStyle": {
				"bordercolor": '#fff',
				"borderwidth": 1
			},
			"emphasis": {
				"label": {
					"fontSize": 20
				}
			},
			"data": [],
		},
	},
	"gauge": {
		"color": color,
		"tooltip": {
			"formatter": '{a} <br/>{b} : {c}%'
		},
		"seriesTemplate": {
			"name": '业务指标',
			"type": 'gauge',
			"detail": { "formatter": '{value}%' },
			"data": [{ "value": 50, "name": '完成率' }]
		},
	},
	"candle": {
		"xAxis": {
			"data": []
		},
		"yAxis": {},
		"color": color,
		"title": {
			"text": ''
		},
		"dataZoom": [{
			"type": 'inside',
			"xAxisIndex": [0, 1],
			"start": 10,
			"end": 100
		},
		{
			"show": true,
			"xAxisIndex": [0, 1],
			"type": 'slider',
			"bottom": 10,
			"start": 10,
			"end": 100
		}
		],
		"seriesTemplate": {
			"name": '',
			"type": 'k',
			"data": [],
		},
	}
}

export default cfe;