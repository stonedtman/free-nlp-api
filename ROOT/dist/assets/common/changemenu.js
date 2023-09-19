var isNotback = true;
function jump(path, name, parentname, obj) {
  document.querySelector("#marklayer").classList.remove("mark-show");
  document.querySelector("#marklayer .loading").innerHTML = "加 载 中 ···";
  document.querySelector(".message-success").classList.add("message-hide");
  document.querySelector(".message-error").classList.add("message-hide");

  if (!localStorage.getItem("token")) {
    window.location.href = "/dist/assets/page/login/login.html";
    return;
  }

  if (path) {
    sessionStorage.setItem("path", path);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("parentname", parentname);
  }
  if (obj) {
    sessionStorage.setItem("obj", JSON.stringify(obj));
  } else {
    sessionStorage.removeItem("obj");
  }

  if (name == "首页看板") {
    path = "/dist/index.html";
  }
  var parentMenuItem = "";
  for (let i = 0; i < links.length; i++) {
    if (links[i].innerText.trim() == name) {
      if (parentname && parentname != "undefined") {
        if (
          links[
            i
          ].parentElement.parentElement.parentElement.children[0].innerText.trim() ==
          parentname
        ) {
          matchingMenuItem = links[i];
        }
      } else {
        matchingMenuItem = links[i];
      }
    }
    if (links[i].innerText.trim() == parentname) {
      parentMenuItem = links[i];
    }
  }
  changemenu(path, parentMenuItem);

  if (obj) {
    var arr = [];
    for (var key in obj) {
      arr.push({
        key: key,
        value: obj[key],
      });
    }
    var str = "";
    for (let i = 0; i < arr.length; i++) {
      if (i > 0) {
        str += "&";
      }
      str += arr[i].key + "=" + arr[i].value;
    }
    if (arr.length > 0) {
      path += "?" + str;
    }
  }
  if (isNotback) {
    history.pushState("pushState", path, path);
  }

  if (path) {
    if (name == "首页看板") {
      $("#main").load("/dist/assets/page/home/index.html");
    } else {
      $("#main").load(path);
    }
  }
}
function changemenu(path, parentMenuItem) {
  if (!path) {
    if (matchingMenuItem.getAttribute("aria-expanded") == "true") {
      setTimeout(() => {
        matchingMenuItem.setAttribute("aria-expanded", false);
        matchingMenuItem.parentElement.classList.remove("mm-active");
        matchingMenuItem.nextElementSibling.classList.remove("mm-show");
        matchingMenuItem.nextElementSibling.style = "";
      }, 100);
    } else {
      setTimeout(() => {
        for (let i = 0; i < links.length; i++) {
          links[i].parentElement.classList.remove("mm-active");
          links[i].setAttribute("aria-expanded", false);
          if (links[i].nextElementSibling) {
            links[i].nextElementSibling.classList.remove("mm-show");
            links[i].nextElementSibling.style = "";
          }
        }
        matchingMenuItem.setAttribute("aria-expanded", true);
        matchingMenuItem.parentElement.classList.add("mm-active");
        matchingMenuItem.nextElementSibling.classList.add("mm-show");
        matchingMenuItem.nextElementSibling.style.height = "auto";
      }, 100);
    }
    return;
  }
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove("active");
    links[i].parentElement.classList.remove("mm-active");
    if (!parentMenuItem && links[i].nextElementSibling) {
      links[i].parentElement.classList.remove("mm-active");
      links[i].nextElementSibling.classList.remove("mm-show");
      links[i].setAttribute("aria-expanded", false);
      links[i].nextElementSibling.style = "";
    }
  }
  if (parentMenuItem) {
    setTimeout(() => {
      matchingMenuItem.parentElement.parentElement.parentElement.children[0].setAttribute(
        "aria-expanded",
        true
      );
    }, 100);
    matchingMenuItem.parentElement.parentElement.classList.add("mm-show");
    matchingMenuItem.parentElement.parentElement.parentElement.classList.add(
      "mm-active"
    );
  }
  if (matchingMenuItem) {
    matchingMenuItem.classList.add("active");
  }
  window.scrollTo(0, 0); //重置滚动条
}

