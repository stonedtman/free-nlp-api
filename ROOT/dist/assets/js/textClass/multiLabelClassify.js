var edit_text =
  "打了684场比赛，周鹏创造CBA历史上出场数最高纪录昨天与上海队的比赛，是深圳队老将周鹏CBA生涯的第684场比赛，他超越了前队友广东传奇名宿朱芳雨的683场纪录成为CBA历史出场数第一人！CBA官方与深圳男篮官方均发布海报给周鹏送上祝贺。CBA官方海报配文写道，“积跬步至千里！恭喜周鹏CBA联赛出场次数684场跃居历史第一！#当燃由我#。”33岁的周鹏已在CBA征战了17年，前16年一在广东队效力，本赛季加盟深圳队。他在职业生涯中获得过8届CBA总冠军（2007-08至2010-11赛季、2012-13赛季2018-19至2020-21赛季）2007年，周鹏首次入选中国国家男子篮球队。他代表国家队先后出战2届亚运会（2010年2014年）、2届亚锦赛（2013年、2015年）、1届亚洲杯（2017年）、1届世锦赛（2010年）和2届奥运会（2012年2016年），获得过1届亚运会冠军（2010年）和1届亚锦赛冠军（2015年）。值得一提的是，截至目前周鹏CBA生涯经取得559场胜利，同样是高居CBA历史第一位。";
