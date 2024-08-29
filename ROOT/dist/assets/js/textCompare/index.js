$(".request_address").attr("href", requestAddress + "/text_comparison");
$(".request_address").html(requestAddress + "/text_comparison");
var exampleList = [
  {
    text1:
      "昨天与上海队的比赛，是深圳队老将周鹏CBA生涯的第684场比赛，他超越了前队友广东传奇名宿朱芳雨的683场纪录成为CBA历史出场数第一人！",
    text2:
      "上海队的比赛，老将周鹏CBA生涯的第684场比赛中，他超越前队友广东传奇名宿朱芳雨的冠军纪录成为CBA历史出场数第一人！",
  },
  {
    text1: "王军被停职，余承东将独掌智能车业务”的消息已在汽车圈发酵。",
    text2: "王军停职，余承东将会独掌智能车业务”消息不断在汽车圈发酵。",
  },
];
$(".compare_text").val(exampleList[0].text1);
$(".compared_text").val(exampleList[0].text2);

var current = 0;
function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  $(".compare_text").val(exampleList[index - 1].text1);
  $(".compared_text").val(exampleList[index - 1].text2);
  current = index - 1;
}

var text1 = $(".compare_text").val();
var text2 = $(".compared_text").val();
var editObj = {
  text1: [text1],
  text2: [text2],
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result); //请求示例

var dataList = {
  msg: "成功",
  result: {
    data: [
      {
        diff_type: "equal",
        end_pos: 7,
        diff_txt: "上海队的比赛，",
        begin_pos: "0",
      },
      {
        diff_type: "devare",
        end_pos: 3,
        diff_txt: "昨天与",
        begin_pos: "0",
      },
      {
        diff_type: "equal",
        end_pos: 24,
        diff_txt: "老将周鹏CBA生涯的第684场比赛",
        begin_pos: "7",
      },
      {
        diff_type: "devare",
        end_pos: 11,
        diff_txt: "是深圳队",
        begin_pos: "7",
      },
      {
        diff_type: "add",
        end_pos: 25,
        diff_txt: "中",
        begin_pos: "24",
      },
      {
        diff_type: "equal",
        end_pos: 29,
        diff_txt: "，他超越",
        begin_pos: "25",
      },
      {
        diff_type: "equal",
        end_pos: 42,
        diff_txt: "前队友广东传奇名宿朱芳雨的",
        begin_pos: "29",
      },
      {
        diff_type: "devare",
        end_pos: 30,
        diff_txt: "了",
        begin_pos: "29",
      },
      {
        diff_type: "devare",
        end_pos: 46,
        diff_txt: "683场",
        begin_pos: "42",
      },
      {
        diff_type: "add",
        end_pos: 44,
        diff_txt: "冠军",
        begin_pos: "42",
      },
      {
        diff_type: "equal",
        end_pos: 60,
        diff_txt: "纪录成为CBA历史出场数第一人！",
        begin_pos: "44",
      },
    ],
    html: '<DEL STYLE="background:#FFE6E6;" TITLE="i=0">昨天与</DEL><SPAN TITLE="i=0">上海队的比赛，</SPAN><DEL STYLE="background:#FFE6E6;" TITLE="i=7">是深圳队</DEL><SPAN TITLE="i=7">老将周鹏CBA生涯的第684场比赛</SPAN><INS STYLE="background:#E6FFE6;" TITLE="i=24">中</INS><SPAN TITLE="i=25">，他超越</SPAN><DEL STYLE="background:#FFE6E6;" TITLE="i=29">了</DEL><SPAN TITLE="i=29">前队友广东传奇名宿朱芳雨的</SPAN><DEL STYLE="background:#FFE6E6;" TITLE="i=42">683场</DEL><INS STYLE="background:#E6FFE6;" TITLE="i=42">冠军</INS><SPAN TITLE="i=44">纪录成为CBA历史出场数第一人！</SPAN>',
  },
  code: 200,
};

$("#returnresult").html(syntaxHighlight(dataList)); //返回示例

//点击事件
$(".analysis_name").click(function () {
  var text1 = filterXSS($(".compare_text").val().trim());
  var text2 = filterXSS($(".compared_text").val().trim());
  if (text1 && text2) {
    var editObj = {
      text1: text1,
      text2: text2,
    };
    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result); //请求示例

    $("#marklayer").addClass("mark-show"); //加载状态

    $.ajax({
      method: "POST",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      url: baseAPI + "/text_comparison",
      contentType: "application/json",
      dataType: "json",
      data: resultJSON,
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

          if (Object.keys(res.result.length > 0)) {
            $(".prompt").addClass("hide");
            $(".analysis_result").removeClass("hide");
            $(".compare_result").html(res.result.html);
          } else {
            $(".prompt .card-body").append(
              `<div class="empty-text">返回结果为空，换段文本再试试吧</div>`
            );
            $(".prompt").removeClass("hide");
            $(".analysis_result").addClass("hide");
          }
        }
      },
    });
  } else {
    $(".message-error .message_content").html("请输入文本比对的内容");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  }
});
