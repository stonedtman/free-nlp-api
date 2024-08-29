$(".request_address").attr("href", requestAddress + "/extract");
$(".request_address").html(requestAddress + "/extract");

var exampleList = [
  {
    sch: "电影,导演,票房,演员,总票房",
    text: "吴京再破纪录 超290亿元！《流浪地球2》《满江红》彻底火了 这些上市公司要嗨了？】截至2023年1月22日21时59分，2023年春节档(1月21日-1月27日)总票房(含预售)破18亿！《流浪地球2》《满江红》《无名》电影分列春节档票房前三位。吴京主演作品票房290亿元，超沈腾255.98亿元再创纪录。值得注意的是，7部春节档电影的背后涉及到多家影视上市公司。据了解，光线传媒在春节档有4部关联影片，该公司主投的有《深海》，参投的电影有《满江红》《交换人生》和《中国乒乓之绝地反击》。春节档预售两天破亿，基于前五日预售票房为近五年最高，预测春节档的整体票房有望突破90亿。据猫眼专业版数据，截至2023年1月22日21时59分，2023年春节档(1月21日-1月27日)总票房(含预售)破18亿！《流浪地球2》《满江红》《无名》电影分列春节档票房前三位，其中《流浪地球2》《满江红》两部电影票房都超过了5亿，电影《无名》超过2亿，另外几部片子也都超1亿。而截至21点47分，春节档总票房达到18亿之多。《流浪地球2》逼近6亿领跑。而吴京主演作品总票房290亿元，超沈腾255.98亿元再创纪录。值得一提的是电影《流浪地球2》上映首日已打破14项纪录，获得34项里程碑成就；电影《满江红》上映首日已打破10项纪录，获得37项里程碑成就。既有2019年斩获47亿票房的科幻电影《流浪地球》的续集《流浪地球2》，由吴京、李雪健、刘德华参演。也有张艺谋执导、沈腾和易烊千玺双主演的电影《满江红》。还有梁朝伟和周迅主演、王一博首次出演的谍战电影《无名》。还有张小斐、雷佳音、张宥浩主演的喜剧电影《交换人生》。动画电影《熊出没·伴我“熊芯”》、《大圣归来》导演田晓鹏回归之作《深海》。邓超、孙俪、许魏洲、段博文等主演的体育类型的电影《中国乒乓之绝地反击》。科幻电影《流浪地球2》由郭帆执导，刘慈欣监制，吴京、李雪健、沙溢、宁理、王智、朱颜曼滋领衔主演，刘德华特别演出。在电影中，吴京饰演刘培强、刘德华饰演图恒宇、首次尝试科幻题材的老戏骨李雪健饰演周喆直、沙溢饰演的张鹏。作为电影《流浪地球》的前传，《流浪地球2》展现的是危机初期人类内部的怀疑、冲突与分歧。如今整整跨越四年时间，《流浪地球2》又会给我们带来什么不一样的内容。吴京此前在北京首映礼现场表示，相比《流浪地球》，该片不管在特效制作上还是故事上都“好一点”，而为了这一点，剧组人员付出了极大的努力，“我敢说，《流浪地球2》就是中国科幻电影的底气。”刘德华曾说，参演《流浪地球2》，改变了他对科幻片的看法，据新华视点22日报道，在导演郭帆看来，从《流浪地球》到《流浪地球2》，一个共同点是，它们都植根于中华文化。",
  },
];

$(".extract-range").val(exampleList[0].sch);
$("#edit_item").val(exampleList[0].text);

var modelID;
function pickModel() {
  var selectDom = document.querySelector(".project-list");
  var index = selectDom.selectedIndex; //获取选中项的索引
  $(".api-intro").html(
    "使用已训练的模型对输入的文本进行字段的信息抽取，如果需要修改抽取字段，请到配置管理界面项目里自定义schema。"
  );
  modelID = parseInt(
    $(".project-list .option")
      .eq(index - 1)
      .attr("id")
  );
  getRandomSample(modelID);
  if ($(".extract-range").length > 0) {
    $(".extract-range").remove();
  }
}

function getProjectList() {
  $.ajax({
    method: "get",
    url: configAPI + "/info/project/usingProject",
    contentType: "application/json",
    dataType: "json",
    data: {},
    success: function (res) {
      if (res.code == 200) {
        var strHtml = `<option selected hidden>请选择模型</option>`;
        res.result.forEach((item) => {
          strHtml += `<option class="option" id="${item.id}">${item.name}</option>`;
        });
        $(".project-list").html(strHtml);
      }
    },
  });
}
getProjectList();

function getRandomSample(id) {
  $.ajax({
    method: "get",
    url: configAPI + "/info/project/randomSample",
    contentType: "application/json",
    dataType: "json",
    data: { projectId: id },
    success: function (res) {
      if (res.code == 200) {
        $("#edit_item").val(res.result.text);
      }
    },
  });
}

var probabilityAll = [];
var edit_text = document.querySelector("#edit_item").value;
var extract_range = document.querySelector(".extract-range").value;
var editObj = {
  text: edit_text,
  sch: extract_range,
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result);

