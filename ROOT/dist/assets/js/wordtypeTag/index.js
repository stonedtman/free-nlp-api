$(function () {
  // 初始化请求示例
  let edit_text = document.querySelector("#edit_item").value;
  let editObj = {
    text: [edit_text],
    batch_size: 10,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result);

  var strHtml = "";
  //词性标签渲染
  function renderWordtag(tags, words) {
    let analysis_list = "";
    tags.forEach((item, index) => {
      if (item == "vn") {
        tags[index] = "及物动词";
      }
      if (item == "vd") {
        tags[index] = "副动词";
      }
      if (item == "n") {
        tags[index] = "名词";
      }
      if (item == "v") {
        tags[index] = "动词";
      }
      if (item == "a") {
        tags[index] = "形容词";
      }
      if (item == "u") {
        tags[index] = "助词";
      }
      if (item == "d") {
        tags[index] = "副词";
      }
      if (item == "w") {
        tags[index] = "标点符号";
      }
      if (item == "p") {
        tags[index] = "介词";
      }
      if (item == "ns") {
        tags[index] = "地名";
      }
      if (item == "nz") {
        tags[index] = "专有名词";
      }
      if (item == "m") {
        tags[index] = "数词";
      }
      if (item == "f") {
        tags[index] = "方位词";
      }
      if (item == "nx") {
        tags[index] = "字符串";
      }
      if (item == "c") {
        tags[index] = "连词";
      }
      if (item == "r") {
        tags[index] = "代词";
      }
      if (item == "ORG") {
        tags[index] = "机构";
      }
      if (item == "LOC") {
        tags[index] = "地点";
      }
      if (item == "TIME") {
        tags[index] = "时间";
      }
      if (item == "t") {
        tags[index] = "时间词";
      }
      if (item == "s") {
        tags[index] = "处所词";
      }
    });
    words.forEach((item, index) => {
      analysis_list += `<tr>
         <td>${index + 1}</td>
         <td>${item}</td>
         <td>${tags[index]}</td>
         </tr>`;
    });
    strHtml = analysis_list;
  }

  var example = {
    msg: "",
    results: [
      {
        tag: [
          "v",
          "n",
          "v",
          "n",
          "w",
          "n",
          "a",
          "n",
          "w",
          "TIME",
          "LOC",
          "p",
          "a",
          "n",
          "f",
          "v",
          "u",
          "a",
          "n",
          "w",
          "n",
          "v",
          "n",
          "w",
          "vd",
          "v",
          "w",
          "a",
          "w",
          "n",
          "w",
          "a",
          "u",
          "t",
          "n",
          "n",
          "c",
          "m",
          "p",
          "s",
          "v",
          "v",
          "n",
          "u",
          "n",
          "a",
          "n",
          "n",
          "d",
          "v",
          "f",
          "w",
        ],
        word: [
          "坚持",
          "工业",
          "立",
          "市",
          "、",
          "制造业",
          "强",
          "市",
          "，",
          "2022年",
          "深圳",
          "在",
          "复杂",
          "局面",
          "中",
          "稳住",
          "了",
          "基本",
          "盘",
          "，",
          "经济",
          "保持",
          "韧性",
          "、",
          "持续",
          "向好",
          "，",
          "高端",
          "、",
          "高质",
          "、",
          "高新",
          "的",
          "现代",
          "产业",
          "体系",
          "和",
          "一批",
          "在",
          "国内外",
          "具有",
          "引领",
          "作用",
          "的",
          "战略性",
          "新兴",
          "产业",
          "集群",
          "正在",
          "形成",
          "之中",
          "。",
        ],
      },
    ],
    status: "000",
  };
  var dataList = [
    {
      tag: [
        "v",
        "n",
        "v",
        "n",
        "w",
        "n",
        "a",
        "n",
        "w",
        "TIME",
        "LOC",
        "p",
        "a",
        "n",
        "f",
        "v",
        "u",
        "a",
        "n",
        "w",
        "n",
        "v",
        "n",
        "w",
        "vd",
        "v",
        "w",
        "a",
        "w",
        "n",
        "w",
        "a",
        "u",
        "t",
        "n",
        "n",
        "c",
        "m",
        "p",
        "s",
        "v",
        "v",
        "n",
        "u",
        "n",
        "a",
        "n",
        "n",
        "d",
        "v",
        "f",
        "w",
      ],
      word: [
        "坚持",
        "工业",
        "立",
        "市",
        "、",
        "制造业",
        "强",
        "市",
        "，",
        "2022年",
        "深圳",
        "在",
        "复杂",
        "局面",
        "中",
        "稳住",
        "了",
        "基本",
        "盘",
        "，",
        "经济",
        "保持",
        "韧性",
        "、",
        "持续",
        "向好",
        "，",
        "高端",
        "、",
        "高质",
        "、",
        "高新",
        "的",
        "现代",
        "产业",
        "体系",
        "和",
        "一批",
        "在",
        "国内外",
        "具有",
        "引领",
        "作用",
        "的",
        "战略性",
        "新兴",
        "产业",
        "集群",
        "正在",
        "形成",
        "之中",
        "。",
      ],
    },
  ];

  $("#returnresult").html(syntaxHighlight(example));

  //分页函数
  function pagination(arr) {
    layui.use("laypage", function () {
      var laypage = layui.laypage;

      //执行一个laypage实例
      laypage.render({
        elem: "pagination",
        count: arr[0].word.length,
        limit: 20,
        groups: 3,
        layout: ["count", "prev", "page", "next", "skip"],
        jump: function (obj) {
          var tagList = dataList[0].tag.slice(
            (obj.curr - 1) * 20,
            obj.curr * 20
          );
          var wordList = dataList[0].word.slice(
            (obj.curr - 1) * 20,
            obj.curr * 20
          );
          renderWordtag(tagList, wordList);
          $("#analysis_list").html(strHtml);
        },
        theme: "#5369f8",
      });
    });
  }

  $(".analysis_name").click(function () {
    let edit_text = filterXSS(
      document.querySelector("#edit_item").value.trim()
    );
    if (edit_text) {
      let editObj = {
        text: [edit_text],
        batch_size: 10,
      };
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result);
      $("#marklayer").addClass("mark-show"); //加载状态

      $.ajax({
        method: "POST",
        headers: {
          "secret-id": secret_id,
          "secret-key": secret_key,
        },
        url: baseAPI + "/lac",
        contentType: "application/json",
        dataType: "json",
        data: resultJSON,
        success: function (res) {
          $("#marklayer").removeClass("mark-show");
          if (res.code == 200) {
            $(".table-responsive").removeClass("hide");
            $(".prompt_result").removeClass("hide");
            $(".prompt").each(function () {
              $(this).addClass("hide");
            });

            dataList = res.results;

            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);
            // console.log(res.results[0]);

            let tag = res.results[0].tag;
            let word = res.results[0].word;
            let tagList = "";
            tag.forEach((item, index) => {
              tagList += ` <span class="${item}">${word[index]}</span>`;
            });
            $("#extract_result").html(tagList);

            //样例中不存在的词性使用默认背景色
            $("#extract_result span").each(function (index) {
              if ($(this).css("background-color") == "rgba(0, 0, 0, 0)") {
                $(this).css("background-color", "#f3f4f7");
              }
            });

            // 插入分析列表数据
            let table_data = res.results;
            tagList = table_data[0].tag.slice(0, 20);
            wordList = table_data[0].word.slice(0, 20);
            renderWordtag(tagList, wordList);
            //   列表应该往列表后面添加元素,直接html会直接覆盖原来的
            $("#analysis_list").html(strHtml);

            pagination(table_data);
          }
        },
      });
    } else {
      $(".message-error .message_content").html("请输入文本内容");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  });
});
