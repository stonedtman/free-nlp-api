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
      项目名称: [
        {
          probability: 0.8477214762000642,
          start: 35,
          end: 58,
          text: "中山市东凤镇综合治理办公室法律服务定点采购项目",
        },
      ],
      中标金额: [
        {
          probability: 0.8117791580834819,
          start: 264,
          end: 269,
          text: "5000元",
        },
      ],
      招标单位: [
        {
          probability: 0.8070745164854287,
          start: 222,
          end: 238,
          text: "广东省中山市东凤镇综合治理办公室",
        },
      ],
      成交日期: [
        {
          probability: 0.7073785503403087,
          start: 85,
          end: 104,
          text: "2022-11-01 11:56:14",
        },
      ],
      项目编号: [
        {
          probability: 0.9005196739557846,
          start: 64,
          end: 80,
          text: "DDYJ-2022-609895",
        },
      ],
      发布日期: [
        {
          probability: 0.4906463320801606,
          start: 85,
          end: 104,
          text: "2022-11-01 11:56:14",
        },
      ],
      招标编号: [
        {
          probability: 0.7841685100515967,
          start: 64,
          end: 80,
          text: "DDYJ-2022-609895",
        },
      ],
      截止日期: [
        {
          probability: 0.7849776198484264,
          start: 85,
          end: 104,
          text: "2022-11-01 11:56:14",
        },
      ],
      招标人: [
        {
          probability: 0.3947604569889762,
          start: 222,
          end: 238,
          text: "广东省中山市东凤镇综合治理办公室",
        },
      ],
      供应商: [
        {
          probability: 0.9369992643001943,
          start: 130,
          end: 144,
          text: "南京市涌亿思信息技术有限公司",
        },
      ],
      中标公司: [
        {
          probability: 0.5879377082028441,
          start: 130,
          end: 144,
          text: "南京市涌亿思信息技术有限公司",
        },
      ],
      采购代理机构: [
        {
          probability: 0.9746337979488544,
          start: 277,
          end: 289,
          text: "福建恒益项目管理有限公司",
        },
      ],
      采购单位: [
        {
          probability: 0.5630423219730467,
          start: 130,
          end: 144,
          text: "南京市涌亿思信息技术有限公司",
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
    strHtml += `<tr>
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
        url: baseAPI + "/extractBidding",
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
