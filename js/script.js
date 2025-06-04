const navPages = document.querySelectorAll(".navItem");

const containerCode = document.querySelector(".containerCardsCodeEditor");
const containerCommunity = document.querySelector(".containerCardsCommunity");
const codeEditor = document.querySelector(".containerCodeEditor");
const projectDescription = document.querySelector(".asideCodeEditor");
const buttonHighlight = document.querySelector(".buttonHighlight");
const backgroundColorCode = document.querySelector(".backgroundCode");
const textarea = document.querySelector("textarea");
const pre = document.querySelector("pre");
const buttonChangeColor = document.querySelector(".button");

const author = document.getElementById("author");
const nameProject = document.getElementById("nameProject");
const descriptionProject = document.getElementById("descriptionProject");
const select = document.getElementById("select");
const buttonSaveProject = document.getElementById("saveProject");
const highlight = document.getElementById("highlight");

let edit = null;
let projects = JSON.parse(localStorage.getItem("projects")) || [];

function updateProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

const backgroundColor = ["#9AFF6B", "#6B83FF", "#FFC46B", "#FF6BCD", "#6bd1ff"];
let i = 0;

buttonSaveProject.addEventListener("click", (e) => {
  e.preventDefault();

  if (edit !== null) {
    updateEditedProject();
  } else {
    saveProject();
  }
});

navPages.forEach((navItem) => {
  navItem.addEventListener("click", () => {
    changeColorNav(navItem);

    const isCommunity = navItem.id === "community";

    containerCode.classList.toggle("hidden", isCommunity);
    containerCommunity.classList.toggle("hidden", !isCommunity);

    projectDescription.classList.toggle("asideCodeEditor", !isCommunity);
    projectDescription.classList.toggle("asideCommunity", isCommunity);

    buttonHighlight.classList.toggle("buttonHighlight", !isCommunity);
    buttonHighlight.classList.toggle("buttonHighlightHidden", isCommunity);

    if (isCommunity) {
      renderCommunityProjects();
    } else {
      textarea.value = "";
      nameProject.value = "";
      descriptionProject.value = "";
      select.value = "javascript";
      i = 0;
      edit = null;

      backgroundColorCode.style.backgroundColor = backgroundColor[i];
      buttonChangeColor.style.backgroundColor = backgroundColor[i];
    }
  });
});

buttonHighlight.addEventListener("click", (e) => {
  e.currentTarget.classList.toggle("active");
  if (e.currentTarget.classList.contains("active")) {
    formatTextHighlight();
  } else {
    textarea.classList.remove("none");
    pre.classList.add("none");
  }
});

function changeColor() {
  buttonChangeColor.style.backgroundColor = backgroundColor[i];
  backgroundColorCode.style.backgroundColor = backgroundColor[i];
  i = (i + 1) % backgroundColor.length;
}

function generateUUID() {
  return crypto.randomUUID();
}

function viewHighlight() {
  const isHighlightActive = buttonHighlight.classList.contains("active");
  const codeValue = isHighlightActive
    ? highlight.textContent.trim()
    : textarea.value.trim();

  if (isHighlightActive) {
    buttonHighlight.classList.remove("active");
    textarea.classList.remove("none");
    pre.classList.add("none");
  }
}

function saveProject() {
  const colorIndex = (i - 1 + backgroundColor.length) % backgroundColor.length;

  const project = {
    code: textarea.value,
    author: author.textContent,
    name: nameProject.value,
    description: descriptionProject.value,
    select: select.value,
    color: colorIndex,
    id: generateUUID(),
  };

  if (
    !project.code ||
    !project.name ||
    !project.description ||
    !project.select
  ) {
    alert("Preencha todos os campos");
    return;
  }

  projects.push(project);
  updateProjects();

  (textarea.value = ""),
    (nameProject.value = ""),
    (descriptionProject.value = ""),
    (select.value = "javascript"),
    (i = 0);

  viewHighlight();
}

function updateEditedProject() {
  if (edit === null || edit >= projects.length) {
    alert("Erro ao editar o projeto.");
    return;
  }

  const colorIndex = (i - 1 + backgroundColor.length) % backgroundColor.length;

  const updatedProject = {
    code: textarea.value,
    author: author.textContent,
    name: nameProject.value,
    description: descriptionProject.value,
    select: select.value,
    color: colorIndex,
    id: projects[edit].id,
  };

  if (
    !updatedProject.code ||
    !updatedProject.name ||
    !updatedProject.description ||
    !updatedProject.select
  ) {
    alert("Preencha todos os campos");
    return;
  }

  projects[edit] = updatedProject;
  updateProjects();

  textarea.value = "";
  nameProject.value = "";
  descriptionProject.value = "";
  select.value = "javascript";
  i = 0;
  edit = null;

  viewHighlight();
  renderCommunityProjects();
}

