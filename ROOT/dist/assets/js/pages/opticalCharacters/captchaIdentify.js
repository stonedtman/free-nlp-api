$(function () {
  // 初始化请求示例
  let requestObj = { images: "上传的图片" };
  let returnObj = {
    msg: "光学字符抽取成功",
    results: {
      text: "识别验证码后的文本",
    },
    code: "200",
  };

  $("#result").html(syntaxHighlight(requestObj));
  $("#returnresult").html(syntaxHighlight(returnObj));

  $(".analysis_name").click(function () {
    if (!isUserupload) {
      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
      setTimeout(() => {
        document.querySelector("#marklayer").classList.remove("mark-show");
        $(".operate_tip").addClass("hide");
        $(".identify_result").removeClass("hide");
        var selectCheckbox = []; //选中的验证码的索引
        checkboxValue.forEach((item, index) => {
          if (item == true) {
            selectCheckbox.push(index);
          }
        });
        var captchaList = []; //选中的验证码识别后的结果
        selectCheckbox.forEach((item) => {
          captchaList.push(captchaTexts[item]);
        });
        renderResult(captchaList, 4);
      }, 1000);
    } else {
      var uploadFile = document.querySelector("#upload_file");
      var file = uploadFile.files[0]; //文件
      if (file) {
        var size = file.size / 1024 / 1024;
        if (size < 10) {
          document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
          $(".identify_result").html("");
          var uploadFile = document.querySelector("#upload_file");
          var file = uploadFile.files[0]; //文件
          var formData = new FormData();
          formData.append("images", file);
          $.ajax({
            method: "POST",
            headers: {
              "secret-id": secret_id,
              "secret-key": secret_key,
            },
            url: baseAPI + "/captcha",
            data: formData,
            contentType: false,
            processData: false,
            success: function (res) {
              document
                .querySelector("#marklayer")
                .classList.remove("mark-show");
              if (res.code == 200) {
                // console.log(res);

                $(".operate_tip").addClass("hide");
                $(".identify_result").removeClass("hide");
                var resultText = [];
                resultText.push(res.results.text);
                renderResult(resultText, 4);
                $("#returnresult").html(syntaxHighlight(res));
              }
            },
          });
        }
      }
    }
  });
});
