$(".video_pre").attr("src", staticPath + "/file/videototext/1.mp4");
$(".request_address").attr("href", requestAddress + "/video2text");
$(".request_address").html(requestAddress + "/video2text");
var result = syntaxHighlight(JSON.parse('{"video":"上传的视频文件"}'));
$("#result").html(result);

var returnresult = syntaxHighlight(
  JSON.parse(
    '{"text": "如果十来万你想买一台性能轿跑那么这条视频你一定要看看，无数网友留言想看引爆今天他来了，十来万的车居然有四处牌金你受得了吗？这是原厂的不是汽杯车后加装的一脚油没下去你十八楼的女邻居都知道你回家了，原厂的黄色大钱他先的后视镜连那个前包围都是碳仙的元素怎么会是样子破吧。那你草率了，过来了，巨浪动力一点五T发动机最大扭距两百七起步响应只要零点三秒出了，车尾的后绕流板和十八次的熔骨车内的惊响更是让你一想不到黄色的安全带骚气十足你才这是干嘛？什么望远镜啊，运动排气阀门超跑才有的红泉启动在配着开气动画是不是特别有仪式感作为科技小钢炮它的驾驶模式外外迪X磁爆子加这里居然有赛刀五连表你看机油压力冷却水温涡流压力变子压油温进气温度啥都有像超跑一样当是除了，性能啊，配置也是相当的丰富三百六十度全景影像手持切割疲劳提醒质架互脸也是一应俱全其实每一个人都有一个做车手的梦想那几百万的牛马轮当然摇不可及了，就算是几十万的性能车好了，光保养你不也得花一大笔钱吗？有一句话说得好人生不能只有苟且还要有失和远方而此刻的我觉着年轻人不仅要有适合远方还要有排气和升浪关注我为中国速度点赞。"}'
  )
);
$("#returnresult").html(returnresult);

var exampleList = [
  "/file/videototext/1.mp4",
  "/file/videototext/2.mp4",
  "/file/videototext/3.mp4",
];
var transformTexts = [
  "如果十来万你想买一台性能轿跑那么这条视频你一定要看看，无数网友留言想看引爆今天他来了，十来万的车居然有四处牌金你受得了吗？这是原厂的不是汽杯车后加装的一脚油没下去你十八楼的女邻居都知道你回家了，原厂的黄色大钱他先的后视镜连那个前包围都是碳仙的元素怎么会是样子破吧。那你草率了，过来了，巨浪动力一点五T发动机最大扭距两百七起步响应只要零点三秒出了，车尾的后绕流板和十八次的熔骨车内的惊响更是让你一想不到黄色的安全带骚气十足你才这是干嘛？什么望远镜啊，运动排气阀门超跑才有的红泉启动在配着开气动画是不是特别有仪式感作为科技小钢炮它的驾驶模式外外迪X磁爆子加这里居然有赛刀五连表你看机油压力冷却水温涡流压力变子压油温进气温度啥都有像超跑一样当是除了，性能啊，配置也是相当的丰富三百六十度全景影像手持切割疲劳提醒质架互脸也是一应俱全其实每一个人都有一个做车手的梦想那几百万的牛马轮当然摇不可及了，就算是几十万的性能车好了，光保养你不也得花一大笔钱吗？有一句话说得好人生不能只有苟且还要有失和远方而此刻的我觉着年轻人不仅要有适合远方还要有排气和升浪关注我为中国速度点赞。",
  "哎，这汽油又涨价了，你连个车都没有，你瞎操哪门子心啊？哎，我的打火机是烧油的",
  "谁跟你挠的就他队小孩你打球干吗？抓衣服呀我跟你说话好了，好了，好了，好了，来了，来打琼吧正常吃顶接触嘛？这是正常肢体结束你看里面都红了，疼不疼还行吗？走上车换件新衣服再走半点衣服，那小孩我今天肯定得找你家长啊，我在这儿待着先生你们去吧。我来教育教育他他们去去去跟你姐走跟姐走你这打球还光脚啊你叫什么呀，他是不是不会说话呀，还会呀你说一句说一句不他俩之间咋了？什么情况脏不是说他打球不搭鞋不带他玩以他让吵起来的就这啊，对那你把鞋穿上不就行了吗？没鞋呀，他有假的不好意思穿太还穿那你也不能私人衣服呀，他姐刚给他买的你这撕了，不得赔吗？是不是多少钱我赔你赔你鞋都买要新该还赔你怎么嘴就那么碎呢，你好意思他是不是天算怎们这挑事的大概多少钱？我赔他赔什么你们小孩有什么钱你这样他姐有点梗有点轴然后你一会儿就把这个钱给他姐这事就了了太多好一点啊，拿着拿拿着那还叫我家长吗？叫什么呀，拿着你会给他姐这事了，，你教育咋样呢，那还用问他刚才不是跟你犟吗？现在主动要求跟弟弟道歉还有赔弟弟衣服打姐对不起我不计该给浪不是影片前够不够不够再补赔你看你现在态度多好刚才这么不这样呢，这是差不多吧。是不是？这不是不是差不多好差不多不然这事就算了，算不能算干吗？呀，差不多得了，你也滚过来那个你让道一行道歉你说对不起我刚才不应该说你没关系又不让应玩九十度对不起然后呢，后你下个天期过生日这提前送你身上礼物你收着吧，这个要时和你说你们这会儿不才人扔出最好的时光男孩子吵个架吗？你谁都不能提出北京一前陪借姐姐那这钱呢，可你说不然就拿着吧，也是他一个太行没有债不不在这儿",
];

