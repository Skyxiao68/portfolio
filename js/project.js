const filterButtons = document.querySelectorAll(".filter-button");

const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.category;

    projectCards.forEach((card) => {
      const cardCategory = card.dataset.category;

      if (
        selectedCategory === "all" ||
        cardCategory.includes(selectedCategory)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const projectContainer = document.querySelector(".projects-grid");

function renderProjects() {
  projects.forEach((project) => {
    const projectCard = document.createElement("article");

    projectCard.classList.add("project-card");

    projectCard.dataset.category = project.category;

    projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;

    projectContainer.appendChild(projectCard);
  });
}

renderProjects();