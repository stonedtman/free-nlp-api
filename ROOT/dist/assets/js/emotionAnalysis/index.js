$(".request_address").attr("href", requestAddress + "/sentiment");
$(".request_address").html(requestAddress + "/sentiment");

var exampleList = [
  "我觉得挺感动。她是一个那么坚强的人，独自一个人撑起了整个家庭，非常佩服。",
  "我很喜欢这里，风景如画，空气清新，大家都很友善，这里简直就是个世外桃源。",
  "时至今日，一切都是她咎由自取，自作孽不可活！她缺少对他人的关爱，沉浸在自己的世界里，我不喜欢她!",
  "他阴险狡诈，从不反省自己做下的恶行，是个十恶不赦的大恶魔！",
  "我在2018年4月份我从北京买了一张火车票来到了合肥这座城市。",
];
$("#edit_item").val(exampleList[0]);

function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  document.querySelector("#edit_item").value = exampleList[index - 1];
}

// 获取及渲染返回列表
var edit_text = document.querySelector("#edit_item").value;
var editObj = {
  text: edit_text.split(",\n"),
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result);

var dataList = [
  {
    msg: "情感分析成功",
    results: {
      negative_probs: 0.006020665168762207,
      sentiment_key: "positive",
      text: "我觉得挺感动。她是一个那么坚强的人，独自一个人撑起了整个家庭，非常佩服。",
      positive_probs: 0.9939793348312378,
    },
    code: "200",
  },
];
$("#returnresult").html(syntaxHighlight(dataList));

$(".analysis_name").click(function () {
  var edit_text = filterXSS(document.querySelector("#edit_item").value.trim());
  if (edit_text) {
    var editObj = {
      text: edit_text.split(",\n"),
    };
    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result);

    $("#marklayer").addClass("mark-show"); //加载状态

    $.ajax({
      method: "POST",
      url: baseAPI + "/sentiment",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      contentType: "application/json",
      dataType: "json",
      data: resultJSON,
      success: function (res) {
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          var resJSON = JSON.stringify(res);
          resObj = JSON.parse(resJSON);
          var returnresult = syntaxHighlight(resObj);
          $("#returnresult").html(returnresult);

          if ($(".empty-text").length > 0) {
            $(".empty-text").each(function () {
              $(this).remove();
            });
          }

          if (Object.keys(res.results).length > 0) {
            $(".table-responsive").removeClass("hide");
            $("#analysis_chart").removeClass("hide");
            $(".prompt").each(function () {
              $(this).addClass("hide");
            });

            var table_list = res.results;
            var strHtml = `<tr>
              <td>1</td>
              <td>积极</td></td>
              <td>${table_list.positive_probs}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>消极</td>
              <td>${table_list.negative_probs}</td>
            </tr>`;
            $("#analysis_list").html(strHtml);

            var analysisResult =
              table_list.sentiment_key == "positive"
                ? "积极"
                : table_list.sentiment_key == "negative"
                ? "消极"
                : "中性";

            var r = {
              plotOptions: {
                pie: {
                  donut: {
                    size: "60%",
                  },
                  expandOnClick: true,
                },
              },
              chart: {
                height: 298,
                type: "donut",
              },
              legend: {
                show: !0,
                // position: "right",
                // horizontalAlign: "left",
                offsetX: 100,
                itemMargin: {
                  horizontal: 6,
                  vertical: 3,
                },
              },
              series: [table_list.positive_probs, table_list.negative_probs],
              labels: ["积极", "消极"],
              colors: ["#00e295", "#ff5c75"],
              title: {
                text: "分析结果：" + analysisResult,
                floating: !1,
                offsetX: -40,
                offsetY: 10,
                align: "top",
                style: {
                  color: "#444",
                  fontSize: "20px",
                  fontWeight: "500",
                },
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
              tooltip: {
                y: {
                  formatter: function (t) {
                    return t + "%";
                  },
                },
              },
            };
            $("#analysis_chart").html("");
            new ApexCharts(
              document.querySelector("#analysis_chart"),
              r
            ).render();
            $(".emotional_analysis_chart").css("display", "block");
          } else {
            $(".prompt").each(function () {
              $(this)
                .find(".card-body")
                .append(
                  `<div class="empty-text">返回结果为空，换段文本再试试吧</div>`
                );
            });
            $(".table-responsive").addClass("hide");
            $("#analysis_chart").addClass("hide");
            $(".prompt").each(function () {
              $(this).removeClass("hide");
            });
          }
        }
      },
    });
  } else {
    $(".message-error .message_content").html("请输入要分析的内容");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  }
});
