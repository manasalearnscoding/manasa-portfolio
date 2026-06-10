/* Save / restore home scroll when visiting work.html */
(function () {
  "use strict";

  var KEY = "portfolioReturn";
  var RESTORE = "portfolioRestorePending";
  var HOME = "index.html";
  var path = decodeURIComponent(location.pathname || "");
  var isHome = /index\.html$/.test(path) || path === "/" || path === "" || /\/$/.test(path);
  var isWork = /work\.html$/.test(path);

  function activeHash() {
    if (location.hash) return location.hash;
    var active = document.querySelector("[data-spy][aria-current='true']");
    if (active) {
      var h = active.getAttribute("href");
      if (h && h.charAt(0) === "#") return h;
    }
    var focus = window.innerHeight * 0.45;
    var sections = document.querySelectorAll("[data-spy-section]");
    for (var i = 0; i < sections.length; i++) {
      var r = sections[i].getBoundingClientRect();
      if (r.top <= focus && r.bottom >= focus) return "#" + sections[i].id;
    }
    return "";
  }

  function saveReturn() {
    try {
      sessionStorage.setItem(KEY, JSON.stringify({
        hash: activeHash(),
        scrollY: window.pageYOffset || window.scrollY || 0
      }));
    } catch (e) {}
  }

  function getReturnHref() {
    try {
      var data = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (!data) return HOME;
      return data.hash ? HOME + data.hash : HOME;
    } catch (e) {
      return HOME;
    }
  }

  function restorePosition() {
    try {
      if (sessionStorage.getItem(RESTORE) !== "1") return;
      sessionStorage.removeItem(RESTORE);

      var data = JSON.parse(sessionStorage.getItem(KEY) || "null");
      if (!data || typeof data.scrollY !== "number") return;

      function applyScroll() {
        window.scrollTo({ top: data.scrollY, left: 0, behavior: "auto" });
      }

      if (data.hash && location.hash !== data.hash) {
        location.hash = data.hash.replace(/^#/, "");
      }

      applyScroll();
      requestAnimationFrame(applyScroll);
      setTimeout(applyScroll, 0);
      setTimeout(applyScroll, 50);
      setTimeout(applyScroll, 150);
      setTimeout(applyScroll, 300);
    } catch (e) {}
  }

  if (isHome) {
    document.addEventListener("click", function (e) {
      var link = e.target.closest && e.target.closest('a[href="work.html"]');
      if (link) saveReturn();
    }, true);

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", restorePosition);
    } else {
      restorePosition();
    }
    window.addEventListener("load", restorePosition);
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) restorePosition();
    });
  }

  if (isWork) {
    var back = document.querySelector(".page-back");
    if (back) {
      back.href = getReturnHref();
      back.addEventListener("click", function () {
        try { sessionStorage.setItem(RESTORE, "1"); } catch (e) {}
        back.href = getReturnHref();
      });
    }
  }
})();
