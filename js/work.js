var PROJECTS = [
  // ---- Active ----
  { role:"🏆 First Place — TechTurnUp × UXTerps × Hack4Impact", company:"University of Maryland",         dates:"March 2026",         outcome:"In 72 hours: 20+ stakeholder interviews, DVF analysis, design system, full prototype for CrewCreate. <b>Won first place — currently under client review.</b>", thumb:"images/work/crewcreate/cover.jpg",  chips:["Figma","DVF Framework","User Research","Design Systems","Zero-to-One"],          link:"case-study/crewcreate.html",  categories:["Research","Design","Competition"], readmore:"Read case study →" },
  { role:"Sourcing Team",                       company:"Hack4Impact — University of Maryland",      dates:"Sep 2025 – Present",  outcome:"Cold-outreached ~50 DMV-area nonprofits and translated pain points into PRDs <b>complete with user personas and prioritized MVP requirements</b>.", thumb:"images/work/hack4impact/cover.jpg", chips:["Customer Discovery","Cold Outreach","PRD Writing","User Personas"],             link:"case-study/hack4impact.html", categories:["Research"],                        readmore:"Read case study →" },
  { role:"Undergraduate AI Research Assistant", company:"CLIP Lab, UMIACS — University of Maryland", dates:"Feb 2025 – Jan 2026", outcome:"Traced model internals with mechanistic interpretability and co-authored a paper proposing <b>jailbreak testing as a practical AI safety benchmark</b>.", thumb:"images/work/clip-lab/cover.jpg",   chips:["Mechanistic Interpretability","Causal Tracing","AI Safety","Jailbreak Testing"], link:"case-study/clip-lab.html",    categories:["Research"],                        readmore:"Read case study →" },
  { role:"Market Risk IT Intern",               company:"Nomura Securities International",           dates:"June – Aug 2025",     outcome:"Shipped a proof-of-concept What-If tool pipeline by integrating third-party Python APIs into a Java OLAP system. <b>Wrote the spec and built the solution in 10 weeks.</b>", thumb:"images/work/nomura/cover.jpg",     chips:["Java Spring","Python APIs","Technical Spec","OLAP Systems"],                     link:"case-study/nomura.html",      categories:["Engineering"],                     readmore:"Read case study →" },
  { role:"Freelance Writer",                    company:"The Diamondback — University of Maryland",  dates:"2023 — Present",      outcome:"The Diamondback is UMD's independent student-run newspaper. I pick up available stories and cover them.", thumb:"images/work/writing/cover.jpg",   chips:["Writing","Journalism","Communication"],                                           link:"case-study/writing.html",     categories:["Personal"],                        readmore:"Read more →" },
  { role:"CS / Math Tutoring",                  company:"University of Maryland",                    dates:"2024 — Present",      outcome:"Fill this in — one line about who you tutor and what you get out of it.", thumb:"", chips:["Teaching","Communication","CS","Mathematics"],                     link:"case-study/tutoring.html",    categories:["Personal"],                        readmore:"Read more →" },

  // ---- Coming soon (RM-prefixed, excluded from cycle) ----
  // { role:"RiseDC Cookbook",                  company:"Competition",                               dates:"2025",               outcome:"Fill this in.", thumb:"", chips:["Competition","Design"],                                                         link:"case-study/RMrisedc.html",             categories:["Competition","Design"],  readmore:"Read case study →" },
  // { role:"Hack4Impact VMS",                  company:"Hack4Impact — University of Maryland",     dates:"2025",               outcome:"Fill this in.", thumb:"", chips:["Engineering"],                                                                   link:"case-study/RMhack4impact-vms.html",    categories:["Engineering"],           readmore:"Read case study →" },
  // { role:"Engineering Project",              company:"Coming soon",                               dates:"2025",               outcome:"Fill this in.", thumb:"", chips:["Engineering"],                                                                   link:"case-study/RMengineering.html",         categories:["Engineering"],           readmore:"Read more →" },
  // { role:"Kitchen Kompanion",                company:"Side project",                              dates:"2025",               outcome:"Fill this in.", thumb:"", chips:["Design","Figma"],                                                              link:"case-study/RMkitchen-kompanion.html",  categories:["Design"],                readmore:"Read case study →" },
  // { role:"Slack Unified DM Hub",             company:"Product teardown · Case study",             dates:"2025",               outcome:"Fill this in.", thumb:"", chips:["Design","Product Thinking","Figma"],                                            link:"case-study/RMslack.html",              categories:["Design"],                readmore:"Read case study →" },
  // { role:"Designing",                        company:"Side project",                              dates:"2024 — Present",      outcome:"Fill this in.", thumb:"images/work/designing/cover.jpg", chips:["Designing","DIY"],                            link:"case-study/RMdesigning.html",          categories:["Personal"],              readmore:"Read more →" },
  // { role:"Photography & Video Editing",      company:"Division of Student Affairs, UMD",          dates:"2024 — Present",      outcome:"Fill this in.", thumb:"", chips:["Photography","Video Editing"],                                                 link:"case-study/RMphotography.html",        categories:["Personal"],              readmore:"Read more →" },
  // { role:"Marketing",                        company:"Campaigns & strategy",                      dates:"2025 — Present",      outcome:"Fill this in.", thumb:"images/work/marketing/cover.jpg", chips:["Marketing","Strategy"],                       link:"case-study/RMmarketing.html",          categories:["Personal"],              readmore:"Read more →" },
  // { role:"Product Teardowns / Case Studies", company:"Currently exploring",                       dates:"2025 — Present",      outcome:"Fill this in.", thumb:"images/work/learning/cover.jpg",  chips:["Analysis","Case Studies"],                    link:"case-study/RMlearning.html",           categories:["Personal"],              readmore:"Read more →" },
];

  document.getElementById("grid").innerHTML = PROJECTS.map(function(p) {
    return (
      '<a class="proj" href="' + p.link + '" data-categories="' + p.categories.join(" ") + '" aria-label="Open: ' + p.role + ' at ' + p.company + '">' +
        '<div class="thumb">' + (p.thumb ? '<img src="' + p.thumb + '" alt="' + p.role + '" loading="lazy" />' : '') + '</div>' +
        '<div class="body">' +
          '<div class="meta"><span class="role">' + p.role + '</span><span class="dates">' + p.dates + '</span></div>' +
          '<div class="company">' + p.company + '</div>' +
          '<p class="outcome">' + p.outcome + '</p>' +
          '<ul class="chips">' + p.chips.map(function(c){ return '<li>' + c + '</li>'; }).join('') + '</ul>' +
          '<span class="readmore">' + (p.readmore || 'Read more →') + '</span>' +
        '</div>' +
      '</a>'
    );
  }).join("");

  document.querySelectorAll(".filters button").forEach(function(b) {
    b.addEventListener("click", function() {
      document.querySelectorAll(".filters button").forEach(function(x){ x.setAttribute("aria-pressed","false"); });
      b.setAttribute("aria-pressed","true");
      var filter = b.textContent.trim();
      document.querySelectorAll(".proj").forEach(function(card) {
        var cats = (card.dataset.categories || "").split(" ");
        if (filter === "All" || cats.indexOf(filter) !== -1) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });