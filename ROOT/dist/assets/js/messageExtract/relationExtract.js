$(".request_address").attr("href", requestAddress + "/extractRelations");
$(".request_address").html(requestAddress + "/extractRelations");

var exampleList = [
  "深圳市物业发展(集团)股份有限公司\n证券代码：000011  200011  股票简称：深物业A  深物业B  编号：2014-3号 \n\n关于海南公司进行破产清算的进展公告本公司及董事会全体成员保证公告内容的真实、准确、完整、及时、公平，没有虚假记载、误导性陈述或者重大遗漏。本公司于2011年11月25日第七届董事会第四次会议作出董事会决议，拟对本公司下属全资子公司-海南新达开发总公司（以下简称“海南公司”）进行破产清算（详见本公司于2011 年 11 月 28 日发布的《董事会决议公告》）。本公司于2013年9月26日以海南公司多年来处于严重亏损状态，无法清偿到期债务为由向海南省海口市中级人民法院（以下简称“海口中院”）申请对海南公司进行破产清算。\n\n一、最新进展情况 \n2014年3月14日本公司收到海口中院下发的（2013）海中法破（预）字第7号《民事裁定书》，海口中院于2014年2月27日裁定受理本公司提出的对海南公司破产清算的申请，现将有关情况公告如下：海口中院认为：新达公司的住所地在海口市国贸大道48号新达商务大厦，该司是由南省工商行政管理局核准登记的企业，故海口中院对本案有管辖权。因新达公司不能清偿到期债务，故深物业股份公司提出对新达公司进行破产清算的申请符合受理条件。依照《中华人民共和国企业破产法》第二条第一款、第三条、第七条第二款之规定，裁定如下：受理申请人母公司深圳市物业发展（集团）股份有限公司对被申请人海南新达开发总公司破产清算的申请。本裁定自即日起生效。\n\n 二、其他情况 \n本公司已对海南公司账务进行了全额计提，破产清算对本公司财务状况无影响。具体情况请查阅本公司2011年11月28日发布的《董事会决议公告》。\n\n特此公告 \n\n备查文件：海南省海口市中级人民法院《民事裁定书》（（2013）海中法破（预）字第 7 号） \n\n深圳市物业发展（集团）股份有限公司 \n董事会 \n二〇一四年三月十五日",
  "2022语言与智能技术竞赛由中国中文信息学会和中国计算机学会联合主办，微软公司、中国中文信息学会评测工作委员会和中国计算机学会自然语言处理专委会承办，已连续举办4届，成为全球最热门的中文NLP赛事之一。",
];

var extractRange = ["子公司,母公司,法院", "主办方,承办方,已举办次数"];

var current = 0;
$(".extract_range").val(extractRange[current]);
$("#edit_item").val(exampleList[current]);

function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  document.querySelector("#edit_item").value = exampleList[index - 1];
  document.querySelector(".extract_range").value = extractRange[index - 1];
  current = index - 1;
}

var probabilityAll = [];
var edit_text = document.querySelector("#edit_item").value;
var editObj = {
  text: edit_text,
  sch: ["子公司", "母公司", "法院"],
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result);
var returnObj = {
  msg: "事件抽取成功",
  result: [
    {
      法院: [
        {
          probability: 0.6238039223679692,
          start: 291,
          end: 303,
          text: "海南省海口市中级人民法院",
        },
        {
          probability: 0.9371569556740909,
          start: 742,
          end: 754,
          text: "海南省海口市中级人民法院",
        },
      ],
      母公司: [
        {
          probability: 0.9651490709506767,
          start: 599,
          end: 616,
          text: "深圳市物业发展（集团）股份有限公司",
        },
      ],
      子公司: [
        {
          probability: 0.8871449823017628,
          start: 185,
          end: 194,
          text: "海南新达开发总公司",
        },
        {
          probability: 0.42622746082865604,
          start: 599,
          end: 616,
          text: "深圳市物业发展（集团）股份有限公司",
        },
        {
          probability: 0.3507264208312648,
          start: 519,
          end: 526,
          text: "深物业股份公司",
        },
      ],
    },
  ],
  code: "200",
};
$("#returnresult").html(syntaxHighlight(returnObj));

$(".analysis_name").click(function () {
  var edit_text = filterXSS(document.querySelector("#edit_item").value.trim());
  var extract_range = filterXSS(
    $(".extract_range").val().replace("，", ",").trim()
  );
  if (edit_text && extract_range) {
    $("#marklayer").addClass("mark-show"); //加载状态
    var editObj = {
      text: edit_text,
      sch: extract_range.split(","),
    };
    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result);
    $.ajax({
      method: "POST",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      url: baseAPI + "/extractRelations",
      contentType: "application/json",
      dataType: "json",
      data: resultJSON,
      success: function (res) {
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          $("#returnresult").html(syntaxHighlight(res));

          if ($(".empty-text").length > 0) {
            $(".empty-text").remove();
          }

          if (res.result.length > 0) {
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");

            var strHtml = "";
            var index = 1;
            var curr = 0;
            var dataList = res.result[0];
            for (var key in dataList) {
              var texts = [];
              var probabilitys = [];
              for (var i = 0; i < dataList[key].length; i++) {
                texts.push(dataList[key][i].text);
                probabilitys.push(dataList[key][i].probability);
              }

              if (probabilitys.join(",").length > 50) {
                probabilityAll.push(probabilitys.join(","));
                curr++;
              }
              strHtml += `<tr>
            <td>${index}</td>
            <td>${key}</td>
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
            $("#analysis_list").html(strHtml);
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
  } else if (!edit_text && !extract_range) {
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
  } else if (!extract_range) {
    $(".message-error .message_content").html("请先输入抽取范围");
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
