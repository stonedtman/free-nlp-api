function returnEngine() {
  window.location.href = "/dist/index.html?menu=37";
}

function addproject() {
  jump("/dist/disposition/tweaksGPT/addModel.html", "微调GPT");
}

function viewModel(item) {
  jump("/dist/disposition/tweaksGPT/sampleList.html", "微调GPT");
  // jump("/dist/disposition/tweaksGPT/sampleList.html", "微调GPT", "", {
  //   id: item.id,
  //   name: item.name,
  // });
}

function toLable(item) {
  jump("/dist/disposition/tweaksGPT/labelList.html", "微调GPT", "", {
    id: item.id,
    name: item.name,
  });
}

function renderEmotion(tableList) {
  var strHtml = "";
  tableList.forEach((item, index) => {
    strHtml += `<tr>
                              <td>
                                  <div class="participle_item">
                                      <span class="participle_name" onclick="toDetail(${JSON.stringify(
                                        item
                                      ).replace(/"/g, "&quot;")})">${
      item.name
    }</span>
                                  </div>
                              </td>
                              <td>${
                                item.type == 0 ? "文本分类" : "情感分析"
                              }</td>
                              <td>${item.count}</td>
                              <td>
                                
                                <span class='${
                                  item.state == 0
                                    ? "not_trained"
                                    : item.state == 1
                                    ? "train_finished"
                                    : item.state == 2
                                    ? "published"
                                    : item.state == 3
                                    ? "train_ing"
                                    : "published_ing"
                                }'>${
      item.state == 0
        ? "未训练"
        : item.state == 1
        ? "训练完成"
        : item.state == 2
        ? "已发布"
        : item.state == 3
        ? "训练中"
        : "发布中"
    }</span></td>
                              <td>${item.createTime}</td>
                              <td><span class="${
                                item.workState == 0 ? "gray" : ""
                              }">${
      item.workState == 0 ? "未使用" : "使用中"
    }</span><div class="${
      item.workState == 1 ? "inuse" : "display-none"
    }"></div></td>
                              <td>
                                
                                  <button class="btn btn-link ${
                                    item.state == 3 ||
                                    item.state == 4 ||
                                    item.workState == 1
                                      ? "disabled"
                                      : ""
                                  }" onclick="confirmEdit(${JSON.stringify(
      item
    ).replace(/"/g, "&quot;")})">编辑</button>
                                  |
                                  <button class="btn btn-link text-danger ${
                                    item.state == 3 ||
                                    item.state == 4 ||
                                    item.workState == 1
                                      ? "disabled"
                                      : ""
                                  }" onclick="confirmDelete(${JSON.stringify(
      item
    ).replace(/"/g, "&quot;")})">删除</button>|
                                  <span>
                                      <button class="btn btn-link ${
                                        item.state == 3 || item.workState == 1
                                          ? "disabled"
                                          : ""
                                      }" onclick="confirmTrain(${JSON.stringify(
      item
    ).replace(/"/g, "&quot;")})")">训练</button>
                                      |
                                      <button class="btn btn-link ${
                                        item.state == 0 ||
                                        item.state == 2 ||
                                        item.state == 3 ||
                                        item.state == 4
                                          ? "disabled"
                                          : ""
                                      }" onclick="confirmRelease(${JSON.stringify(
      item
    ).replace(/"/g, "&quot;")})">发布</button>|
                                      <span class="${
                                        item.workState == 1
                                          ? "display-none"
                                          : ""
                                      }"><button class="btn btn-link ${
      item.state == 0 || item.state == 1 || item.state == 3 || item.state == 4
        ? "disabled"
        : ""
    }" onclick="confirmUse(${JSON.stringify(item).replace(
      /"/g,
      "&quot;"
    )})">使用</button>
                                        </span>
                                     <span class="${
                                       item.workState == 0 ? "display-none" : ""
                                     }"> <button class="btn btn-link text-danger" onclick="confirmDeactivate(${JSON.stringify(
      item
    ).replace(/"/g, "&quot;")})">停用</button></span>
                                  </span>
                                 
                                  
                              </td>
                          </tr>`;
  });
  $("#emotion_list").html(strHtml);
}

var page = 1;
var pageSize = 10;
var isfirst = true;

function getObjectList() {
  $("#marklayer").addClass("mark-show"); //加载状态
  $.ajax({
    method: "get",
    url: configAPI + "/emotion/project/page",
    contentType: "application/json",
    dataType: "json",
    data: {
      page,
      pageSize,
      userId: localStorage.getItem("userId"),
    },
    success: function (res) {
      $("#marklayer").removeClass("mark-show"); //加载状态
      if (res.code == 200) {
        renderEmotion(res.result.data);
        if (isfirst) {
          pagination(res.result.total);
          isfirst = false;
        }
      }
    },
  });
}
// getObjectList();

var objectId;
function confirmEdit(item) {
  // if (item.state == 3 || item.state == 4 || item.workState == 1) {
  //   return
  // }
  // objectId = item.id;
  // $("#object-name").val(item.name);
  $("#editModal").modal("show");
}

function submitEdit() {
  $("#editModal").modal("hide");
  // var name = $("#object-name").val();
  // if (name) {
  //   $.ajax({
  //     method: "POST",
  //     url: configAPI + "/emotion/project/update",
  //     contentType: "application/json",
  //     dataType: "json",
  //     data: JSON.stringify({
  //       name, id: objectId
  //     }),
  //     success: function (res) {
  //       if (res.code == 200) {
  //         getObjectList();
  //         $(".message-success .message_content").html(res.msg);
  //         $(".message-success").removeClass("message-hide");
  //         setTimeout(() => {
  //           $(".message-success").addClass("message-hide");
  //         }, 2000);
  //       } else {
  //         $(".message-error .message_content").html(res.msg);
  //         $(".message-error").removeClass("message-hide");
  //         setTimeout(() => {
  //           $(".message-error").addClass("message-hide");
  //         }, 2000);
  //       }
  //     }
  //   })
  // }
}

function confirmDelete(item) {
  // if (item.state == 3 || item.state == 4 || item.workState == 1) {
  //   return;
  // }
  // objectId = item.id;
  $("#deleteModal").modal("show");
}
function submitDelete() {
  $("#deleteModal").modal("hide");
  // $.ajax({
  //   method: "get",
  //   url: configAPI + "/emotion/project/remove",
  //   contentType: "application/json",
  //   dataType: "json",
  //   data: {
  //     id: objectId
  //   },
  //   success: function (res) {
  //     if (res.code == 200) {
  //       isfirst = true;
  //       getObjectList();
  //       $(".message-success .message_content").html(res.msg);
  //       $(".message-success").removeClass("message-hide");
  //       setTimeout(() => {
  //         $(".message-success").addClass("message-hide");
  //       }, 2000);
  //     }
  //   }
  // })
}

var projectState;
function confirmRelease(item) {
  // if (item.state == 0 || item.state == 2 || item.state == 3 || item.state == 4) {
  //   return
  // }
  // objectId = item.id;
  // projectState = item.state;

  $("#release").modal("show");
}

function submitRelease() {
  $("#release").modal("hide");
  // $.ajax({
  //   method: "get",
  //   url: configAPI + "/emotion/project/updateState",
  //   contentType: "application/json",
  //   dataType: "json",
  //   data: {
  //     id: objectId, state: 2
  //   },
  //   success: function (res) {
  //     if (res.code == 200) {
  //       getObjectList();
  //       $(".message-success .message_content").html(res.msg);
  //       $(".message-success").removeClass("message-hide");
  //       setTimeout(() => {
  //         $(".message-success").addClass("message-hide");
  //       }, 2000);
  //     }
  //   }
  // })
}

function confirmTrain(item) {
  // if (item.state == 3 || item.workState == 1) {
  //   return
  // }
  // objectId = item.id;
  $("#train").modal("show");
}

function submitTrain() {
  $("#train").modal("hide");
  // $.ajax({
  //   method: "get",
  //   url: configAPI + "/emotion/project/updateState",
  //   contentType: "application/json",
  //   dataType: "json",
  //   data: {
  //     id: objectId, state: 1
  //   },
  //   success: function (res) {
  //     if (res.code == 200) {
  //       getObjectList();
  //       $(".message-success .message_content").html(res.msg);
  //       $(".message-success").removeClass("message-hide");
  //       setTimeout(() => {
  //         $(".message-success").addClass("message-hide");
  //       }, 2000);
  //     }
  //   }
  // })
}

function confirmUse(item) {
  // if (item.state == 0 || item.state == 1 || item.state == 3 || item.state == 4) {
  //   return
  // }
  // objectId = item.id;
  $("#use").modal("show");
}

function submitUse() {
  $("#use").modal("hide");
  // $.ajax({
  //   method: "get",
  //   url: configAPI + "/emotion/project/updateWorkState",
  //   contentType: "application/json",
  //   dataType: "json",
  //   data: {
  //     id: objectId, workState: 1
  //   },
  //   success: function (res) {
  //     if (res.code == 200) {
  //       getObjectList();
  //       $(".message-success .message_content").html(res.msg);
  //       $(".message-success").removeClass("message-hide");
  //       setTimeout(() => {
  //         $(".message-success").addClass("message-hide");
  //       }, 2000);
  //     }
  //   }
  // })
}

function confirmDeactivate(item) {
  $("#deactivate").modal("show");
  // objectId = item.id;
}

function submitDeactivate() {
  $("#deactivate").modal("hide");
  // $.ajax({
  //   method: "get",
  //   url: configAPI + "/emotion/project/updateWorkState",
  //   contentType: "application/json",
  //   dataType: "json",
  //   data: {
  //     id: objectId, workState: 0
  //   },
  //   success: function (res) {
  //     if (res.code == 200) {
  //       getObjectList();
  //       $(".message-success .message_content").html(res.msg);
  //       $(".message-success").removeClass("message-hide");
  //       setTimeout(() => {
  //         $(".message-success").addClass("message-hide");
  //       }, 2000);
  //     }
  //   }
  // })
}

function pagination(total) {
  layui.use("laypage", function () {
    var laypage = layui.laypage;

    //执行一个laypage实例
    laypage.render({
      elem: "pagination",
      count: total,
      limit: 10,
      groups: 3,
      layout: ["count", "prev", "page", "next", "skip"],
      jump: function (obj) {
        if (page == obj.curr) {
          return;
        }
        page = obj.curr;
        getObjectList();
      },
      theme: "#5369f8",
    });
  });
}
