// ---------- PATH HELPERS  ----------
function isInPagesFolder() {
  return window.location.pathname.includes("/pages/");
}

function getNavLinks() {
  if (isInPagesFolder()) {
    return {
      home: "../index.html",
      projects: "projects.html",
      about: "about.html",
      contact: "contact.html",
    };
  } else {
    return {
      home: "index.html",
      projects: "pages/projects.html",
      about: "pages/about.html",
      contact: "pages/contact.html",
    };
  }
}

function getIconPath(filename) {
  const prefix = isInPagesFolder() ? "../" : "";
  return prefix + "assets/icons/" + filename;
}

function assetPath(filename) {
  const prefix = isInPagesFolder() ? "../" : "";
  return prefix + "assets/images/" + filename;
}


// ---------- PROJECT DATA  ----------
// This array holds all my projects.
const projectsData = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    description:
      "A responsive portfolio site built with semantic HTML5 and modern CSS. Features clean structure and accessible markup.",
    image: assetPath("project-1.jpg"),
    category: "HTML",
    tags: ["HTML", "CSS"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 2,
    title: "Interactive Storytelling Experience",
    description:
      "A branching narrative website exploring user choice and nonlinear storytelling. Built with HTML, CSS, and JavaScript.",
    image: assetPath("project-2.jpg"),
    category: "JavaScript",
    tags: ["JavaScript", "HTML", "CSS"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 3,
    title: "Unity Puzzle Prototype",
    description:
      "A 2D puzzle game prototype with interactive mechanics, level design, and player progression. Made with Unity and C#.",
    image: assetPath("project-3.jpg"),
    category: "Game",
    tags: ["Unity", "C#", "Game Design"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 4,
    title: "Digital Museum Exhibit",
    description:
      "An interactive web exhibit for a fictional museum, combining multimedia content and user navigation.",
    image: assetPath("project-4.jpg"),
    category: "HTML",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 5,
    title: "Environmental Recycling Game",
    description:
      "An arcade‑style game teaching waste sorting and recycling through interactive challenges.",
    image: assetPath("project-5.jpg"),
    category: "Game",
    tags: ["HTML", "CSS", "JavaScript", "Game Design"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 6,
    title: "Event Website",
    description:
      "A responsive information site for hobby events, featuring a dynamic schedule and RSVP form.",
    image: assetPath("project-6.jpg"),
    category: "HTML",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 7,
    title: "Mobile UX Prototype",
    description:
      "A high‑fidelity Figma prototype for a fitness app, including user flows, wireframes, and interactive components.",
    image: assetPath("project-7.jpg"),
    category: "Design",
    tags: ["Figma", "UX Design", "Wireframing"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 8,
    title: "Interactive Data Visualisation Dashboard",
    description:
      "A responsive dashboard that visualises sales performance data using Chart.js.",
    image: assetPath("project-8.jpg"),
    category: "JavaScript",
    tags: ["JavaScript", "Chart.js", "HTML", "CSS"],
    liveUrl: "#",
    sourceUrl: "#",
  },
];

// ---------- NAVIGATION  ----------
// This function builds the entire navigation bar HTML as a string.
function getNavHTML() {
  const links = getNavLinks();
  return `
    <nav class="main-nav">
      <div class="container nav-container">
        <div class="logo"><a href="${links.home}">Ben Lai</a></div>
        <ul class="nav-links desktop-nav">
          <li><a href="${links.home}">Home</a></li>
          <li><a href="${links.projects}">Projects</a></li>
          <li><a href="${links.about}">About</a></li>
          <li><a href="${links.contact}">Contact</a></li>
        </ul>
        <div class="nav-actions">
          <button class="theme-toggle" id="themeToggleBtn" aria-label="Dark/Light mode">
            <img id="themeIcon" src="assets/icons/sun-icon.png" alt="Light mode" class="theme-icon">
          </button>
          <button class="hamburger" id="hamburgerBtn" aria-label="Menu" aria-expanded="false">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        <ul class="mobile-nav-links">
          <li><a href="${links.home}">Home</a></li>
          <li><a href="${links.projects}">Projects</a></li>
          <li><a href="${links.about}">About</a></li>
          <li><a href="${links.contact}">Contact</a></li>
        </ul>
      </div>
    </nav>
  `;
}

function injectNavigation() {
  const placeholder = document.getElementById("nav-placeholder");
  if (placeholder) {
    placeholder.innerHTML = getNavHTML();
  }
  setActiveNavLink();
  attachThemeToggle();
}

function setActiveNavLink() {
  const currentFile = window.location.pathname.split("/").pop() || "index.html";
  document
    .querySelectorAll(".nav-links a, .mobile-nav-links a")
    .forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const linkFile = href.split("/").pop();
      if (
        linkFile === currentFile ||
        (currentFile === "" && linkFile === "index.html")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
}

// ---------- THEME TOGGLE (Light/Dark Mode) ----------
function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
  updateToggleIcon(theme);
}

function attachThemeToggle() {
  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateToggleIcon(next);
  });
}


function updateToggleIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (!icon) return;
  const iconFile = theme === "dark" ? "sun-icon.png" : "moon-icon.png";
  icon.src = getIconPath(iconFile);
  icon.alt = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}

