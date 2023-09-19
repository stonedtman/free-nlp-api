$(function () {
  let text1 = $(".compare_text").val();
  let text2 = $(".compared_text").val();
  let editObj = {
    text1: [text1],
    text2: [text2],
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
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
          diff_type: "delete",
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
          diff_type: "delete",
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
          diff_type: "delete",
          end_pos: 30,
          diff_txt: "了",
          begin_pos: "29",
        },
        {
          diff_type: "delete",
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

  /*  var resultList = [
    `<tr>
      <td><span class="co-1">昨天与</span>上海队的比赛</td>
      <td>上海队的比赛</td>
    </tr>
    <tr>
      <td><span class="co-1">是深圳队</span>老将周鹏CBA生涯的第684场比赛</td>
      <td>老将周鹏CBA生涯的第684场比赛<span class="co-1">中</span></td>
    </tr>
    <tr>
    <td>他超越<span class="co-1">了</span>前队友广东传奇名宿朱芳雨的<span class="co-2">683场</span>纪录成为CBA历史出场数第一人！</td>
    <td>他超越前队友广东传奇名宿朱芳雨的<span class="co-2">冠军</span>纪录成为CBA历史出场数第一人</td>
  </tr>
    `,
    `<tr>
      <td>王军<span class="co-1">被</span>停职</td>
      <td>王军停职</td>
    </tr>
    <tr>
      <td>余承东将独掌智能车业务”<span class="co-1">的</span>消息<span class="co-2">已</span>在汽车圈发酵</td>
      <td>余承东将<span class="co-1">会</span>独掌智能车业务”消息<span class="co-2">不断</span>在汽车圈发酵</td>
    </tr>
    
    `,
  ]; */

  //点击事件
  $(".analysis_name").click(function () {
    let text1 = filterXSS($(".compare_text").val().replace(/\s*/g, ""));
    let text2 = filterXSS($(".compared_text").val().replace(/\s*/g, ""));
    if (text1 && text2) {
      let editObj = {
        text1: text1,
        text2: text2,
      };
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result); //请求示例

      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态

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
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $(".prompt").addClass("hide");
            $(".analysis_result").removeClass("hide");
            $(".compare_result").html(res.result.html);
            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);
          }
        },
        error() {
          document.querySelector("#marklayer").classList.remove("mark-show");
          $(".message-error .message_content").html("服务器繁忙，请稍后再试");
          $(".message-error").removeClass("message-hide");
          setTimeout(() => {
            $(".message-error").addClass("message-hide");
          }, 2000);
        },
      });

      /*  setTimeout(() => {
        document.querySelector("#marklayer").classList.remove("mark-show");
        $(".prompt").addClass("hide");
        $(".analysis_result").removeClass("hide");
        $("#analysis_list").html(resultList[current]);
      }, 2000); */
    } else {
      $(".message-error .message_content").html("请输入文本比对的内容");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  });
});
