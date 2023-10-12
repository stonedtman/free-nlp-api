var absrtactPercent = 2;
function changePercent() {
  var selectDom = document.querySelector(".absrtact-percent");
  var index = selectDom.selectedIndex; //获取选中项的索引
  absrtactPercent = JSON.parse(
    document.querySelectorAll(".absrtact-percent option")[index].value
  );
  //   console.log(absrtactPercent);
}
$(function () {
  let edit_text = document.querySelector("#edit_item").value;
  let editObj = {
    text: edit_text,
    // percent: 2,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result); //请求示例

  var dataList = {
    msg: "自动摘要抽取成功",
    results: {
      summary: [
        "继前不久始于中国的召回风波，宝马因为车辆的发动机螺栓故障，在全球范围将召回48.9万辆车，在原有中国召回的基础上数量进一步增加。Santer说，凭借剩余的动力，车辆仍旧可以坚持到最近的修理厂。",
      ],
    },
    status: "000",
  };

  $("#returnresult").html(syntaxHighlight(dataList)); //返回示例

  //点击事件
  $(".analysis_name").click(function () {
    let edit_text = filterXSS(
      document.querySelector("#edit_item").value.replace(/\s*/g, "")
    );
    if (edit_text) {
      let editObj = {
        text: edit_text,
        // percent: absrtactPercent,
      };
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result); //请求示例
      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
      $.ajax({
        method: "POST",
        headers: {
          "secret-id": secret_id,
          "secret-key": secret_key,
        },
        url: baseAPI + "/summary",
        contentType: "application/json",
        dataType: "json",
        data: resultJSON,
        success: function (res) {
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $(".analysis_info").removeClass("hide");
            $(".prompt").addClass("hide");
            // console.log(res);
            var strHtml = "";
            res.results.summary.forEach((item, idnex) => {
              strHtml += item + "\n";
              // strHtml += JSON.parse(item);
            });
            console.log(strHtml);
            document.querySelector(".analysis_result").innerHTML = strHtml;

            // 转换前都要先强制成json,不然得到的JSON容易转换出错
            // JSON.stringify将对象转为JSON字符串；
            // JSON.parse将JSON字符串转为对象；
            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);
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
});
