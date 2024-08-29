var isNotback = true;

function jump(path, name, parentname) {
  document.querySelector("#marklayer").classList.remove("mark-show");
  // document.querySelector("#marklayer .loading").innerHTML =
  //   "加 载 中 <span class='dot'></span>";
  document.querySelector(".message-success").classList.add("message-hide");
  document.querySelector(".message-error").classList.add("message-hide");

  if (!localStorage.getItem("token")) {
    window.location.href = "/dist/page/login/login.html";
    return;
  }
  sessionStorage.setItem("path", path);
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("parentname", parentname);
  if (name == "用户信息") {
    path = "/dist/usercenter/index.html";
  }
  var parentMenuItem = "";
  for (let i = 0; i < links.length; i++) {
    if (links[i].innerText.trim() == name) {
      matchingMenuItem = links[i];
    }
    if (links[i].innerText.trim() == parentname) {
      parentMenuItem = links[i];
    }
  }
  changemenu(path, parentMenuItem);

  if (isNotback) {
    history.pushState("pushState", path, path);
  }

  if (path) {
    if (name == "用户信息") {
      $("#main").load("/dist/usercenter/userinfo/index.html");
    } else {
      $("#main").load(path);
    }
  }
}
function changemenu(path, parentMenuItem) {
  if (!path) {
    return;
  }
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove("active");
    if (!parentMenuItem && links[i].nextElementSibling) {
      links[i].ariaExpanded = false;
      links[i].parentElement.classList.remove("mm-active");
      links[i].nextElementSibling.classList.remove("mm-show");
    }
  }
  if (parentMenuItem) {
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
    url: "/dist/usercenter/index.html",
    name: "用户信息",
    parentname: "",
  },
  {
    url: "/dist/usercenter/usequotas/index.html",
    name: "使用配额",
    parentname: "",
  },
  {
    url: "/dist/usercenter/callstatistics/index.html",
    name: "调用统计",
    parentname: "",
  },
];
//监听浏览器回退/前进
window.addEventListener(
  "popstate",
  function (e) {
    console.log(e.target);
    isNotback = false;
    var url = e.target.location.pathname;
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
