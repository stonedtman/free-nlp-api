function generateDayWiseTimeSeries(e, t, a) {
	for (var r = 0, o = []; r < t;) {
		var i = e,
			n = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min;
		o.push([i, n]), e += 864e5, r++
	}
	return o
}

function generateData(e, t, a) {
	for (var r = 0, o = []; r < t;) {
		var i = Math.floor(750 * Math.random()) + 1,
			n = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min,
			s = Math.floor(61 * Math.random()) + 15;
		o.push([i, n, s]), 864e5, r++
	}
	return o
}
function generateData1(e, t, a) {
	for (var r = 0, o = []; r < t;) {
		var i = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min,
			n = Math.floor(61 * Math.random()) + 15;
		o.push([e, i, n]), e += 864e5, r++
	}
	return o
}

function setChart(v) {
	Apex = {
		chart: {
			parentHeightOffset: 0,
			toolbar: {
				show: !1
			}
		},
		grid: {
			padding: {
				left: 0,
				right: 0
			}
		},
		colors: ["#5369f8", "#43d39e", "#f77e53", "#1ce1ac", "#25c2e3", "#ffbe0b"],
		tooltip: {
			theme: "dark",
			x: {
				show: !1
			}
		},
		dataLabels: {
			enabled: !1
		},
		xaxis: {
			axisBorder: {
				color: "#d6ddea"
			},
			axisTicks: {
				color: "#d6ddea"
			}
		},
		yaxis: {
			labels: {
				offsetX: -10
			}
		}
	},
		function (e) {
			"use strict";
			function t() { }
			t.prototype.initCharts = function () {
				new ApexCharts(document.querySelector("#analysis_emotion_column"), v).render();
			}, t.prototype.init = function () {
				this.initCharts()
			}, e.ApexChartPage = new t, e.ApexChartPage.Constructor = t
		}(window.jQuery),
		function () {
			"use strict";
			window.jQuery.ApexChartPage.init()
		}();
}
