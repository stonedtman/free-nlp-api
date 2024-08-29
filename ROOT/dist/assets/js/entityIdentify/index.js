$(".request_address").attr("href", requestAddress + "/NER");
$(".request_address").html(requestAddress + "/NER");
var exampleList = [
  "国网宜都市供电公司共产党员服务队在公司机关开展核酸筛查志愿服务工作，供电志愿者王晓璐经培训“转岗”为核酸采样员。",
  "位于遵义高新区的贵州恒瑞印刷包装有限公司也享受到了助企纾困政策带来的红利，该公司财务经理姚林丽告诉记者，这笔延缓缴纳的税款极大地改善了公司的现金流，保障了公司的正常经营，公司未来发展前景可期。",
  "红花岗区工信局围绕新型工业化基金、工投资金、中小企业信贷通、工业转型资金等政策，对企业开展专项业务培训，结合企业的产品特性和研发方向，对企业符合申报条件的项目开展“一对一”专项辅导，提高申报获批率。",
];
$("#edit_item").val(exampleList[0]);

function pickOption() {
  var selectDom = document.querySelector(".example-list");
  var index = selectDom.selectedIndex; //获取选中项的索引
  document.querySelector("#edit_item").value = exampleList[index - 1];
}

var edit_text = document.querySelector("#edit_item").value;
var editObj = {
  text: edit_text,
  screen: [1],
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result); //请求示例

//原始数据
var dataList = [
  {
    label: "人物类_实体",
    word: " 王晓璐",
  },
];

var strHtml = "";
dataList.slice(0, 20).forEach((item, index) => {
  strHtml += `<tr>
                          <td>${++index}</td>
                          <td>${item.word}</td>
                          <td>${item.label}</td>
                          <td>1</td>
                          </tr>`;
});
$("#analysis_list").html(strHtml);

$("#returnresult").html(syntaxHighlight(dataList)); //返回示例

function pagination(arr) {
  layui.use("laypage", function () {
    var laypage = layui.laypage;

    //执行一个laypage实例
    laypage.render({
      elem: "pagination",
      count: arr.length,
      limit: 20,
      groups: 3,
      layout: ["count", "prev", "page", "next", "skip"],
      jump: function (obj) {
        var pageList = arr.slice((obj.curr - 1) * 20, obj.curr * 20);
        // 插入分析列表数据
        var analysis_list = "";
        pageList.forEach((item, index) => {
          analysis_list += `<tr>
                            <td>${index + 1}</td>
                            <td>${item.word}</td>
                            <td>${item.label}</td>
                            <td></td>
                            </tr>`;
        });
        //   列表应该往列表后面添加元素,直接html会直接覆盖原来的
        $("#analysis_list").html(analysis_list);
      },
      theme: "#5369f8",
    });
  });
}

//点击事件
$(".analysis_name").click(function () {
  var edit_text = filterXSS(document.querySelector("#edit_item").value.trim());
  if (edit_text) {
    var screen = [];
    var chooseType = [];
    if ($(".select2-selection__choice").length > 0) {
      $(".select2-selection__choice").each(function () {
        chooseType.push($(this).attr("title"));
      });
    }
    for (var i = 0; i < chooseType.length; i++) {
      $(".classify-type .option").each(function () {
        if (chooseType[i] == $(this).html()) {
          screen.push(parseInt($(this).attr("value")));
        }
      });
    }

    var editObj = {
      text: edit_text,
      screen,
    };
    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result); //请求示例
    $("#marklayer").addClass("mark-show"); //加载状态
    $.ajax({
      method: "POST",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      url: baseAPI + "/NER",
      contentType: "application/json",
      dataType: "json",
      data: resultJSON,
      success: function (res) {
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          dataList = res.data;

          var resJSON = JSON.stringify(res);
          resObj = JSON.parse(resJSON);
          var returnresult = syntaxHighlight(resObj);
          $("#returnresult").html(returnresult);

          if ($(".empty-text").length > 0) {
            $(".empty-text").each(function () {
              $(this).remove();
            });
          }

          if (res.data.length > 0) {
            $(".table-responsive").removeClass("hide");
            $(".pie_chart_container").removeClass("hide");
            $(".prompt").each(function () {
              $(this).addClass("hide");
            });

            pagination(res.data);

            var pieData = res.value; //饼图数据

            if (pieData.length > 0) {
              if ($("#pie_chart")) {
                $("#pie_chart").remove();
                $(".pie_chart_container").html(`<div id="pie_chart"></div>`);
              }

              var seriesData = [];
              var labelsData = [];
              pieData.forEach((item, index) => {
                seriesData.push(item.count);
                labelsData.push(item.label);
              });

              var e = {
                chart: {
                  height: 320,
                  type: "pie",
                },
                series: seriesData,
                labels: labelsData,
                legend: {
                  show: !0,
                  position: "bottom",
                  horizontalAlign: "center",
                  verticalAlign: "middle",
                  floating: !1,
                  fontSize: "14px",
                  offsetX: 0,
                  offsetY: -10,
                },
                responsive: [
                  {
                    breakpoint: 600,
                    options: {
                      chart: {
                        height: 240,
                      },
                      legend: {
                        show: !1,
                      },
                    },
                  },
                ],
              };
              new ApexCharts(document.querySelector("#pie_chart"), e).render();
            }
          } else {
            $(".prompt").each(function () {
              $(this).append(
                `<div class="empty-text">返回结果为空，换段文本再试试吧</div>`
              );
            });
            $(".table-responsive").addClass("hide");
            $(".pie_chart_container").addClass("hide");
            $(".prompt").each(function () {
              $(this).removeClass("hide");
            });
          }
        }
      },
    });
  } else {
    $(".message-error .message_content").html("请输入要识别的内容");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  }
});
