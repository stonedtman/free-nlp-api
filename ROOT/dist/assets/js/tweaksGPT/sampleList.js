var projectId, projectName;
var currentTab = 0;

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
  //   $(".category").html(projectName);
}

function toBack() {
  jump("/dist/disposition/tweaksGpt/index.html", "微调GPT");
}

function uploadDataset() {
  jump("/dist/disposition/tweaksGpt/uploadSample.html", "微调GPT");
  //   jump("/dist/disposition/tweaksGpt/uploadSample.html", "微调GPT", "", {
  //     id: projectId,
  //     name: projectName,
  //     type: sampleType,
  //   });
}

function addPromptWords() {
  jump("/dist/disposition/tweaksGpt/addPromptWords.html", "微调GPT");
  //   jump("/dist/disposition/tweaksGpt/addPromptWords.html", "微调GPT", "", {
  //     id: projectId,
  //     name: projectName,
  //     type: sampleType,
  //   });
}

function editPromptWords() {
  jump("/dist/disposition/tweaksGpt/addPromptWords.html", "微调GPT", "", {
    id: 1,
  });
}

var strHtml;
function renderFirstTable(arr) {
  strHtml = "";
  arr.forEach((item, index) => {
    strHtml += `
          <tr>
            <td><span class="list_num"><input type="checkbox" class="pick_btn tab tab_1" onclick="checkboxOnclick(this,${index},1)">${
      item.id
    }</span></td>
            <td>${
              item.content.length > 200
                ? item.content.slice(0, 201) + "......"
                : item.content
            }</td>
            <td>${item.labelName != null ? item.labelName : "未标注"}</td>
            <td><button type="button" class="btn btn-link btn-table" onclick="tagging(${JSON.stringify(
              item
            ).replace(/"/g, "&quot;")},${index})">标注</button></td>
            </tr>
          `;
  });
  $("#footage-list").html(strHtml);
}

function renderSecondTable(arr) {
  strHtml = "";
  arr.forEach((item, index) => {
    strHtml += `
          <tr>
            <td><span class="list_num"><input type="checkbox" class="pick_btn tab tab_2" onclick="checkboxOnclick(this,${index},2)">${
      item.id
    }</span></td>
            <td>${item.labelName}</td>
            <td><div class="colorbtn" style="background-color:${item.color};">${
      item.color
    }</div></td>
            <td><button type="button" class="btn btn-link btn-table" onclick="editlabel(${JSON.stringify(
              item
            ).replace(/"/g, "&quot;")})">编辑</button></td>
            </tr>
          `;
  });
  $("#phrase-list").html(strHtml);
}

var page = 1;
var pageSize = 10;
var isfirst = true;
var dataList = [];
var total;
var state = -1;

function getDataList() {
  //   var keyword = $(".keyword-search input").eq(0).val().trim();
  //   $.ajax({
  //     method: "get",
  //     url: configAPI + "/emotion/data/page",
  //     contentType: "application/json",
  //     dataType: "json",
  //     data: {
  //       page,
  //       pageSize,
  //       projectId,
  //       userId: localStorage.getItem("userId"),
  //       keyword,
  //       state,
  //     },
  //     success: function (res) {
  //       if (res.code == 200) {
  //         dataList = res.result.data;
  //         res.result.data.forEach((item) => {
  //           if (item.content.length > 200) {
  //             item.content = item.content.slice(0, 201) + "......";
  //           }
  //         });
  //         renderFirstTable(res.result.data);
  //         total = res.result.total;
  //         if (dataList.length == 0) {
  //           $(".pickAll_btn").css("display", "none");
  //         }
  //         if (isfirst) {
  //           paginationFirstTable(res.result.total);
  //           isfirst = false;
  //         }
  //       }
  //     },
  //   });
}

if (currentTab == 0) {
  getDataList();
}

var pageIndex = 1;
var labelList = [];
function getLabelList() {
  //   var labelName = $(".keyword-search input").eq(1).val().trim();
  //   $.ajax({
  //     method: "get",
  //     url: configAPI + "/emotion/label/page",
  //     contentType: "application/json",
  //     dataType: "json",
  //     data: {
  //       pageIndex,
  //       pageSize,
  //       userId: localStorage.getItem("userId"),
  //       projectId,
  //       labelName,
  //     },
  //     success: function (res) {
  //       if (res.code == 200) {
  //         labelList = res.result.data;
  //         renderSecondTable(res.result.data);
  //         if (labelList.length == 0) {
  //           $(".pickAll_btn").css("display", "none");
  //           $(".delete").removeClass("btn-danger");
  //         }
  //         if (isfirst) {
  //           paginationSecondTable(res.result.total);
  //           isfirst = false;
  //         }
  //       }
  //     },
  //   });
}

if (currentTab == 1) {
  getLabelList();
}

