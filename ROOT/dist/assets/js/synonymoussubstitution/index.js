$(function () {
  let edit_text = document.querySelector("#edit_item").value;
  let editObj = {
    text: edit_text,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result); //请求示例

  var dataList = {
    msg: "自动摘要抽取成功",
    results: {
      summary: [
        "独家 | 余承东回应一财：车BU人事调整，不影响汽车战略方向",
        "2月9日，对于近期“华为车BU王军停职”的消息，华为常务董事、消费者BG CEO、智能汽车解决方案BU CEO余承东对第一财经独家回应:“（此次）是正常的人事调整变动，（华为在车业务）方向上没有变化。”",
        "有声音认为人事调动背后和王军负责的业务进展不顺有关，对于华为汽车战略调整的诸多猜测，余承东称之为“网上瞎炒作”。王军此前为华为智能汽车解决方案BU COO，智能驾驶解决方案产品线总裁，也是华为“HI模式”对外主要负责人。多位华为内部人士向记者表示，王军目前人事关系仍在车BU下面，职位部分显示空白。",
        "当天，华为“HI模式”合作方之一的阿维塔内部人士对记者表示，经过巨量资源投入，HI已经成为华为最重要的技术资产。该人士认为，（人事变动后），华为不会改变该业务运作模式，但未来打法或将有所改变。",
        "“人事调整”背后",
        "2月6日，一张余承东与阿维塔科技董事长兼CEO谭本宏一同参观阿维塔新车的照片在网上流出。照片中，余承东身着一身黑色西装站在谭本宏的左边，站在谭本宏右边则为华为轮值董事长徐直军，而过往与阿维塔对接较多的王军缺席了这次活动。在外界看来，这张照片从另一层面佐证了王军职务变化的猜想。在照片流出前的几天，“王军被停职，余承东将独掌智能车业务”的消息已在汽车圈发酵。",
      ],
    },
    status: "000",
  };

  $("#returnresult").html(syntaxHighlight(dataList)); //返回示例

  //点击事件
  $(".analysis_name").click(function getReturnResult() {
    let edit_text = document.querySelector("#edit_item").value.trim();
    let editObj = {
      text: [edit_text],
      batch_size: 10,
    };
    let resultJSON = JSON.stringify(editObj);
    let result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result); //请求示例
    $("#marklayer").addClass("mark-show"); //加载状态

    var requestContent = $("#edit_item").val();
    if (requestContent != exampleList[0] && requestContent != exampleList[1]) {
      $.ajax({
        method: "POST",
        headers: {
          "secret-id": secret_id,
          "secret-key": secret_key,
        },
        url: baseAPI + "/synonyms",
        contentType: "application/json",
        dataType: "json",
        data: resultJSON,
        success: function (res) {
          // console.log(res);
          $("#marklayer").removeClass("mark-show");
          if (res.code == 200) {
            $(".analysis_info").removeClass("hide");
            $(".prompt").addClass("hide");
            var strHtml = "";
            res.results.forEach((item, idnex) => {
              strHtml += item + "\n";
              // strHtml += JSON.parse(item);
            });

            document.querySelector(".analysis_result").innerHTML = strHtml;

            // 转换前都要先强制成json,不然得到的JSON容易转换出错
            // JSON.stringify将对象转为JSON字符串；
            // JSON.parse将JSON字符串转为对象；
            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);
          }
        },
      });
    } else {
      setTimeout(() => {
        $("#marklayer").removeClass("mark-show");
        $(".analysis_info").removeClass("hide");
        $(".prompt").addClass("hide");
        if (requestContent == exampleList[0]) {
          $(".analysis_result").val(resultList[0]);
        } else {
          $(".analysis_result").val(resultList[1]);
        }
      }, 2000);
    }
  });
});
