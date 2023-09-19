var probabilityAll = [];
$(function () {
  // 初始化请求示例
  let edit_text = document.querySelector("#edit_item").value;
  let editObj = {
    text: edit_text,
    sch: ["子公司", "母公司", "法院"],
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result);
  var returnObj = {
    msg: "事件抽取成功",
    result: [
      {
        法院: [
          {
            probability: 0.6238039223679692,
            start: 291,
            end: 303,
            text: "海南省海口市中级人民法院",
          },
          {
            probability: 0.9371569556740909,
            start: 742,
            end: 754,
            text: "海南省海口市中级人民法院",
          },
        ],
        母公司: [
          {
            probability: 0.9651490709506767,
            start: 599,
            end: 616,
            text: "深圳市物业发展（集团）股份有限公司",
          },
        ],
        子公司: [
          {
            probability: 0.8871449823017628,
            start: 185,
            end: 194,
            text: "海南新达开发总公司",
          },
          {
            probability: 0.42622746082865604,
            start: 599,
            end: 616,
            text: "深圳市物业发展（集团）股份有限公司",
          },
          {
            probability: 0.3507264208312648,
            start: 519,
            end: 526,
            text: "深物业股份公司",
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
        url: baseAPI + "/extractRelations",
        contentType: "application/json",
        dataType: "json",
        data: resultJSON,
        success: function (res) {
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");

            let strHtml = "";
            let index = 1;
            var curr = 0;
            var dataList = res.result[0];
            for (var key in dataList) {
              var texts = [];
              var probabilitys = [];
              for (let i = 0; i < dataList[key].length; i++) {
                texts.push(dataList[key][i].text);
                probabilitys.push(dataList[key][i].probability);
              }

              if (probabilitys.join(",").length > 50) {
                probabilityAll.push(probabilitys.join(","));
                curr++;
              }
              strHtml += `<tr>
            <td>${index}</td>
            <td>${key}</td>
            <td>${texts.join(",")}</td>
            <td>${
              probabilitys.join(",").length > 50
                ? `<span class='probability'>${probabilitys
                    .join(",")
                    .slice(0, 50)}</span>` +
                  `<span class='ellipsis'>...</span>` +
                  `<span class='show_all' onclick=showAll(${curr})>全部</span>` +
                  `<span class='show_part' onclick=showPart(${curr})>收起</span>`
                : `<span>${probabilitys.join(",")}</span>`
            }</td>
            </tr>`;
              index++;
            }
            $("#analysis_list").html(strHtml);

            $("#returnresult").html(syntaxHighlight(res));
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

function showAll(index) {
  $(".probability")
    .eq(index - 1)
    .html(probabilityAll[index - 1]);
  $(".ellipsis")
    .eq(index - 1)
    .css("display", "none");
  $(".show_all")
    .eq(index - 1)
    .css("display", "none");
  $(".show_part")
    .eq(index - 1)
    .css("display", "inline-block");
}

function showPart(index) {
  $(".probability")
    .eq(index - 1)
    .html(probabilityAll[index - 1].slice(0, 50));
  $(".ellipsis")
    .eq(index - 1)
    .css("display", "inline-block");
  $(".show_all")
    .eq(index - 1)
    .css("display", "inline-block");
  $(".show_part")
    .eq(index - 1)
    .css("display", "none");
}
