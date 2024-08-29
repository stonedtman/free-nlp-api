var projectId, projectName, lId;
var isUpdate = false;
if (window.location.search) {
  var url = window.location.search;
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substring(1);
    str = str.split("&");
    for (var i = 0; i < str.length; i++) {
      theRequest[str[i].split("=")[0]] = decodeURI(str[i].split("=")[1]);
    }
  }
  // console.log(theRequest);
  projectId = theRequest.id;
  projectName = theRequest.name;
  $(".project-name").html(projectName);
  if (projectId) {
    $(".page-name").html("编辑提示词");
  }
}

function toBackback() {
  jump("/dist/disposition/tweaksGPT/index.html", "微调GPT");
}

function toBack() {
  jump("/dist/disposition/tweaksGPT/sampleList.html", "微调GPT");
  // jump(
  //   "/dist/disposition/tweaksGPT/sampleList.html",
  //   "微调GPT", "", { id: projectId, name: projectName, type: sampleType, tab: 1 }
  // );
}

function save() {
  // var labelName = $(".pick-name").val();
  // var color = $(".pick-color").val();

  // if (labelName && color) {
  //   if (!isUpdate) {
  //     $.ajax({
  //       method: "POST",
  //       url: configAPI + "/emotion/label/save",
  //       contentType: "application/json",
  //       dataType: "json",
  //       data: JSON.stringify({
  //         labelName, color, userId: localStorage.getItem("userId"), projectId
  //       }),
  //       success: function (res) {
  //         if (res.code == 200) {
  //           $(".message-success .message_content").html(res.msg);
  //           $(".message-success").removeClass("message-hide");
  //           setTimeout(() => {
  //             $(".message-success").addClass("message-hide");
  //             jump(
  //               "/dist/disposition/emotion/objectDetail.html",
  //               "情感分类", "", { id: projectId, name: projectName, type: sampleType, tab: 1 }
  //             );
  //           }, 1000);
  //         }
  //       }
  //     })
  //   } else {
  //     $.ajax({
  //       method: "POST",
  //       url: configAPI + "/emotion/label/update",
  //       contentType: "application/json",
  //       dataType: "json",
  //       data: JSON.stringify({
  //         labelName, color, userId: localStorage.getItem("userId"), id: lId
  //       }),
  //       success: function (res) {
  //         if (res.code == 200) {
  //           $(".message-success .message_content").html(res.msg);
  //           $(".message-success").removeClass("message-hide");
  //           setTimeout(() => {
  //             $(".message-success").addClass("message-hide");
  //             jump(
  //               "/dist/disposition/emotion/objectDetail.html",
  //               "情感分类", "", { id: projectId, name: projectName, type: sampleType, tab: 1 }
  //             );
  //           }, 2000);
  //         }
  //       }
  //     })
  //   }

  // }
  $(".message-success .message_content").html("保存成功");
  $(".message-success").removeClass("message-hide");
  setTimeout(() => {
    $(".message-success").addClass("message-hide");
    jump("/dist/disposition/tweaksGpt/sampleList.html", "微调GPT");
    // jump(
    //   "/dist/disposition/tweaksGpt/sampleList.html",
    //   "微调GPT", "", { id: projectId, name: projectName, type: sampleType, tab: 1 }
    // );
  }, 2000);
}

function continueSet() {
  // var labelName = $(".pick-name").val();
  // var color = $(".pick-color").val();

  // if (labelName && color) {
  //   $.ajax({
  //     method: "POST",
  //     url: configAPI + "/emotion/label/save",
  //     contentType: "application/json",
  //     dataType: "json",
  //     data: JSON.stringify({
  //       labelName, color, userId: localStorage.getItem("userId"), projectId
  //     }),
  //     success: function (res) {
  //       if (res.code == 200) {
  //         $(".message-success .message_content").html(res.msg);
  //         $(".message-success").removeClass("message-hide");
  //         setTimeout(() => {
  //           $(".message-success").addClass("message-hide");
  //           $(".pick-name").val("");
  //           $(".pick-color").val("");
  //           $(".lable-ready").html("");
  //           $(".lable-ready").css("background-color", "#8ad6fb");
  //         }, 2000);
  //       }
  //     }
  //   })
  // }
  $(".message-success .message_content").html("保存成功");
  $(".message-success").removeClass("message-hide");
  setTimeout(() => {
    $(".message-success").addClass("message-hide");
    $(".word-name").val("");
    $(".word-content").val("");
  }, 2000);
}
