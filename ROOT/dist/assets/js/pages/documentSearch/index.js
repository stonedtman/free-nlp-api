var inputParams = {
  keywords: "数字化",
  library: "科技信息",
};

$("#result").html(syntaxHighlight(inputParams)); //请求示例

var outputResult = {
  code: 200,
  msg: "成功",
  result: {
    keyword: "数字化",
    result: [
      {
        docId: 22134,
        fileName: "产业园数字化动态感知平台介绍.docx",
        fileType: "docx",
        hit_page_number: "5,34",
        hit_keywords_count: 4,
        create_time: "2023-8-14 17:00:00",
        file_size: "13KB",
      },
    ],
  },
};
$("#returnresult").html(syntaxHighlight(outputResult));

var tableList = [
  {
    id: 1002,
    fileName: "2023年浙江联通（企业洞察产品）附件2：技术规范书.jpg",
    fileType: "jpg",
    hitPage: "",
    hitKeywordCount: 5,
  },
  {
    id: 2098,
    fileName: "无线蓝牙键盘ALT61通用说明书-电子.pdf",
    fileType: "pdf",
    hitPage: "12，30",
    hitKeywordCount: 4,
  },
  {
    id: 22134,
    fileName: "产业园数字化动态感知平台介绍.docx",
    fileType: "docx",
    hitPage: "5，33",
    hitKeywordCount: 4,
  },
  {
    id: 23451,
    fileName: "南京所大数据平台建设方案v0.4_20210720.docx",
    fileType: "docx",
    hitPage: "7",
    hitKeywordCount: 3,
  },
  {
    id: 3432,
    fileName: "智慧楼宇阅读版0604.txt",
    fileType: "txt",
    hitPage: "",
    hitKeywordCount: 2,
  },
];

var strHtml = "";
tableList.forEach((item, index) => {
  strHtml += `<tr>
    <td>${item.id}</td>
    <td>${item.fileName}</td>
    <td>${item.fileType}</td>
    <td>${item.hitPage}</td>
    <td>${item.hitKeywordCount}</td>
    </tr>`;
});

$("#search-documents").html(strHtml);
