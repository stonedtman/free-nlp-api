var resultJSON = '{"images":"上传的图片"}';
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result);

var analysisBtn = document.querySelector(".analysis_name");

analysisBtn.onclick = function () {
  var uploadFile = document.querySelector(".fileUpload");
  var file = uploadFile.files[0]; //文件

  if (!isUpload) {
    $("#marklayer").addClass("mark-show"); //加载状态
    setTimeout(() => {
      $("#marklayer").removeClass("mark-show");
      $(".step_tip").eq(current).addClass("hide_result");
      $(".analysis_online").eq(current).removeClass("hide_result");
      showResult(current);
    }, 1000);
    return;
  }

  if (file) {
    var size = file.size / 1024 / 1024;
    if (size < 10) {
      $("#marklayer").addClass("mark-show"); //加载状态
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
          $("#marklayer").removeClass("mark-show");
          if (res.code == 200) {
            $(".step_tip").eq(current).addClass("hide_result");
            $(".analysis_online").eq(current).removeClass("hide_result");

            var resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            var returnresult = syntaxHighlight(resObj);

            document.querySelectorAll("#analysis_online")[current].innerHTML =
              textextraction(res.results[0].data);
            $("#returnresult").html(returnresult);
          }
        },
      });
    }
  } else {
    setTimeout(() => {
      $("#marklayer").removeClass("mark-show");
    }, 1000);
  }
};
