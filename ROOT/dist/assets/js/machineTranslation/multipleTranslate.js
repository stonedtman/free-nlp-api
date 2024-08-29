$(".request_address").attr("href", requestAddress + "/translation");
$(".request_address").html(requestAddress + "/translation");

var exampleList = [
  "新华社一般指新华通讯社。 新华通讯社，简称新华社，是中国国家通讯社和世界性通讯社。现任社长傅华、总编辑吕岩松。新华社的前身是1931年11月7日在江西瑞金成立的红色中华通讯社（简称红中社），1937年1月在陕西延安改为现名。",
  "人生在世，注定要受许多委屈。而一个人越是成功，他所遭受的委屈也越多。\n你可能此时很是烦恼，为何自己没能成功呢？\n但莫言跟我们说得通透了，原来，不论你是谁，活在这个世上，就是要受许多委屈的，而他越是成功，出类拔萃，那他所遭受的委屈也就越多，没有谁能随随便便成功！",
  "今天给大家安利两款简单好用易上手的excel数据分析插件！excel虽然内置有数据分析模块（需要调用开发工具，还不知道怎么调用的请参考小魔方12月21日文章）\n\n但是毕竟不是专业的数据统计分析软件，功能上受限很多。\n当然我们平时的大部分数据分析工作，无论是课程、毕业论文需要的，大家可能更习惯于使用专业的Eviews、SPSS、Stata、Minitab，甚至计量和统计科班的大神们都在用SAS、MATLAB或者R语言、Python语言。",
];
$("#translate_data").val(exampleList[0]);

function pickOption() {
  var selectDom = document.querySelector(".example_list");
  var index = selectDom.selectedIndex; //获取选中项的索引

  $(".src_lang .option").each(function () {
    $(this).removeAttr("selected");
  });
  $(".src_lang .option").each(function () {
    if ($(this).html() == "中文") {
      $(this).attr("selected", true);
    }
  });
  $(".des_lang .option").each(function () {
    $(this).removeAttr("selected");
  });
  $(".des_lang .option").each(function () {
    if ($(this).html() == "英语") {
      $(this).attr("selected", true);
    }
  });
  document.querySelector("#translate_data").value = exampleList[index - 1];
  document.querySelector("#translate_result").innerHTML = "";
}

