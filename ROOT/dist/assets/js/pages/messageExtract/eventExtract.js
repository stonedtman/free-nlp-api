$(function () {
  // 初始化请求示例
  let edit_text = document.querySelector("#edit_item").value;
  let editObj = {
    text: edit_text,
    sch: ["地震强度", "时间", "震中位置", "震源深度"],
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
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
    let edit_text = filterXSS(
      document.querySelector("#edit_item").value.replace(/\s*/g, "")
    );
    let extract_range = filterXSS(
      $(".extract_range").val().replace("，", ",").replace(/\s*/g, "")
    );
    if (edit_text && extract_range) {
      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
      let editObj = {
        text: edit_text,
        sch: extract_range.split(","),
      };
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
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
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");

            $("#returnresult").html(syntaxHighlight(res));
            let strHtml = "";
            let index = 1;
            var dataList = res.result[0];
            for (var key in dataList) {
              var texts = [];
              var probabilitys = [];
              for (let i = 0; i < dataList[key].length; i++) {
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
});
