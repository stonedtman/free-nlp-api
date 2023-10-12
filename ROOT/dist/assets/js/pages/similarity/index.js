$(function () {
  var dataList = {
    msg: "相似度查找抽取成功",
    results: [
      {
        similarity: 0.9516613,
        text: "新冠感染调为“乙类乙管”,“乙”代表什么?甲乙有何区别?",
      },
      {
        similarity: 0.62174785,
        text: "明确,自2023年1月8日起,对新型冠状病毒感染实施“乙类乙管”",
      },
      {
        similarity: 0.81027246,
        text: "重大调整!新冠病毒感染将由“乙类甲管”调整为“乙类乙管”",
      },
      {
        similarity: 0.6457523,
        text: "2023年1月8日起,新型冠状病毒感染实施“乙类乙管”",
      },
      {
        similarity: 0.78061324,
        text: "新冠从“乙类甲管”调整为“乙类乙管”主要依据是什么？",
      },
    ],
    status: "000",
  };

  let edit_text = document.querySelector("#write_item").value;
  let compare_text = document.querySelector("#edit_item").value.split("\n");

  let editObj = {
    text: edit_text,
    compare: compare_text,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result);
  $("#returnresult").html(syntaxHighlight(dataList));

  //点击事件
  $(".analysis_name").click(function () {
    let edit_text = filterXSS(
      document.querySelector("#write_item").value.replace(/\s*/g, "")
    );
    let compare_text = filterXSS(
      document.querySelector("#edit_item").value
    ).split("\n");
    if (edit_text && compare_text) {
      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
      let editObj = {
        text: edit_text,
        compare: compare_text,
      };
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result); //请求示例

      $.ajax({
        method: "POST",
        headers: {
          "secret-id": secret_id,
          "secret-key": secret_key,
        },
        url: baseAPI + "/similarity",
        contentType: "application/json",
        dataType: "json",
        data: resultJSON,
        success: function (res) {
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");

            var strHtml = "";
            res.results.forEach((item, index) => {
              strHtml += `<tr>
                  <td>${index + 1}</td>
                  <td>${item.text}</td>
                  <td>${item.similarity}</td>
                  </tr>`;
            });
            $("#analysis_list").html(strHtml);

            $("#returnresult").html(syntaxHighlight(res));
          }
        },
      });
    } else if (!edit_text && !compare_text) {
      $(".message-error .message_content").html("请输入要对比的文本和比对内容");
      $("#changePassword").modal("hide");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    } else if (!edit_text) {
      $(".message-error .message_content").html("请输入要对比的文本");
      $("#changePassword").modal("hide");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    } else if (!compare_text) {
      $(".message-error .message_content").html("请输入比对内容");
      $("#changePassword").modal("hide");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  });
});