var returnObj = {
  msg: "自定义抽取成功",
  result: [
    {
      电影: [
        {
          probability: 0.447788300885577,
          start: 14,
          end: 19,
          text: "流浪地球2",
        },
        {
          probability: 0.779768879292078,
          start: 507,
          end: 512,
          text: "流浪地球2",
        },
        {
          probability: 0.867846990362672,
          start: 1029,
          end: 1034,
          text: "流浪地球2",
        },
      ],
      导演: [
        {
          probability: 0.36095899580749347,
          start: 725,
          end: 728,
          text: "田晓鹏",
        },
        {
          probability: 0.4880764460568763,
          start: 785,
          end: 787,
          text: "郭帆",
        },
        {
          probability: 0.5413162261072202,
          start: 620,
          end: 623,
          text: "张艺谋",
        },
        {
          probability: 0.9976698530864603,
          start: 1090,
          end: 1092,
          text: "郭帆",
        },
      ],
      票房: [
        {
          probability: 0.29792509764083874,
          start: 7,
          end: 12,
          text: "290亿元",
        },
        {
          probability: 0.8630730325084528,
          start: 577,
          end: 580,
          text: "47亿",
        },
      ],
      演员: [
        {
          probability: 0.7981827962861097,
          start: 0,
          end: 2,
          text: "吴京",
        },
        {
          probability: 0.4648567047439691,
          start: 809,
          end: 811,
          text: "王智",
        },
        {
          probability: 0.614157649997189,
          start: 608,
          end: 611,
          text: "李雪健",
        },
        {
          probability: 0.5589700689954071,
          start: 605,
          end: 607,
          text: "吴京",
        },
        {
          probability: 0.490502682374256,
          start: 803,
          end: 805,
          text: "沙溢",
        },
        {
          probability: 0.5534777082991837,
          start: 612,
          end: 615,
          text: "刘德华",
        },
        {
          probability: 0.4857184436136208,
          start: 806,
          end: 808,
          text: "宁理",
        },
        {
          probability: 0.25604454320331627,
          start: 647,
          end: 650,
          text: "梁朝伟",
        },
        {
          probability: 0.9882570255199425,
          start: 1048,
          end: 1051,
          text: "刘德华",
        },
      ],
      总票房: [
        {
          probability: 0.3923804543075029,
          start: 7,
          end: 12,
          text: "290亿元",
        },
        {
          probability: 0.4242829010296454,
          start: 577,
          end: 580,
          text: "47亿",
        },
      ],
    },
  ],
  code: "200",
};
$("#returnresult").html(syntaxHighlight(returnObj));

$(".analysis_name").click(function () {
  var edit_text = filterXSS($("#edit_item").val().trim());
  var extract_range = "";
  if (!modelID) {
    extract_range = filterXSS(
      $(".extract-range").val().trim().replace(/，/g, ",")
    );
  }
  if ((edit_text && extract_range) || (edit_text && modelID)) {
    var editObj = {
      text: edit_text,
      sch: extract_range,
      modelID,
    };
    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result);
    $("#marklayer").addClass("mark-show");

    $.ajax({
      method: "POST",
      url: baseAPI + "/extract",
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

            var table_data = resObj.result[0];
            var analysis_list = "";
            var index = 1;
            var curr = 0;
            for (var item in table_data) {
              var texts = [];
              var probabilitys = [];
              table_data[item].forEach((item) => {
                texts.push(item.text);
                probabilitys.push(item.probability);
              });

              if (probabilitys.join(",").length > 50) {
                probabilityAll.push(probabilitys.join(","));
                curr++;
              }

              analysis_list += `<tr>
                          <td>${index}</td>
                          <td>${item}</td>
                          <td>${texts.join(",")}</td>
                          <td>${
                            probabilitys.join(",").length > 50
                              ? `<span class='probability'>${probabilitys
                                  .join(",")
                                  .slice(0, 50)}</span>` +
                                `<span class='ellipsis'>...</span>` +
                                `<span class='show_all' onclick=showAll(${curr})>全部</span>` +
                                `<span class='show_part' onclick=showPart(${curr})>收起</span>`
                              : `<span>${probabilitys.join(",")}</span>`
                          }</td>
                        </tr>`;
              index++;
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
  } else if (!modelID && !edit_text && !extract_range) {
    $(".message-error .message_content").html("请先输入抽取范围和内容");
    $("#changePassword").modal("hide");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  } else if (!edit_text) {
    $(".message-error .message_content").html("请先输入抽取内容");
    $("#changePassword").modal("hide");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  } else if (!modelID && !extract_range) {
    $(".message-error .message_content").html("请先输入抽取范围");
    $("#changePassword").modal("hide");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  } else if (!modelID && $(".extract-range").length == 0) {
    $(".message-error .message_content").html(
      "请选择模型，如若没有请先创建模型！"
    );
    $("#changePassword").modal("hide");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  }
});

function showAll(index) {
  $(".probability")
    .eq(index - 1)
    .html(probabilityAll[index - 1]);
  $(".ellipsis")
    .eq(index - 1)
    .css("display", "none");
  $(".show_all")
    .eq(index - 1)
    .css("display", "none");
  $(".show_part")
    .eq(index - 1)
    .css("display", "inline-block");
}

function showPart(index) {
  $(".probability")
    .eq(index - 1)
    .html(probabilityAll[index - 1].slice(0, 50));
  $(".ellipsis")
    .eq(index - 1)
    .css("display", "inline-block");
  $(".show_all")
    .eq(index - 1)
    .css("display", "inline-block");
  $(".show_part")
    .eq(index - 1)
    .css("display", "none");
}
