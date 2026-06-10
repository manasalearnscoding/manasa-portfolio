/* Auto-generates the "Next project" card from the active project cycle.
   To reorder or add a project: edit the CYCLE array below.
   To exclude a project: comment it out. */
(function () {
  var CYCLE = [
    { link:"crewcreate.html",  role:"🏆 First Place — TechTurnUp × UXTerps × Hack4Impact", company:"University of Maryland" },
    { link:"hack4impact.html", role:"Sourcing Team",                       company:"Hack4Impact — University of Maryland" },
    { link:"clip-lab.html",    role:"Undergraduate AI Research Assistant", company:"CLIP Lab, UMIACS — University of Maryland" },
    { link:"nomura.html",      role:"Market Risk IT Intern",               company:"Nomura Securities International" },
    { link:"writing.html",     role:"Freelance Writer",                    company:"The Diamondback — University of Maryland" },
    { link:"tutoring.html",    role:"CS / Math Tutoring",                  company:"University of Maryland" },
  ];

  var current = location.pathname.split("/").pop();
  var idx = -1;
  for (var i = 0; i < CYCLE.length; i++) {
    if (CYCLE[i].link === current) { idx = i; break; }
  }
  if (idx === -1) return;

  var next = CYCLE[(idx + 1) % CYCLE.length];
  var el = document.querySelector(".cs-next");
  if (!el) return;

  el.innerHTML =
    '<div class="next-label">Next project</div>' +
    '<a class="next-card" href="' + next.link + '">' +
      '<div class="info">' +
        '<div class="role">' + next.role + '</div>' +
        '<div class="company">' + next.company + '</div>' +
      '</div>' +
      '<div class="arrow">\u2192</div>' +
    '</a>';
})();
