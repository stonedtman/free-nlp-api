$(".request_address")
  .eq(0)
  .attr("href", requestAddress + "/classify");
$(".request_address")
  .eq(0)
  .html(requestAddress + "/classify");
$(".request_address")
  .eq(1)
  .attr("href", requestAddress + "/classify");
$(".request_address")
  .eq(1)
  .html(requestAddress + "/classify");

var exampleList = [
  "打了684场比赛，周鹏创造CBA历史上出场数最高纪录\n昨天与上海队的比赛，是深圳队老将周鹏CBA生涯的第684场比赛，他超越了前队友广东传奇名宿朱芳雨的683场纪录成为CBA历史出场数第一人！CBA官方与深圳男篮官方均发布海报给周鹏送上祝贺。CBA官方海报配文写道，“积跬步至千里！恭喜周鹏CBA联赛出场次数684场跃居历史第一！#当燃由我#。”33岁的周鹏已在CBA征战了17年，前16年一在广东队效力，本赛季加盟深圳队。他在职业生涯中获得过8届CBA总冠军（2007-08至2010-11赛季、2012-13赛季2018-19至2020-21赛季）2007年，周鹏首次入选中国国家男子篮球队。他代表国家队先后出战2届亚运会（2010年2014年）、2届亚锦赛（2013年、2015年）、1届亚洲杯（2017年）、1届世锦赛（2010年 ）和2届奥运会（2012年2016年），获得过1届亚运会冠军（2010年）和1届亚锦赛冠军（2015年）。值得一提的是，截至目前周鹏CBA生涯经取得559场胜利，同样是高居CBA历史第一位。 ",
  "未来Apple Watch或将采用MicroLED屏幕 由LG加工生产 \n\n此前有外媒报道称，苹果将为未来推出采用MicroLED屏幕的Apple Watch，并且该产品有望在2025年上市。而在近有业内人士表示，LG Display正在建设一条小型生产线，为苹果供应microLED屏幕，这些屏幕将用于2025年Apple Watch上。据悉，首款搭载microLED屏幕的Apple Watch很有可能是最顶尖的Apple Watch Ultra，它将采一块2.1英寸的microLED屏幕。与当前配备OLED屏幕的Apple Watch，MicroLED屏幕的亮度更高，而且新屏幕的尺也更大。MicroLED是指以自发光的微米量级的LED为发光像素单元，将其组装到驱动面板上形成高密度LED阵列的显技术。MicroLED在显示方面与LCD、OLED相比在亮度、分辨率、对比度、能耗、使用寿命、响应速度和热稳定性等面具有更大的优势。",
  "2023年妖股来了！兔宝宝股价创出7年新高，总经理却要减持了\n\n新年伊始，兔宝宝（002043.SZ）股价“平地起高楼”，走出7天4板的行情。2023年1月13日，兔宝宝盘中也曾涨停，随着卖盘增加，该股最终以下跌1.78%报收16.60元，最高曾涨至18.59元，这一价格是自2015年10月以来的历史高。但是，就在二级市场一片欢呼之际，兔宝宝的公司董事、总经理却表示，要减持。1月13日晚，兔宝宝发布公称，董事、总经理陆利华直接持有公司股份756.1356万股，计划自本公告之日 起15个交易日后的6个月内以集中竞或大宗交易方式减持公司股份不超过189.0339万股（含本数）。套现约为3100万元，自进入2023年，兔宝宝一改去年末震荡走势，股价飞升。自1月4日起，兔宝宝股价连续7个交易日上涨。1月10日-12日，连续三个交易日，兔宝宝票交易价格涨幅偏离值累计超过20%。针对股票交易波动异常，兔宝宝在公告中回应称，公司不存在应披露而未披露事项；公司前期披露的信息不存在需要更正和补充之处；近期公司经营情况及内外部经营环境未发生重大改变。或由于基本面难以支撑股价持续上涨，截至13日收盘，兔宝宝股价下滑至16.60元，跌幅达1.78%。1月13日，针对股和经营情况等问题，时代周报记者拨打了兔宝宝的董秘办公室电话，但始终无法接通。微妙的是，同日晚间，兔宝发布公告称，公司董事、总经理陆利华将坚持公司股份189.0339万股（含本数），拟减持数量占公司总股本比例不过0.2446%，不超过其所持公司股份总数的25%。天眼查显示，陆利华为兔宝宝股东之一，持股比例为0.98%。公中，兔宝宝解释称，陆利华的减持原因为个人资金需求。中国家居、设计互联网战略专家王建国告诉时代周报记者中国人炒股“技术”复杂，传统文化“生肖兔”令部分投资者认为是好意头，进而产生特别的投资偏好。1月13日，除人股兔宝宝涨停外，大亚圣象（000910.SZ）同样涨停。截至收盘，匠心家居（301061.SZ）涨幅达6.4%，梦百（603313.SH）涨幅达6.26%。中邮证券在研报中表示，当前来看，房地产政策、资金支持加码、市场信心修复，“交楼”落地或将加快。地产链消费建材需求端边际回暖、应收账款回款压力减轻，消费建材企业将有望获得业绩改善",
  "《英雄联盟》新作在韩国过审：玩家将扮演塞拉斯\n\n一款尚未公布的《英雄联盟》衍生游戏已经在韩国通过评级，该作名为“Mageseeker：A League of Legends Story”，玩家将在游中扮演塞拉斯。根据评级页面显示，游戏类型为动作，将登陆PC平台，带有在线要素，此外，游戏因“针对人类/非人类的连续战斗面”而被评为12+。从命名规律上来看，“Mageseeker：A League of Legends Story”很可能是一款外传性质的《英雄联盟》衍生戏，因为拳头此前还为公布过其他《英雄联盟》衍生游戏，像是《努努之歌：英雄联盟外传》《聚点危机：英雄联盟外传》等。",
  "李亚鹏私下太节俭，牛仔裤穿10年全是破洞不愿丢，老婆花30元缝补\n\n1月13日，海哈金喜在社交平台上晒出为老公缝裤子的视频，还调侃道：“既然这么喜欢，那就缝缝补补又三年嘛。”末她还特意艾特了李亚鹏，暗戳戳的秀了一把恩爱。事情的起因是，前几天李亚鹏抱着女儿回忆自己的年少时代，穿着一条洗到褪色的牛仔裤，坐在地上翻看一封封书信。这原本是非常温馨的画面，然而有不少网友一眼就看到了牛仔裤上的破洞，纷纷提醒他要换新的了，不然有些尴尬。海哈金喜回复：“这是鹏哥钟爱了十年的裤子，他舍不扔。”别说是明星，就算是普通人，一条牛仔裤都很难穿五年，更何况是十年。可李亚鹏却数十年如一日的钟爱这条子，可见他私下非常节俭，同时又很念旧。也许这条裤子对李亚鹏来说非常重要，承载着许多美好的回忆，又或者是因为它穿着最舒服。不管是什么原因，海哈金喜都很尊重老公的想法，她没有擅自做主把破裤子扔了，而是认真取家里长辈的意见，询问有没有人可以帮忙缝好这条裤子。即便长辈们都看不下去，劝她可以扔掉了，海哈金喜却没有这么做。她跑了很久才找到一家“宝藏”裁缝店，拿出裤子的一瞬间，自己都忍不住笑出了声。海哈金喜耐心地裁缝展示裤子上的破洞，裤子大腿位置、臀部、膝盖处几乎全都是破洞。她一遍遍强调破洞有点多，希望都能缝好，可以用几块布来打补丁，只要能修好就行。为了不影响裤子的美观，裁缝没有增加补丁，而是用同色系的线缝了很多遍，最终裤子上的洞补好了，看起来却皱皱巴巴的，十分老旧。海哈金喜高兴地把裤子拿回去，还用心地套奢侈品牌的盒子里，假装给老公买了新裤子。然而，李亚鹏看到大牌盒子的时候，并没有特别高兴，还说自己又不这么好的，言下之意就是没必要花这个冤枉钱。可当他看到盒子里装的是原来那条牛仔裤后，一瞬间就特别高兴，至还有些感动的想哭。李亚鹏本以为是老婆亲手缝制的，不过海哈金喜很坦诚地告诉他自己花了30块钱，找裁缝补的，自己没这个手艺。从一条破裤子就可以感受到海哈金喜有多爱李亚鹏，不少人都说鹏哥娶对人了。其实，感情相互的，男方勤俭持家，女方温柔体贴，他们彼此都很爱对方，这样的婚姻才能长久。",
];

