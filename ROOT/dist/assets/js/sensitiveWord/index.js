$("#edit_item").html(exampleList[0]);
// 初始化请求示例
var edit_text = exampleList[0];
var editObj = {
  text: edit_text,
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result);

var outputText = {
  result: [
    {
      label: "绝对用语",
      word: "最前沿(71~73),最精良(80~82),最优秀(89~91)",
    },
    {
      label: "极限并无法考证",
      word: "优秀(90~91)",
    },
    {
      label: "绝对用语",
      word: "世界级(100~102)",
    },
  ],
  msg: "违规参数返回",
  code: 200,
};
$("#returnresult").html(syntaxHighlight(outputText));

$(".analysis_name").click(function () {
  var edit_text = filterXSS(document.querySelector("#edit_item").value.trim());
  if (edit_text) {
    var editObj = {
      text: [edit_text],
    };
    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result);
    $("#marklayer").addClass("mark-show"); //加载状态

    $.ajax({
      method: "POST",
      url: baseAPI + "/censor_detection",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
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
            // 插入分析列表数据
            var table_data = res.result;
            var analysis_list = "";
            table_data.forEach((item, index) => {
              analysis_list += `<tr>
          <td>${index + 1}</td>
          <td>${item.label}</td>
          <td>${item.word}</td>
          </tr>`;
            });
            //   列表应该往列表后面添加元素,直接html会直接覆盖原来的
            $("#analysis_list").html(analysis_list);
            $("#returnresult").html(syntaxHighlight(table_data));
            $(".step_tip").css("display", "none");
            $(".prompt  .table-responsive").css("display", "block");
          } else {
            $(".prompt .card-body").append(
              `<div class="empty-text">返回结果为空，换段文本再试试吧</div>`
            );
            $(".step_tip").css("display", "none");
            $(".prompt  .table-responsive").css("display", "none");
          }
        }
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
