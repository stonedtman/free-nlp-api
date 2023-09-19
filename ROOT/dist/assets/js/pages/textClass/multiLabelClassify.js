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
$(".labels_analysis").click(function () {
  $("#marklayer").addClass("mark-show"); //加载状态

  setTimeout(() => {
    $("#marklayer").removeClass("mark-show");
    $(".prompt").eq(2).addClass("hide");
    $(".prompt").eq(3).addClass("hide");
    $(".labels_table").removeClass("hide");
    $("#labels_chart").removeClass("hide");
    var strHtml = "";
    dataList.forEach((item, index) => {
      strHtml += `<tr>
        <td>${index + 1}</td>
        <td>${item.label}</td>
        <td>${item.score}</td>
        </tr>`;
    });
    $("#labels_list").html(strHtml);

    var series = [0.9232456, 0.9112332, 0.9246456];
    var labels = ["事件：新品发布", "行业：5G通信", "文章：科技"];
    $("#labels_chart").html(""); //每次渲染前先清空原来内容
    var r = {
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
          },
          expandOnClick: !1,
        },
      },
      chart: {
        height: 298,
        type: "donut",
      },
      legend: {
        show: !0,
        position: "top",
        horizontalAlign: "center",
        itemMargin: {
          horizontal: 6,
          vertical: 3,
        },
      },
      series: series,
      labels: labels,
      dataLabels: {
        style: {
          colors: ["#fff"],
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      tooltip: {
        y: {
          formatter: function (t) {
            return t;
          },
        },
      },
    };
    new ApexCharts(document.querySelector("#labels_chart"), r).render();
  }, 2000);
});
