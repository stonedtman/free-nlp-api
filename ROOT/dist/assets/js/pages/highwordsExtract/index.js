// $(function(){})类似于原生 js 中的DOMContentLoaded事件，在 DOM 加载完毕后，页面全部内容（如图片等）完全加载完毕前被执行。而window.onload会在页面资源全部加载完毕后才会执行。
var keywordsNum = 10;
function changeReturnNum() {
  var returnNumDom = document.querySelector(".return-num");
  var index = returnNumDom.selectedIndex; //获取选中项的索引
  var optionList = document.querySelectorAll(".return-num option");
  keywordsNum = JSON.parse(optionList[index].innerHTML);
}

$(function () {
  // 获取及渲染返回列表
  let edit_text = document.querySelector("#edit_item").value;
  let editObj = {
    text: edit_text,
    backCount: 10,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result);
  var dataList = {
    msg: "高频词提取成功",
    code: "200",
    results: {
      wordsList: [
        {
          pos_count: 26,
          text: "宝马",
        },
        {
          pos_count: 13,
          text: "召回",
        },
        {
          pos_count: 9,
          text: "发动机",
        },
        {
          pos_count: 7,
          text: "汽车",
        },
        {
          pos_count: 6,
          text: "螺栓",
        },
        {
          pos_count: 4,
          text: "气门",
        },
        {
          pos_count: 4,
          text: "缺陷",
        },
        {
          pos_count: 4,
          text: "中国",
        },
        {
          pos_count: 4,
          text: "机构",
        },
        {
          pos_count: 4,
          text: "全球",
        },
      ],
      wordClouds: [
        {
          text: "宝马",
        },
        {
          text: "召回",
        },
        {
          text: "发动机",
        },
        {
          text: "汽车",
        },
        {
          text: "螺栓",
        },
        {
          text: "气门",
        },
        {
          text: "缺陷",
        },
        {
          text: "中国",
        },
        {
          text: "机构",
        },
        {
          text: "全球",
        },
        {
          text: "可变",
        },
        {
          text: "车辆",
        },
        {
          text: "正时",
        },
        {
          text: "在华",
        },
        {
          text: "6月",
        },
        {
          text: "外壳",
        },
        {
          text: "有限公司",
        },
        {
          text: "断裂",
        },
        {
          text: "华晨",
        },
        {
          text: "可能",
        },
        {
          text: "固定",
        },
        {
          text: "发言人",
        },
        {
          text: "事故",
        },
        {
          text: "中国市场",
        },
        {
          text: "3月",
        },
        {
          text: "范围",
        },
        {
          text: "4月",
        },
        {
          text: "根据",
        },
        {
          text: "汽车贸易",
        },
        {
          text: "2009年",
        },
        {
          text: "生产",
        },
        {
          text: "n52k",
        },
        {
          text: "n52t",
        },
        {
          text: "免费",
        },
        {
          text: "生过",
        },
        {
          text: "包括",
        },
        {
          text: "n55",
        },
        {
          text: "辆车",
        },
        {
          text: "安全隐患",
        },
        {
          text: "时间",
        },
        {
          text: "x1",
        },
        {
          text: "x3",
        },
        {
          text: "x5",
        },
        {
          text: "x6",
        },
        {
          text: "表示",
        },
        {
          text: "主动",
        },
        {
          text: "总计",
        },
        {
          text: "存在",
        },
        {
          text: "232,098",
        },
        {
          text: "2日",
        },
        {
          text: "车型",
        },
        {
          text: "z4",
        },
        {
          text: "搭载",
        },
        {
          text: "发动",
        },
        {
          text: "隐患",
        },
        {
          text: "93,564",
        },
        {
          text: "已达",
        },
        {
          text: "尚无",
        },
        {
          text: "盖世",
        },
        {
          text: "情况下",
        },
        {
          text: "72013年",
        },
        {
          text: "目前",
        },
        {
          text: "声明",
        },
        {
          text: "扩散",
        },
        {
          text: "已经",
        },
        {
          text: "甚至",
        },
        {
          text: "临近",
        },
        {
          text: "公布",
        },
        {
          text: "10",
        },
        {
          text: "14日",
        },
        {
          text: "15",
        },
        {
          text: "一部分",
        },
        {
          text: "月中",
        },
        {
          text: "30日",
        },
        {
          text: "备案",
        },
        {
          text: "官方",
        },
        {
          text: "原因",
        },
        {
          text: "上述",
        },
        {
          text: "发表声明",
        },
        {
          text: "18起",
        },
        {
          text: "由来已久",
        },
        {
          text: "受到",
        },
        {
          text: "比例",
        },
        {
          text: "万余",
        },
        {
          text: "联合",
        },
        {
          text: "失效",
        },
        {
          text: "销售",
        },
        {
          text: "jimmy",
        },
        {
          text: "潜在",
        },
        {
          text: "报道",
        },
        {
          text: "138,534",
        },
        {
          text: "国家质检总局",
        },
        {
          text: "报告",
        },
        {
          text: "决定",
        },
        {
          text: "特定",
        },
        {
          text: "本月",
        },
        {
          text: "产生",
        },
        {
          text: "启动",
        },
        {
          text: "调查",
        },
        {
          text: "万辆",
        },
        {
          text: "发布",
        },
        {
          text: "共计",
        },
        {
          text: "北美",
        },
        {
          text: "六缸",
        },
        {
          text: "发生",
        },
        {
          text: "几乎",
        },
        {
          text: "2014年",
        },
        {
          text: "涉及",
        },
        {
          text: "保护",
        },
        {
          text: "6日",
        },
        {
          text: "由于",
        },
        {
          text: "市场",
        },
        {
          text: "导致",
        },
        {
          text: "一项",
        },
        {
          text: "相关",
        },
        {
          text: "本次",
        },
        {
          text: "管理条例",
        },
        {
          text: "其中",
        },
        {
          text: "异常",
        },
        {
          text: "松脱",
        },
        {
          text: "计划",
        },
        {
          text: "随着",
        },
        {
          text: "23.2万车",
        },
        {
          text: "49",
        },
        {
          text: "santer",
        },
        {
          text: "有关",
        },
        {
          text: "上个月",
        },
        {
          text: "因此",
        },
        {
          text: "迄今",
        },
        {
          text: "156,000",
        },
        {
          text: "制造",
        },
        {
          text: "范围内",
        },
        {
          text: "2012年",
        },
        {
          text: "进一步",
        },
        {
          text: "宣称",
        },
        {
          text: "7月",
        },
        {
          text: "489,000",
        },
        {
          text: "设计",
        },
        {
          text: "机械",
        },
        {
          text: "60",
        },
        {
          text: "nockenwellensteuerung",
        },
        {
          text: "经销商",
        },
        {
          text: "国内外",
        },
        {
          text: "范畴",
        },
        {
          text: "而非",
        },
        {
          text: "11日",
        },
        {
          text: "所有",
        },
        {
          text: "转过",
        },
        {
          text: "宣布",
        },
        {
          text: "规模",
        },
        {
          text: "cao",
        },
        {
          text: "消除",
        },
        {
          text: "修复",
        },
        {
          text: "消费者",
        },
        {
          text: "进口车",
        },
        {
          text: "前不久",
        },
        {
          text: "机运",
        },
        {
          text: "损坏",
        },
        {
          text: "造成",
        },
        {
          text: "更换",
        },
        {
          text: "今年",
        },
        {
          text: "bernhard",
        },
        {
          text: "曾在",
        },
        {
          text: "密封性",
        },
        {
          text: "11月",
        },
        {
          text: "消息",
        },
        {
          text: "vanos",
        },
        {
          text: "权益",
        },
        {
          text: "拓展",
        },
        {
          text: "要求",
        },
        {
          text: "伤亡",
        },
        {
          text: "variable",
        },
        {
          text: "无法",
        },
        {
          text: "凸轮轴",
        },
        {
          text: "属于",
        },
      ],
    },
  };
  $("#returnresult").html(syntaxHighlight(dataList));

  //分页函数
  function pagination(arr) {
    layui.use("laypage", function () {
      var laypage = layui.laypage;

      //执行一个laypage实例
      laypage.render({
        elem: "pagination",
        count: arr.length,
        limit: 20,
        groups: 3,
        layout: ["count", "prev", "page", "next", "skip"],
        jump: function (obj) {
          var pageList = arr.slice((obj.curr - 1) * 20, obj.curr * 20);
          // 插入分析列表数据
          let strHtml = "";
          pageList.forEach((item, index) => {
            strHtml += ` <tr>
              <td>${index + 1}</td>
              <td>${item.text}</td>
              <td>${item.pos_count}</td>
            </tr>`;
          });
          $("#analysis_list").html(strHtml);
        },
        theme: "#5369f8",
      });
    });
  }
  // pagination(dataList);

  $(".analysis_name").click(function () {
    getReturnResult();
  });

  function getReturnResult() {
    let edit_text = filterXSS(
      document.querySelector("#edit_item").value.replace(/\s*/g, "")
    );
    if (edit_text) {
      let editObj = {
        text: edit_text,
        backCount: keywordsNum,
      };
      // console.log(editObj);
      let resultJSON = JSON.stringify(editObj);
      let result = syntaxHighlight(JSON.parse(resultJSON));
      $("#result").html(result);

      document.querySelector("#marklayer").classList.add("mark-show"); //加载状态

      $.ajax({
        method: "POST",
        url: baseAPI + "/keywords",
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
            $("#word_cloud").removeClass("hide");
            $(".prompt").each(function () {
              $(this).addClass("hide");
            });
            pagination(res.results.wordsList); //更新总条数
            let resJSON = JSON.stringify(res);
            resObj = JSON.parse(resJSON);
            let returnresult = syntaxHighlight(resObj);
            $("#returnresult").html(returnresult);

            let table_data = res.results;
            let analysis_list = "";
            var wordCloud = []; //词云图数据
            table_data.wordsList.forEach((item, index) => {
              analysis_list += ` <tr>
              <td>${index + 1}</td>
              <td>${item.text}</td>
              <td>${item.pos_count}</td>
            </tr>`;
              var obj = { x: item.text, value: item.pos_count };
              wordCloud.push(obj);
            });
            $("#analysis_list").html(analysis_list);
            $(".high_frequency_words").css("display", "block");

            var wordArr = [];
            table_data.wordClouds.forEach((item, index) => {
              var obj = { x: item.text, value: item.pos_count };
              wordArr.push(obj);
            });
            anychart.onDocumentReady(function () {
              document.querySelector("#word_cloud").innerHTML = "";
              var chart = anychart.tagCloud(wordArr);
              chart.container("word_cloud");
              document.querySelector(".anychart-credits").style.display =
                "none"; //去除底部声明
              chart.draw();
            });
            $(".word_cloud_display").css("display", "block");
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
      $(".message-error .message_content").html("请输入文本内容");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  }
});
