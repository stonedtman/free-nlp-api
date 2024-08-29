var resultList = {
  code: 200,
  msg: "成功",
  result: {
    coordinate: [
      {
        score: "0.40",
        xyxy: [1.0, 284.0, 507.0, 737.0],
        label: "bird",
      },
      {
        score: "0.60",
        xyxy: [16.0, 250.0, 1625.0, 1107.0],
        label: "cat",
      },
    ],
    image: "",
  },
};

var resObj = JSON.parse(JSON.stringify(resultList));

$("#returnresult").html(syntaxHighlight(resObj));

$(".analysis_name").click(function () {
  if (isUpload) {
    var uploadFiles = document.querySelector(".fileUpload");
    var file = uploadFiles.files[0]; //文件

    if (file) {
      var size = file.size / 1024 / 1024;
      if (size < 10) {
        $("#marklayer").addClass("mark-show"); //加载状态
        var formData = new FormData();
        formData.append("image", file);
        formData.append("projectId", projectId);
        formData.append("requireImg", false);
        modelList.forEach((item) => {
          if (projectId == item.id) {
            if (item.isCommon) {
              formData.append("isCommon", true);
            }
          }
        });
        formData.append("Confidence", parseInt(confidence));
        $.ajax({
          method: "POST",
          headers: {
            "secret-id": secret_id,
            "secret-key": secret_key,
          },
          url: baseAPI + "/PicDetection",
          data: formData,
          contentType: false,
          processData: false,
          success: function (res) {
            $("#marklayer").removeClass("mark-show");
            if (res.code == 200) {
              var result = syntaxHighlight({
                image: "base64IMG_file",
                projectId: projectId,
                Confidence: parseInt(confidence),
              });
              $("#result").html(result);
              let returnresult = syntaxHighlight(res);
              $("#returnresult").html(returnresult);

              $(".inside-iframe").each(function () {
                $(this).remove();
              });
              $(".tips").css("display", "none");
              $(".return-image").css("display", "inline-block");
              $(".return-image img").attr(
                "src",
                $(".request-image img").attr("src")
              );

              var imageWidth = $(".request-image img")
                .css("width")
                .split("px")[0];
              var imageHeight = $(".request-image img")
                .css("height")
                .split("px")[0];
              $(".return-image").css("height", imageHeight + "px");
              if (res.result.coordinate) {
                let image = new Image();
                image.onload = function () {
                  var primaryWidth = image.width;
                  var primaryHeight = image.height;
                  var widthRatio = (imageWidth / primaryWidth).toFixed(2);
                  var heightRatio = (imageHeight / primaryHeight).toFixed(2);
                  var markList = [];
                  res.result.coordinate.forEach((item) => {
                    var obj = {
                      width: (item.xyxy[2] - item.xyxy[0]) * widthRatio,
                      height: (item.xyxy[3] - item.xyxy[1]) * heightRatio,
                      left: item.xyxy[0] * widthRatio,
                      top: item.xyxy[1] * heightRatio,
                      label: item.label,
                      score: item.score,
                    };
                    markList.push(obj);
                  });
                  var strHtml = "";
                  markList.forEach((item) => {
                    strHtml += `<div class="inside-iframe" style="width:${item.width}px;height:${item.height}px;left:${item.left}px;top:${item.top}px;">
                  <span>${item.label}  ${item.score}</span>
                  </div>`;
                  });
                  $(".mark-image").append(strHtml);
                };
                image.src = $(".request-image img").attr("src");
              } else {
                $(".message-error .message_content").html(
                  "图片中无相关目标，请更换图片再试试吧！"
                );
                $(".message-error").removeClass("message-hide");
                setTimeout(() => {
                  $(".message-error").addClass("message-hide");
                }, 2000);
              }
            }
          },
        });
      }
    }
  } else {
    $("#marklayer").addClass("mark-show"); //加载状态
    getFileFromUrl($(".request-image img").attr("src"), "target.png").then(
      (file) => {
        var formData = new FormData();
        formData.append("image", file);
        formData.append("projectId", projectId);
        modelList.forEach((item) => {
          if (projectId == item.id) {
            if (item.isCommon) {
              formData.append("isCommon", true);
            }
          }
        });
        formData.append("Confidence", parseInt(confidence));
        $.ajax({
          method: "POST",
          headers: {
            "secret-id": secret_id,
            "secret-key": secret_key,
          },
          url: baseAPI + "/PicDetection",
          data: formData,
          contentType: false,
          processData: false,
          success: function (res) {
            $("#marklayer").removeClass("mark-show");
            if (res.code == 200) {
              var result = syntaxHighlight({
                image: "base64IMG_file",
                projectId: projectId,
                Confidence: parseInt(confidence),
              });
              $("#result").html(result);
              let returnresult = syntaxHighlight(res);
              $("#returnresult").html(returnresult);

              $(".inside-iframe").each(function () {
                $(this).remove();
              });
              $(".tips").css("display", "none");
              $(".return-image").css("display", "inline-block");
              $(".return-image img").attr(
                "src",
                $(".request-image img").attr("src")
              );

              var imageWidth = $(".request-image img")
                .css("width")
                .split("px")[0];
              var imageHeight = $(".request-image img")
                .css("height")
                .split("px")[0];
              $(".return-image").css("height", imageHeight + "px");
              if (res.result.coordinate) {
                let image = new Image();
                image.onload = function () {
                  var primaryWidth = image.width;
                  var primaryHeight = image.height;
                  var widthRatio = (imageWidth / primaryWidth).toFixed(2);
                  var heightRatio = (imageHeight / primaryHeight).toFixed(2);
                  var markList = [];
                  res.result.coordinate.forEach((item) => {
                    var obj = {
                      width: (item.xyxy[2] - item.xyxy[0]) * widthRatio,
                      height: (item.xyxy[3] - item.xyxy[1]) * heightRatio,
                      left: item.xyxy[0] * widthRatio,
                      top: item.xyxy[1] * heightRatio,
                      label: item.label,
                      score: item.score,
                    };
                    markList.push(obj);
                  });
                  var strHtml = "";
                  markList.forEach((item) => {
                    strHtml += `<div class="inside-iframe" style="width:${item.width}px;height:${item.height}px;left:${item.left}px;top:${item.top}px;">
                  <span>${item.label}  ${item.score}</span>
                  </div>`;
                  });
                  $(".mark-image").append(strHtml);
                };
                image.src = $(".request-image img").attr("src");
              } else {
                $(".message-error .message_content").html(
                  "图片中无相关目标，请更换图片再试试吧！"
                );
                $(".message-error").removeClass("message-hide");
                setTimeout(() => {
                  $(".message-error").addClass("message-hide");
                }, 2000);
              }
            }
          },
        });
      }
    );
  }
});

