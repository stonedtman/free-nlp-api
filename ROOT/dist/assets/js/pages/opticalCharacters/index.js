$(function () {
  // 初始化请求示例
  let resultJSON = '{"images":"上传的图片"}';
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result);

  var analysisBtn = document.querySelector(".analysis_name");

  analysisBtn.onclick = function () {
    var uploadFile = document.querySelector(".fileUpload");
    var file = uploadFile.files[0]; //文件

    if (!isUpload) {
      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
      setTimeout(() => {
        document.querySelector("#marklayer").classList.remove("mark-show");
        $(".step_tip").eq(current).addClass("hide_result");
        $(".analysis_online").eq(current).removeClass("hide_result");
        showResult(current);
      }, 1000);
      return;
    }
    if (file) {
      var size = file.size / 1024 / 1024;
      if (size < 10) {
        document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
        var formData = new FormData();
        formData.append("images", file);
        $.ajax({
          method: "POST",
          headers: {
            "secret-id": secret_id,
            "secret-key": secret_key,
          },
          url: baseAPI + "/ocr",
          data: formData,
          contentType: false,
          processData: false,
          success: function (res) {
            document.querySelector("#marklayer").classList.remove("mark-show");
            if (res.code == 200) {
              // console.log(res);

              $(".step_tip").eq(current).addClass("hide_result");
              $(".analysis_online").eq(current).removeClass("hide_result");
              // 转换前都要先强制成json,不然得到的JSON容易转换出错
              // JSON.stringify将对象转为JSON字符串；
              // JSON.parse将JSON字符串转为对象；
              let resJSON = JSON.stringify(res);
              resObj = JSON.parse(resJSON);
              let returnresult = syntaxHighlight(resObj);

              document.querySelectorAll("#analysis_online")[current].innerHTML =
                textextraction(res.results[0].data);
              $("#returnresult").html(returnresult);
            }
          },
        });
      }
    } else {
      setTimeout(() => {
        document.querySelector("#marklayer").classList.remove("mark-show");
      }, 1000);
    }
  };
});