var languageList = [
  {
    lang: "南非荷兰语",
    code: "af",
  },
  {
    lang: "阿姆哈拉语",
    code: "am",
  },
  {
    lang: "阿拉伯语",
    code: "ar",
  },
  {
    lang: "阿斯图里亚斯语",
    code: "ast",
  },
  {
    lang: "阿塞拜疆语",
    code: "az",
  },
  {
    lang: "巴什基尔语",
    code: "ba",
  },
  {
    lang: "白俄罗斯语",
    code: "be",
  },
  {
    lang: "保加利亚语",
    code: "bg",
  },
  {
    lang: "孟加拉语",
    code: "bn",
  },
  {
    lang: "布雷顿语",
    code: "br",
  },
  {
    lang: "波斯尼亚语",
    code: "bs",
  },
  {
    lang: "加泰罗尼亚语",
    code: "ca",
  },
  {
    lang: "宿务语",
    code: "ceb",
  },
  {
    lang: "捷克语",
    code: "cs",
  },
  {
    lang: "威尔士语",
    code: "cy",
  },
  {
    lang: "丹麦语",
    code: "da",
  },
  {
    lang: "德语",
    code: "de",
  },
  {
    lang: "格里克语",
    code: "el",
  },
  {
    lang: "英语",
    code: "en",
  },
  {
    lang: "西班牙语",
    code: "es",
  },
  {
    lang: "爱沙尼亚语",
    code: "et",
  },
  {
    lang: "波斯语",
    code: "fa",
  },
  {
    lang: "富拉赫语",
    code: "ff",
  },
  {
    lang: "芬兰语",
    code: "fi",
  },
  {
    lang: "法语",
    code: "fr",
  },
  {
    lang: "西弗里斯语",
    code: "fy",
  },
  {
    lang: "爱尔兰语",
    code: "ga",
  },
  {
    lang: "盖尔语",
    code: "gd",
  },
  {
    lang: "加利西亚语",
    code: "gl",
  },
  {
    lang: "古吉拉特语",
    code: "gu",
  },
  {
    lang: "豪萨语",
    code: "ha",
  },
  {
    lang: "希伯来语",
    code: "he",
  },
  {
    lang: "印地语",
    code: "hi",
  },
  {
    lang: "克罗地亚语",
    code: "hr",
  },
  {
    lang: "海地语",
    code: "ht",
  },
  {
    lang: "匈牙利语",
    code: "hu",
  },
  {
    lang: "亚美尼亚语",
    code: "hy",
  },
  {
    lang: "印尼语",
    code: "id",
  },
  {
    lang: "伊博语",
    code: "ig",
  },
  {
    lang: "伊洛卡诺语",
    code: "ilo",
  },
  {
    lang: "冰岛语",
    code: "is",
  },
  {
    lang: "意大利语",
    code: "it",
  },
  {
    lang: "日语",
    code: "ja",
  },
  {
    lang: "爪哇语",
    code: "jv",
  },
  {
    lang: "格鲁吉亚语",
    code: "ka",
  },
  {
    lang: "哈萨克语",
    code: "kk",
  },
  {
    lang: "中央高棉语",
    code: "km",
  },
  {
    lang: "卡纳达语",
    code: "kn",
  },
  {
    lang: "韩语",
    code: "ko",
  },
  {
    lang: "卢森堡语",
    code: "lb",
  },
  {
    lang: "甘达语",
    code: "lg",
  },
  {
    lang: "林加拉语",
    code: "ln",
  },
  {
    lang: "老挝语",
    code: "lo",
  },
  {
    lang: "立陶宛语",
    code: "lt",
  },
  {
    lang: "拉脱维亚语",
    code: "lv",
  },
  {
    lang: "马达加斯加语",
    code: "mg",
  },
  {
    lang: "马其顿语",
    code: "mk",
  },
  {
    lang: "马拉雅拉姆语",
    code: "ml",
  },
  {
    lang: "蒙古族语",
    code: "mn",
  },
  {
    lang: "马拉地语",
    code: "mr",
  },
  {
    lang: "马来语",
    code: "ms",
  },
  {
    lang: "缅甸语",
    code: "my",
  },
  {
    lang: "尼泊尔语",
    code: "ne",
  },
  {
    lang: "荷兰语",
    code: "nl",
  },
  {
    lang: "挪威语",
    code: "no",
  },
  {
    lang: "奥克语",
    code: "oc",
  },
  {
    lang: "奥里亚语",
    code: "or",
  },
  {
    lang: "潘贾比语",
    code: "pa",
  },
  {
    lang: "磨光语",
    code: "pl",
  },
  {
    lang: "普什图语",
    code: "ps",
  },
  {
    lang: "葡萄牙语",
    code: "pt",
  },
  {
    lang: "罗马尼亚语",
    code: "ro",
  },
  {
    lang: "俄语",
    code: "ru",
  },
  {
    lang: "信德省语",
    code: "sd",
  },
  {
    lang: "僧伽罗语",
    code: "si",
  },
  {
    lang: "斯洛伐克语",
    code: "sk",
  },
  {
    lang: "斯洛文尼亚语",
    code: "sl",
  },
  {
    lang: "索马里语",
    code: "so",
  },
  {
    lang: "阿尔巴尼亚语",
    code: "sq",
  },
  {
    lang: "塞尔维亚语",
    code: "sr",
  },
  {
    lang: "斯瓦蒂语",
    code: "ss",
  },
  {
    lang: "巽他语",
    code: "su",
  },
  {
    lang: "瑞典语",
    code: "sv",
  },
  {
    lang: "斯瓦希里语",
    code: "sw",
  },
  {
    lang: "泰米尔语",
    code: "ta",
  },
  {
    lang: "泰语",
    code: "th",
  },
  {
    lang: "他加禄语",
    code: "tl",
  },
  {
    lang: "茨瓦纳语",
    code: "tn",
  },
  {
    lang: "土耳其语",
    code: "tr",
  },
  {
    lang: "乌克兰语",
    code: "uk",
  },
  {
    lang: "乌尔都语",
    code: "ur",
  },
  {
    lang: "乌兹别克语",
    code: "uz",
  },
  {
    lang: "越南语",
    code: "vi",
  },
  {
    lang: "沃洛夫语",
    code: "wo",
  },
  {
    lang: "科萨语",
    code: "xh",
  },
  {
    lang: "意第绪语",
    code: "yi",
  },
  {
    lang: "约鲁巴语",
    code: "yo",
  },
  {
    lang: "中文",
    code: "zh",
  },
  {
    lang: "祖鲁语",
    code: "zu",
  },
];
var srcHtml = `<option selected hidden>请选择源语言</option>`;
var desHtml = ` <option selected hidden>请选择目标语言</option>`;
languageList.forEach((item, index) => {
  srcHtml += `<option class="option" code="${item.code}">${item.lang}</option>`;
  desHtml += `<option class="option" code="${item.code}">${item.lang}</option>`;
});
$(".src_lang").html(srcHtml);
$(".des_lang").html(desHtml);