//文件url转为file对象
function getFileFromUrl(url, fileName) {
  return new Promise((resolve, reject) => {
    var blob = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("Accept", "image/png");
    xhr.responseType = "blob";
    // 加载时处理
    xhr.onload = () => {
      // 获取返回结果
      blob = xhr.response;
      let file = new File([blob], fileName, { type: "image/png" });
      // 返回结果
      resolve(file);
    };
    xhr.onerror = (e) => {
      reject(e);
    };
    // 发送
    xhr.send();
  });
}

var comparativeData = [
  {
    id: 1,
    name: "佩戴安全帽",
    describe:
      "自动识别建筑工地等场景的现场作业人员的安全帽佩戴情况,常见红白蓝黄4种颜色安全帽均能识别。",
  },
  {
    id: 2,
    name: "人体跌倒识别",
    describe:
      "自动识别如地铁手扶梯/楼梯、老幼活动区等公共场所人员摔倒行为，准确率高于90%。",
  },
  {
    id: 3,
    name: "电动车监测",
    describe:
      "自动识别电动车进电梯、电动车骑行或停放等行为，同时能够区分自行车、手推车等其他目标。",
  },
  {
    id: 4,
    name: "大货车监测",
    describe:
      "自动识别和检测限定区域内是否有渣土车、大货车出现，以极大地提高城市管理的效率和响应速度，同时对于环境保护和交通安全也有着积极的影响。",
  },
  {
    id: 5,
    name: "房门关开监测",
    describe:
      "在社区、写字楼和学校等场所，应用智能识别技术自动监测电梯机房、配电房和单元门的关闭状态，确保安全并及时警报门的异常敞开情况。",
  },
  {
    id: 6,
    name: "灭火器正常",
    describe:
      "在小区、学校、写字楼和商超等公共场所，通过智能监控系统识别并确保灭火器是否按规范正确摆放在指定区域，以提高紧急情况下的应对效率和安全性。",
  },
  {
    id: 7,
    name: "地面垃圾",
    describe:
      "在小区和城市街道等区域，部署智能垃圾识别系统，以自动检测并报告垃圾堆放情况，确保环境整洁并提高清洁工作的及时性和效率。",
  },
  {
    id: 8,
    name: "烟雾识别",
    describe:
      "在写字楼、小区和学校等关键场所，实施烟雾识别技术，以实时监测并精确定位烟雾来源，从而有效预防火灾并保障人员安全。",
  },
  {
    id: 9,
    name: "失火火警",
    describe:
      "在社区、写字楼、学校和仓库等场所，应用实时火焰检测系统监控区域内的火情，确保一旦检测到明火，能够立即触发警报并通知相关人员进行应急处理。",
  },
  {
    id: 10,
    name: "安全服装检测",
    describe:
      "在各种工作场所，如社区、写字楼、学校和仓库等，通过安全服识别技术确保员工正确穿戴规定的安全服装，以提高工作安全性并减少职业风险。",
  },
  {
    id: 11,
    name: "地面积水",
    describe:
      "在建筑工地和城市道路等关键区域，部署积水识别系统以实时监测雨后或洪水导致的路面积水状况，并在积水达到一定程度时立即发出警报，以便及时采取应对措施。",
  },
  {
    id: 12,
    name: "口罩识别",
    describe:
      "对如医院、后厨等对卫生要求较高的人员工作场所，有效监测工作人员口罩佩戴情况，检测到未佩戴者立即标注并进行提醒。",
  },
  {
    id: 13,
    name: "安全手套识别",
    describe:
      "在能源和电力园区等关键作业环境中，利用深度学习算法对作业人员进行智能监控，以确保他们在操作带电设备时正确穿戴绝缘手套，一旦发现违规未穿戴情况，系统将立即发出警报，提醒安全监管人员及时介入，保障作业安全。",
  },
  {
    id: 14,
    name: "闭眼识别",
    describe:
      "闭眼识别技术通过智能分析监测对象的眼部状态，实时判断是否处于闭眼状态，广泛应用于驾驶疲劳监测、工作场所注意力管理等领域，以提高安全性和效率。当系统检测到持续闭眼或异常情况时，能够及时发出警告，提醒相关人员采取相应措施。",
  },
  {
    id: 15,
    name: "玩手机识别",
    describe:
      "实时检测在特定场合下是否有人分心玩手机，该技术在学校、工作场所，一旦系统识别到玩手机的行为，能够及时发出警示，以减少分心行为对安全和效率的影响。",
  },
  {
    id: 16,
    name: "睡觉识别",
    describe:
      "智能监测技术检测员工在岗期间的睡眠行为，确保工作效率和职业安全，一旦系统发现有员工在工作岗位上睡觉，将及时发出提醒，促进健康的工作习惯和提高整体工作氛围。",
  },
  {
    id: 17,
    name: "吸烟监测",
    describe:
      "在加油站、后厨以及公共场所等对卫生和安全要求较高的区域，实施抽烟识别系统进行实时监控，确保及时检测并防范潜在的火灾风险和卫生问题。",
  },
  {
    id: 18,
    name: "识别打电话",
    describe:
      "在需要减少干扰和保持安静的公共场合，如图书馆、医院、会议中心等，引入打电话识别技术能够实时监测并提醒那些正在进行电话通话的个人，以维护环境的宁静和秩序。",
  },
  {
    id: 19,
    name: "游摊小贩识别",
    describe:
      "城市管理中引入游摊小贩识别系统，通过先进的监控技术对指定区域内的占道经营行为进行实时检测与识别，有效维护市容秩序和道路通行安全。",
  },
  {
    id: 20,
    name: "非机动车识别",
    describe:
      "在城市道路、工业园区和社区等区域，通过非机动车识别技术对误入机动车道的三轮车、自行车、电动车、板车和摩托车等进行有效监测和识别，及时反馈信息，以保障交通安全和顺畅。",
  },
  {
    id: 21,
    name: "打架识别",
    describe:
      "打架识别系统在学校、小区和娱乐场所等区域通过分析人体关键点和姿态，实时监测并识别潜在的打架行为，以便及时采取措施防止冲突升级。",
  },
  {
    id: 22,
    name: "占道经营识别",
    describe:
      "城市管理和小区路口通过占道经营识别技术对商家违规占用公共道路进行经营活动的行为进行有效监测和检测，以维护交通秩序和市容整洁。",
  },
  {
    id: 23,
    name: "人员脱岗检测",
    describe:
      "人员脱岗检测是一种监控技术，用于实时识别并报告工作人员是否擅自离开其指定岗位，确保关键职位的持续值守和工作流程的顺畅进行。",
  },
  {
    id: 24,
    name: "人员闯入检测",
    describe:
      "自动识别危险区域人员闯入情况,如人员闯入预先设置好的危险区域(禁止进入区域)即可立即报警,确保员工的人身安全。",
  },
  {
    id: 25,
    name: "牲畜入侵检测",
    describe:
      "牲畜入侵检测算法是在划定的ROI区域内进行牲畜识别检测，对检测到牲畜(牛、羊、狗、马、猫五种)返回报警结果。",
  },
  {
    id: 26,
    name: "宠物牵绳识别",
    describe:
      "宠物牵绳识别技术能够自动检测社区中宠物是否佩戴牵绳，有助于提升社区安全和管理效率，同时促进宠物主人负责任的养宠行为。",
  },
  {
    id: 27,
    name: "轮椅识别",
    describe:
      "要用于医院、公共场所、地铁站、商场等扶梯场景，自动识别轮椅，及时反馈给工作人员，协助运营管理人员第一时间发现并处理可能的危险情况，确保安全与便利。",
  },
  {
    id: 28,
    name: "婴儿车识别",
    describe:
      "要用于车站、机场、地铁站、商场等扶梯场景,自动识别婴儿车,及时反馈给工作人员,协助运营管理人员第一时间发现危险情况。",
  },
  {
    id: 29,
    name: "交通事故识别",
    describe:
      "交通事故识别是利用先进的监控技术和数据分析，对道路上发生的事故进行快速检测和分类。这有助于提高应急响应速度，优化交通流量，保障道路安全。",
  },
  {
    id: 30,
    name: "夜间老鼠识别",
    describe:
      "通过夜间后厨摄像头红外模式下场景,可对进入检测区域的老鼠进行识别,若检测到老鼠出现,可立即告警。",
  },
  {
    id: 31,
    name: "煤气罐识别",
    describe:
      "煤气罐检测算法主要针对出现在监测视频画面中的限制区域进行煤气罐的检测，若检测到视频画面中存在煤气罐，立即进行报警。",
  },
  {
    id: 32,
    name: "电动车头盔识别",
    describe: "自动识别城市骑乘人员头盔佩戴情况,提高交通部门执法效率。",
  },
  {
    id: 33,
    name: "渣土车识别",
    describe: "自动识别和检测限定区域内是否有渣土车出现。",
  },
  {
    id: 34,
    name: "表情识别",
    describe:
      "对图片或动态视频进行人脸检测,定位并标记边框,依据眼、口、鼻轮廓等关键点信息识别个人五官动作及形态,输出表情结果。",
  },
  {
    id: 38,
    name: "井盖状态识别",
    describe:
      "井盖识别系统监控城市基础设施，实时识别井盖状态，井盖破坏、变形或移位，系统自动警报维护团队，确保公共安全。",
  },
  {
    id: 39,
    name: "车辆类型识别",
    describe:
      "识别图像中所有车辆的类型和位置，并对小汽车、卡车、巴士、摩托车、三轮车5类车辆分别计数，同时可定位小汽车、卡车、巴士的车牌位置。",
  },
];

layui.use("laypage", function () {
  var laypage = layui.laypage;

  //执行一个laypage实例
  laypage.render({
    elem: "compare_pagination",
    count: Object.keys(comparativeData).length,
    limit: 10,
    groups: 3,
    layout: ["count", "prev", "page", "next", "skip"],
    jump: function (obj) {
      var pageList = comparativeData.slice((obj.curr - 1) * 10, obj.curr * 10);
      var comparativeStr = "";
      pageList.forEach((item, index) => {
        comparativeStr += `<tr>
          <td><div style="text-align:center;">${item.id}</div></td>
          <td><div style="white-space: nowrap;">${item.name}</div></td>
          <td>${item.describe}</td>
        </tr>`;
      });

      $("#comparative_tab").html(comparativeStr);
    },
    theme: "#5369f8",
  });
});