function formatTextHighlight(codeText = textarea.value) {
  textarea.classList.add("none");
  pre.classList.remove("none");

  highlight.textContent = codeText;
  highlight.className = "hljs";
  highlight.removeAttribute("data-highlighted");

  const lang = select.value;
  highlight.classList.add(`language-${lang}`);
  hljs.highlightElement(highlight);
}

function renderCommunityProjects() {
  const container = document.querySelector(".containerCardsCommunity");
  container.innerHTML = "";

  if (projects.length === 0) {
    container.innerHTML = "<p></p>";
    return;
  }

  projects.forEach((project) => {
    const divContainerCommunity = document.createElement("div");
    divContainerCommunity.classList.add("containerCommunity");

    const backgroundColorCodeCommunity = document.createElement("div");
    backgroundColorCodeCommunity.classList.add("backgroundCode");
    backgroundColorCodeCommunity.style.cursor = "pointer";
    backgroundColorCodeCommunity.style.backgroundColor =
      backgroundColor[project.color];

    const codeDiv = document.createElement("div");
    codeDiv.classList.add("code");

    const containerBalls = document.createElement("div");
    containerBalls.classList.add("containerBalls");
    containerBalls.innerHTML = `
      <div class="ball" style="background-color: #ff5f56"></div>
      <div class="ball" style="background-color: #ffbd2e"></div>
      <div class="ball" style="background-color: #27c93f"></div>
    `;

    const textareaHighlight = document.createElement("div");
    textareaHighlight.classList.add("textareaHighlight");

    const codeBox = document.createElement("pre");
    const codeElement = document.createElement("code");
    codeElement.classList.add("hljs", `language-${project.select}`);
    codeElement.textContent = project.code;

    codeBox.appendChild(codeElement);
    textareaHighlight.appendChild(codeBox);

    codeDiv.appendChild(containerBalls);
    codeDiv.appendChild(textareaHighlight);
    backgroundColorCodeCommunity.appendChild(codeDiv);

    const community = document.createElement("div");
    community.classList.add("community");

    const titleContainer = document.createElement("div");
    titleContainer.classList.add("containerCommunityNames");
    titleContainer.innerHTML = `<h2>${project.name}</h2><p>${project.description}</p>`;

    const containerInteracting = document.createElement("div");
    containerInteracting.classList.add("containerInteracting");

    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("iconsContainer");
    iconsContainer.innerHTML = `
      <div class="icons"><img src="/images/comment.png"/><span>9</span></div>
      <div class="icons"><img src="/images/like.png"/><span>9</span></div>
    `;

    const profileContainer = document.createElement("div");
    profileContainer.classList.add("profile");
    profileContainer.innerHTML = `
      <img src="images/perfil.jpg" class="imageProfileCommunity"/>
      <span>@${project.author}</span>
    `;

    containerInteracting.appendChild(iconsContainer);
    containerInteracting.appendChild(profileContainer);
    community.appendChild(titleContainer);
    community.appendChild(containerInteracting);

    divContainerCommunity.appendChild(backgroundColorCodeCommunity);
    divContainerCommunity.appendChild(community);

    container.appendChild(divContainerCommunity);

    hljs.highlightElement(codeElement);

    backgroundColorCodeCommunity.addEventListener("click", () => {
      const index = projects.findIndex((p) => p.id === project.id);
      goToEditProject(project, index);
    });
  });
}

function changeColorNav(navItem) {
  navPages.forEach((item) => {
    const span = item.querySelector("span");
    const p = item.querySelector("p");
    span.classList.add("opacityBackground");
    p.classList.add("opacityParagraph");
  });
  const span = navItem.querySelector("span");
  const p = navItem.querySelector("p");
  span.classList.remove("opacityBackground");
  p.classList.remove("opacityParagraph");
}

function goToEditProject(project, index) {
  navPages.forEach((navItem) => {
    const isCode = navItem.id === "code";

    containerCode.classList.toggle("hidden", isCode);
    containerCommunity.classList.toggle("hidden", !isCode);

    projectDescription.classList.toggle("asideCodeEditor", !isCode);
    projectDescription.classList.toggle("asideCommunity", isCode);

    buttonHighlight.classList.toggle("buttonHighlight", !isCode);
    buttonHighlight.classList.toggle("buttonHighlightHidden", isCode);
  });

  edit = index;

  textarea.value = project.code;
  nameProject.value = project.name;
  descriptionProject.value = project.description;
  select.value = project.select;
  i = (project.color + 1) % backgroundColor.length;

  const savedColor = backgroundColor[project.color];
  backgroundColorCode.style.backgroundColor = savedColor;
  buttonChangeColor.style.backgroundColor = savedColor;
}
