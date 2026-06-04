// ---------- PROJECT DATA (8 believable student projects) ----------
const projectsData = [
  {
    id: 1,
    title: "Personal Portfolio Website",
    description:
      "A responsive portfolio site built with semantic HTML5 and modern CSS. Features clean structure and accessible markup.",
    image: "/portfolio/assets/images/project-1.jpg",
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
    image: "/portfolio/assets/images/project-2.jpg",
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
    image: "/portfolio/assets/images/project-3.jpg",
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
    image: "/portfolio/assets/images/project-4.jpg",
    category: "HTML",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 5,
    title: "Environmental Recycling Game",
    description:
      "An arcade‑style game teaching waste sorting and recycling through interactive challenges and decision‑making scenarios. Built with HTML, CSS, and JavaScript.",
    image: "/portfolio/assets/images/project-5.jpg",
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
    image: "/portfolio/assets/images/project-6.jpg",
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
    image: "/portfolio/assets/images/project-7.jpg",
    category: "Design",
    tags: ["Figma", "UX Design", "Wireframing"],
    liveUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 8,
    title: "Interactive Data Visualisation Dashboard",
    description:
      "A responsive dashboard that visualises sale performance data using Chart.js. Focuses on making complex information accessible and engaging.",
    image: "/portfolio/assets/images/project-8.jpg",
    category: "JavaScript",
    tags: ["JavaScript", "Chart.js", "HTML", "CSS"],
    liveUrl: "#",
    sourceUrl: "#",
  },
];

// ---------- GLOBAL NAVIGATION ----------
const navHTML = `
  <nav class="main-nav">
    <div class="container nav-container">
      <div class="logo"><a href="/index.html">Ben Lai</a></div>

      <!-- Desktop navigation -->
      <ul class="nav-links desktop-nav">
        <li><a href="/portfolio/index.html">Home</a></li>
        <li><a href="/portfolio/pages/projects.html">Projects</a></li>
        <li><a href="/portfolio/pages/about.html">About</a></li>
        <li><a href="/portfolio/pages/contact.html">Contact</a></li>
      </ul>

      <div class="nav-actions">
        <button class="theme-toggle" id="themeToggleBtn" aria-label="Dark/Light mode">🌓</button>
        <button class="hamburger" id="hamburgerBtn" aria-label="Menu" aria-expanded="false">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>

    <!-- Mobile menu panel -->
    <div class="mobile-menu" id="mobileMenu">
      <ul class="mobile-nav-links">
        <li><a href="/portfolio/index.html">Home</a></li>
        <li><a href="/portfolio/pages/projects.html">Projects</a></li>
        <li><a href="/portfolio/pages/about.html">About</a></li>
        <li><a href="/portfolio/pages/contact.html">Contact</a></li>
      </ul>
    </div>
  </nav>
`;

function injectNavigation() {
  const placeholder = document.getElementById("nav-placeholder");
  if (placeholder) placeholder.innerHTML = navHTML;
  setActiveNavLink();
  attachThemeToggle();
}

function setActiveNavLink() {
  const currentPath = window.location.pathname;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentPath ||
      ((currentPath === "/" || currentPath === "/portfolio/index.html") &&
        href === "/portfolio/index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ---------- THEME ----------
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

function setupMobileMenu() {
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

function updateToggleIcon(theme) {
  const btn = document.getElementById("themeToggleBtn");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌓";
}

// ---------- PROJECT FILTERING ----------
function renderProjects(filter = "All") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const filtered =
    filter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);
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
  const filterContainer = document.getElementById("filter-buttons");
  if (!filterContainer) return;

  const categories = ["All", ...new Set(projectsData.map((p) => p.category))];
  filterContainer.innerHTML = categories
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

// ---------- FEATURED PROJECTS (Home page – 4 projects) ----------
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

  function validateName() {
    const val = nameInput.value.trim();
    const valid = /^[A-Za-z\s]{2,}$/.test(val);
    nameErr.textContent = valid
      ? ""
      : "At least 2 letters, no numbers/special chars.";
    return valid;
  }
  function validateEmail() {
    const val = emailInput.value.trim();
    const valid = /^\S+@\S+\.\S+$/.test(val);
    emailErr.textContent = valid
      ? ""
      : "Valid email required (e.g., name@domain.com)";
    return valid;
  }
  function validateMessage() {
    const val = msgInput.value.trim();
    const valid = val.length >= 10;
    msgErr.textContent = valid ? "" : "Message must be at least 10 characters.";
    return valid;
  }
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

// ---------- BACK TO TOP ----------
function setupBackToTop() {
  document.querySelectorAll(".back-to-top").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}
function createFloatingTopButton() {
  // Create button element
  const btn = document.createElement("button");
  btn.id = "scrollToTopBtn";
  btn.innerHTML = "↑";
  btn.setAttribute("aria-label", "Back to top");
  btn.classList.add("scroll-top-btn");
  document.body.appendChild(btn);

  // Initially hidden
  btn.style.display = "none";

  // Show button after scrolling 300px
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.style.display = "flex";
    } else {
      btn.style.display = "none";
    }
  });

  // Scroll to top on click
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---------- INIT ----------
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
