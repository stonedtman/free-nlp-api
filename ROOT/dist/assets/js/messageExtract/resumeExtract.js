$(".request_address").attr("href", requestAddress + "/extractResume");
$(".request_address").html(requestAddress + "/extractResume");
var exampleList = [
  "姓名:吴梓杰，\n性别:男，\n出生日期:1997.07，年龄 26岁\n联系电话:17625997729，\n学校:南京航空航天大学金城学院，\n学历：本科(全日制统招)\n民族:汉，\n期望薪资：8000\n期望职位：工程师\n期望工作地：北京\n毕业时间：2020年6月30日\n工作技能：熟练使用Java/Golang开发语言以及非关型数据库。 ",
  "基本信息\n姓  名 : 高虎\n性  别 :男\n民  族 : 汉\n年  龄 : 25岁\n工作年限 : 2年经验\n邮  箱 : 425963420@qq.com\n毕业时间：2020-6-19\n求职意向: 后端开发工程师\n教育背景 ：池州学院\n出生年月 : 1998-05 \n婚姻状况 :未婚\n籍  贯 : 宿州 \n电  话 : 18755765474\n意向城市: 南京\n技能特长\n1.熟悉Java语言,熟悉Spring、SpringMVC、SpringBoot、Mybatis、SpringCloud等框架 2.熟悉MySql数据库,熟练掌握sql的CRUD语句\n3.熟练使用Redis非关系型数据库\n4.熟悉MQ消息队列\n5.熟悉Maven,git等常用工具,了解Linux和docker的基础命令",
  "叶帅\n性别:男\n电话:17633149020\n现所在地:南京\n教育经历:本科\n2022 年毕业于南京工业大学浦江学院通信(通信工程)\n求职意向\n年龄:22\n户籍:承德 邮箱:1102527858@QQ.com\n工作经验:1 年以内\n意向岗位:Java 软件工程师 意向城市:南京 期望薪资:面议 当前状态:随时到岗",
];
$("#edit_item").val(exampleList[0]);

function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  document.querySelector("#edit_item").value = exampleList[index - 1];
}

var edit_text = document.querySelector("#edit_item").value;
var editObj = {
  text: edit_text,
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result);
var dataList = [
  {
    电话: [
      {
        probability: 0.9707309910080433,
        start: 39,
        end: 50,
        text: "17625997729",
      },
    ],
    生日: [
      { probability: 0.998528586437736, start: 19, end: 26, text: "1997.07" },
    ],
    毕业日期: [
      {
        probability: 0.9923998019054778,
        start: 121,
        end: 131,
        text: "2020年6月30日",
      },
    ],
    学历: [
      { probability: 0.9431743418237133, start: 72, end: 74, text: "本科" },
    ],
    期望职位: [
      {
        probability: 0.9954173517867986,
        start: 103,
        end: 106,
        text: "工程师",
      },
    ],
    性别: [{ probability: 0.9602706816996154, start: 11, end: 12, text: "男" }],
    期望工作地: [
      { probability: 0.9205971367254051, start: 113, end: 115, text: "北京" },
    ],
    工作技能: [
      {
        probability: 0.4654533618477785,
        start: 137,
        end: 156,
        text: "熟练使用Java/Golang开发语言",
      },
      {
        probability: 0.4448443413181735,
        start: 158,
        end: 164,
        text: "非关型数据库",
      },
    ],
    姓名: [
      { probability: 0.9854737109705738, start: 3, end: 6, text: "吴梓杰" },
    ],
    民族: [{ probability: 0.951275568544304, start: 85, end: 86, text: "汉" }],
    毕业学校: [
      {
        probability: 0.864737771146622,
        start: 55,
        end: 63,
        text: "南京航空航天大学",
      },
    ],
    期望薪水: [
      { probability: 0.8719255784046283, start: 93, end: 97, text: "8000" },
    ],
    出生日期: [
      {
        probability: 0.9986338407710171,
        start: 19,
        end: 26,
        text: "1997.07",
      },
    ],
    毕业年份: [
      {
        probability: 0.99178444690601,
        start: 121,
        end: 131,
        text: "2020年6月30日",
      },
    ],
    年龄: [
      { probability: 0.9876583942410377, start: 30, end: 33, text: "26岁" },
    ],
    出生年月: [
      {
        probability: 0.9980379031183091,
        start: 19,
        end: 26,
        text: "1997.07",
      },
    ],
  },
];
var strHtml = "";
var index = 0;
for (const item in dataList[0]) {
  // console.log(index);
  strHtml += ` <tr>
    <td>${++index}</td>
    <td>${item}</td>
    <td>${dataList[0][item][0].text}</td>
    <td>${dataList[0][item][0].probability}</td>
  </tr>`;
}
$("#analysis_list").html(strHtml);
$("#returnresult").html(syntaxHighlight(dataList));

$(".analysis_name").click(function () {
  var edit_text = filterXSS(document.querySelector("#edit_item").value.trim());
  if (edit_text) {
    var editObj = {
      text: edit_text,
    };
    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result);
    $("#marklayer").addClass("mark-show");

    $.ajax({
      method: "POST",
      url: baseAPI + "/extractResume",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
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

          if (res.result.length > 0) {
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");

            // 插入分析列表数据
            var table_data = res.result[0];
            var analysis_list = "";
            var index = 0;
            for (const item in table_data) {
              // console.log(index);
              analysis_list += `<tr>
  <td>${++index}</td>
  <td>${item}</td>
  <td>${table_data[item][0].text}</td>
  <td>${table_data[item][0].probability}</td>
</tr>`;
            }
            $("#analysis_list").html(analysis_list);
          } else {
            $(".prompt .card-body").append(
              `<div class="empty-text">返回结果为空，换段文本再试试吧</div>`
            );
            $(".table-responsive").addClass("hide");
            $(".prompt").removeClass("hide");
          }
        }
      },
    });
  } else {
    $(".message-error .message_content").html("请输入要抽取的内容");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  }
});
