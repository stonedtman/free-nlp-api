var inputParams = {
  images: "",
  albumId: 1,
  topk: 10,
  confidence: 0.9,
};

$("#result").html(syntaxHighlight(inputParams)); //请求示例

var outputResult = {
  code: 200,
  msg: "成功",
  result: [
    {
      score: 1.0,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/98b0f1e4-24ab-4a13-9edc-8e021dcebe16.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c15146cf5711ba3ad3abf9c289dfdb7e39f01d6f4f630122768f6f7389e2f5d1",
      location: "[241, 491, 562, 170]",
      id: "443751341295413012",
    },
    {
      score: 0.93,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/5213048e-82ca-4bf1-a017-5856863c90da.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ec23755a030a2dfdf324bccad986dac45df794099ccae00c40a5dc0b4eab6cd1",
      location: "[96, 205, 186, 116]",
      id: "443751341295413038",
    },
    {
      score: 0.93,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/ce23e25c-e05f-4e87-85b3-f3a2635d87e8.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=32371a6f5b0bb5ba73c7cd0713950aa23c6c8761154ce12c984b5153bc5b9552",
      location: "[222, 613, 407, 428]",
      id: "443751341295413010",
    },
    {
      score: 0.92,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/107850c1-261b-402c-a1d9-cee3469dc204.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=947c4dd5e8447dc52c821daf5921bcc0bfe61aba8f213f9cc3a785dd4656db61",
      location: "[206, 822, 295, 733]",
      id: "443751341295413002",
    },
    {
      score: 0.92,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/c1755771-3d5e-496f-a5f0-8ebee399d948.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=f1ca0bd2d3e52402c4751a00d2d214aa2e5120bd397be80d94782cfa5caafa79",
      location: "[290, 468, 558, 200]",
      id: "443751341295413026",
    },
    {
      score: 0.91,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/344e6f97-a3bb-4c81-9933-47f6dc50ef75.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=e4eaf59e45546d28d756662c0f324f60e6ce822255979ab2498471f54a8fa609",
      location: "[180, 469, 366, 283]",
      id: "443751341295413058",
    },
  ],
};
$("#returnresult").html(syntaxHighlight(outputResult));

$(".search_online").click(function () {
  if (successFile) {
    if (albumId) {
      $("#marklayer").addClass("mark-show"); //加载状态
      var formData = new FormData();
      formData.append("image", successFile);
      formData.append("albumId", albumId);
      formData.append("confidence", score / 100);
      formData.append("topk", topk);
      $.ajax({
        method: "POST",
        headers: {
          "secret-id": secret_id,
          "secret-key": secret_key,
        },
        url: baseAPI + "/faceSearch",
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
          $("#marklayer").removeClass("mark-show"); //加载状态
          if (res.code == 200) {
            $(".step_tip").addClass("hide");
            $(".images_list_show").removeClass("hide");

            imagesList = res.result.predict;

            var strHtml = "";
            if (res.result.predict.length > 20) {
              res.result.predict = res.result.predict.slice(0, 20);
            }
            res.result.predict.forEach((item, index) => {
              strHtml += `<div class="images_item" onclick="zoomin(${JSON.stringify(
                item
              ).replace(/"/g, "&quot;")})">
              <img src="${item.img}" alt="">
          </div>`;
            });
            $(".images_list_show").html(strHtml);

            if (res.result.predict.length > 0) {
              pagination(imagesList.length);
            }

            var inputParams = {
              images: "",
              albumId,
              topk,
              confidence: score / 100,
            };
            $("#result").html(syntaxHighlight(inputParams));

            $("#returnresult").html(syntaxHighlight(res));
          }
        },
      });
    } else {
      $(".message-error .message_content").html(
        "请选择你要检索的数据集，如没有数据集请先创建数据集"
      );
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  } else {
    $(".message-error .message_content").html("请上传图片后再进行检索");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  }
});
