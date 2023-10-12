$(function () {
  // 初始化请求示例
  let edit_text = document.querySelector("#edit_item").value;
  let editObj = {
    text: edit_text,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
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
      性别: [
        { probability: 0.9602706816996154, start: 11, end: 12, text: "男" },
      ],
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
      民族: [
        { probability: 0.951275568544304, start: 85, end: 86, text: "汉" },
      ],
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
    let edit_text = filterXSS(
      document.querySelector("#edit_item").value.replace(/\s*/g, "")
    );
    if (edit_text) {
      let editObj = {
        text: edit_text,
      };
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result);
      document.querySelector("#marklayer").classList.add("mark-show");

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
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            // console.log(res);
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");

            // 转换前都要先强制成json,不然得到的JSON容易转换出错
            // JSON.stringify将对象转为JSON字符串；
            // JSON.parse将JSON字符串转为对象；
            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);
            // 插入分析列表数据
            let table_data = res.result[0];
            let analysis_list = "";
            let index = 0;
            for (const item in table_data) {
              // console.log(index);
              analysis_list += `<tr>
  <td>${++index}</td>
  <td>${item}</td>
  <td>${table_data[item][0].text}</td>
  <td>${table_data[item][0].probability}</td>
</tr>`;
            }
            //   列表应该往列表后面添加元素,直接html会直接覆盖原来的
            $("#analysis_list").html(analysis_list);
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
});
