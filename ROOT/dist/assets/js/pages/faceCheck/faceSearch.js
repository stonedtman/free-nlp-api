var inputParams = {
  images: "",
  albumId: 1,
  topk: 10,
  confidence: 0.5,
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
    {
      score: 0.89,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/6d4c3472-8b01-4c34-9ed5-37312a84ec67.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a67c49fca153c9190ddabebb22591130e8d03766500d9e9b111831c11d0faa97",
      location: "[125, 196, 254, 67]",
      id: "443751341295413014",
    },
    {
      score: 0.89,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/5a893ec9-5d5a-4175-a067-a7ba532b5110.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=fc7901a118dd71a193ac742cf63feab4b9af96b6448943b37df0b44247f078ea",
      location: "[96, 239, 225, 110]",
      id: "443751341295413028",
    },
    {
      score: 0.89,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/8621f117-e697-4246-a725-0ac17d12640a.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=8cfa2f8179c9ff3f1bfcb7e8439147bcb321b5ec8945d46b022b79da282ff926",
      location: "[498, 795, 766, 527]",
      id: "443751341295413082",
    },
    {
      score: 0.88,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/b619a62d-474b-4d44-98ba-67bd29343567.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d2735ddad1cef284923265b57c46ed7921b85ff4d9812f90db7fe69d8056109c",
      location: "[125, 626, 254, 497]",
      id: "443751341295413020",
    },
    {
      score: 0.88,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/78d526d2-14f4-4a96-9ccf-a7287b06d05a.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c6ba5342c058042f98bc6756c568df2161cf8d8f72e2f8a229ff0314abb86a96",
      location: "[225, 468, 354, 339]",
      id: "443751341295413018",
    },
    {
      score: 0.88,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/e8e2d460-71e0-446f-ab57-003f4a1f9954.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=7f47af251fb511823bb9dbe053e49f055dfd206a32a1928f284c3ac20be81d87",
      location: "[46, 93, 108, 31]",
      id: "443751341295413060",
    },
    {
      score: 0.86,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/c9662dd5-effa-4ac8-ba6a-54e9e219d68f.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a2a91440cb969bd970cb83e6bbfeeb7693b34c139639fb96bde0cad15a39705b",
      location: "[118, 520, 161, 477]",
      id: "443751341295413050",
    },
    {
      score: 0.86,
      img: "https://s1.stonedt.com:5326/search-face/CeShi11692781836054/5a5f46a8-703d-4dcc-ac48-d98773de8f05.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=user%2F20230823%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230823T112936Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=2fa4af33c53c3be0345b199e96584019699e888b0082dc65cdab6278352587e0",
      location: "[234, 515, 285, 463]",
      id: "443751341295413070",
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

            imagesList = res.result;

            var strHtml = "";
            if (res.result.length > 20) {
              res.result = res.result.slice(0, 20);
            }
            res.result.forEach((item, index) => {
              strHtml += `<div class="images_item" onclick="zoomin(${JSON.stringify(
                item
              ).replace(/"/g, "&quot;")})">
              <img src="${item.img}" alt="">
          </div>`;
            });
            $(".images_list_show").html(strHtml);

            pagination(imagesList.length);

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
        error() {
          $("#marklayer").removeClass("mark-show"); //加载状态
          $(".message-error .message_content").html("服务器繁忙，请稍后再试");
          $(".message-error").removeClass("message-hide");
          setTimeout(() => {
            $(".message-error").addClass("message-hide");
          }, 2000);
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
