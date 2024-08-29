$(".request_address").attr("href", requestAddress + "/summary");
$(".request_address").html(requestAddress + "/summary");
var exampleList = [
  "继前不久始于中国的召回风波，宝马因为车辆的发动机螺栓故障，在全球范围将召回48.9万辆车，在原有中国召回的基础上数量进一步增加。据悉，召回车辆将包括北美市场的15.6万辆，宝马曾于3月宣布在华召回232,098辆发动机螺栓故障车辆。涉及车型包括搭载六缸发动机的宝马5系、7系、X3、X5，。但具体型号Santer并没有透露。宝马发言人Bernhard Santer表示，目前尚无该故障造成事故或伤亡的报告。但他仍建议相关车主及时检查车辆引擎。Santer说，凭借剩余的动力，车辆仍旧可以坚持到最近的修理厂。",
  "纵观人类发展史，创新始终是一个国家、一个民族发展的不竭动力和生产力提升的关键要素。科技创新是百年未有之大变局中的一个关键变量，各主要国家纷纷把科技创新作为国际战略博弈的主要战场，围绕科技制高点的竞争空前激烈，谁牵住了科技创新这个“牛鼻子”，谁走好了科技创新这步先手棋，谁就能占领先机、赢得优势。反之，则会造成发展动力衰减和能力天花板。党的十八大以来，以习近平同志为核心的党中央把科技创新摆在国家发展全局的核心位置，以改革驱动创新、以创新驱动发展，我国经济实力、科技实力、综合国力跃上新的大台阶。新时代新征程，要坚持把国家和民族发展放在自己力量的基点上，充分认识实现高水平科技自立自强对增强我国发展竞争力和持续力的决定性意义。科技自立自强不仅是发展问题更是生存问题，以高水平科技自立自强的“强劲筋骨”支撑民族复兴伟业，这是面向未来的必然选择甚至是不二选择。",
  "盐城市兰丰环境工程科技有限公司大力引进专业人才，仅工程师团队就有60多人，其中40多人具备中高级职称，涵盖环境工程、机械、化工、电气等专业；加大科研经费投入，每年研发费用近千万元，购进大量专用设备，建成省级技术中心及博士后创新实践基地等研发平台。该公司还联合中国矿业大学、安徽理工大学等知名高校，在中国矿业大学副校长、教授、博士周福宝的主持下，2012年6月1日开始研究巷/隧道施工粉尘污染治理项目。不久，该项目被列入国家星火计划、火炬计划。公司申报的“巷/隧道干式过滤除尘技术研究与工程应用”项目获得2021年度江苏省科学技术奖一等奖。公司高度重视知识产权管理工作，推动专利等由重数量向重质量的转变，发明专利“矿用防爆式除尘器”获盐城市专利奖金奖，并参加省专利奖的评选。",
];
$("#edit_item").val(exampleList[0]);

function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  document.querySelector("#edit_item").value = exampleList[index - 1];
}

var absrtactPercent = 2;
function changePercent() {
  var selectDom = document.querySelector(".absrtact-percent");
  var index = selectDom.selectedIndex; //获取选中项的索引
  absrtactPercent = JSON.parse(
    document.querySelectorAll(".absrtact-percent option")[index].value
  );
}

var edit_text = document.querySelector("#edit_item").value;
var editObj = {
  text: edit_text,
  // percent: 2,
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result); //请求示例

var dataList = {
  msg: "自动摘要抽取成功",
  code: "200",
  results: {
    summary: [
      "继前不久始于中国的召回风波，宝马因为车辆的发动机螺栓故障，在全球范围将召回48.9万辆车，在原有中国召回的基础上数量进一步增加。据悉，召回车辆将包括北美市场的15.6万辆，宝马曾于3月宣布在华召回232,098辆发动机螺栓故障车辆。Santer说，凭借剩余的动力，车辆仍旧可以坚持到最近的修理厂。",
    ],
  },
};

$("#returnresult").html(syntaxHighlight(dataList)); //返回示例

//点击事件
$(".analysis_name").click(function () {
  var edit_text = filterXSS(document.querySelector("#edit_item").value.trim());
  if (edit_text) {
    var editObj = {
      text: edit_text,
      // percent: absrtactPercent,
    };
    $(".plan-choose .custom-control-input").each(function (index) {
      if ($(this).prop("checked")) {
        if (index == 1) {
          editObj.type = "v2";
        }
      }
    });
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
      url: baseAPI + "/summary",
      contentType: "application/json",
      dataType: "json",
      data: resultJSON,
      success: function (res) {
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          $(".analysis_info").removeClass("hide");
          $(".prompt").addClass("hide");
          // console.log(res);
          var strHtml = "";
          res.results.summary.forEach((item, idnex) => {
            strHtml += item + "\n";
            // strHtml += JSON.parse(item);
          });
          console.log(strHtml);
          document.querySelector(".analysis_result").innerHTML = strHtml;

          var resJSON = JSON.stringify(res);
          resObj = JSON.parse(resJSON);
          var returnresult = syntaxHighlight(resObj);
          $("#returnresult").html(returnresult);
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
