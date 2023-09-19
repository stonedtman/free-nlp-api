$(function () {
  let edit_text = document.querySelector("#edit_item").value;
  let editObj = {
    text: edit_text,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result); //请求示例

  var dataList = {
    msg: "主题抽取成功",
    results: ["94元血氧仪涨到299元? 鱼跃医疗已给出回应"],
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
        url: baseAPI + "/topic",
        contentType: "application/json",
        dataType: "json",
        data: resultJSON,
        success: function (res) {
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");
            // console.log(res);
            if (res.results.length > 0) {
              var str = `<tr>
          <td>1</td>
          <td>${res.results[0]}</td>
          <td>0.9232456</td>
        </tr>`;
              $("#analysis_list").html(str);
            } else {
              $("#analysis_list").html(" ");
            }

            // 转换前都要先强制成json,不然得到的JSON容易转换出错
            // JSON.stringify将对象转为JSON字符串；
            // JSON.parse将JSON字符串转为对象；
            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);
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
      $(".message-error .message_content").html("请输入文本内容");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  });
});
