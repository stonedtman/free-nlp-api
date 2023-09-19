$(function () {
  $("#edit_item").html(exampleList[0]);
  // 初始化请求示例
  let edit_text = exampleList[0];
  let editObj = {
    text: edit_text,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
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
    let edit_text = filterXSS(
      document.querySelector("#edit_item").value.replace(/\s*/g, "")
    );
    if (edit_text) {
      let editObj = {
        text: [edit_text],
      };
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result);
      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态

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
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);
            console.log(res.result);
            // 插入分析列表数据
            let table_data = res.result;
            let analysis_list = "";
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
            $(".table-responsive").css("display", "block");
          }
        },
        error() {
          document.querySelector("#marklayer").classList.remove("mark-show");
          document
            .querySelector(".message-error")
            .classList.remove("message-hide");
          setTimeout(() => {
            document
              .querySelector(".message-error")
              .classList.add("message-hide");
          }, 2000);
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
});
