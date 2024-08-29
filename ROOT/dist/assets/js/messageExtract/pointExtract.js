$(".request_address").attr("href", requestAddress + "/extractAppraise");
$(".request_address").html(requestAddress + "/extractAppraise");

var exampleList = [
  "荣威Ei5 2021款 500 倾城版，我对这车最满意的就是这辆车的操控和空间了。操控上不管是刹车还是提速都很流畅平顺，车身也比较平稳，上路不会太紧张，方向盘轻重适中，指向也很精准，可以说是指哪打哪了。还有就是它的空间不仅宽敝而且设计还很合理，无论是乘坐空间还是储物空间都很充足。但是，我对这辆车的隔音性不是很满意，它的隔音性不是很强，跑在高速上会有风噪和胎噪的问题出现，听的时间长了有些烦躁耳朵不是很舒服，有时候还会影响驾驶心情。空间设计蛮合理的，无论是驾驶空间还是乘坐空间感觉都挺宽敝的，头部和腿部都有很大的余留空间，而且储物空间也令我非常满意，不仅后备箱容纳能力很强而且车内的一些小储物格也挺多的，平时放一下小物品什么的都挺方便。\n\n原文链接：https://k.autohome.com.cn/detail/view_01f423ym676cv30d9r6rw00000.html#pvareaid=2112108",
  "食材的品质是上等的对得起这个价位了吧，总是路过，终于有机会尝一下了~套餐搭配的还算合理，[薄荷]环境:\n就餐环境很舒适，适合各种场合。「野藕煲竹笙蛋」味道不错，「桃胶珍菌卤味饭」米饭真的很香，每道餐品都能感受到食物的原汁原味，「首乌桃仁养颜汤」汤很鲜美，炖的火候也足够。甜品很赞，甜而不腻饱腹感非常强哈哈\n\n原文链接：https://www.dianping.com/shop/5618484/dish67956199",
  "酒店还是不错的，性价比比较高，设施方面也都不错，晚上是前台的海霞Cindy小姑娘办理的入住，每一位工作人员服务态度都比较热情，入住退房也很快，不用收取押金。退房直接给房卡就可以了，交通也特别方便，旁边就是地铁站。性价比还是很不错的，房间也不需要插卡取电，这点很不错。\n\n原文链接：https://hotels.ctrip.com/hotels/6542110.html#ibu_hotel_review",
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
    评价维度: [
      {
        probability: 0.46366016501158924,
        start: 76,
        end: 79,
        text: "方向盘",
        relations: {
          "情感倾向[正向，负向]": [
            {
              probability: 0.9983187646221587,
              text: "正向",
            },
          ],
          观点词: [
            {
              probability: 0.46353069147215464,
              start: 81,
              end: 83,
              text: "适中",
            },
          ],
        },
      },
      {
        probability: 0.5912428150350877,
        start: 37,
        end: 39,
        text: "空间",
        relations: {
          "情感倾向[正向，负向]": [
            {
              probability: 0.9971474612498028,
              text: "正向",
            },
          ],
        },
      },
      {
        probability: 0.3924545302705411,
        start: 149,
        end: 152,
        text: "隔音性",
        relations: {
          "情感倾向[正向，负向]": [
            {
              probability: 0.6539535955251452,
              text: "负向",
            },
          ],
          观点词: [
            {
              probability: 0.2686097538511376,
              start: 163,
              end: 167,
              text: "不是很强",
            },
          ],
        },
      },
      {
        probability: 0.4048868134478525,
        start: 60,
        end: 62,
        text: "车身",
        relations: {
          "情感倾向[正向，负向]": [
            {
              probability: 0.9982406279550737,
              text: "正向",
            },
          ],
          观点词: [
            {
              probability: 0.9877992236239876,
              start: 65,
              end: 67,
              text: "平稳",
            },
          ],
        },
      },
      {
        probability: 0.6377100249040026,
        start: 115,
        end: 117,
        text: "设计",
        relations: {
          "情感倾向[正向，负向]": [
            {
              probability: 0.9979091976013272,
              text: "正向",
            },
          ],
          观点词: [
            {
              probability: 0.9589464985301532,
              start: 119,
              end: 121,
              text: "合理",
            },
          ],
        },
      },
    ],
  },
];
var strHtml = "";
for (const key in dataList[0]) {
  // console.log(res[0][key]);
  dataList[0][key].forEach((item, index) => {
    // console.log(item);
    var optionWord = "";
    var emotionTend = {};
    for (const i in item.relations) {
      if (i == "情感倾向[正向，负向]") {
        // console.log(item.relations[i][0].probability);
        emotionTend = item.relations[i][0];
      }
      if (i == "观点词") {
        // console.log(item.relations[i][0].text);
        optionWord = item.relations[i][0].text;
      } else {
        optionWord = "—";
      }
    }

    strHtml += `<tr>
      <td>${index + 1}</td>
      <td>${item.text}</td>
      <td>${optionWord}</td>
      <td>${emotionTend.text}</td>
      <td>${emotionTend.probability}</td>
      </tr>`;
  });
}
$("#analysis_list").html(strHtml);
var labelBtns = document.querySelectorAll(".table .btn-rounded");
for (var i = 0; i < labelBtns.length; i++) {
  // console.log(labelBtns[i].innerHTML);
  if (labelBtns[i].innerHTML == "正向") {
    labelBtns[i].classList.add("btn-success");
  } else if (labelBtns[i].innerHTML == "负向") {
    labelBtns[i].classList.add("btn-danger");
  }
}

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
    $("#marklayer").addClass("mark-show"); //加载状态

    $.ajax({
      method: "POST",
      url: baseAPI + "/extractAppraise",
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

            var analysis_list = "";
            for (const key in res.result[0]) {
              res.result[0][key].forEach((item, index) => {
                var optionWord = "";
                var emotionTend = {};
                for (const i in item.relations) {
                  if (i == "情感倾向[正向，负向]") {
                    emotionTend = item.relations[i][0];
                  }
                  if (i == "观点词") {
                    optionWord = item.relations[i][0].text;
                  } else {
                    optionWord = "—";
                  }
                }

                analysis_list += `<tr>
              <td>${index + 1}</td>
              <td>${item.text}</td>
              <td>${optionWord}</td>
              <td>${emotionTend.text}</td>
              <td>${emotionTend.probability}</td>
              </tr>`;
              });
            }
            $("#analysis_list").html(analysis_list);
            var labelBtns = document.querySelectorAll(".table .btn-rounded");
            for (var i = 0; i < labelBtns.length; i++) {
              if (labelBtns[i].innerHTML == "正向") {
                labelBtns[i].classList.add("btn-success");
              } else if (labelBtns[i].innerHTML == "负向") {
                labelBtns[i].classList.add("btn-danger");
              }
            }
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
