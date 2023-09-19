// 初始化请求示例
$(function () {
  let editObj = { voice: "上传的音频文件" };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result); //请求示例

  //原始数据
  var dataList = {
    result: [
      {
        probability: 0.7919359803199768,
        name: "Dog",
      },
      {
        probability: 0.7815028429031372,
        name: "Animal",
      },
      {
        probability: 0.7150676846504211,
        name: "Domestic animals, pets",
      },
    ],
    code: "200",
  };

  $("#returnresult").html(syntaxHighlight(dataList)); //返回示例

  //点击事件
  $(".analysis_name").click(function () {
    if (isUpload) {
      var uploadFiles = document.querySelectorAll("#fileInput")[0];
      var file = uploadFiles.files[0]; //文件
      if (file) {
        var size = file.size / 1024 / 1024;
        if (size < 10) {
          document.querySelector("#marklayer").classList.add("mark-show");
          var formData = new FormData();
          formData.append("voice", file);
          $.ajax({
            method: "POST",
            headers: {
              "secret-id": secret_id,
              "secret-key": secret_key,
            },
            url: baseAPI + "/speechCLS",
            data: formData,
            contentType: false,
            processData: false,
            success: function (res) {
              document
                .querySelector("#marklayer")
                .classList.remove("mark-show");
              if (res.code == 200) {
                let resJSON = JSON.stringify(res);
                resObj = JSON.parse(resJSON);
                let returnresult = syntaxHighlight(resObj);
                $("#returnresult").html(returnresult);

                $(".tip_card").css("display", "none");
                $(".table-responsive").removeClass("hide");
                var strHtml = "";
                res.results.forEach((item, index) => {
                  strHtml += ` <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.probability}</td>
              </tr>`;
                });
                $("#analysis_list").html(strHtml);
              }
            },
            error() {
              document
                .querySelector("#marklayer")
                .classList.remove("mark-show");
              $(".message-error .message_content").html(
                "服务器繁忙，请稍后再试"
              );
              $(".message-error").removeClass("message-hide");
              setTimeout(() => {
                $(".message-error").addClass("message-hide");
              }, 2000);
            },
          });
        }
      }
    } else {
      document.querySelector("#marklayer").classList.add("mark-show");
      setTimeout(() => {
        document.querySelector("#marklayer").classList.remove("mark-show");
        $(".tip_card").css("display", "none");
        $(".table-responsive").removeClass("hide");
        var strHtml = "";
        dataList.result.forEach((item, index) => {
          strHtml += ` <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.probability}</td>
        </tr>`;
        });
        $("#analysis_list").html(strHtml);
      }, 2000);
    }
  });
});
