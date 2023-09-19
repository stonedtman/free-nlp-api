$(function () {
  // 获取及渲染返回列表
  let edit_text = document.querySelector("#edit_item").value;
  let editObj = {
    text: edit_text.split(",\n"),
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
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
    getReturnResult();
  });

  function getReturnResult() {
    let edit_text = filterXSS(
      document.querySelector("#edit_item").value.replace(/\s*/g, "")
    );
    if (edit_text) {
      let editObj = {
        text: edit_text.split(",\n"),
      };
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result);

      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态

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
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $(".table-responsive").removeClass("hide");
            $("#analysis_chart").removeClass("hide");
            $(".prompt").each(function () {
              $(this).addClass("hide");
            });

            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);
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
          </tr>
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
          }
        },
        error() {
          document.querySelector("#marklayer").classList.remove("mark-show");
          $(".message-error .message_content").html("服务器繁忙，请稍后再试");
          $(".message-error").removeClass("message-hide");
          setTimeout(() => {
            $(".message-error").addClass("message-hide");
          }, 2000);
        },
      });
    } else {
      $(".message-error .message_content").html("请输入要分析的内容");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  }
});