var editObj = {
  text: edit_text,
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$(".labels_result").html(result);

var dataList = {
  code: 200,
  msg: "通用多标签识别成功",
  result: {
    text: "打了684场比赛，周鹏创造CBA历史上出场数最高纪录昨天与上海队的比赛，是深圳队老将周鹏CBA生涯的第684场比赛，他超越了前队友广东传奇名宿朱芳雨的683场纪录成为CBA历史出场数第一人！CBA官方与深圳男篮官方均发布海报给周鹏送上祝贺。CBA官方海报配文写道，“积跬步至千里！恭喜周鹏CBA联赛出场次数684场跃居历史第一！#当燃由我#。”33岁的周鹏已在CBA征战了17年，前16年一在广东队效力，本赛季加盟深圳队。他在职业生涯中获得过8届CBA总冠军（2007-08至2010-11赛季、2012-13赛季2018-19至2020-21赛季）2007年，周鹏首次入选中国国家男子篮球队。他代表国家队先后出战2届亚运会（2010年2014年）、2届亚锦赛（2013年、2015年）、1届亚洲杯（2017年）、1届世锦赛（2010年）和2届奥运会（2012年2016年），获得过1届亚运会冠军（2010年）和1届亚锦赛冠军（2015年）。值得一提的是，截至目前周鹏CBA生涯经取得559场胜利，同样是高居CBA历史第一位。",
    labels: [
      {
        label: "有夫妻共同财产",
        score: "0.7426682",
      },
    ],
  },
};

$(".labels_returnresult").html(syntaxHighlight(dataList));

$(".labels_analysis").click(function () {
  var edit_text = filterXSS(
    document.querySelector("#labels_text").value.trim()
  );
  if (edit_text) {
    var editObj = {
      text: edit_text,
    };
    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $(".labels_result").html(result);
    $("#marklayer").addClass("mark-show"); //加载状态
    $.ajax({
      method: "POST",
      headers: {
        token,
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      url: baseAPI + "/multiLabel",
      contentType: "application/json",
      dataType: "json",
      data: resultJSON,
      success: function (res) {
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          var resJSON = JSON.stringify(res);
          resObj = JSON.parse(resJSON);
          var returnresult = syntaxHighlight(resObj);
          $(".labels_returnresult").html(returnresult);

          if ($("#labels_classify .empty-text").length > 0) {
            $("#labels_classify .empty-text").each(function () {
              $(this).remove();
            });
          }

          if (res.result.length > 0) {
            $(".prompt").eq(2).addClass("hide");
            $(".prompt").eq(3).addClass("hide");
            $(".labels_table").removeClass("hide");
            $("#labels_chart").removeClass("hide");

            var analysis_list = "";
            var maxVal = resObj.result.labels[0].score;
            var maxLabel = resObj.result.labels[0].label;
            resObj.result.labels.forEach((item, index) => {
              // 分析结果为其中的最大值
              if (item.score > maxVal) {
                maxVal = item.score;
                maxLabel = item.label;
              }
              analysis_list += `<tr>
                          <td>${index + 1}</td>
                          <td>${item.label}</td>
                          <td>${item.score}</td>
                        </tr>`;
            });
            $("#labels_list").html(analysis_list);

            var label = [];
            var score = [];
            resObj.result.labels.forEach((item) => {
              var scores = item.score * 100;
              label.push(item.label);
              // score.push(Math.round((scores)));
              score.push(scores.toFixed(2));
              console.log(score);
            });
            // console.log(score)
            var e = {
              chart: {
                height: 380,
                type: "bar",
                color: "",
                toolbar: {
                  show: !1,
                },
              },
              plotOptions: {
                bar: {
                  dataLabels: {
                    position: "top",
                  },
                  columnWidth: "15%",
                },
              },
              dataLabels: {
                enabled: true, //启用数据标签，即是否直接在图标上显示数据
                formatter: function (val) {
                  return val + "%";
                },
                offsetY: -25,
                style: {
                  fontSize: "14px",
                  colors: ["#304758"],
                },
              },
              series: [
                {
                  name: "得分",
                  data: score,
                },
              ],
              xaxis: {
                categories: label,
                position: "bottom",
                labels: {
                  style: {
                    colors: ["#000", "#ff5c75"],
                    // offsetY: 18,

                    fontSize: "18px",
                    fontWeight: 500,
                  },
                },
                axisBorder: {
                  show: !1,
                },
                axisTicks: {
                  show: !1,
                },
                crosshairs: {
                  fill: {
                    type: "gradient",
                    gradient: {
                      colorFrom: "#D8E3F0",
                      colorTo: "#BED1E6",
                      stops: [0, 100],
                      opacityFrom: 0.4,
                      opacityTo: 0.5,
                    },
                  },
                },
                tooltip: {
                  enabled: !0,
                  offsetY: -35,
                },
              },
              fill: {
                gradient: {
                  enabled: !1,
                  shade: "light",
                  type: "horizontal",
                  shadeIntensity: 0.25,
                  gradientToColors: void 0,
                  inverseColors: !0,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [50, 0, 100, 100],
                  colors: ["#F44336", "#E91E63", "#9C27B0"],
                },
              },
              yaxis: {
                axisBorder: {
                  show: !1,
                },
                axisTicks: {
                  show: !1,
                },
                labels: {
                  show: !1,
                  formatter: function (e) {
                    return e + "%";
                  },
                },
              },
              title: {
                text: "分析结果：" + maxLabel,
                floating: !0,
                offsetY: 5,
                align: "top",
                style: {
                  color: "#444",
                  fontSize: "20px",
                  fontWeight: "500",
                },
              },
              grid: {
                row: {
                  colors: ["transparent", "transparent"],
                  opacity: 0.2,
                  fontSize: "18px",
                  fontWeight: 700,
                },
                borderColor: "#f1f3fa",
                yaxis: {
                  lines: {
                    show: false,
                  },
                },
              },
            };
            $("#labels_chart").html("");
            new ApexCharts(document.querySelector("#labels_chart"), e).render();
          } else {
            $("#common_classify .prompt .card-body").each(function () {
              $(this).append(
                `<div class="empty-text">返回结果为空，换段文本再试试吧</div>`
              );
            });
            $(".labels_table").addClass("hide");
            $("#labels_chart").addClass("hide");
            $(".prompt").eq(2).removeClass("hide");
            $(".prompt").eq(3).removeClass("hide");
          }
        }
      },
    });
  } else {
    $(".message-error .message_content").html("请输入文本内容");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  }
});