var current = 0;

function pickOption() {
  var selectDom = document.querySelector(".custom-select");
  var index = selectDom.selectedIndex; //获取选中项的索引
  $(".video_pre").attr("src", staticPath + exampleList[index - 1]);
  current = index - 1;
  fileUpload.value = "";
}

var fileUpload = document.querySelector(".fileUpload");
fileUpload.addEventListener("change", function (e) {
  var file = e.target.files[0];
  var size = file.size / 1024 / 1024;
  // console.log(size)
  if (file) {
    if (size < 100) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        $(".video_pre").attr("src", e.target.result);
      };
    } else {
      $(".message-error .message_content").html("上传的视频大小不能超过100M");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  }
});

//点击事件
$(".analysis_name").click(function () {
  var uploadFiles = document.querySelectorAll(".fileUpload")[0];
  var file = uploadFiles.files[0]; //文件

  // console.log(file);
  // 获取视频时长 超过50s 不允许上传
  var binaryData = [];
  // 传入file
  binaryData.push(file);
  //获取视频或者音频时长
  var fileurl = URL.createObjectURL(
    new Blob(binaryData, { type: "application/zip" })
  );
  //经测试，发现audio也可获取视频的时长
  var audioElement = new Audio(fileurl);
  var duration;

  if (file) {
    audioElement.addEventListener("loadedmetadata", function (_event) {
      duration = audioElement.duration;
      var size = file.size / 1024 / 1024;
      // console.log(size);
      if (size < 100) {
        $("#marklayer").addClass("mark-show"); //加载状态
        var formData = new FormData();
        formData.append("video", file);
        $.ajax({
          method: "POST",
          url: baseAPI + "/video2text",
          headers: {
            "secret-id": secret_id,
            "secret-key": secret_key,
          },
          data: formData,
          contentType: false,
          processData: false,
          success: function (res) {
            // console.log(typeof res);
            document.querySelector("#marklayer").classList.remove("mark-show");
            if (res.code == 200) {
              $(".step_tip").css("display", "none");
              $(".transform_text").css("display", "block");
              $(".operate_tip").addClass("hide");
              $(".transform_text").removeClass("hide");
              $(".transform_text").html(res.results.text);
              $("#returnresult").html(syntaxHighlight(res));
            }
          },
          error() {
            document.querySelector("#marklayer").classList.remove("mark-show");
            document
              .querySelector(".message-error")
              .classList.remove("message-hide");
            setTimeout(() => {
              document
                .querySelector(".message-error")
                .classList.add("message-hide");
            }, 2000);
          },
        });
      }
    });
  } else {
    $("#marklayer").addClass("mark-show"); //加载状态
    setTimeout(() => {
      $("#marklayer").removeClass("mark-show");
      $(".step_tip").css("display", "none");
      $(".transform_text").css("display", "block");
      $(".operate_tip").addClass("hide");
      $(".transform_text").removeClass("hide");
      $(".transform_text").html(transformTexts[current]);
      $("#returnresult").html(
        syntaxHighlight({ text: transformTexts[current] })
      );
    }, 2000);
  }
});