// ---------- MOBILE MENU  ----------
function setupMobileMenu() {
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !expanded);
    mobileMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

// ---------- PROJECT FILTERING  ----------
function renderProjects(filter = "All") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  // Choose which projects to show
  let filtered;
  if (filter === "All") {
    filtered = projectsData;
  } else {
    filtered = projectsData.filter((p) => p.category === filter);
  }
  grid.innerHTML = filtered
    .map(
      (project) => `
    <article class="project-card">
      <img src="${project.image}" alt="${project.title} screenshot" loading="lazy">
      <div class="content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-tags">${project.tags.map((t) => `<span class="tech-tag">${t}</span>`).join("")}</div>
        <div class="project-links">
          <a href="${project.liveUrl}" target="_blank" rel="noopener">Live Demo →</a>
          <a href="${project.sourceUrl}" target="_blank" rel="noopener">Source Code →</a>
        </div>
      </div>
    </article>
  `,
    )
    .join("");
}

function setupFiltering() {
  const container = document.getElementById("filter-buttons");
  if (!container) return;
  const categories = ["All", ...new Set(projectsData.map((p) => p.category))];
  container.innerHTML = categories
    .map(
      (cat) => `
    <button class="filter-btn ${cat === "All" ? "active" : ""}" data-filter="${cat}">${cat}</button>
  `,
    )
    .join("");
  renderProjects("All");
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(filter);
    });
  });
}

// ---------- FEATURED PROJECTS (Home page) ----------
function renderFeaturedProjects() {
  const grid = document.getElementById("featured-grid");
  if (!grid) return;
  const featured = projectsData.slice(0, 4);
  grid.innerHTML = featured
    .map(
      (project) => `
    <article class="project-card">
      <img src="${project.image}" alt="${project.title} screenshot" loading="lazy">
      <div class="content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-tags">${project.tags.map((t) => `<span class="tech-tag">${t}</span>`).join("")}</div>
        <div class="project-links">
          <a href="${project.liveUrl}" target="_blank" rel="noopener">Live Demo →</a>
          <a href="${project.sourceUrl}" target="_blank" rel="noopener">Source Code →</a>
        </div>
      </div>
    </article>
  `,
    )
    .join("");
}

// ---------- CONTACT FORM VALIDATION ----------
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const msgInput = document.getElementById("message");
  const submitBtn = document.getElementById("submitBtn");
  const nameErr = document.getElementById("nameError");
  const emailErr = document.getElementById("emailError");
  const msgErr = document.getElementById("messageError");
  const feedback = document.getElementById("formFeedback");

  // Validate name: at least 2 letters, only letters and spaces
  function validateName() {
    const val = nameInput.value.trim();
    const valid = /^[A-Za-z\s]{2,}$/.test(val);
    nameErr.textContent = valid
      ? ""
      : "At least 2 letters, no numbers/special chars.";
    return valid;
  }
  // Validate email: must contain @ and a domain
  function validateEmail() {
    const val = emailInput.value.trim();
    const valid = /^\S+@\S+\.\S+$/.test(val);
    emailErr.textContent = valid
      ? ""
      : "Valid email required (e.g., name@domain.com)";
    return valid;
  }
  // Validate message: at least 10 characters
  function validateMessage() {
    const val = msgInput.value.trim();
    const valid = val.length >= 10;
    msgErr.textContent = valid ? "" : "Message must be at least 10 characters.";
    return valid;
  }
  // Enable/disable submit button based on all fields being valid
  function updateSubmit() {
    submitBtn.disabled = !(
      validateName() &&
      validateEmail() &&
      validateMessage()
    );
  }
  nameInput.addEventListener("input", updateSubmit);
  emailInput.addEventListener("input", updateSubmit);
  msgInput.addEventListener("input", updateSubmit);
  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  msgInput.addEventListener("blur", validateMessage);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateName() && validateEmail() && validateMessage()) {
      feedback.innerHTML =
        '<span style="color: var(--primary);">✓ Message sent! I’ll reply soon.</span>';
      form.reset();
      submitBtn.disabled = true;
      setTimeout(() => (feedback.innerHTML = ""), 4000);
    } else {
      feedback.innerHTML =
        '<span style="color:#e5484d;">Please fix errors above.</span>';
    }
  });
  updateSubmit();
}

// ---------- BACK TO TOP  ----------
function setupBackToTop() {
  document.querySelectorAll(".back-to-top").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function createFloatingTopButton() {
  const btn = document.createElement("button");
  btn.id = "scrollToTopBtn";
  btn.innerHTML = "↑";
  btn.setAttribute("aria-label", "Back to top");
  btn.classList.add("scroll-top-btn");
  document.body.appendChild(btn);
  btn.style.display = "none";
  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "flex" : "none";
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---------- INITIALISE ALL ----------

document.addEventListener("DOMContentLoaded", () => {
  injectNavigation();
  initTheme();
  setupFiltering();
  renderFeaturedProjects();
  setupContactForm();
  setupBackToTop();
  setupMobileMenu();
  createFloatingTopButton();
});