function changeTab(index) {
  // console.log(index)
  currentTab = index;
  isfirst = true;
  if (index == 0) {
    checkboxValue_1 = [];
    $(".pickAll_1").prop("checked", false);
    $(".delete").eq(0).removeClass("btn-danger");
    getDataList();
  } else {
    checkboxValue_2 = [];
    $(".pickAll_2").prop("checked", false);
    $(".delete").eq(1).removeClass("btn-danger");
    getLabelList();
  }
}

//回车搜索
$(".keyword-search input").each(function () {
  $(this).keydown(function (e) {
    if (e.keyCode == 13) {
      isfirst = true;
      if (currentTab == 0) {
        page = 1;
        getDataList();
      } else {
        pageIndex = 1;
        getLabelList();
      }
    }
  });
});

function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  state = $(".option")
    .eq(index - 1)
    .attr("value");
  isfirst = true;
  page = 1;
  getDataList();
}

function confirmDeleteAll() {
  if (
    (dataList.length > 0 && currentTab == 0) ||
    (labelList.length > 0 && currentTab == 1)
  ) {
    $("#deleteAll").modal("show");
  }
}

//所有单选选中 全选选中
var checkboxValue_1 = []; //所有选择框的状态
var checkboxValue_2 = [];
function checkboxOnclick(checkbox, index, current) {
  if (current == 1) {
    checkboxValue_1 = [];
    $(".tab_1").each(function () {
      checkboxValue_1.push(this.checked);
    });
    if (checkboxValue_1.indexOf(false) == -1) {
      $(".pickAll_1").prop("checked", true);
    } else {
      $(".pickAll_1").prop("checked", false);
    }

    if ($(".tab_1").eq(index).prop("checked")) {
      checkboxValue_1[index] = true;
    } else {
      checkboxValue_1[index] = false;
    }

    if (checkboxValue_1.indexOf(true) != -1) {
      $(".delete")
        .eq(current - 1)
        .addClass("btn-danger");
    } else {
      $(".delete")
        .eq(current - 1)
        .removeClass("btn-danger");
    }
  } else if (current == 2) {
    checkboxValue_2 = [];
    $(".tab_2").each(function () {
      checkboxValue_2.push(this.checked);
    });
    if (checkboxValue_2.indexOf(false) == -1) {
      $(".pickAll_2").prop("checked", true);
    } else {
      $(".pickAll_2").prop("checked", false);
    }

    if ($(".tab_2").eq(index).prop("checked")) {
      checkboxValue_2[index] = true;
    } else {
      checkboxValue_2[index] = false;
    }

    if (checkboxValue_2.indexOf(true) != -1) {
      $(".delete")
        .eq(current - 1)
        .addClass("btn-danger");
    } else {
      $(".delete")
        .eq(current - 1)
        .removeClass("btn-danger");
    }
  }
}

//全选选中 所有单选选中
function checkboxAllOnclick(checkboxAll, current) {
  if (current == 1) {
    checkboxValue_1 = [];
    if (checkboxAll.checked) {
      $(".tab_1").each(function () {
        $(this).prop("checked", true);
        checkboxValue_1.push(true);
      });
      $(".delete")
        .eq(current - 1)
        .addClass("btn-danger");
    } else {
      $(".tab_1").each(function () {
        $(this).prop("checked", false);
        checkboxValue_1.push(false);
      });
      $(".delete")
        .eq(current - 1)
        .removeClass("btn-danger");
    }
  } else if (current == 2) {
    checkboxValue_2 = [];
    if (checkboxAll.checked) {
      $(".tab_2").each(function () {
        $(this).prop("checked", true);
        checkboxValue_2.push(true);
      });
      $(".delete")
        .eq(current - 1)
        .addClass("btn-danger");
    } else {
      $(".tab_2").each(function () {
        $(this).prop("checked", false);
        checkboxValue_2.push(false);
      });
      $(".delete")
        .eq(current - 1)
        .removeClass("btn-danger");
    }
  }
}

function deleteOne(current) {
  if (current == 1) {
    if (checkboxValue_1.indexOf(true) == -1) {
      $(".message-error .message_content").html("请先勾选你要删除的数据");
      $("#changePassword").modal("hide");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    } else {
      var dataNumber = 0;
      checkboxValue_1.forEach((item) => {
        if (item == true) {
          dataNumber++;
        }
      });
      $(".delete_some").html("确定要删除这" + dataNumber + "条数据吗");
      $("#deleteSome").modal("show");
    }
  } else {
    if (checkboxValue_2.indexOf(true) == -1) {
      $(".message-error .message_content").html("请先勾选你要删除的数据");
      $("#changePassword").modal("hide");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    } else {
      var dataNumber = 0;
      checkboxValue_2.forEach((item) => {
        if (item == true) {
          dataNumber++;
        }
      });
      $(".delete_some").html("确定要删除这" + dataNumber + "条数据吗");
      $("#deleteSome").modal("show");
    }
  }
}

