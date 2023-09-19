$(function () {
  //点击事件
  $(".analysis_name").click(function () {
    var uploadFiles = document.querySelectorAll(".fileUpload")[0];
    var file = uploadFiles.files[0]; //文件

    // console.log(file);
    // 获取视频时长 超过50s 不允许上传
    var binaryData = [];
    // 传入file
    binaryData.push(file);
    //获取视频或者音频时长
    var fileurl = URL.createObjectURL(
      new Blob(binaryData, { type: "application/zip" })
    );
    //经测试，发现audio也可获取视频的时长
    var audioElement = new Audio(fileurl);
    var duration;

    if (file) {
      audioElement.addEventListener("loadedmetadata", function (_event) {
        duration = audioElement.duration;
        var size = file.size / 1024 / 1024;
        // console.log(size);
        if (size < 100) {
          document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
          var formData = new FormData();
          formData.append("video", file);
          $.ajax({
            method: "POST",
            url: baseAPI + "/video2text",
            headers: {
              "secret-id": secret_id,
              "secret-key": secret_key,
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function (res) {
              // console.log(typeof res);
              document
                .querySelector("#marklayer")
                .classList.remove("mark-show");
              if (res.code == 200) {
                $(".step_tip").css("display", "none");
                $(".transform_text").css("display", "block");
                $(".operate_tip").addClass("hide");
                $(".transform_text").removeClass("hide");
                $(".transform_text").html(res.results.text);
                $("#returnresult").html(syntaxHighlight(res));
              }
            },
            error() {
              document
                .querySelector("#marklayer")
                .classList.remove("mark-show");
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
      });
    } else {
      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
      setTimeout(() => {
        document.querySelector("#marklayer").classList.remove("mark-show");
        $(".step_tip").css("display", "none");
        $(".transform_text").css("display", "block");
        $(".operate_tip").addClass("hide");
        $(".transform_text").removeClass("hide");
        $(".transform_text").html(transformTexts[current]);
        $("#returnresult").html(
          syntaxHighlight({ text: transformTexts[current] })
        );
      }, 2000);
    }
  });
});
