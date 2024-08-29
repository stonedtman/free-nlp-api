var projectId, projectName, sampleType;
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
  projectId = theRequest.id;
  projectName = theRequest.name;
  sampleType = theRequest.type;
  $(".project_name").html(projectName);
}

function toBack() {
  jump("/dist/disposition/tweaksGPT/sampleList.html", "微调GPT");
  // jump("/dist/disposition/tweaksGPT/sampleList.html", "微调GPT", "", {
  //   id: projectId,
  //   name: projectName,
  //   type: sampleType,
  // });
}

function toBackback() {
  jump("/dist/disposition/tweaksGPT/index.html", "微调GPT");
}

function downloadTemplate() {
  //   if (sampleType == 0) {
  //     window.location.href =
  //       staticPath + "/file/userConfig/emotion/emotionText.xlsx";
  //   } else {
  //     window.location.href =
  //       staticPath + "/file/userConfig/emotion/emotionDemo.xls";
  //   }
}

var isfirst = true;
var isloading = false;

$("#myAwesomeDropzone").dropzone({
  url: configAPI + "",
  method: "post",
  headers: {
    token: localStorage.getItem("token"),
    "Cache-Control": "",
  },
  acceptedFiles: ".xls,.xlsx",
  uploadMultiple: true, //可以同时上传多个文件
  parallelUploads: 8, //并行上传文件数量，最大为8
  addRemoveLinks: true,
  dictRemoveFile: "删除文件",
  dictCancelUpload: "取消上传",
  dictCancelUploadConfirmation: "确定要取消上传吗？",
  autoProcessQueue: false,
  timeout: 180000,
  paramName: "file",
  dictDefaultMessage: "拖入需要上传的文件",
  init: function () {
    var myDropzone = this;
    var filesList = []; //待上传的文件列表
    var filesLength = 0; //上传文件的数量
    var successCount = 0; //上传文件成功的次数

    myDropzone.on("addedfile", function (file) {
      // 在文件选择时触发该事件
      if (this.files.length > 100) {
        // 如果已选择文件数量超过100个，将多余的文件从Dropzone中移除
        this.removeFile(file);
      } else {
        filesList.push(file);
      }
      filesLength = filesList.length;
    });

    //将其他表单数据一起发送
    myDropzone.on("sending", function (data, xhr, formData) {
      // console.log(data, xhr, formData)
      if (isfirst) {
        formData.append("projectId", projectId);
        formData.append("userId", localStorage.getItem("userId"));
        isfirst = false;
      }
    });

    myDropzone.on("success", function (files, response) {
      //文件上传成功之后的操作
      //每当有文件上传成功后，就继续调用方法上传队列中的文件，直到队列中的文件为空

      if (filesList.length > 0) {
        isfirst = true;
        var filesToUpload = filesList.splice(0, 8);
        myDropzone.uploadFiles(filesToUpload);
      }

      if (response.code == 200) {
        successCount++;
        $(".message-success .message_content").html(response.msg);
        $(".message-success").removeClass("message-hide");
        setTimeout(() => {
          $(".message-success").addClass("message-hide");
        }, 2000);
      } else {
        $(".message-error .message_content").html(response.msg);
        $(".message-error").removeClass("message-hide");
        setTimeout(() => {
          $(".message-error").addClass("message-hide");
        }, 2000);
      }

      //上传完毕
      if (successCount == filesLength) {
        isloading = false;
        setTimeout(() => {
          jump("/dist/disposition/emotion/objectDetail.html", "情感分类", "", {
            id: projectId,
            name: projectName,
            type: sampleType,
          });
        }, 2000);
      }
    });

    myDropzone.on("error", function (files, response) {
      //文件上传失败后的操作
      console.log("上传失败");
      isloading = false;
      isfirst = true;
    });

    myDropzone.on("totaluploadprogress", function (progress, byte, bytes) {
      //progress为进度百分比
      // $("#pro").text("上传进度：" + parseInt(progress) + "%");
    });

    var submitButton = document.querySelector(".batch_upload");
    submitButton.addEventListener("click", function () {
      //点击上传文件
      if (!isloading) {
        var filesToUpload = filesList.splice(0, 8);
        myDropzone.uploadFiles(filesToUpload);
        isloading = true;
      }
    });
  },
});
