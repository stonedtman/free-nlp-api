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
  let strHtml = "";
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
  for (let i = 0; i < labelBtns.length; i++) {
    // console.log(labelBtns[i].innerHTML);
    if (labelBtns[i].innerHTML == "正向") {
      labelBtns[i].classList.add("btn-success");
    } else if (labelBtns[i].innerHTML == "负向") {
      labelBtns[i].classList.add("btn-danger");
    }
  }

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
      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态

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
          document.querySelector("#marklayer").classList.remove("mark-show");
          if (res.code == 200) {
            $(".table-responsive").removeClass("hide");
            $(".prompt").addClass("hide");
            // console.log(res[0]);

            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);

            let analysis_list = "";
            for (const key in res.result[0]) {
              // console.log(res[0][key]);
              res.result[0][key].forEach((item, index) => {
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

                analysis_list += `<tr>
              <td>${index + 1}</td>
              <td>${item.text}</td>
              <td>${optionWord}</td>
              <td>${emotionTend.text}</td>
              <td>${emotionTend.probability}</td>
              </tr>`;
              });
              // console.log(analysis_list);
            }
            $("#analysis_list").html(analysis_list);
            var labelBtns = document.querySelectorAll(".table .btn-rounded");
            for (let i = 0; i < labelBtns.length; i++) {
              // console.log(labelBtns[i].innerHTML);
              if (labelBtns[i].innerHTML == "正向") {
                labelBtns[i].classList.add("btn-success");
              } else if (labelBtns[i].innerHTML == "负向") {
                labelBtns[i].classList.add("btn-danger");
              }
            }
          }
        },
        error() {
          document.querySelector("#marklayer").classList.remove("mark-show");
          $(".message-error .message_content").html("服务器繁忙，请稍后再试");
          $(".message-error").removeClass("message-hide");
          setTimeout(() => {
            $(".message-error").addClass("message-hide");
          }, 2000);
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
