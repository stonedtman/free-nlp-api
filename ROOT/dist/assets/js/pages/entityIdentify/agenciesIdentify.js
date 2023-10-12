// 初始化请求示例
$(function () {
  let edit_text = document.querySelector("#edit_item").value;
  let editObj = {
    text: edit_text,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result); //请求示例

  //原始数据
  var dataList = [
    {
      label: "bank",
      word: "民生银行",
      count: 2,
    },
    {
      label: "unicorn",
      word: "积塔半导体",
      count: 1,
    },
    {
      label: "IPO_CN",
      word: "复星医药",
      count: 1,
    },
    {
      label: "GOV_Dept",
      word: "银保监会",
      count: 1,
    },
  ];

  $("#returnresult").html(syntaxHighlight(dataList)); //返回示例

  function pagination(arr) {
    layui.use("laypage", function () {
      var laypage = layui.laypage;

      //执行一个laypage实例
      laypage.render({
        elem: "pagination",
        count: arr.length,
        limit: 10,
        groups: 3,
        layout: ["count", "prev", "page", "next", "skip"],
        jump: function (obj) {
          var pageList = arr.slice((obj.curr - 1) * 10, obj.curr * 10);
          // 插入分析列表数据
          let analysis_list = "";
          pageList.forEach((item, index) => {
            analysis_list += `<tr>
            <td>${index + 1}</td>
            <td>${item.label}</td>
            <td>${item.word}</td>
            <td>${item.count}</td>
            </tr>`;
          });
          //   列表应该往列表后面添加元素,直接html会直接覆盖原来的
          $("#analysis_list").html(analysis_list);
        },
        theme: "#5369f8",
      });
    });
  }
  pagination(dataList);

  //点击事件
  $(".analysis_name").click(function () {
    let edit_text = filterXSS(
      document.querySelector("#edit_item").value
    ).replace(/\s*/g, "");
    if (edit_text) {
      let editObj = {
        text: edit_text,
      };
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result); //请求示例
      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
      $.ajax({
        method: "POST",
        headers: {
          "secret-id": secret_id,
          "secret-key": secret_key,
        },
        url: baseAPI + "/NER_ORG",
        contentType: "application/json",
        dataType: "json",
        data: resultJSON,
        success: function (res) {
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $(".table-responsive").removeClass("hide");
            $("#cylindrical_chart").removeClass("hide");
            $(".prompt").each(function () {
              $(this).addClass("hide");
            });

            dataList = res;
            // 转换前都要先强制成json,不然得到的JSON容易转换出错
            // JSON.stringify将对象转为JSON字符串；
            // JSON.parse将JSON字符串转为对象；
            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);

            pagination(res.results); //渲染表格数据

            var countData = [];
            var wordData = [];
            res.results.slice(0, 5).forEach((item, index) => {
              countData.push(item.count);
              wordData.push(item.word);
            });

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
                  return val;
                },
                offsetY: -25,
                style: {
                  fontSize: "14px",
                  colors: ["#304758"],
                },
              },
              series: [
                {
                  name: "词频",
                  data: countData,
                },
              ],
              xaxis: {
                categories: wordData,
                position: "bottom",
                labels: {
                  style: {
                    colors: ["#000", "#ff5c75"],
                    // offsetY: 18,

                    fontSize: "13px",
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
                    return e;
                  },
                },
              },
              title: {
                text: "",
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
            document.querySelector("#cylindrical_chart").innerHTML = "";
            new ApexCharts(
              document.querySelector("#cylindrical_chart"),
              e
            ).render();
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
});
