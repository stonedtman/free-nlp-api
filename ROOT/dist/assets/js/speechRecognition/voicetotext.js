$(".audio audio").attr("src", staticPath + "/file/voicetotext/output1.wav");
$(".request_address").attr("href", requestAddress + "/voice2text");
$(".request_address").html(requestAddress + "/voice2text");
var exampleList = [
  "今天非常开心能够给大家演示语音转文本的演示系统",
  "国网宜都市供电公司共产党员服务队在公司机关开展核酸筛查志愿服务工作，供电志愿者王晓璐经培训“转岗”为核酸采样员。",
];
var audioList = [
  "/file/voicetotext/output1.wav",
  "/file/voicetotext/sitongshuke.wav",
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

var current = 0;
function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  current = index - 1;
  $("#audio_control").attr("src", staticPath + audioList[current]);
}

var uploadType; //录音上传方式 1：扬声器录制 2：本地文件上传
var mediaRecorder;
// 录音数据存储数组
var chunks = [];
var recordFile;
//开始录音
function startRecording() {
  uploadType = 1;
  chunks = []; //清空录音内容

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        $(".record_dialog").css("display", "block");

        // 创建MediaRecorder对象
        mediaRecorder = new MediaRecorder(stream);
        // 开始录音
        mediaRecorder.start();

        // 监听dataavailable事件
        mediaRecorder.addEventListener("dataavailable", function (e) {
          // 将录音数据存储到数组中
          chunks.push(e.data);
        });

        // 监听stop事件
        mediaRecorder.addEventListener("stop", function (e) {
          var blob = new Blob(chunks, { type: "audio/wav" });
          var audioURL = URL.createObjectURL(blob);

          recordFile = new File([blob], "record.wav", { type: blob.type });
          var size = recordFile.size / 1024 / 1024;
          if (size < 10) {
            var path = URL.createObjectURL(recordFile);
            $("#audio_control").attr("src", path);
            var audioControl = document.querySelector("#audio_control");
            audioControl.play();

            $(".message-success .message_content").html("上传成功");
            $("#changePassword").modal("hide");
            $(".message-success").removeClass("message-hide");
            setTimeout(() => {
              $(".message-success").addClass("message-hide");
            }, 2000);
          } else {
            $(".message-error .message_content").html(
              "录制的音频大小不能超过10M"
            );
            $(".message-error").removeClass("message-hide");
            setTimeout(() => {
              $(".message-error").addClass("message-hide");
            }, 2000);
          }
        });
      })
      .catch(function (err) {
        $(".message-error .message_content").html("麦克风权限获取失败");
        $(".message-error").removeClass("message-hide");
        setTimeout(() => {
          $(".message-error").addClass("message-hide");
        }, 2000);
      });
  }
}

$(".close_record").on("click", function () {
  $(".record_dialog").css("display", "none");
  // 停止录音
  // console.log(mediaRecorder)
  mediaRecorder.stop();
});

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
  let editObj = { voice: "上传的音频文件", type: 1 };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result); //请求示例

  //原始数据
  var dataList = {
    text: "今天非常开心能够给大家演示语音转文本的演示系统",
  };

  $("#returnresult").html(syntaxHighlight(dataList)); //返回示例
});

//点击事件
$(".analysis_name").click(function () {
  // console.log(uploadType);
  if (uploadType == 1) {
    var size = recordFile.size / 1024 / 1024;
    if (size < 10) {
      var formData = new FormData();
      formData.append("voice", recordFile);
      $(".plan-choose .custom-control-input").each(function () {
        if ($(this).prop("checked")) {
          if ($(this).val() == 0) {
            formData.append("type", 1);
          }
        }
      });

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
        $(".plan-choose .custom-control-input").each(function () {
          if ($(this).prop("checked")) {
            if ($(this).val() == 0) {
              formData.append("type", 1);
            }
          }
        });
      }
    }

    getReturnResult(file, formData);
  }
});

function getReturnResult(file, formData) {
  if (file) {
    var size = file.size / 1024 / 1024;
  }

  if ((file && uploadType == 2 && size < 10) || uploadType == 1) {
    $("#marklayer").addClass("mark-show"); //加载状态
    var type;
    $(".plan-choose .custom-control-input").each(function () {
      if ($(this).prop("checked")) {
        if ($(this).val() == 0) {
          type = 1;
        }
      }
    });
    let editObj = { voice: "上传的音频文件", type };
    let resultJSON = JSON.stringify(editObj);
    let result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result); //请求示例

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
        $("#marklayer").removeClass("mark-show");
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
    $("#marklayer").addClass("mark-show"); //加载状态
    setTimeout(() => {
      $("#marklayer").removeClass("mark-show");
      $("#edit_item").html(exampleList[current]);
      $("#returnresult").html(syntaxHighlight({ text: exampleList[current] }));
    }, 1000);
  }
}
