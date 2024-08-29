$(".request_address").attr("href", requestAddress + "/extractBidding");
$(".request_address").html(requestAddress + "/extractBidding");
var exampleList = [
  "酉阳分公司乡村振兴局政务云资源服务采购单一来源采购公示\n\n酉阳分公司乡村振兴局政务云资源服务采购采购人为中国电信股份有限公司酉阳分公司，项目资金已落实，现已具备采购条件，拟采取单一来源方式采购，现进行公示。\n\n一、 采购内容\n技术服务。\n\n二、 单一来源采购原因\nDICT项目中已确定供应来源的产品或服务\n\n三、 中标供应商\n华为软件技术有限公司，中标价 38.76万\n\n四、 公示媒介和期限\n本公示仅在中国电信阳光采购网（https://caigou.chinatelecom.com.cn/ctsc-portal/ctscPortal）上发布，其他媒介转载无效。公示期自2024年2月24日至2024年2月28日，共5天。\n\n五、 联系方式\n项目联系人和联系方式:裴老师，19142300610\n异议联系人和联系方式:席老师，18996969678\n异议接收邮箱：19142300610@189.cn\n公示期间，如果对本项目采购内容、拟采用的采购方式和供应商选择等有异议或质疑，应以书面形式通过异议接收邮箱实名提出。\n采购人：中国电信股份有限公司酉阳分公司\n\n日期：2024年2月23日",
  "一、项目情况\n项目名称：中国银行股份有限公司江苏省分行2022年舆情数据服务采购项目\n项目编号：JSTCC2200514695\n项目金额：18万\n采购人：中国银行股份有限公司江苏省分行\n采购代理机构：江苏省招标中心有限公司\n二、成交供应商候选人\n中标公司：上海安硕信息技术股份有限公司\n三、联系方式\n采购代理机构：江苏省招标中心有限公司\n地    址：南京市鼓楼区郑和中路118号\n联 系 人：徐悦  叶逢春\n电  话：025-83240905 13584060515\n电子函件：yefc@jitc.cn\n江苏省招标中心有限公司\n2023年1月9日",
];

$("#edit_item").val(exampleList[0]);

function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  document.querySelector("#edit_item").value = exampleList[index - 1];
}

var edit_text = document.querySelector("#edit_item").value;
var editObj = {
  text: edit_text,
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result);

var dataList = {
  msg: "招投标抽取成功",
  result: [
    {
      项目名称: [
        {
          probability: 0.6264013206050834,
          start: 32,
          end: 46,
          text: "乡村振兴局政务云资源服务采购",
        },
      ],
      项目联系人: [
        {
          probability: 0.9998823435681352,
          start: 311,
          end: 314,
          text: "裴老师",
        },
      ],
      中标金额: [
        {
          probability: 0.9957386794103513,
          start: 163,
          end: 169,
          text: "38.76万",
        },
      ],
      项目联系人电话号码: [
        {
          probability: 0.9999357472218726,
          start: 315,
          end: 326,
          text: "19142300610",
        },
      ],
      标讯发布时间: [
        {
          probability: 0.9999746085762418,
          start: 456,
          end: 466,
          text: "2024年2月23日",
        },
      ],
      项目范围: [
        {
          probability: 0.5452582810206081,
          start: 32,
          end: 46,
          text: "乡村振兴局政务云资源服务采购",
        },
        {
          probability: 0.9099457327707157,
          start: 5,
          end: 19,
          text: "乡村振兴局政务云资源服务采购",
        },
      ],
      中标单位名称: [
        {
          probability: 0.9961169092842503,
          start: 149,
          end: 159,
          text: "华为软件技术有限公司",
        },
      ],
      采购单位: [
        {
          probability: 0.9991907917928557,
          start: 50,
          end: 65,
          text: "中国电信股份有限公司酉阳分公司",
        },
        {
          probability: 0.9998244121523214,
          start: 438,
          end: 453,
          text: "中国电信股份有限公司酉阳分公司",
        },
      ],
    },
  ],
  code: "200",
};
var strHtml = "";
var index = 0;
for (const item in dataList[0]) {
  // console.log(index);
  var text = "";
  dataList[0][item].forEach((element) => {
    text += element.text + "、";
  });
  if (text.length > 0) {
    text = text.substring(0, text.length - 1);
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
  var edit_text = filterXSS(document.querySelector("#edit_item").value.trim());
  if (edit_text) {
    var editObj = {
      text: edit_text,
    };
    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result);
    $("#marklayer").addClass("mark-show");

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
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          var resJSON = JSON.stringify(res);
          resObj = JSON.parse(resJSON);
          var returnresult = syntaxHighlight(resObj);
          $("#returnresult").html(returnresult);

          if ($(".empty-text").length > 0) {
            $(".empty-text").remove();
          }

          if (res.result.length > 0) {
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");

            // 插入分析列表数据
            var table_data = res.result[0];
            var analysis_list = "";
            var index = 0;
            for (var item in table_data) {
              var text = "";
              table_data[item].forEach((element) => {
                text += element.text + "、";
              });
              if (text.length > 0) {
                text = text.substring(0, text.length - 1);
              }
              analysis_list += `<tr>
                          <td>${++index}</td>
                          <td>${item}</td>
                          <td>${text}</td>
                          <td>${table_data[item][0].probability}</td>
                        </tr>`;
            }
            $("#analysis_list").html(analysis_list);
          } else {
            $(".prompt .card-body").append(
              `<div class="empty-text">返回结果为空，换段文本再试试吧</div>`
            );
            $(".table-responsive").addClass("hide");
            $(".prompt").removeClass("hide");
          }
        }
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
