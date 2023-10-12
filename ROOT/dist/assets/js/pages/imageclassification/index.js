$(".analysis_name").click(function () {
  var uploadFiles = document.querySelectorAll(".fileUpload")[0];
  var file = uploadFiles.files[0]; //文件
  //   console.log(file);
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
        url: baseAPI + "/classpic",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
          document.querySelector("#marklayer").classList.remove("mark-show");
          document.querySelector(".tips").style.display = "none";
          if (res.code == 200) {
            // console.log(res);

            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#analysis_results").html(returnresult);
            $("#returnresult").html(returnresult);
          }
        },
      });
    }
  } else {
    document.querySelector("#marklayer").classList.add("mark-show"); //加载状态
    setTimeout(() => {
      document.querySelector(".tips").style.display = "none";
      $("#analysis_results").html(syntaxHighlight(resultList[current]));
      $("#returnresult").html(syntaxHighlight(resultList[current]));
      document.querySelector("#marklayer").classList.remove("mark-show");
    }, 1000);
  }
});