var urlList = [
  {
    url: "/dist/index.html",
    name: "首页看板",
    parentname: "",
  },
  {
    url: "/dist/assets/page/emotionAnalysis/index.html",
    name: "通用情感",
    parentname: "情感分析",
  },
  {
    url: "/dist/assets/page/messageExtract/tenderExtract.html",
    name: "招标抽取",
    parentname: "信息抽取",
  },
  {
    url: "/dist/assets/page/messageExtract/contractExtract.html",
    name: "合同抽取",
    parentname: "信息抽取",
  },
  {
    url: "/dist/assets/page/messageExtract/instrumentExtract.html",
    name: "法律文书",
    parentname: "信息抽取",
  },
  {
    url: "/dist/assets/page/messageExtract/resumeExtract.html",
    name: "简历抽取",
    parentname: "信息抽取",
  },
  {
    url: "/dist/assets/page/messageExtract/pointExtract.html",
    name: "观点抽取",
    parentname: "信息抽取",
  },
  {
    url: "/dist/assets/page/messageExtract/eventExtract.html",
    name: "事件抽取",
    parentname: "信息抽取",
  },
  {
    url: "/dist/assets/page/messageExtract/relationExtract.html",
    name: "关系抽取",
    parentname: "信息抽取",
  },
  {
    url: "/dist/assets/page/messageExtract/selfdefineExtract.html",
    name: "自定义抽取",
    parentname: "信息抽取",
  },
  {
    url: "/dist/assets/page/speechRecognition/voicetotext.html",
    name: "语音转文字",
    parentname: "语音识别",
  },
  {
    url: "/dist/assets/page/speechRecognition/texttospeech.html",
    name: "文字转语音",
    parentname: "语音识别",
  },
  {
    url: "/dist/assets/page/speechRecognition/videototext.html",
    name: "视频转文字",
    parentname: "语音识别",
  },
  {
    url: "/dist/assets/page/speechRecognition/voiceclassify.html",
    name: "声音分类",
    parentname: "语音识别",
  },
  {
    url: "/dist/assets/page/documentExtraction/docExtraction.html",
    name: "Doc文档",
    parentname: "文档抽取",
  },
  {
    url: "/dist/assets/page/documentExtraction/pdfExtraction.html",
    name: "PDF文档",
    parentname: "文档抽取",
  },
  {
    url: "/dist/assets/page/documentExtraction/pptExtraction.html",
    name: "PPT文档",
    parentname: "文档抽取",
  },
  {
    url: "/dist/assets/page/documentSearch/index.html",
    name: "文档检索",
    parentname: "",
  },
  {
    url: "/dist/assets/page/documentExtraction/pptExtraction.html",
    name: "文本比对",
    parentname: "",
  },
  {
    url: "/dist/assets/page/machineTranslation/index.html",
    name: "机器翻译",
    parentname: "",
  },
  {
    url: "/dist/assets/page/publicChatGPT/index.html",
    name: "公域GPT",
    parentname: "",
  },
  {
    url: "/dist/assets/page/textCompare/index.html",
    name: "PPT文档",
    parentname: "文档抽取",
  },
  {
    url: "/dist/assets/page/textclass/index.html",
    name: "通用分类",
    parentname: "文本分类",
  },
  {
    url: "/dist/assets/page/entityIdentify/index.html",
    name: "通用识别",
    parentname: "实体识别",
  },
  {
    url: "/dist/assets/page/entityIdentify/agenciesIdentify.html",
    name: "机构识别",
    parentname: "实体识别",
  },
  {
    url: "/dist/assets/page/themeExtract/index.html",
    name: "主题抽取",
    parentname: "",
  },
  {
    url: "/dist/assets/page/autoAbsrtact/index.html",
    name: "自动摘要",
    parentname: "",
  },
  {
    url: "/dist/assets/page/similarity/index.html",
    name: "通用查找",
    parentname: "相似度查找",
  },
  {
    url: "/dist/assets/page/highwordsExtract/index.html",
    name: "高频词提取",
    parentname: "",
  },
  {
    url: "/dist/assets/page/texterrorcorrection/index.html",
    name: "文本纠错",
    parentname: "",
  },
  {
    url: "/dist/assets/page/wordtypeTag/index.html",
    name: "词性标注",
    parentname: "",
  },
  {
    url: "/dist/assets/page/sensitiveWord/index.html",
    name: "合规检测",
    parentname: "",
  },
  {
    url: "/dist/assets/page/imageclassification/index.html",
    name: "通用图像",
    parentname: "图像分类",
  },
  {
    url: "/dist/assets/page/videoclassification/index.html",
    name: "视频分类",
    parentname: "通用分类",
  },
  {
    url: "/dist/assets/page/targetDetect/imageIndex.html",
    name: "图像检测",
    parentname: "目标检测",
  },
  {
    url: "/dist/assets/page/faceCheck/faceDetect.html",
    name: "人脸检测",
    parentname: "人脸识别",
  },
  {
    url: "/dist/assets/page/faceCheck/faceSearch.html",
    name: "人脸搜索",
    parentname: "人脸识别",
  },
  {
    url: "/dist/assets/page/opticalCharacters/index.html",
    name: "通用识别",
    parentname: "光学字符",
  },
  {
    url: "/dist/assets/page/opticalCharacters/captchaIdentify.html",
    name: "验证码识别",
    parentname: "条码识别",
  },
  {
    url: "/dist/assets/page/opticalCharacters/QRcode.html",
    name: "二维码识别",
    parentname: "条码识别",
  },
  {
    url: "/dist/assets/page/opticalCharacters/Barcode.html",
    name: "条形码识别",
    parentname: "条码识别",
  },
];

//监听浏览器回退/前进
window.addEventListener(
  "popstate",
  function (e) {
    // console.log(e.target);
    isNotback = false;
    var url = e.target.location.href;
    urlList.forEach((item, index) => {
      if (url.indexOf(item.url) > -1) {
        jump(url, item.name, item.parentname);
        isNotback = true;
        return false;
      }
    });
  },
  false
);
