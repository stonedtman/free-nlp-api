$(".send-request").click(function () {
  $("#marklayer").addClass("mark-show"); //加载状态
  var text = editor.txt.html();
  var obj = { text };
  $.ajax({
    method: "POST",
    url: baseAPI + "/textCorrection",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(obj),
    headers: {
      "secret-id": secret_id,
      "secret-key": secret_key,
    },
    success: function (res) {
      $("#marklayer").removeClass("mark-show");
      if (res.code == 200) {
        if (res.result.edits.length > 0) {
          var strHtml = "";
          var arr = res.result.edits;
          for (var i = 0; i < arr.length + 1; i++) {
            if (arr.length > 1) {
              if (i == 0) {
                strHtml +=
                  `<div style="line-height:32px">` +
                  text.slice(0, arr[i].start);
              } else if (i == arr.length) {
                strHtml +=
                  `<span style="border-bottom:2px solid red;padding-bottom:5px">${text.slice(
                    arr[i - 1].start,
                    arr[i - 1].end
                  )}</span>` +
                  text.slice(arr[i - 1].end) +
                  `</div>`;
              } else {
                strHtml +=
                  `<span style="border-bottom:2px solid red;padding-bottom:5px">${text.slice(
                    arr[i - 1].start,
                    arr[i - 1].end
                  )}</span>` + text.slice(arr[i - 1].end, arr[i].start);
              }
            } else if (arr.length == 1) {
              strHtml +=
                `<div style="line-height:32px">` +
                text.slice(0, arr[0].start) +
                `<span style="border-bottom:2px solid red;padding-bottom:5px">${text.slice(
                  arr[0].start,
                  arr[0].end
                )}</span>` +
                text.slice(arr[0].end) +
                `</div>`;
              break;
            }
          }
          editor.txt.html(strHtml);
        }
      }
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
      $("#returnresult").html(syntaxHighlight(res));
      $(".step_tip").css("display", "none");
    },
    error() {
      $("#marklayer").removeClass("mark-show");
    },
  });
});
