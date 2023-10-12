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
      label: "组织机构类_企事业单位",
      word: "国网宜都市供电公司",
    },
    {
      label: "人物类_概念",
      word: " 共产党员",
    },
    {
      label: "组织机构类_概念",
      word: " 服务队",
    },
    {
      label: "组织机构类_企事业单位_概念",
      word: " 公司",
    },
    {
      label: "组织机构类_国家机关_概念",
      word: " 机关",
    },
    {
      label: "场景事件",
      word: " 开展",
    },
    {
      label: "物体类",
      word: " 核酸",
    },
    {
      label: "场景事件",
      word: " 筛查",
    },
    {
      label: "场景事件",
      word: " 工作",
    },
    {
      label: "场景事件",
      word: " 供电",
    },
    {
      label: "人物类_概念",
      word: " 志愿者",
    },
    {
      label: "人物类_实体",
      word: " 王晓璐",
    },
    {
      label: "场景事件",
      word: " 培训",
    },
    {
      label: "场景事件",
      word: " 转岗",
    },
    {
      label: "物体类",
      word: " 核酸",
    },
    {
      label: "人物类_概念",
      word: " 采样员",
    },
  ];
  var strHtml = "";
  dataList.slice(0, 20).forEach((item, index) => {
    strHtml += `<tr>
                          <td>${++index}</td>
                          <td>${item.word}</td>
                          </td>
                          <td>${item.label}</td>
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
          let analysis_list = "";
          pageList.forEach((item, index) => {
            analysis_list += `<tr>
                            <td>${index + 1}</td>
                            <td>${item.word}</td>
                            <td>${item.label}</td>
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
      document.querySelector("#edit_item").value.replace(/\s*/g, "")
    );
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
        url: baseAPI + "/NER",
        contentType: "application/json",
        dataType: "json",
        data: resultJSON,
        success: function (res) {
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $(".table-responsive").removeClass("hide");
            $("#pie_chart").removeClass("hide");
            $(".prompt").each(function () {
              $(this).addClass("hide");
            });

            dataList = res.data;

            // 转换前都要先强制成json,不然得到的JSON容易转换出错
            // JSON.stringify将对象转为JSON字符串；
            // JSON.parse将JSON字符串转为对象；
            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);

            pagination(res.data);

            var pieData = res.value; //饼图数据
            var seriesData = [];
            var labelsData = [];
            pieData.forEach((item, index) => {
              seriesData.push(item.count);
              labelsData.push(item.label);
            });
            e = {
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
            document.querySelector("#pie_chart").innerHTML = "";
            new ApexCharts(document.querySelector("#pie_chart"), e).render();
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
