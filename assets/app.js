(function () {
  var STORAGE_KEY = "markio.lang";
  var supported = ["zh", "en"];

  function detect() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && supported.indexOf(saved) >= 0) return saved;
    } catch (e) {}
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  function apply(lang) {
    document.body.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    var btns = document.querySelectorAll(".lang-toggle button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("active", btns[i].dataset.lang === lang);
    }
    var titleNode = document.querySelector('meta[name="x-title-' + lang + '"]');
    if (titleNode) document.title = titleNode.content;
  }

  function setLang(lang) {
    if (supported.indexOf(lang) < 0) return;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang);
  }

  document.addEventListener("DOMContentLoaded", function () {
    apply(detect());
    var toggle = document.querySelector(".lang-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.dataset && t.dataset.lang) setLang(t.dataset.lang);
    });
  });
})();
