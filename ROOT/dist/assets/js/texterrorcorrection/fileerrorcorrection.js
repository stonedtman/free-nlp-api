$(function () {
  $(".analysis_name").click(function () {
    $("#marklayer").addClass("mark-show"); //加载状态
    var edit_text = document.querySelector("#analysis_content").value;
    var obj = { text: edit_text };
    console.log(obj);

    $.ajax({
      method: "POST",
      url: baseAPI + "/textCorrection",
      contentType: "application/json",
      dataType: "json",
      data: obj,
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      success: function (res) {
        // console.log(res);
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          $("#analysis_content").val(correctionList[current]);
          renderRichText();

          var list = res.result.edits;
          var html = "";
          list.forEach((item, index) => {
            html += `<div class="result_item">
            <span class="serialnum">${
              index + 1 >= 10 ? index + 1 : "0" + (index + 1)
            }</span>
            <span class="src">${item.src}${
              item.tgt == "" ? "(删除)" : ""
            }</span>
            <span class="arrowright" style="display:${
              item.tgt == "" ? "none" : "inline"
            }"><i class="uil-arrow-right"></i></span>
            <span class="tgt" style="display:${
              item.tgt == "" ? "none" : "inline"
            }">${item.tgt}</span>
          </div>`;
          });

          $("#analysis_results").html(html);
          $("#result").html(syntaxHighlight(obj));
          $(".step_tip").css("display", "none");
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
