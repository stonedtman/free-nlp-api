$(function () {
  $("#edit_item").html(exampleList[0]);
  // 初始化请求示例
  let edit_text = exampleList[0];
  let editObj = {
    text: edit_text,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result);

  $(".analysis_name").click(function () {
    let edit_text = document.querySelector("#edit_item").value;
    let editObj = {
      text: [edit_text],
    };
    let resultJSON = JSON.stringify(editObj);
    let result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result);
    $("#marklayer").addClass("mark-show"); //加载状态

    $.ajax({
      method: "POST",
      url: baseAPI + "/censor_detection",
      contentType: "application/json",
      dataType: "json",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      data: resultJSON,
      success: function (res) {
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          let resJSON = JSON.stringify(res);
          resObj = JSON.parse(resJSON);
          let returnresult = syntaxHighlight(resObj);
          $("#returnresult").html(returnresult);
          console.log(res.result);
          // 插入分析列表数据
          let table_data = res.result;
          let analysis_list = "";
          table_data.forEach((item, index) => {
            analysis_list += `<tr>
                    <td>${index + 1}</td>
                    <td>${item.label}</td>
                    <td>${item.word}</td>
                    </tr>`;
          });
          //   列表应该往列表后面添加元素,直接html会直接覆盖原来的
          $("#analysis_list").html(analysis_list);
          $("#returnresult").html(syntaxHighlight(table_data));
          $(".step_tip").css("display", "none");
          $(".table-responsive").css("display", "block");
        }
      },
      error() {
        $("#marklayer").removeClass("mark-show");
        document
          .querySelector(".message-error")
          .classList.remove("message-hide");
        setTimeout(() => {
          document
            .querySelector(".message-error")
            .classList.add("message-hide");
        }, 2000);
      },
    });
  });
});
