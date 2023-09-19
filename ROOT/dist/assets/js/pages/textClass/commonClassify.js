$(function () {
  // 初始化请求示例
  let edit_text = document.querySelector("#common_text").value;
  let editObj = {
    text: edit_text,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $(".common_result").html(result);

  var dataList = [
    { score: 0.9999989698096228, label: "体育" },
    { score: 1.0301044368111695e-6, label: "游戏" },
  ];

  $(".common_returnresult").html(syntaxHighlight(dataList));

  $(".common_analysis").click(function () {
    let edit_text = filterXSS(
      document.querySelector("#common_text").value.replace(/\s*/g, "")
    );
    if (edit_text) {
      let editObj = {
        text: edit_text,
      };
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $(".common_result").html(result);
      $("#marklayer").addClass("mark-show"); //加载状态
      $.ajax({
        method: "POST",
        headers: {
          token,
          "secret-id": secret_id,
          "secret-key": secret_key,
        },
        url: baseAPI + "/classify",
        contentType: "application/json",
        dataType: "json",
        data: resultJSON,
        success: function (res) {
          $("#marklayer").removeClass("mark-show");
          if (res.code == 200) {
            $(".common_table").removeClass("hide");
            $("#common_chart").removeClass("hide");
            $(".prompt").eq(0).addClass("hide");
            $(".prompt").eq(1).addClass("hide");
            // 转换前都要先强制成json,不然得到的JSON容易转换出错
            // JSON.stringify将对象转为JSON字符串；
            // JSON.parse将JSON字符串转为对象；
            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $(".common_returnresult").html(returnresult);
            let analysis_list = "";
            let maxVal = resObj.result[0].score;
            let maxLabel = resObj.result[0].label;
            resObj.result.forEach((item, index) => {
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
            //   列表应该往列表后面添加元素,直接html会直接覆盖原来的
            $("#common_list").html(analysis_list);

            let label = [];
            let score = [];
            resObj.result.forEach((item) => {
              let scores = item.score * 100;
              label.push(item.label);
              // score.push(Math.round((scores)));
              score.push(scores.toFixed(2));
              console.log(score);
            });
            // console.log(score)
            e = {
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
            $("#common_chart").html("");
            new ApexCharts(document.querySelector("#common_chart"), e).render();
          }
        },
        error() {
          $("#marklayer").removeClass("mark-show");
          $(".message-error .message_content").html("服务器繁忙，请稍后再试");
          $(".message-error").removeClass("message-hide");
          setTimeout(() => {
            $(".message-error").addClass("message-hide");
          }, 2000);
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
});
