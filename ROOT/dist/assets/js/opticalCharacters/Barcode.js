$(function () {
  let editObj = {
    images: "上传的图片",
  };
  let result = syntaxHighlight(editObj);
  $("#result").html(result); //请求示例

  var dataList = {
    msg: "扫描成功",
    result: "8986112115733660735",
    code: 200,
  };

  $("#returnresult").html(syntaxHighlight(dataList)); //返回示例

  //点击事件
  $(".analysis_name").click(function () {
    if (isUpload) {
      var uploadFile = document.querySelector(".fileUpload");
      var file = uploadFile.files[0]; //文件

      if (file) {
        var size = file.size / 1024 / 1024;
        if (size < 10) {
          $("#marklayer").addClass("mark-show"); //加载状态
          var formData = new FormData();
          formData.append("images", file);
          $.ajax({
            method: "POST",
            url: baseAPI + "/barcode",
            headers: {
              "secret-id": secret_id,
              "secret-key": secret_key,
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function (res) {
              document
                .querySelector("#marklayer")
                .classList.remove("mark-show");
              if (res.code == 200) {
                $("#translate_result").val(res.results.text.text);
                let resJSON = JSON.stringify(res);
                resObj = JSON.parse(resJSON);
                let returnresult = syntaxHighlight(resObj);
                $("#returnresult").html(returnresult);
              }
            },
            error() {
              document
                .querySelector("#marklayer")
                .classList.remove("mark-show");
              $(".message-error .message_content").html(res.msg);
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
        }
      }
    } else {
      $("#marklayer").addClass("mark-show"); //加载状态
      setTimeout(() => {
        $("#translate_result").val("8986112115733660735");
        $("#marklayer").removeClass("mark-show");
      }, 1000);
    }
  });
});

//文件url转为file对象
function getFileFromUrl(url, fileName) {
  return new Promise((resolve, reject) => {
    var blob = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "image/png");
    xhr.responseType = "blob";
    // 加载时处理
    xhr.onload = () => {
      // 获取返回结果
      blob = xhr.response;
      let file = new File([blob], fileName, { type: "image/png" });
      // 返回结果
      resolve(file);
    };
    xhr.onerror = (e) => {
      reject(e);
    };
    // 发送
    xhr.send();
  });
}
