// var file_base64 = ""; //转成base64的文件
$("#fileInput").change(function () {
  var file = $("#fileInput").get(0).files[0];
  // console.log(file);
  if (file) {
    uploadType = 2;
    var size = file.size / 1024 / 1024;
    if (size < 10) {
      voiceFormat(file);
    } else {
      $(".message-error .message_content").html("上传的音频大小不能超过10M");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  }
});

//语音格式转换
function voiceFormat(file) {
  var formData = new FormData();
  formData.append("voice", file);
  $.ajax({
    method: "POST",
    url: baseAPI + "/util/voiceFormat",
    data: formData,
    contentType: false,
    processData: false,
    success: function (res) {
      if (res.code == 200) {
        $("#audio_control").attr("src", res.result);
        $(".message-success .message_content").html("上传成功");
        $(".message-success").removeClass("message-hide");
        setTimeout(() => {
          $(".message-success").addClass("message-hide");
        }, 2000);
      }
    },
  });
}

// 初始化请求示例
$(function () {
  let editObj = { voice: "上传的音频文件" };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result); //请求示例

  //原始数据
  var dataList = {
    text: "今天非常开心能够给大家演示语音转文本的演示系统",
  };

  $("#returnresult").html(syntaxHighlight(dataList)); //返回示例

  //点击事件
  $(".analysis_name").click(function () {
    // console.log(uploadType);
    if (uploadType == 1) {
      var size = recordFile.size / 1024 / 1024;
      if (size < 10) {
        var formData = new FormData();
        formData.append("voice", recordFile);
        getReturnResult(file, formData);
      }
    } else {
      var uploadFiles = document.querySelectorAll("#fileInput")[0];
      var file = uploadFiles.files[0]; //文件
      if (file) {
        var size = file.size / 1024 / 1024;
        if (size < 10) {
          var formData = new FormData();
          formData.append("voice", file);
        }
      }

      getReturnResult(file, formData);
    }
  });
});

function getReturnResult(file, formData) {
  if (file) {
    var size = file.size / 1024 / 1024;
  }

  if ((file && uploadType == 2 && size < 10) || uploadType == 1) {
    document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
    $.ajax({
      method: "POST",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      url: baseAPI + "/voice2text",
      data: formData,
      contentType: false,
      processData: false,
      success: function (res) {
        document.querySelector("#marklayer").classList.remove("mark-show");
        if (res.code == 200) {
          let resJSON = JSON.stringify(res);
          resObj = JSON.parse(resJSON);
          let returnresult = syntaxHighlight(resObj);
          $("#edit_item").val(res.results.text);
          $("#returnresult").html(returnresult);
        }
      },
    });
  } else {
    document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
    setTimeout(() => {
      document.querySelector("#marklayer").classList.remove("mark-show");
      $("#edit_item").html(exampleList[current]);
      $("#returnresult").html(syntaxHighlight({ text: exampleList[current] }));
    }, 1000);
  }
}