$("#common_text").val(exampleList[0]);
var strHtml = "<option selected hidden>请选择分析示例数据</option>";
exampleList.forEach((item, index) => {
  strHtml += `<option>示例${index + 1}</option>`;
});
$(".pick-example").html(strHtml);

var currentTab = 0;
function changeTab(index) {
  currentTab = index;
  if (index == 0) {
    $("#common_text").val(exampleList[0]);
    var strHtml = "<option selected hidden>请选择分析示例数据</option>";
    exampleList.forEach((item, index) => {
      strHtml += `<option>示例${index + 1}</option>`;
    });
    $(".pick-example").html(strHtml);
  } else if (index == 1) {
    $("#labels_text").val(exampleList[0]);
    var strHtml = "<option selected hidden>请选择分析示例数据</option>";
    exampleList.forEach((item, index) => {
      strHtml += `<option>示例${index + 1}</option>`;
    });
    $(".pick-example").html(strHtml);
  } else {
    $("#levels_text").val(exampleList[0]);
    var strHtml = "<option selected hidden>请选择分析示例数据</option>";
    exampleList.forEach((item, index) => {
      strHtml += `<option>示例${index + 1}</option>`;
    });
    $(".pick-example").html(strHtml);
  }
}

function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  if (currentTab == 0) {
    $("#common_text").val(exampleList[index - 1]);
  } else if (currentTab == 1) {
    $("#labels_text").val(exampleList[index - 1]);
  }
}

