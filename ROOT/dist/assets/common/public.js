var baseAPI = "http://127.0.0.1:8866/api"; //请求地址
var logoUrl = "http://127.0.0.1:8866"; //网页logo地址
var staticPath = "http://127.0.0.1:8866"; //模块默认静态资源地址
var requestAddress = "http://127.0.0.1:8866/api"; //模块表格展示请求地址
var configAPI = "http://127.0.0.1:8866/api/userConfig"; //配置管理请求地址
var wsAPI = "ws://127.0.0.1:8866"; //websocket连接地址

var token = localStorage.getItem("token");
var extend_o;
var heartbeat_public; //心跳机制
var heartbeat_private;

if (
  heartbeat_public &&
  window.location.pathname !== "/dist/assets/page/publicChatGPT/index.html"
) {
  clearInterval(heartbeat_public);
}

if (
  heartbeat_private &&
  window.location.pathname !== "/dist/assets/page/privateChatGPT/index.html"
) {
  clearInterval(heartbeat_private);
}

//配置白名单
var whitelist = ["/dist/assets/page/login/login.html"];

//jq 请求拦截器
$.ajaxSetup({
  // cache: false, //关闭AJAX相应的缓存
  contentType: "application/x-www-form-urlencoded;charset=utf-8",
  complete: function (XMLHttpRequest, textStatus) {
    //通过XMLHttpRequest取得响应结果
    var res = XMLHttpRequest.responseText;
    try {
      var jsonData = JSON.parse(res);
      var currentPath = window.location.pathname;

      if (whitelist.indexOf(currentPath) == -1) {
        if (jsonData.code != 200) {
          $(".message-error .message_content").html(
            res.msg || JSON.parse(res).msg
          );
          $(".message-error").removeClass("message-hide");
          setTimeout(() => {
            $(".message-error").addClass("message-hide");
          }, 2000);
          if (
            (jsonData.code == 1201 &&
              jsonData.msg == "secret-id或者secret-key为空,请重新登录!") ||
            (jsonData.code == 1202 &&
              jsonData.msg == "登录状态已过期，请重新登录!")
          ) {
            localStorage.removeItem("token");
            localStorage.removeItem("secret_id");
            localStorage.removeItem("secret_key");
            window.location.href = "/dist/assets/page/login/login.html";
          }
        } else {
        }
      }
    } catch (e) {}
  },
  beforeSend: function (xhr) {
    //可以设置自定义标头
    xhr.setRequestHeader("token", token);
  },
});

// 每次切换菜单栏调用接口填入secret_id,secret_key
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: baseAPI + "/user/getUserById",
    contentType: "application/json",
    success: function (res) {
      if (res.code == 200) {
        $(".secret_id").html(res.result.secret_id);
        $(".secret_key").html(res.result.secret_key);
        localStorage.setItem("secret_id", res.result.secret_id);
        localStorage.setItem("secret_key", res.result.secret_key);
      }
    },
  });
}

if (localStorage.getItem("secret_id") && localStorage.getItem("secret_key")) {
  $(".secret_id").html(localStorage.getItem("secret_id"));
  $(".secret_key").html(localStorage.getItem("secret_key"));
  $(".secret_obj").html(
    localStorage.getItem("secret_id") + "." + localStorage.getItem("secret_key")
  );
} else if (
  window.location.pathname !== "/dist/assets/page/login/login.html" ||
  window.location.pathname !== "/dist/assets/page/login/login.html"
) {
  getUserInfo();
}

function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}