function submitDelete() {
  var idList = [];
  if (currentTab == 0) {
    checkboxValue_1.forEach((item, index) => {
      if (item == true) {
        idList.push(dataList[index].id);
      }
    });
    $("#deleteSome").modal("hide");
    // $.ajax({
    //   method: "get",
    //   url: configAPI + "/emotion/data/remove",
    //   contentType: "application/json",
    //   dataType: "json",
    //   data: {
    //     ids: idList.join(","),
    //     projectId,
    //   },
    //   success: function (res) {
    //     if (res.code == 200) {
    //       isfirst = true;
    //       getDataList();
    //       $(".pickAll_1").prop("checked", false);
    //       $(".message-success .message_content").html(res.msg);
    //       $(".message-success").removeClass("message-hide");
    //       setTimeout(() => {
    //         $(".message-success").addClass("message-hide");
    //       }, 1000);
    //     }
    //   },
    // });
  } else {
    checkboxValue_2.forEach((item, index) => {
      if (item == true) {
        idList.push(labelList[index].id);
      }
    });
    $("#deleteSome").modal("hide");
    // $.ajax({
    //   method: "POST",
    //   url: configAPI + "/emotion/label/batchDelete",
    //   contentType: "application/json",
    //   dataType: "json",
    //   data: JSON.stringify({
    //     ids: idList,
    //   }),
    //   success: function (res) {
    //     if (res.code == 200) {
    //       isfirst = true;
    //       getLabelList();
    //       $(".message-success .message_content").html(res.msg);
    //       $(".message-success").removeClass("message-hide");
    //       setTimeout(() => {
    //         $(".message-success").addClass("message-hide");
    //       }, 2000);
    //     }
    //   },
    // });
  }
}

function deleteAll() {
  if (currentTab == 0) {
    $("#deleteAll").modal("hide");
    // $.ajax({
    //   method: "get",
    //   url: configAPI + "/emotion/data/removeAll",
    //   contentType: "application/json",
    //   dataType: "json",
    //   data: {
    //     userId: localStorage.getItem("userId"),
    //     projectId,
    //   },
    //   success: function (res) {
    //     if (res.code == 200) {
    //       isfirst = true;
    //       getDataList();
    //       $(".message-success .message_content").html(res.msg);
    //       $(".message-success").removeClass("message-hide");
    //       setTimeout(() => {
    //         $(".message-success").addClass("message-hide");
    //       }, 1000);
    //     }
    //   },
    // });
  } else {
    $("#deleteAll").modal("hide");
    // $.ajax({
    //   method: "get",
    //   url: configAPI + "/emotion/label/removeAll",
    //   contentType: "application/json",
    //   dataType: "json",
    //   data: {
    //     userId: localStorage.getItem("userId"),
    //     projectId,
    //   },
    //   success: function (res) {
    //     if (res.code == 200) {
    //       isfirst = true;
    //       getLabelList();
    //       $(".message-success .message_content").html(res.msg);
    //       $(".message-success").removeClass("message-hide");
    //       setTimeout(() => {
    //         $(".message-success").addClass("message-hide");
    //       }, 2000);
    //     }
    //   },
    // });
  }
}

// 导出数据
function exportDataset() {
  //   $.ajax({
  //     method: "get",
  //     url: configAPI + "/emotion/data/download",
  //     contentType: "application/json",
  //     dataType: "json",
  //     data: {
  //       projectId,
  //       userId: localStorage.getItem("userId"),
  //     },
  //     success: function (res) {
  //       if (res.code == 200) {
  //         window.open(staticPath + res.result);
  //       }
  //     },
  //   });
}

function paginationFirstTable(total) {
  layui.use("laypage", function () {
    var laypage = layui.laypage;

    //执行一个laypage实例
    laypage.render({
      elem: "pagination_1",
      count: total,
      limit: 10,
      groups: 3,
      layout: ["count", "prev", "page", "next", "skip"],
      jump: function (obj) {
        if (page == obj.curr) {
          return;
        }
        checkboxValue_1 = [];
        $(".pickAll_1").prop("checked", false);
        $(".delete").eq(0).removeClass("btn-danger");
        page = obj.curr;
        getDataList();
      },
      theme: "#5369f8",
    });
  });
}

function paginationSecondTable(total) {
  layui.use("laypage", function () {
    var laypage = layui.laypage;

    //执行一个laypage实例
    laypage.render({
      elem: "pagination_2",
      count: total,
      limit: 10,
      groups: 3,
      layout: ["count", "prev", "page", "next", "skip"],
      jump: function (obj) {
        if (pageIndex == obj.curr) {
          return;
        }
        checkboxValue_2 = [];
        $(".pickAll_2").prop("checked", false);
        $(".delete").eq(1).removeClass("btn-danger");
        pageIndex = obj.curr;
        getLabelList();
      },
      theme: "#5369f8",
    });
  });
}
