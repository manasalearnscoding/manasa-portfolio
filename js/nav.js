/* Shared mobile nav toggle */
(function () {
  "use strict";

  var nav = document.querySelector(".nav");
  var toggle = document.getElementById("navToggle");
  var backdrop = document.getElementById("navBackdrop");
  if (!nav || !toggle) return;

  var mq = window.matchMedia("(max-width: 1024px)");

  function setOpen(open) {
    if (open && !mq.matches) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-menu-open", open);
    if (backdrop) backdrop.hidden = !open;
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  if (backdrop) {
    backdrop.addEventListener("click", function () { setOpen(false); });
  }

  nav.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () { setOpen(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  mq.addEventListener("change", function (e) {
    if (!e.matches) setOpen(false);
  });
})();
