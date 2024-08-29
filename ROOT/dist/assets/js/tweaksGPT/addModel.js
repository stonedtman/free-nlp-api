function toBack() {
  jump("/dist/disposition/tweaksGPT/index.html", "微调GPT");
}

function submitAdd() {
  // $.ajax({
  //   method: "get",
  //   url: configAPI + "/emotion/project/page",
  //   contentType: "application/json",
  //   dataType: "json",
  //   data: {
  //     page, pageSize, userId: localStorage.getItem("userId")
  //   },
  //   success: function (res) {
  //     if (res.code == 200) {

  //     }
  //   },
  // })
  $(".message-success .message_content").html("创建成功");
  $(".message-success").removeClass("message-hide");
  setTimeout(() => {
    $(".message-success").addClass("message-hide");
    jump("/dist/disposition/tweaksGPT/index.html", "微调GPT");
  }, 2000);
}
