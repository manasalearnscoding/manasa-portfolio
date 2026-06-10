/* =====================================================================
   Manasa — Portfolio prototype interactions
   ===================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ------------------------------------------------------------------
     DATA  (swap these for real content later)
     ------------------------------------------------------------------ */
  var GREETINGS = ["Hello!", "Hola!", "नमस्ते!", "Vanakkam!", "Namaskara!"];

  // Highlight reel — the 4 you want to feature on the home page.
  var WORK = [
    {
      role: "Undergraduate AI Research Assistant",
      company: "CLIP Lab, UMIACS — University of Maryland",
      dates: "Feb 2025 – Jan 2026",
      outcome: "Researched safety alignment in large language models at by tracing model internals with mechanistic interpretability, and refactoring a causal tracing framework. Co-authored a paper proposing <b>jailbreak testing as a practical AI safety benchmark</b>.",
      thumb: "images/work/clip-lab/cover.jpg",
      chips: ["Mechanistic Interpretability", "Causal Tracing", "AI Safety", "Jailbreak Testing"],
      link: "case-study/clip-lab.html"
    },
    {
      role: "Market Risk IT Intern",
      company: "Nomura Securities International",
      dates: "June – Aug 2025",
      outcome: "Shipped a proof-of-concept What-If tool pipeline improvement by integrating third-party Python APIs into a Java OLAP system in 10 weeks. <b>Wrote the technical spec, built the Java Spring solution, and XXX</b>.",
      thumb: "images/work/nomura/cover.jpg",
      chips: ["Java Spring", "Python APIs", "Technical Spec", "OLAP Systems", "Cross-functional Delivery"],
      link: "case-study/nomura.html"
    },
    {
      role: "Sourcing Team",
      company: "Hack4Impact — University of Maryland",
      dates: "Sep 2025 – Present",
      outcome: "Cold-outreached ~50 DMV-area nonprofits, ran founder discovery calls to surface operational pain points and translated organizational needs into PRDs <b>complete with user personas and prioritized MVP requirements, for Hack4Impact's leadership board.",
      thumb: "images/work/hack4impact/cover.jpg",
      chips: ["Customer Discovery", "Cold Outreach", "PRD Writing", "User Personas", "Problem Framing"],
      link: "case-study/hack4impact.html"
    },
    {
      role:    "🏆  First Place — TechTurnUp × UXTerps × Hack4Impact",
      company: "University of Maryland",
      dates:   "March 2026",
      outcome: "In 72 hours conducted 20+ stakeholder interviews across 4 user segments. <br>Performed a DVF analysis, built a design system, created a full prototype, and delivered a pitch for CrewCreate, a safe gamified coding platform for kids in underserved areas. <b>Won First place, Currently under client review for implementation.</b>",
      chips:["Figma", "DVF Framework", "User Research", "Design Systems", "Zero-to-One"],
      thumb: "images/work/crewcreate/cover.jpg",
      link: "case-study/crewcreate.html"
    }
  ];

  var CAPABILITIES = [
    { h: "Technical Depth", p: "I work from the inside out - I can read the spec, the paper, and the pull request." },
    { h: "Product Execution", p: "I create user flows, wireframes, interaction design, and high-fidelity prototypes that feel inevitable." },
    { h: "Discovery & Research", p: "I lead client discovery sessions that surface operational pain points from conversation and find the real problem before writing a line of requirements." },
    { h: "Design & Prototyping", p: "I bridge research and engineering by creating user flows, journey maps, information architecture, and a design system from scratch under a time crunch." }
  ];

  var TOOLKIT = [
    { lbl: "Product" , items: ["PRD Writing", "Roadmapping", "OKRs / KPIs", "User Stories", "DVF Framework", "Wireframing"]},
    { lbl: "Design", items: ["Figma", "FigJam", "User Flows", "Journey Mapping", "Adobe Suite"] },
    { lbl: "Engineering", items: ["Python", "TypeScript", "Java", "SQL", "React", "AWS", "Docker", "CI/CD"] },
    { lbl: "AI / ML", items: ["Claude Code", "Claude Design", "PyTorch", "HuggingFace", "Ollama", "TensorFlow"] }
  ];

  /* ==================================================================
     1.  HERO — rolling carousel background
     ================================================================== */
  (function buildMarquee() {
    var rows = document.querySelectorAll(".marquee-row");
    rows.forEach(function (row, ri) {
      var words = GREETINGS.slice(ri).concat(GREETINGS.slice(0, ri));
      var html = "";
      for (var d = 0; d < 2; d++) {
        words.forEach(function (w) { html += "<span>" + w + "</span>"; });
      }
      row.innerHTML = html;
    });
  })();

  /* ==================================================================
     2.  HERO — greeting swipe (vertical slide swap)
     ================================================================== */
  (function greetSwipe() {
    var track = document.getElementById("greetTrack");
    if (!track) return;
    var list = GREETINGS.slice();
    // Only a trailing clone of the first item — no leading clone needed (forward-only loop)
    var nodes = list.concat([list[0]]);
    track.innerHTML = nodes.map(function (w) { return "<span>" + w + "</span>"; }).join("");

    var i = 0, step = 1.15;
    function place(animate) {
      track.style.transition = animate ? "transform .55s cubic-bezier(.66,0,.2,1)" : "none";
      track.style.transform = "translateY(" + (-i * step) + "em)";
    }
    place(false);

    if (reduceMotion) {
      var r = 0;
      setInterval(function () { r = (r + 1) % GREETINGS.length; i = r; place(false); }, 2600);
      return;
    }
    setInterval(function () {
      i++; place(true);
      if (i === nodes.length - 1) setTimeout(function () { i = 0; place(false); }, 580);
    }, 2200);
  })();

  /* ==================================================================
     3.  WORK — build alternating timeline
     ================================================================== */
  (function buildTimeline() {
    var list = document.getElementById("tlList");
    if (!list) return;
    var html = "";
    WORK.forEach(function (w, idx) {
      var side = idx % 2 === 0 ? "left" : "right";
      var chips = w.chips.map(function (c) { return "<li>" + c + "</li>"; }).join("");
      html +=
        '<li class="tl-row" data-side="' + side + '">' +
          '<article class="tl-card">' +
            '<a class="tl-link" href="' + w.link + '" aria-label="Read case study: ' + w.role + ' at ' + w.company + '">' +
              '<div class="tl-thumb"><img src="' + w.thumb + '" alt="' + w.role + '" loading="lazy" /></div>' +
            "</a>" +
            '<div class="tl-body">' +
              '<div class="tl-meta"><span class="tl-role">' + w.role + "</span>" +
                '<span class="tl-dates">' + w.dates + "</span></div>" +
              '<div class="tl-company">' + w.company + "</div>" +
              '<p class="tl-outcome">' + w.outcome + "</p>" +
              '<ul class="tl-chips">' + chips + "</ul>" +
              '<a class="tl-readmore" href="' + w.link + '">Read case study →</a>' +
            "</div>" +
          "</article>" +
          '<span class="tl-node" aria-hidden="true"></span>' +
        "</li>";
    });
    list.innerHTML = html;
  })();

  /* ==================================================================
     4.  SKILLS — build capabilities + toolkit
     ================================================================== */
  (function buildSkills() {
    var cap = document.getElementById("capList");
    if (cap) {
      cap.innerHTML = CAPABILITIES.map(function (c) {
        return '<li class="cap-item"><h4>' + c.h + "</h4><p>" + c.p + "</p></li>";
      }).join("");
    }
    var tg = document.getElementById("toolGroups");
    if (tg) {
      tg.innerHTML = TOOLKIT.map(function (g) {
        var items = g.items.map(function (t) { return "<li>" + t + "</li>"; }).join("");
        return '<div class="tool-group"><div class="lbl">' + g.lbl + "</div>" +
               '<ul class="tool-chips">' + items + "</ul></div>";
      }).join("");
    }
  })();

  /* ==================================================================
     5.  WORK — dot follows the rail (reading guide) + node activation
     ================================================================== */
  var timeline = document.getElementById("timeline");
  var tlFill = document.getElementById("tlFill");
  var tlDot = document.getElementById("tlDot");
  var nodeEls = [].slice.call(document.querySelectorAll(".tl-node"));

  function onWorkScroll() {
    if (!timeline) return;
    var rect = timeline.getBoundingClientRect();
    var h = timeline.offsetHeight;
    var focus = window.innerHeight * 0.5;           // the "reading line"
    var p = clamp((focus - rect.top) / h, 0, 1);
    var y = p * h;

    timeline.classList.toggle("active", rect.top < focus && rect.bottom > focus - 40);
    tlFill.style.height = y + "px";
    tlDot.style.top = y + "px";

    nodeEls.forEach(function (n) {
      var nodeY = n.offsetTop + n.offsetHeight / 2;  // relative to .timeline (positioned)
      n.classList.toggle("is-on", y >= nodeY - 2);
    });
  }

  // reveal cards as they enter
  (function revealCards() {
    var rows = [].slice.call(document.querySelectorAll(".tl-row"));
    if (!("IntersectionObserver" in window)) { rows.forEach(function (r) { r.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.18 });
    rows.forEach(function (r) { io.observe(r); });
  })();

  /* ==================================================================
     6.  ENVELOPE finale — seal + fly to résumé when it enters view
     ================================================================== */
  (function envelopeFinale() {
    var finale = document.getElementById("workFinale");
    var envelope = document.getElementById("envelope");
    var resumeBtn = document.getElementById("resumeBtn");
    if (!finale || !envelope) return;
    var played = false;

    function play() {
      if (played) return;
      played = true;
      envelope.classList.add("is-sealed");
      setTimeout(function () {
        var er = envelope.getBoundingClientRect();
        var br = resumeBtn.getBoundingClientRect();
        envelope.style.setProperty("--fx", (br.left + br.width / 2 - (er.left + er.width / 2)) + "px");
        envelope.style.setProperty("--fy", (br.top + br.height / 2 - (er.top + er.height / 2)) + "px");
        envelope.classList.add("flying");
        setTimeout(function () {
          resumeBtn.classList.add("is-lit", "is-pulsing");
          setTimeout(function () { resumeBtn.classList.remove("is-pulsing"); }, 750);
        }, reduceMotion ? 0 : 620);
      }, reduceMotion ? 0 : 520);
    }
    function reset() {
      played = false;
      envelope.classList.remove("is-sealed", "flying");
      resumeBtn.classList.remove("is-lit");
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio > 0.55) play();
        else if (!e.isIntersecting) reset();   // allow replay when scrolled back up
      });
    }, { threshold: [0, 0.55, 0.8] });
    io.observe(finale);
  })();

  /* ==================================================================
     7.  scroll wiring
     ================================================================== */
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { onWorkScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener("resize", onWorkScroll);
  onWorkScroll();

  /* ==================================================================
     8.  NAV — scrollspy
     ================================================================== */
  (function scrollspy() {
    var sections = [].slice.call(document.querySelectorAll("[data-spy-section]"));
    var links = {};
    document.querySelectorAll("[data-spy]").forEach(function (a) { links[a.getAttribute("data-spy")] = a; });
    function clearAll() { Object.keys(links).forEach(function (k) { links[k].removeAttribute("aria-current"); }); }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          clearAll();
          if (links[e.target.id]) links[e.target.id].setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  })();

})();