$(".src_lang .option").each(function () {
  if ($(this).html() == "中文") {
    $(this).attr("selected", true);
  }
});

$(".des_lang .option").each(function () {
  if ($(this).html() == "英语") {
    $(this).attr("selected", true);
  }
});

var src_lang = "zh";
var des_lang = "en";
function pickSrcLang() {
  var selectDom = document.querySelector(".src_lang");
  var index = selectDom.selectedIndex; //获取选中项的索引
  $(".src_lang .option").each(function () {
    $(this).removeAttr("selected");
  });
  $(".src_lang .option")
    .eq(index - 1)
    .attr("selected", true);
  src_lang = $(".src_lang .option")
    .eq(index - 1)
    .attr("code");
}

function pickDesLang() {
  var selectDom = document.querySelector(".des_lang");
  var index = selectDom.selectedIndex; //获取选中项的索引
  $(".des_lang .option").each(function () {
    $(this).removeAttr("selected");
  });
  $(".des_lang .option")
    .eq(index - 1)
    .attr("selected", true);
  des_lang = $(".des_lang .option")
    .eq(index - 1)
    .attr("code");
}

function changeLangue() {
  var src_lang_stag, des_lang_stag;
  $(".src_lang .option").each(function () {
    if ($(this).attr("selected")) {
      src_lang_stag = $(this).attr("code");
    }
  });

  $(".des_lang .option").each(function () {
    if ($(this).attr("selected")) {
      des_lang_stag = $(this).attr("code");
    }
  });

  $(".src_lang .option").each(function () {
    $(this).removeAttr("selected");
  });

  $(".des_lang .option").each(function () {
    $(this).removeAttr("selected");
  });

  $(".src_lang .option").each(function () {
    if ($(this).attr("code") == des_lang_stag) {
      $(this).attr("selected", true);
    }
  });

  $(".des_lang .option").each(function () {
    if ($(this).attr("code") == src_lang_stag) {
      $(this).attr("selected", true);
    }
  });
  src_lang = des_lang_stag;
  des_lang = src_lang_stag;
  if ($("#translate_result").val()) {
    var translate_data = $("#translate_data").val();
    $("#translate_data").val($("#translate_result").val());
    $("#translate_result").val(translate_data);
  } else {
    $("#translate_data").val("");
    $("#translate_result").val("");
  }
}

var edit_text = document.querySelector("#translate_data").value;
var editObj = {
  text: edit_text,
  src_lang: "zh",
  des_lang: "en",
};
var resultJSON = JSON.stringify(editObj);
var result = syntaxHighlight(JSON.parse(resultJSON));
$("#result").html(result); //请求示例

var dataList = {
  msg: "机器翻译成功",
  code: "200",
  results: {
    translate:
      "Xinhua Communications Agency generally refers to Xinhua Communications Agency. Xinhua Communications Agency, abbreviated as Xinhua Communications Agency, is China's national communications agency and worldwide communications agency. Current president Fouaoui, editor-in-chief Liu Yuan. The predecessor of Xinhua Communications Agency was the Red Chinese Communications Agency (abbreviated as Red China) founded in Jiangsu, Jiangsu, Jiangsu, in January 1937.",
  },
};

$("#returnresult").html(syntaxHighlight(dataList)); //返回示例

//点击事件
$(".translate_btn").click(function () {
  var edit_text = filterXSS(document.querySelector("#translate_data").value);

  if (edit_text) {
    $("#marklayer").addClass("mark-show"); //加载状态

    var editObj = {
      text: edit_text,
      src_lang: src_lang,
      des_lang: des_lang,
    };

    var resultJSON = JSON.stringify(editObj);
    var result = syntaxHighlight(JSON.parse(resultJSON));
    $("#result").html(result); //请求示例

    $.ajax({
      method: "POST",
      url: baseAPI + "/translation",
      headers: {
        "secret-id": secret_id,
        "secret-key": secret_key,
      },
      contentType: "application/json",
      dataType: "json",
      data: resultJSON,
      success: function (res) {
        $("#marklayer").removeClass("mark-show");
        if (res.code == 200) {
          var obj = res;
          obj.results.translate.replace("'", "'"); //转义
          res = obj;

          $("#translate_result").val(res.results.translate);

          var resJSON = JSON.stringify(res);
          resObj = JSON.parse(resJSON);
          var returnresult = syntaxHighlight(resObj);
          $("#returnresult").html(returnresult);
        }
      },
    });
  } else {
    $(".message-error .message_content").html("请输入要翻译的内容");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  }
});
