$(function () {
  // 初始化请求示例
  let edit_text = document.querySelector("#edit_item").value;
  let editObj = {
    text: edit_text,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result);

  var dataList = [
    {
      法院: [
        {
          probability: 0.9907652674429741,
          start: 544,
          end: 553,
          text: "湖南省高级人民法院",
        },
      ],
      案由: [
        {
          probability: 0.503562037551486,
          start: 5,
          end: 12,
          text: "侵害商标权纠纷",
        },
      ],
      开庭时间: [
        {
          probability: 0.6872715517751118,
          start: 119,
          end: 130,
          text: "2022年11月30日",
        },
      ],
      法庭: [
        {
          probability: 0.8981004343488692,
          start: 414,
          end: 418,
          text: "第三法庭",
        },
      ],
      律师: [
        {
          probability: 0.33412154016258455,
          start: 209,
          end: 212,
          text: "宋子轩",
        },
      ],
      律所: [
        {
          probability: 0.6304926975028948,
          start: 213,
          end: 223,
          text: "湖南思博达律师事务所",
        },
        {
          probability: 0.3901245461948406,
          start: 544,
          end: 553,
          text: "湖南省高级人民法院",
        },
      ],
      金额: [
        { probability: 0.9287995098381252, start: 405, end: 408, text: "10万" },
      ],
      被告: [
        {
          probability: 0.44057804913187937,
          start: 49,
          end: 62,
          text: "上海东家旺建材科技有限公司",
        },
        {
          probability: 0.4825784314571564,
          start: 507,
          end: 532,
          text: "建材科技有限公司湖南分公司（以下称东旺湖南分公司）",
        },
      ],
    },
  ];
  var strHtml = "";
  var index = 0;
  for (const item in dataList[0]) {
    // console.log(index);
    let text = "";
    dataList[0][item].forEach((element) => {
      text += element.text + "、";
    });
    if (text.length > 0) {
      text = text.substr(0, text.length - 1);
    }
    strHtml += ` <tr>
    <td>${++index}</td>
    <td>${item}</td>
    <td>${text}</td>
    <td>${dataList[0][item][0].probability}</td>
  </tr>`;
  }
  $("#analysis_list").html(strHtml);
  $("#returnresult").html(syntaxHighlight(dataList));

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
      $("#result").html(result);

      document.querySelector("#marklayer").classList.add("mark-show");

      $.ajax({
        method: "POST",
        url: baseAPI + "/extractJudgment",
        headers: {
          "secret-id": secret_id,
          "secret-key": secret_key,
        },
        contentType: "application/json",
        dataType: "json",
        data: resultJSON.replace(/\n/g, ""),
        success: function (res) {
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");

            // 转换前都要先强制成json,不然得到的JSON容易转换出错
            // JSON.stringify将对象转为JSON字符串；
            // JSON.parse将JSON字符串转为对象；
            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);

            // 插入分析列表数据
            let table_data = res.result[0];
            let analysis_list = "";
            let index = 0;
            for (let item in table_data) {
              let text = "";
              table_data[item].forEach((element) => {
                text += element.text + "、";
              });
              if (text.length > 0) {
                text = text.substr(0, text.length - 1);
              }
              analysis_list += `<tr>
                                  <td>${++index}</td>
                                  <td>${item}</td>
                                  <td>${text}</td>
                                  <td>${table_data[item][0].probability}</td>
                                </tr>`;
            }
            //   列表应该往列表后面添加元素,直接html会直接覆盖原来的
            $("#analysis_list").html(analysis_list);
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
      $(".message-error .message_content").html("请输入要抽取的内容");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  });
});