var edit_text = document.querySelector("#common_text").value;
var editObj = {
  text: edit_text,
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$(".common_result").html(result);

var dataList = {
  msg: "通用分类成功",
  result: [
    {
      score: 0.9999989698096228,
      label: "体育",
    },
    {
      score: 0.0000010301044368111695,
      label: "游戏",
    },
  ],
  code: "200",
};

$(".common_returnresult").html(syntaxHighlight(dataList));

$(".common_analysis").click(function () {
  var edit_text = filterXSS(
    document.querySelector("#common_text").value.trim()
  );
  if (edit_text) {
    var editObj = {
      text: edit_text,
    };
    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $(".common_result").html(result);
    $("#marklayer").addClass("mark-show"); //加载状态
    $.ajax({
      method: "POST",
      headers: {
        token,
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      url: baseAPI + "/classify",
      contentType: "application/json",
      dataType: "json",
      data: resultJSON,
      success: function (res) {
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          var resJSON = JSON.stringify(res);
          resObj = JSON.parse(resJSON);
          var returnresult = syntaxHighlight(resObj);
          $(".common_returnresult").html(returnresult);

          if ($("#common_classify .empty-text").length > 0) {
            $("#common_classify .empty-text").each(function () {
              $(this).remove();
            });
          }

          if (res.result.length > 0) {
            $(".common_table").removeClass("hide");
            $("#common_chart").removeClass("hide");
            $(".prompt").eq(0).addClass("hide");
            $(".prompt").eq(1).addClass("hide");

            var analysis_list = "";
            var maxVal = resObj.result[0].score;
            var maxLabel = resObj.result[0].label;
            resObj.result.forEach((item, index) => {
              // 分析结果为其中的最大值
              if (item.score > maxVal) {
                maxVal = item.score;
                maxLabel = item.label;
              }
              analysis_list += `<tr>
                          <td>${index + 1}</td>
                          <td>${item.label}</td>
                          <td>${item.score}</td>
                        </tr>`;
            });

            $("#common_list").html(analysis_list);

            var label = [];
            var score = [];
            resObj.result.forEach((item) => {
              var scores = item.score * 100;
              label.push(item.label);
              // score.push(Math.round((scores)));
              score.push(scores.toFixed(2));
            });
            // console.log(score)
            var e = {
              chart: {
                height: 380,
                type: "bar",
                color: "",
                toolbar: {
                  show: !1,
                },
              },
              plotOptions: {
                bar: {
                  dataLabels: {
                    position: "top",
                  },
                  columnWidth: "15%",
                },
              },
              dataLabels: {
                enabled: true, //启用数据标签，即是否直接在图标上显示数据
                formatter: function (val) {
                  return val + "%";
                },
                offsetY: -25,
                style: {
                  fontSize: "14px",
                  colors: ["#304758"],
                },
              },
              series: [
                {
                  name: "得分",
                  data: score,
                },
              ],
              xaxis: {
                categories: label,
                position: "bottom",
                labels: {
                  style: {
                    colors: ["#000", "#ff5c75"],
                    // offsetY: 18,

                    fontSize: "18px",
                    fontWeight: 500,
                  },
                },
                axisBorder: {
                  show: !1,
                },
                axisTicks: {
                  show: !1,
                },
                crosshairs: {
                  fill: {
                    type: "gradient",
                    gradient: {
                      colorFrom: "#D8E3F0",
                      colorTo: "#BED1E6",
                      stops: [0, 100],
                      opacityFrom: 0.4,
                      opacityTo: 0.5,
                    },
                  },
                },
                tooltip: {
                  enabled: !0,
                  offsetY: -35,
                },
              },
              fill: {
                gradient: {
                  enabled: !1,
                  shade: "light",
                  type: "horizontal",
                  shadeIntensity: 0.25,
                  gradientToColors: void 0,
                  inverseColors: !0,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [50, 0, 100, 100],
                  colors: ["#F44336", "#E91E63", "#9C27B0"],
                },
              },
              yaxis: {
                axisBorder: {
                  show: !1,
                },
                axisTicks: {
                  show: !1,
                },
                labels: {
                  show: !1,
                  formatter: function (e) {
                    return e + "%";
                  },
                },
              },
              title: {
                text: "分析结果：" + maxLabel,
                floating: !0,
                offsetY: 5,
                align: "top",
                style: {
                  color: "#444",
                  fontSize: "20px",
                  fontWeight: "500",
                },
              },
              grid: {
                row: {
                  colors: ["transparent", "transparent"],
                  opacity: 0.2,
                  fontSize: "18px",
                  fontWeight: 700,
                },
                borderColor: "#f1f3fa",
                yaxis: {
                  lines: {
                    show: false,
                  },
                },
              },
            };
            $("#common_chart").html("");
            new ApexCharts(document.querySelector("#common_chart"), e).render();
          } else {
            $("#common_classify .prompt .card-body").each(function () {
              $(this).append(
                `<div class="empty-text">返回结果为空，换段文本再试试吧</div>`
              );
            });
            $(".common_table").addClass("hide");
            $("#common_chart").addClass("hide");
            $(".prompt").eq(0).removeClass("hide");
            $(".prompt").eq(1).removeClass("hide");
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
