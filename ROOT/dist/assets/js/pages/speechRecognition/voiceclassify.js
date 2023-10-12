// 初始化请求示例
$(function () {
  let editObj = { voice: "上传的音频文件" };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result); //请求示例

  //原始数据
  var dataList = [
    {
      msg: "成功",
      code: "200",
      results: [
        {
          probability: 0.7821218967437744,
          name: "动物",
        },
        {
          probability: 0.7156718969345093,
          name: "家畜宠物",
        },
        {
          probability: 0.792312741279602,
          name: "狗",
        },
      ],
    },
    {
      msg: "成功",
      code: "200",
      results: [
        {
          probability: 0.7518929243087769,
          name: "动物",
        },
        {
          probability: 0.8337770700454712,
          name: "猫",
        },
        {
          probability: 0.7010252475738525,
          name: "家畜宠物",
        },
      ],
    },
  ];

  $("#returnresult").html(syntaxHighlight(dataList[0])); //返回示例

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
        dataList[current].results.forEach((item, index) => {
          strHtml += ` <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td>${item.probability}</td>
        </tr>`;
        });
        $("#analysis_list").html(strHtml);
        $("#returnresult").html(syntaxHighlight(dataList[current])); //返回示例
      }, 2000);
    }
  });
});
