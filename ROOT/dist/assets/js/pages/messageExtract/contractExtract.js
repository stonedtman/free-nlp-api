$(function () {
  // 初始化请求示例
  var contractText = $("#contract_text").val();
  let requestObj = {
    text: contractText,
  };
  let returnObj = {
    msg: "合同抽取成功",
    result: [
      {
        合同金额: [
          {
            probability: 0.6532685620340928,
            start: 314,
            end: 323,
            text: "520,665 元",
          },
        ],
        甲方开户行: [
          {
            probability: 0.7597312176461344,
            start: 710,
            end: 728,
            text: "中国建设银行股份有限公司海口国贸支行",
          },
        ],
        乙方地址: [
          {
            probability: 0.28416729014920605,
            start: 734,
            end: 748,
            text: "海口市国贸玉沙路国贸中心首层",
          },
        ],
        金额小写: [
          {
            probability: 0.9437326959528924,
            start: 329,
            end: 339,
            text: "52 万 665 元",
          },
        ],
        乙方开户行: [
          {
            probability: 0.8052491352597002,
            start: 710,
            end: 728,
            text: "中国建设银行股份有限公司海口国贸支行",
          },
        ],
        金额: [
          {
            probability: 0.46032282840388916,
            start: 314,
            end: 323,
            text: "520,665 元",
          },
        ],
        人民币: [
          {
            probability: 0.335768153923226,
            start: 453,
            end: 465,
            text: "壹拾伍万陆仟壹佰玖拾玖元",
          },
        ],
        合同期限: [
          {
            probability: 0.4545681995060562,
            start: 997,
            end: 999,
            text: "三年",
          },
        ],
        金额大写: [
          {
            probability: 0.572299609956417,
            start: 347,
            end: 360,
            text: "伍拾贰万零陆佰陆n拾伍元整",
          },
        ],
      },
    ],
    code: "200",
  };
  $("#result").html(syntaxHighlight(requestObj));
  $("#returnresult").html(syntaxHighlight(returnObj));
  var dataList = {
    msg: "合同抽取成功",
    result: [
      {
        合同金额: [
          {
            probability: 0.6532685620340928,
            start: 314,
            end: 323,
            text: "520,665 元",
          },
        ],
        甲方开户行: [
          {
            probability: 0.7597312176461344,
            start: 710,
            end: 728,
            text: "中国建设银行股份有限公司海口国贸支行",
          },
        ],
        乙方地址: [
          {
            probability: 0.28416729014920605,
            start: 734,
            end: 748,
            text: "海口市国贸玉沙路国贸中心首层",
          },
        ],
        金额小写: [
          {
            probability: 0.9437326959528924,
            start: 329,
            end: 339,
            text: "52 万 665 元",
          },
        ],
        乙方开户行: [
          {
            probability: 0.8052491352597002,
            start: 710,
            end: 728,
            text: "中国建设银行股份有限公司海口国贸支行",
          },
        ],
        金额: [
          {
            probability: 0.46032282840388916,
            start: 314,
            end: 323,
            text: "520,665 元",
          },
        ],
        人民币: [
          {
            probability: 0.335768153923226,
            start: 453,
            end: 465,
            text: "壹拾伍万陆仟壹佰玖拾玖元",
          },
        ],
        合同期限: [
          {
            probability: 0.4545681995060562,
            start: 997,
            end: 999,
            text: "三年",
          },
        ],
        金额大写: [
          {
            probability: 0.572299609956417,
            start: 347,
            end: 360,
            text: "伍拾贰万零陆佰陆n拾伍元整",
          },
        ],
      },
    ],
    code: "200",
  };

  $(".analysis_name").click(function () {
    var contractText = filterXSS($("#contract_text").val().replace(/\s*/g, ""));
    if (contractText) {
      $("#marklayer .loading").html("加 载 中 ···");
      document.querySelector("#marklayer").classList.add("mark-show");
      let requestObj = {
        text: contractText,
      };
      let resultJSON = JSON.stringify(requestObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result);
      $.ajax({
        method: "POST",
        url: baseAPI + "/extractContract",
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

            // 插入分析列表数据
            let table_data = res.result[0];
            let analysis_list = "";
            let index = 0;
            for (let item in table_data) {
              let text = [];
              table_data[item].forEach((element) => {
                text.push(element.text);
              });

              analysis_list += `<tr>
                              <td>${++index}</td>
                              <td>${item}</td>
                              <td>${text.join("，")}</td>
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
