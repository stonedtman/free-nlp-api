var probabilityAll = [];
$(function () {
  // 初始化请求示例
  let edit_text = document.querySelector("#edit_item").value;
  let extract_range = document.querySelector(".extract-range").value;
  let editObj = {
    text: edit_text,
    sch: extract_range,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result);
  $("#result").html(result);
  var returnObj = {
    msg: "自定义抽取成功",
    result: [
      {
        死亡人数: [
          {
            probability: 0.5188116157953857,
            start: 31,
            end: 34,
            text: "43人",
          },
        ],
        时间: [
          {
            probability: 0.6051178655419562,
            start: 81,
            end: 88,
            text: "当地时间周二晚",
          },
        ],
        地点: [
          {
            probability: 0.44500938794471523,
            start: 89,
            end: 99,
            text: "希腊中部城市拉里萨市",
          },
        ],
        媒体来源: [
          {
            probability: 0.4739781882696832,
            start: 5,
            end: 10,
            text: "《每日报》",
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
      document.querySelector(".extract-range").value.replace(/\s*/g, "")
    );
    if (edit_text && extract_range) {
      let editObj = {
        text: edit_text.replace(/，/g, ","),
        sch: extract_range.replace(/，/g, ","),
      };
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result);
      document.querySelector("#marklayer").classList.add("mark-show");

      $.ajax({
        method: "POST",
        url: baseAPI + "/extract",
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

            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);

            let table_data = resObj.result[0];
            let analysis_list = "";
            let index = 1;
            var curr = 0;
            for (let item in table_data) {
              var texts = [];
              var probabilitys = [];
              table_data[item].forEach((item) => {
                texts.push(item.text);
                probabilitys.push(item.probability);
              });

              if (probabilitys.join(",").length > 50) {
                probabilityAll.push(probabilitys.join(","));
                curr++;
              }

              analysis_list += `<tr>
                          <td>${index}</td>
                          <td>${item}</td>
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

            $("#analysis_list").html(analysis_list);
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
