$(".request_address").attr("href", requestAddress + "/topic");
$(".request_address").html(requestAddress + "/topic");

var exampleList = [
  "94元血氧仪涨到299元!鱼跃集团回应:货源紧俏,系商家自行定价\n今日鱼跃集团回应血氧仪涨价鱼跃这次又要挣的盆满钵满\n鱼跃集团回应血氧仪涨价 血氧仪断货、涨价还限购!原价五六十元现已翻倍\n鱼跃医疗“领跑”血氧仪乱象|鱼跃医疗已给出回应  鱼跃集团回应血氧仪涨价\n血氧仪涨价,鱼跃医疗回应又改口了!\n网友爆料94元血氧仪涨到299元?鱼跃集团回应\n鱼跃医疗改口!回应血氧仪涨价:因成本上涨取消折扣和优惠\n鱼跃医疗因血氧仪涨价被质疑,揭秘背后老板起家史\n鱼跃集团回应血氧仪涨价,于越这次一定要赚很多钱\n血氧仪涨价几倍发国难财?鱼跃医疗回应\n市监部门回应鱼跃血氧仪涨价\n血氧仪卖断货，鱼跃被曝“趁疫打劫”暴涨3倍！鱼跃回应：“是商家自行定价”",
  "上海警方通报王某某等殴打路人\n网传王思聪花百万和解？网友质疑头像不符\n王某某打人疑似现场图曝光\n律师解读：若达成和解王某某将免于处罚\n上海警方：对王某某的处罚依法依规\n媒体评王思聪打人：有钱不能为所欲为\n王思聪行政处罚会撤销吗？律师解读\n权威人士：打人者王某某系王思聪\n上海警方通报：王某某殴打路人，因提请行政复议暂缓行拘\n王思聪豪掷200万与对方和解,但还有3个疑点需要解答\n上海静安发生一起殴打事件 违法者已被行拘\n王思聪打人花209万和解?疑其朋友圈截图曝光,本尊发声回应",
  "国家全面助力推进农业现代化发展，\n创建国家级农业产业园，\n助力农业现代化发展，\n为“上合”国家农业合作发展提供“中国方案，\n全面推进乡村振兴为实现农业农村现代化而不懈奋斗，\n财政部:助力乡村全面振兴和农业农村现代化，\n科技引领乡村振兴，推动农业农村现代化，\n加快推动农业现代化，助力乡村全面振兴，\n乡村振兴要实现农业与农村的同步现代化，\n助力乡村振兴和农业现代化，\n推进农机化高质量发展，助力乡村振兴和农业农村现代化。",
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
$("#result").html(result); //请求示例

var dataList = {
  msg: "主题抽取成功",
  results: ["94元血氧仪涨到299元? 鱼跃医疗已给出回应"],
  status: "000",
};

$("#returnresult").html(syntaxHighlight(dataList)); //返回示例

//点击事件
$(".analysis_name").click(function () {
  var edit_text = filterXSS(document.querySelector("#edit_item").value.trim());
  if (edit_text) {
    var editObj = {
      text: edit_text,
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
      url: baseAPI + "/topic",
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

          if (res.results.length > 0) {
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");

            var str = `<tr>
          <td>1</td>
          <td>${res.results[0]}</td>
          <td>0.9232456</td>
        </tr>`;
            $("#analysis_list").html(str);
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
    $(".message-error .message_content").html("请输入文本内容");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  }
});
