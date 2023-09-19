$(function () {
  let edit_text = document.querySelector("#translate_data").value;
  let editObj = {
    text: edit_text,
    src_lang: "zh",
    des_lang: "en",
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result); //请求示例

  var dataList = {
    msg: "机器翻译成功",
    code: "200",
    results: {
      translate:
        "Xinhua Communications Agency generally refers to Xinhua Communications Agency. Xinhua Communications Agency, abbreviated as Xinhua Communications Agency, is China's national communications agency and worldwide communications agency. Current president Fouaoui, editor-in-chief Liu Yuan. The predecessor of Xinhua Communications Agency was the Red Chinese Communications Agency (abbreviated as Red China) founded in Jiangsu, Jiangsu, Jiangsu, in January 1937.",
    },
  };

  $("#returnresult").html(syntaxHighlight(dataList)); //返回示例

  //点击事件
  $(".translate_btn").click(function () {
    let edit_text = filterXSS(document.querySelector("#translate_data").value);

    if (edit_text) {
      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态

      let editObj = {
        text: edit_text,
        src_lang: src_lang,
        des_lang: des_lang,
      };

      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result); //请求示例

      $.ajax({
        method: "POST",
        url: baseAPI + "/translation",
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
            var obj = res;
            obj.results.translate.replace("'", "'"); //转义
            res = obj;

            $("#translate_result").val(res.results.translate);

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
      $(".message-error .message_content").html("请输入要翻译的内容");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  });
});
