$(".request_address").attr("href", requestAddress + "/extractEvent");
$(".request_address").html(requestAddress + "/extractEvent");

var exampleList = [
  "中国地震台网正式测定：5月16日06时08分在云南临沧市凤庆县(北纬24.34度，东经99.98度)发生3.5级地震，震源深度10千米。",
  "历经4小时51分钟的体力、意志力鏖战，北京时间9月9日上午纳达尔在亚瑟·阿什球场，以7比5、6比3、5比7、4比6和6比4击败赛会5号种子俄罗斯球员梅德韦杰夫，夺得了2019年美国网球公开赛男单冠军。",
];

var extractRange = [
  "地震强度,时间,震中位置,震源深度",
  "赛事名称,时间,胜者,败者",
];

var current = 0;
$(".extract_range").val(extractRange[current]);
$("#edit_item").val(exampleList[current]);

function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  document.querySelector("#edit_item").value = exampleList[index - 1];
  document.querySelector(".extract_range").value = extractRange[index - 1];
  current = index - 1;
}

var edit_text = document.querySelector("#edit_item").value;
var editObj = {
  text: edit_text,
  sch: ["地震强度", "时间", "震中位置", "震源深度"],
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result);
var returnObj = {
  msg: "事件抽取成功",
  result: [
    {
      震中位置: [
        {
          probability: 0.7686418395094776,
          start: 23,
          end: 50,
          text: "云南临沧市凤庆县(北纬24.34度，东经99.98度)",
        },
      ],
      时间: [
        {
          probability: 0.9866834978522263,
          start: 11,
          end: 22,
          text: "5月16日06时08分",
        },
      ],
      地震强度: [
        {
          probability: 0.9967001842143972,
          start: 52,
          end: 56,
          text: "3.5级",
        },
      ],
      震源深度: [
        {
          probability: 0.9899566416551231,
          start: 63,
          end: 67,
          text: "10千米",
        },
      ],
    },
  ],
  code: "200",
};
$("#returnresult").html(syntaxHighlight(returnObj));

$(".analysis_name").click(function () {
  var edit_text = filterXSS(document.querySelector("#edit_item").value.trim());
  var extract_range = filterXSS(
    $(".extract_range").val().replace("，", ",").trim()
  );
  if (edit_text && extract_range) {
    $("#marklayer").addClass("mark-show"); //加载状态
    var editObj = {
      text: edit_text,
      sch: extract_range.split(","),
    };
    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result);

    $.ajax({
      method: "POST",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      url: baseAPI + "/extractEvent",
      contentType: "application/json",
      dataType: "json",
      data: resultJSON,
      success: function (res) {
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          $("#returnresult").html(syntaxHighlight(res));

          if ($(".empty-text").length > 0) {
            $(".empty-text").remove();
          }

          if (res.result.length > 0) {
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");

            var strHtml = "";
            var index = 1;
            var dataList = res.result[0];
            for (var key in dataList) {
              var texts = [];
              var probabilitys = [];
              for (var i = 0; i < dataList[key].length; i++) {
                texts.push(dataList[key][i].text);
                probabilitys.push(dataList[key][i].probability);
              }
              strHtml += `<tr>
              <td>${index}</td>
              <td>${key}</td>
              <td>${texts.join(",")}</td>
            <td>${probabilitys.join(",")}</td>
              </tr>`;
              index++;
            }
            $("#analysis_list").html(strHtml);
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
  } else if (!edit_text && !extract_range) {
    $(".message-error .message_content").html("请先输入抽取范围和内容");
    $("#changePassword").modal("hide");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  } else if (!edit_text) {
    $(".message-error .message_content").html("请先输入抽取内容");
    $("#changePassword").modal("hide");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  } else if (!extract_range) {
    $(".message-error .message_content").html("请先输入抽取范围");
    $("#changePassword").modal("hide");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  }
});
