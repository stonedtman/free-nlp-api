$(function () {
  let editObj = {
    question: "写一个中文谍战剧本，故事发生在二战欧洲战场，双面间谍",
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result); //请求示例

  var dataList = [
    {
      text: "故事",
      type: 1,
    },
    {
      text: "背景",
      type: 1,
    },
    {
      text: "：",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n1",
      type: 1,
    },
    {
      text: "9",
      type: 1,
    },
    {
      text: "4",
      type: 1,
    },
    {
      text: "4",
      type: 1,
    },
    {
      text: "年",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "二战",
      type: 1,
    },
    {
      text: "欧洲",
      type: 1,
    },
    {
      text: "战场",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "纳粹",
      type: 1,
    },
    {
      text: "势力",
      type: 1,
    },
    {
      text: "在欧洲",
      type: 1,
    },
    {
      text: "肆虐",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "各国",
      type: 1,
    },
    {
      text: "人民",
      type: 1,
    },
    {
      text: "生活在",
      type: 1,
    },
    {
      text: "水",
      type: 1,
    },
    {
      text: "深",
      type: 1,
    },
    {
      text: "火热",
      type: 1,
    },
    {
      text: "之中",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "在这样的",
      type: 1,
    },
    {
      text: "背景下",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "英国",
      type: 1,
    },
    {
      text: "情报",
      type: 1,
    },
    {
      text: "部门",
      type: 1,
    },
    {
      text: "派遣",
      type: 1,
    },
    {
      text: "了一名",
      type: 1,
    },
    {
      text: "双",
      type: 1,
    },
    {
      text: "面",
      type: 1,
    },
    {
      text: "间谍",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "（",
      type: 1,
    },
    {
      text: "Al",
      type: 1,
    },
    {
      text: "an",
      type: 1,
    },
    {
      text: " T",
      type: 1,
    },
    {
      text: "uring",
      type: 1,
    },
    {
      text: "）",
      type: 1,
    },
    {
      text: "前往",
      type: 1,
    },
    {
      text: "德国",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "刺",
      type: 1,
    },
    {
      text: "探",
      type: 1,
    },
    {
      text: "纳粹",
      type: 1,
    },
    {
      text: "内部",
      type: 1,
    },
    {
      text: "情报",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "然而",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "不仅",
      type: 1,
    },
    {
      text: "成功地",
      type: 1,
    },
    {
      text: "完成了",
      type: 1,
    },
    {
      text: "任务",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "还",
      type: 1,
    },
    {
      text: "成为",
      type: 1,
    },
    {
      text: "英国",
      type: 1,
    },
    {
      text: "情报",
      type: 1,
    },
    {
      text: "部门",
      type: 1,
    },
    {
      text: "的核心",
      type: 1,
    },
    {
      text: "人物",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n角色",
      type: 1,
    },
    {
      text: "介绍",
      type: 1,
    },
    {
      text: "：",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "：",
      type: 1,
    },
    {
      text: "英国",
      type: 1,
    },
    {
      text: "情报",
      type: 1,
    },
    {
      text: "部门",
      type: 1,
    },
    {
      text: "的双",
      type: 1,
    },
    {
      text: "面",
      type: 1,
    },
    {
      text: "间谍",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "聪明",
      type: 1,
    },
    {
      text: "、",
      type: 1,
    },
    {
      text: "机",
      type: 1,
    },
    {
      text: "智",
      type: 1,
    },
    {
      text: "、",
      type: 1,
    },
    {
      text: "勇敢",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n乔治",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "马丁",
      type: 1,
    },
    {
      text: "：",
      type: 1,
    },
    {
      text: "英国",
      type: 1,
    },
    {
      text: "情报",
      type: 1,
    },
    {
      text: "部门",
      type: 1,
    },
    {
      text: "高级",
      type: 1,
    },
    {
      text: "官员",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "的",
      type: 1,
    },
    {
      text: "上线",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n汉",
      type: 1,
    },
    {
      text: "斯",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "哈",
      type: 1,
    },
    {
      text: "斯",
      type: 1,
    },
    {
      text: "：",
      type: 1,
    },
    {
      text: "德国",
      type: 1,
    },
    {
      text: "纳粹",
      type: 1,
    },
    {
      text: "党",
      type: 1,
    },
    {
      text: "党",
      type: 1,
    },
    {
      text: "徒",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "的",
      type: 1,
    },
    {
      text: "卧",
      type: 1,
    },
    {
      text: "底",
      type: 1,
    },
    {
      text: "对象",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n故事",
      type: 1,
    },
    {
      text: "梗",
      type: 1,
    },
    {
      text: "概",
      type: 1,
    },
    {
      text: "：",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n第一",
      type: 1,
    },
    {
      text: "幕",
      type: 1,
    },
    {
      text: "：",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "抵达",
      type: 1,
    },
    {
      text: "德国",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "被",
      type: 1,
    },
    {
      text: "英国",
      type: 1,
    },
    {
      text: "情报",
      type: 1,
    },
    {
      text: "部门",
      type: 1,
    },
    {
      text: "派",
      type: 1,
    },
    {
      text: "往",
      type: 1,
    },
    {
      text: "德国",
      type: 1,
    },
    {
      text: "刺",
      type: 1,
    },
    {
      text: "探",
      type: 1,
    },
    {
      text: "纳粹",
      type: 1,
    },
    {
      text: "内部",
      type: 1,
    },
    {
      text: "情报",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "他",
      type: 1,
    },
    {
      text: "抵达",
      type: 1,
    },
    {
      text: "德国",
      type: 1,
    },
    {
      text: "后",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "顺利",
      type: 1,
    },
    {
      text: "地",
      type: 1,
    },
    {
      text: "与",
      type: 1,
    },
    {
      text: "当地的",
      type: 1,
    },
    {
      text: "抵抗",
      type: 1,
    },
    {
      text: "组织",
      type: 1,
    },
    {
      text: "取得了",
      type: 1,
    },
    {
      text: "联系",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "然而",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "他",
      type: 1,
    },
    {
      text: "并不",
      type: 1,
    },
    {
      text: "知道",
      type: 1,
    },
    {
      text: "的是",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "他的",
      type: 1,
    },
    {
      text: "上线",
      type: 1,
    },
    {
      text: "乔治",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "马丁",
      type: 1,
    },
    {
      text: "已经",
      type: 1,
    },
    {
      text: "安排",
      type: 1,
    },
    {
      text: "好",
      type: 1,
    },
    {
      text: "了一个",
      type: 1,
    },
    {
      text: "陷阱",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "等待",
      type: 1,
    },
    {
      text: "他",
      type: 1,
    },
    {
      text: "落入",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n第二",
      type: 1,
    },
    {
      text: "幕",
      type: 1,
    },
    {
      text: "：",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "深入",
      type: 1,
    },
    {
      text: "敌",
      type: 1,
    },
    {
      text: "后",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "成功",
      type: 1,
    },
    {
      text: "渗透",
      type: 1,
    },
    {
      text: "到了",
      type: 1,
    },
    {
      text: "汉",
      type: 1,
    },
    {
      text: "斯",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "哈",
      type: 1,
    },
    {
      text: "斯的",
      type: 1,
    },
    {
      text: "身边",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "成为了",
      type: 1,
    },
    {
      text: "纳粹",
      type: 1,
    },
    {
      text: "党",
      type: 1,
    },
    {
      text: "党",
      type: 1,
    },
    {
      text: "徒",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "他",
      type: 1,
    },
    {
      text: "利用",
      type: 1,
    },
    {
      text: "自己的",
      type: 1,
    },
    {
      text: "聪明",
      type: 1,
    },
    {
      text: "才",
      type: 1,
    },
    {
      text: "智",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "成功",
      type: 1,
    },
    {
      text: "策划",
      type: 1,
    },
    {
      text: "了一系列",
      type: 1,
    },
    {
      text: "反",
      type: 1,
    },
    {
      text: "间",
      type: 1,
    },
    {
      text: "计",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "让",
      type: 1,
    },
    {
      text: "汉",
      type: 1,
    },
    {
      text: "斯",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "哈",
      type: 1,
    },
    {
      text: "斯",
      type: 1,
    },
    {
      text: "暴露",
      type: 1,
    },
    {
      text: "了",
      type: 1,
    },
    {
      text: "纳粹",
      type: 1,
    },
    {
      text: "党的",
      type: 1,
    },
    {
      text: "阴谋",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "然而",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "他的",
      type: 1,
    },
    {
      text: "行动",
      type: 1,
    },
    {
      text: "最终",
      type: 1,
    },
    {
      text: "失败",
      type: 1,
    },
    {
      text: "了",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n第三",
      type: 1,
    },
    {
      text: "幕",
      type: 1,
    },
    {
      text: "：",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "生死",
      type: 1,
    },
    {
      text: "时刻",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "为了",
      type: 1,
    },
    {
      text: "保护",
      type: 1,
    },
    {
      text: "英国",
      type: 1,
    },
    {
      text: "情报",
      type: 1,
    },
    {
      text: "部门",
      type: 1,
    },
    {
      text: "和",
      type: 1,
    },
    {
      text: "自己的",
      type: 1,
    },
    {
      text: "生命",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "勇敢",
      type: 1,
    },
    {
      text: "地",
      type: 1,
    },
    {
      text: "揭露",
      type: 1,
    },
    {
      text: "了",
      type: 1,
    },
    {
      text: "汉",
      type: 1,
    },
    {
      text: "斯",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "哈",
      type: 1,
    },
    {
      text: "斯的",
      type: 1,
    },
    {
      text: "阴谋",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "然而",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "他的",
      type: 1,
    },
    {
      text: "举动",
      type: 1,
    },
    {
      text: "却",
      type: 1,
    },
    {
      text: "引起了",
      type: 1,
    },
    {
      text: "纳粹",
      type: 1,
    },
    {
      text: "党的",
      type: 1,
    },
    {
      text: "愤怒",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "被",
      type: 1,
    },
    {
      text: "纳粹",
      type: 1,
    },
    {
      text: "党",
      type: 1,
    },
    {
      text: "关",
      type: 1,
    },
    {
      text: "押",
      type: 1,
    },
    {
      text: "在一个",
      type: 1,
    },
    {
      text: "秘密",
      type: 1,
    },
    {
      text: "监狱",
      type: 1,
    },
    {
      text: "中",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "面临着",
      type: 1,
    },
    {
      text: "生死",
      type: 1,
    },
    {
      text: "抉择",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n第四",
      type: 1,
    },
    {
      text: "幕",
      type: 1,
    },
    {
      text: "：",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "逃脱",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n在",
      type: 1,
    },
    {
      text: "乔治",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "马丁",
      type: 1,
    },
    {
      text: "的",
      type: 1,
    },
    {
      text: "帮助下",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "成功",
      type: 1,
    },
    {
      text: "逃脱",
      type: 1,
    },
    {
      text: "了",
      type: 1,
    },
    {
      text: "纳粹",
      type: 1,
    },
    {
      text: "党的",
      type: 1,
    },
    {
      text: "监狱",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "他",
      type: 1,
    },
    {
      text: "回到了",
      type: 1,
    },
    {
      text: "英国",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "向",
      type: 1,
    },
    {
      text: "英国",
      type: 1,
    },
    {
      text: "情报",
      type: 1,
    },
    {
      text: "部门",
      type: 1,
    },
    {
      text: "汇报",
      type: 1,
    },
    {
      text: "了",
      type: 1,
    },
    {
      text: "汉",
      type: 1,
    },
    {
      text: "斯",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "哈",
      type: 1,
    },
    {
      text: "斯的",
      type: 1,
    },
    {
      text: "阴谋",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "英国",
      type: 1,
    },
    {
      text: "情报",
      type: 1,
    },
    {
      text: "部门",
      type: 1,
    },
    {
      text: "在",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "的",
      type: 1,
    },
    {
      text: "帮助下",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "成功",
      type: 1,
    },
    {
      text: "策划",
      type: 1,
    },
    {
      text: "了",
      type: 1,
    },
    {
      text: "多次",
      type: 1,
    },
    {
      text: "反",
      type: 1,
    },
    {
      text: "间",
      type: 1,
    },
    {
      text: "计",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "瓦",
      type: 1,
    },
    {
      text: "解",
      type: 1,
    },
    {
      text: "了",
      type: 1,
    },
    {
      text: "纳粹",
      type: 1,
    },
    {
      text: "党的",
      type: 1,
    },
    {
      text: "阴谋",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n结局",
      type: 1,
    },
    {
      text: "：",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
    {
      text: "\n\n艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "因为",
      type: 1,
    },
    {
      text: "他的",
      type: 1,
    },
    {
      text: "勇敢",
      type: 1,
    },
    {
      text: "和",
      type: 1,
    },
    {
      text: "聪明",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "成为了",
      type: 1,
    },
    {
      text: "英国",
      type: 1,
    },
    {
      text: "情报",
      type: 1,
    },
    {
      text: "部门",
      type: 1,
    },
    {
      text: "的核心",
      type: 1,
    },
    {
      text: "人物",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "二战",
      type: 1,
    },
    {
      text: "结束后",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "艾",
      type: 1,
    },
    {
      text: "伦",
      type: 1,
    },
    {
      text: "·",
      type: 1,
    },
    {
      text: "图",
      type: 1,
    },
    {
      text: "灵",
      type: 1,
    },
    {
      text: "因",
      type: 1,
    },
    {
      text: " his",
      type: 1,
    },
    {
      text: " actions",
      type: 1,
    },
    {
      text: "，",
      type: 1,
    },
    {
      text: "获得了",
      type: 1,
    },
    {
      text: "诺贝尔",
      type: 1,
    },
    {
      text: "密码",
      type: 1,
    },
    {
      text: "安全",
      type: 1,
    },
    {
      text: "奖",
      type: 1,
    },
    {
      text: "。",
      type: 1,
    },
    {
      text: "",
      type: 1,
    },
  ];

  $("#returnresult").html(syntaxHighlight(dataList)); //返回示例
});

var isfinished = true; //判断是否回答完毕
var answerCount = 0; //回答的第几个问题
//进入页面就建立websocket连接
var ws = new WebSocket(wsAPI + "/api/publicChatGLM", [
  secret_id + "." + secret_key,
]);
var responseTime = 0; //请求响应时间 超过30秒无响应断开websocket连接
var sendContent = "";
var timer;

ws.onopen = function () {
  //每隔9分钟发送一个心跳包
  heartbeat_public = setInterval(function () {
    ws.send("ping");
  }, 1000 * 60 * 9);
};

function sendMessage() {
  sendContent = filterXSS($(".chat-input").val());
  if (sendContent) {
    if (isfinished) {
      isfinished = false;

      renderConversation();
    } else {
      $(".message-error .message_content").html(
        "请等待上一个问题回答结束再进行提问"
      );
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    }
  } else {
    $(".message-error .message_content").html("请先输入您的问题");
    $(".message-error").removeClass("message-hide");
    setTimeout(() => {
      $(".message-error").addClass("message-hide");
    }, 2000);
  }
}

function renderConversation() {
  var count;
  if ($(".dialogue_change").prop("checked")) {
    count = 5;
  }

  let editObj = {
    text: sendContent,
    count,
  };
  let resultJSON = JSON.stringify(editObj);
  let result = syntaxHighlight(JSON.parse(resultJSON));
  $("#result").html(result);

  getCurrentTime(); //获取当前时间
  var ulList = document.querySelector(".public-chat .conversation-list"); //父元素

  var elementInput = `<li class="clearfix odd">
  <div class="chat-avatar">
    <img
      src="/dist/assets/images/avatar_man.png"
      alt="Male"
    />
    <i>${sendTime}</i>
  </div>
  <div class="conversation-text">
    <div class="ctext-wrap ask-text">
      <i>我</i>
      <p>${sendContent}</p>
    </div>
  </div>
</li>`;

  ulList.insertAdjacentHTML("beforeend", elementInput);

  var elementOutput = `<li class="clearfix even">
  <div class="chat-avatar">
    <img
      src="/dist/assets/images/chatGPT.png"
      alt="female"
    />
    <i>${sendTime}</i>
  </div>
  <div class="conversation-text">
    <div class="ctext-wrap">
      <i>公域GPT</i>
      <div class="answer-text">
        <div class="loading-dots">
           <div class="dot"></div>
           <div class="dot"></div>
           <div class="dot"></div>
        </div>
      </div>
      <div class="ctext-btns-top">
        <button class="btn btn-link text-success mr-3" onclick="reissuedMessage(${answerCount})">重发</button>
        <button class="btn btn-link" onclick="copyMessage(${answerCount})">复制</button>
      </div>
      <div class="ctext-btns-bottom">
        <button class="btn btn-link text-danger" onclick="stopAnswer()">终止</button>
      </div>
    </div>
  </div>
</li>`;
  ulList.insertAdjacentHTML("beforeend", elementOutput);

  if (ulList.scrollHeight > ulList.clientHeight) {
    ulList.scrollTo(ulList.scrollHeight, ulList.scrollHeight); //滚动条一直在底部
  }
  $(".chat-input").val("");
  $(".chat-input").css("height", "39px");

  var returnAnswer = ""; //接口返回的字符串拼接
  responseTime = 0; //请求响应时间重置

  //接口发送消息
  var param = {
    question: sendContent,
  };
  ws.send(JSON.stringify(param));

  //每次回答下一个问题时，上一个对话的停止按钮都会被移除
  if ($(".ctext-btns-bottom").length > 1) {
    $(".ctext-btns-bottom").eq(0).remove();
  }
  showStopButton();

  //超过30秒并且没有内容返回断开连接
  timer = setInterval(() => {
    responseTime++;
    if (responseTime > 30 && !returnAnswer) {
      ws.close();
      clearInterval(timer);

      var retryElement = `<span class="retry" title="重新发送" onclick="retryMessage(${answerCount})"><i class="uil uil-redo"></i></span>`;
      $(".public-chat .ask-text").eq(answerCount).append(retryElement);
      $(".public-chat .answer-text")
        .eq(answerCount)
        .html("请求无响应，重新发送问题试试吧");
      answerCount++;

      $(".ctext-btns-bottom").eq(0).remove();

      isfinished = true;
      responseTime = 0;
      //没有响应断开重连
      ws = new WebSocket(wsAPI + "/api/publicChatGLM", [
        secret_id + "." + secret_key,
      ]);
    }
  }, 1000);

  ws.onmessage = function (e) {
    clearInterval(timer); //只要有数据返回就清除定时器

    if (typeof e.data == "string") {
      var data = JSON.parse(e.data);
      if (data.type == 1) {
        returnAnswer += data.text;
      }

      if (
        !$(".public-chat .answer-text").eq(answerCount).hasClass("pre-wrap")
      ) {
        $(".public-chat .answer-text").eq(answerCount).addClass("pre-wrap");
      }

      $(".public-chat .answer-text").eq(answerCount).html(returnAnswer);

      var ulList = document.querySelector(".public-chat .conversation-list"); //父元素
      if (ulList.scrollHeight > ulList.clientHeight) {
        ulList.scrollTo(ulList.scrollHeight, ulList.scrollHeight); //滚动条一直在底部
      }

      if (data.type == 0) {
        answerCount++;
        isfinished = true;
        boundEvent();
        $(".ctext-btns-bottom").eq(0).remove();
      }
    }

    //连接失败触发事件
    ws.onerror = function () {
      $(".public-chat .answer-text")
        .eq(answerCount)
        .html("websocket连接失败，重新发送问题试试吧");
      answerCount++;
      $(".message-error .message_content").html("websocket连接失败");
      $(".message-error").removeClass("message-hide");
      setTimeout(() => {
        $(".message-error").addClass("message-hide");
      }, 2000);
    };

    // 断开 websocket 连接成功触发事件
    ws.onclose = function () {
      console.log("断开连接");
    };
  };
}

//回车也可以发送消息
$(".chat-input").keydown(function (e) {
  if (e.keyCode == 13) {
    sendMessage();
  }
});

function boundEvent() {
  $(".answer-text")
    .parent()
    .each(function () {
      $(this).on("mouseenter", function () {
        $(this).find(".ctext-btns-top").css("display", "block");
      });
      $(this).on("mouseleave", function () {
        $(this).find(".ctext-btns-top").css("display", "none");
      });
    });
}

function showStopButton() {
  $(".answer-text")
    .parent()
    .each(function () {
      $(this).on("mouseenter", function () {
        $(this).find(".ctext-btns-bottom").css("display", "block");
      });
      $(this).on("mouseleave", function () {
        $(this).find(".ctext-btns-bottom").css("display", "none");
      });
    });
}

//停止当前回答
function stopAnswer() {
  isfinished = true;
  ws.close();
  clearInterval(timer);

  if (!$(".public-chat .answer-text").eq(answerCount).text()) {
    $(".public-chat .answer-text").eq(answerCount).html("当前对话已终止");
  }

  answerCount++;

  //重连websocket
  ws = new WebSocket(wsAPI + "/api/publicChatGLM", [
    secret_id + "." + secret_key,
  ]);

  $(".ctext-btns-bottom").eq(0).remove();
}

//重新发送消息
function retryMessage(index) {
  sendContent = $(".public-chat .ask-text").eq(index).find("p").html();
  $(".public-chat .ask-text").eq(index).parent().parent().next().remove(); //删除请求失败的回答
  $(".public-chat .ask-text").eq(index).parent().parent().remove(); //删除请求失败的问题
  answerCount--;
  renderConversation();
}

function reissuedMessage(index) {
  sendContent = $(".public-chat .ask-text").eq(index).find("p").html();
  renderConversation();
}

function copyMessage(index) {
  var text = $(".answer-text").eq(index).text();
  var oTextarea = document.createElement("textarea");
  oTextarea.value = text;
  document.body.appendChild(oTextarea);
  oTextarea.select();
  document.execCommand("Copy");
  document.body.removeChild(oTextarea);
  $(".message-success .message_content").html("复制成功");
  $(".message-success").removeClass("message-hide");
  setTimeout(() => {
    $(".message-success").addClass("message-hide");
  }, 2000);
}
