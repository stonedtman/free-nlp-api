var dataList = [
  {
    label: "事件：新品发布",
    score: "0.9232456",
  },
  {
    label: "行业：5G通信",
    score: "0.9112332",
  },
  {
    label: "文章：科技",
    score: "0.9246456",
  },
];
$(".levels_analysis").click(function () {
  $("#marklayer").addClass("mark-show"); //加载状态

  setTimeout(() => {
    $("#marklayer").removeClass("mark-show");
    $(".prompt").eq(4).addClass("hide");
    $(".prompt").eq(5).addClass("hide");
    $(".levels_table").removeClass("hide");
    $("#levels_chart").removeClass("hide");
    var strHtml = "";
    dataList.forEach((item, index) => {
      strHtml += `<tr>
          <td>${index + 1}</td>
          <td>${item.label}</td>
          <td>${item.score}</td>
          </tr>`;
    });
    $("#levels_list").html(strHtml);

    $("#labels_chart").html(""); //每次渲染前先清空原来内容

    var chartDom = document.getElementById("levels_chart");
    var myChart = echarts.init(chartDom);
    var option;

    const data = {
      name: "体育",
      children: [
        {
          name: "足球",
          /* children: [
            {
              name: "converters",
              children: [
                { name: "Converters", value: 721 },
                { name: "DelimitedTextConverter", value: 4294 },
              ],
            },
            {
              name: "DataUtil",
              value: 3322,
            },
          ], */
        },
        {
          name: "英超",
        },
      ],
    };
    option = {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove",
      },
      series: [
        {
          type: "tree",
          orient: "TB",
          id: 0,
          name: "tree1",
          data: [data],
          top: "10%",
          left: "8%",
          bottom: "22%",
          right: "20%",
          symbol: "circle",
          symbolSize: 70,
          edgeShape: "polyline",
          edgeForkPosition: "63%",
          initialTreeDepth: 3,
          lineStyle: {
            width: 2,
          },
          label: {
            backgroundColor: "#fff",
            position: "inside",
            verticalAlign: "middle",
            align: "center",
            fontSize: 18,
            color: "#fff",
            backgroundColor: "transparent",
          },
          itemStyle: {
            color: "rgba(153, 153, 153, 1)",
          },
          leaves: {
            label: {
              position: "inside",
              verticalAlign: "middle",
              align: "center",
              fontSize: 18,
              color: "#fff",
              backgroundColor: "transparent",
            },
            itemStyle: {
              color: "rgba(153, 153, 153, 1)",
            },
          },
          emphasis: {
            focus: "descendant",
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    };

    option && myChart.setOption(option);
  }, 2000);
});
