$(".audio audio").attr("src", staticPath + "/file/voice_classify/dog.wav");
$(".request_address").attr("href", requestAddress + "/speechCLS");
$(".request_address").html(requestAddress + "/speechCLS");

var audioList = [
  "/file/voice_classify/dog.wav",
  "/file/voice_classify/cat.wav",
];

var strHtml = "";
for (var i = 0; i < 40; i++) {
  strHtml += `<div class="waveform_item"></div>`;
}
$("#waveform").html(strHtml);

var list = document.querySelectorAll("#waveform .waveform_item");
for (var i = 0; i < list.length; i++) {
  var height = 80 * Math.sin((Math.PI / 40) * i) * Math.random();
  list[i].style = `transition: height 0.3s linear;height:${height}px;`;
}

$("#audio_control").attr("src", staticPath + audioList[0]);

var timer;

var audioControl = document.querySelector("#audio_control");
audioControl.addEventListener("play", function () {
  timer = setInterval(() => {
    for (var i = 0; i < list.length; i++) {
      var height = 80 * Math.sin((Math.PI / 40) * i) * Math.random();
      list[i].style = `transition: height 0.3s linear;height:${height}px;`;
    }
  }, 300);
});
audioControl.addEventListener("pause", function () {
  clearInterval(timer);
});
audioControl.addEventListener("ended", function () {
  clearInterval(timer);
});

var isUpload = false;
$("#fileInput").change(function () {
  var file = $("#fileInput").get(0).files[0];
  if (file) {
    isUpload = true;
    var size = file.size / 1024 / 1024;
    if (size < 10) {
      var path = URL.createObjectURL(file);
      $("#audio_control").attr("src", path);

      $(".message-success .message_content").html("上传成功");
      $("#changePassword").modal("hide");
      $(".message-success").removeClass("message-hide");
      setTimeout(() => {
        $(".message-success").addClass("message-hide");
      }, 2000);
    } else {
      $(".message-error .message_content").html("上传的音频大小不能超过10M");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  }
});

var current = 0;
function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  current = index - 1;
  isUpload = false;
  $("#audio_control").attr("src", staticPath + audioList[current]);
}

var editObj = { voice: "上传的音频文件" };
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
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
        $("#marklayer").addClass("mark-show");
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
            $("#marklayer").removeClass("mark-show");
            if (res.code == 200) {
              var resJSON = JSON.stringify(res);
              resObj = JSON.parse(resJSON);
              var returnresult = syntaxHighlight(resObj);
              $("#returnresult").html(returnresult);

              if ($(".empty-text").length > 0) {
                $(".empty-text").remove();
              }

              if (res.results.length > 0) {
                $(".tip_card").addClass("hide");
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
              } else {
                $(".tip_card .card-body").append(
                  `<div class="empty-text">返回结果为空，换段音频再试试吧</div>`
                );
                $(".table-responsive").addClass("hide");
                $(".tip_card").removeClass("hide");
              }
            }
          },
        });
      }
    }
  } else {
    $("#marklayer").addClass("mark-show");
    setTimeout(() => {
      $("#marklayer").removeClass("mark-show");
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
