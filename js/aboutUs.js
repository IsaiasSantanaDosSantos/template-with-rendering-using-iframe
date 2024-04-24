//Get actually URL
let siteProt = location.protocol + "//";
let siteHost = location.host;
let jsonFile = "/api/getJson.aspx?type=home";
// let courseId = 241292; //idDoCurso;// TIRAR VALOR PARA O GRAPE, DEIXAR APENAS A VARIÁVEL CRIADA.
// let categoryId;

//Global variable
const frontUrl = siteProt + siteHost;
let menuInfo = "/api/getJson.aspx?type=menu";
let formLogo = document.querySelector(".formLogo");

// let initUrl = frontUrl;  //No Grape devo descomentar essa variável

// let initUrl = 'https://euestudo.com.vc'; //No Grape devo Comentar essa variável //https://espg.com.br/
// let initUrl = "https://catalogo.drmeducacao.com.br"; //No Grape devo Comentar essa variável //
// let initUrl = 'https://espg.com.br'; //No Grape devo Comentar essa variável //
// let initUrl = 'https://faculdadesucesso.edu.br'; //Tem 3 emphasis
// let initUrl = "https://uniflor.edu.br"; //Tem 9 emphasis
// let initUrl = "http://facigma.edu.br"; // SÓ ESSE ESTÁ DANDO ERRO! //
let initUrl = "https://reboucasdigital.com.br";
// let initUrl = "https://virtual.ajes.edu.br";

const pageLinksList = [
  { page: "Home", id: "408098" },
  { page: "Nossos Cursos", id: "408816" },
  { page: "Quem Somos", id: "408817" },
  { page: "Como Funciona", id: "408818" },
  { page: "FAQ", id: "408819" },
  { page: "Seja Parceiro", id: "408820" },
  { page: "Contato", id: "408821" },
  { page: "Curso", id: "408822" },
  { page: "Política de Privacidade", id: "408823" },
  { page: "Termos de Uso", id: "408824" },
  { page: "Registre-se", id: "408825" },
  { page: "Login", id: "408826" },
];

// Navbar
//Create all menu informations
function fetchJsonNavbarLinks() {
  try {
    fetch(`${initUrl}${menuInfo}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        createNavBarInfo(json);
        getFooterInfo(json);
      });
  } catch (e) {
    console.warn(e);
  }
}
function createNavBarInfo(json) {
  try {
    let navbarImgBox = document.querySelector(".navbarImg");
    //Logo image
    let logoSite = json.logo;
    let linkToLogo = document.createElement("a");
    for (let i = 0; i < pageLinksList.length; i++) {
      if (pageLinksList[i].page === "Home") {
        linkToLogo.setAttribute("aria-label", "Go home");
        linkToLogo.setAttribute("href", pageLinksList[i].id);
      }
    }
    navbarImgBox.appendChild(linkToLogo);
    let logoImg = document.createElement("img");
    logoImg.setAttribute("src", `${initUrl + logoSite}`);
    logoImg.setAttribute("width", "160");
    logoImg.setAttribute("height", "59");
    logoImg.setAttribute("alt", "Logo image");
    linkToLogo.appendChild(logoImg);
    let hiddenText = document.createElement("span");
    hiddenText.innerText = "Go home";
    hiddenText.style.cssText =
      "display:flex; overflow:hidden; width:0; height:0;";
    linkToLogo.appendChild(hiddenText);
  } catch (e) {
    console.warn(e);
  }
}
//End create all menu informations

// Mobile menu
try {
  const mobileMenu = document.querySelector(".menuMobileBtn");
  const barsMenuList = Array.prototype.slice.call(
    document.querySelectorAll(".menuMobileBars")
  );
  const navbarMenuMobile = document.querySelector(".navbarMenu");
  let clickOnMenu = true;

  mobileMenu.addEventListener("click", () => {
    if (clickOnMenu) {
      navbarMenuMobile.style.display = "flex";
      barsMenuList.forEach((bar, idx) => {
        if (idx === 0) {
          bar.style.cssText =
            "transform: rotate(-50deg); margin-top: 0px;transition: 0.6s;width: 130%;";
        } else if (idx === 1) {
          bar.style.display = "none";
        } else if (idx === 2) {
          bar.style.cssText =
            "transform: rotate(50deg); margin-top: -10px;transition: 0.6s;width: 130%;";
        }
      });
      setTimeout(() => (clickOnMenu = false), 600);
    } else {
      navbarMenuMobile.style.display = "none";
      barsMenuList.forEach((bar, idx) => {
        if (idx === 0) {
          bar.style.cssText =
            "transform: rotate(0deg); transition: 0.6s; width: 100%;";
        } else if (idx === 1) {
          setTimeout(() => (bar.style.display = "block"), 350);
        } else if (idx === 2) {
          bar.style.cssText =
            "transform: rotate(0deg); transition: 0.6s;width: 100%;";
        }
      });
      setTimeout(() => (clickOnMenu = true), 600);
    }
  });
} catch (er) {
  console.warn(er);
}
//Create navbar link
const navbarLinks = Array.prototype.slice.call(
  document.querySelectorAll(".itemsMenuNavbar a")
);
try {
  for (let i = 0; i < pageLinksList.length; i++) {
    for (let e = 0; e < navbarLinks.length; e++) {
      if (pageLinksList[i].page === navbarLinks[e].textContent) {
        navbarLinks[e].setAttribute("href", pageLinksList[i].id);
      }
    }
  }
} catch (e) {
  console.warn(e);
}
//Login button
let coletaLeadLogin = document.querySelector(".coletaLeadLogin");
if (coletaLeadLogin) {
  for (let i = 0; i < pageLinksList.length; i++) {
    if (pageLinksList[i].page === "Login") {
      coletaLeadLogin.setAttribute("href", pageLinksList[i].id);
    }
  }
}
//Register button
let registerNavbarBtn = document.querySelector(".registerNavbarBtn");
if (registerNavbarBtn) {
  for (let i = 0; i < pageLinksList.length; i++) {
    if (pageLinksList[i].page === "Registre-se") {
      registerNavbarBtn.setAttribute("href", pageLinksList[i].id);
    }
  }
}
// End of Navbar

// Our Story section
const toRegisterPage = document.querySelector(".ourStoryRegisterBtn");
const toCoursesPage = document.querySelector(".ourStoryCoursesBtn");
//Register buttons
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === "Registre-se") {
    toRegisterPage.setAttribute("href", `/page/${pageLinksList[i].id}`);
  }
}
//See our courses buttons
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === "Nossos Cursos") {
    toCoursesPage.setAttribute("href", `/page/${pageLinksList[i].id}`);
  }
}
// End of Our Story section

//Testimonials section
function getTestimonials(json) {
  console.log(json);
  try {
    // $(document).ready(function () {
    //   $('.courseDetailsContent')
    //     .find('script')
    //     .each(function () {
    //       eval($(this).text()); // Execute cada script usando eval()
    //     });
    // });

    let testimoniesSection = document.querySelector(".testimonialSection");
    // let whoDo = document.querySelector('.testimonialsTitle');

    //Header section
    let institutionName = [
      ...document.querySelectorAll('[data-institute="instituteName"]'),
    ];
    institutionName.forEach((e) => {
      e.innerHTML = json.PortalEducacional || json.title;
    });
    //End of Header section

    let testimoniesBox = document.querySelector(".depoimentosSlide-list");
    let testimoniesList = document.querySelectorAll(
      '[data-slide="depoimentos-slide-item"]'
    );

    if (json.PortalEducacional)
      if (json.testimonies) {
        //   institutionName.innerHTML = json.PortalEducacional;
        let count = -1;
        for (let i = 0; i < json.testimonies.quotes.length; i++) {
          count++;
          //Eacth testimonies
          let testimoniesBoxes = document.createElement("div");
          testimoniesBoxes.classList.add("depoimentosSlide-item");
          testimoniesBoxes.dataset.slide = "depoimentos-slide-item";
          testimoniesBoxes.dataset.indice = testimoniesList.length + count;
          testimoniesBox.appendChild(testimoniesBoxes);
          //Intern box
          let internBox = document.createElement("div");
          internBox.classList.add("internBox");
          testimoniesBoxes.appendChild(internBox);
          //Testimonies content
          let contents = document.createElement("div");
          contents.classList.add("depoimentosSlide-content");
          internBox.appendChild(contents);
          //Icon
          let icons = document.createElement("i");
          icons.classList.add("aspasDepoimentos");
          // icons.innerHTML = 'format_quote';
          icons.innerHTML = ",,";
          contents.appendChild(icons);
          //Content text box
          let contentTextBox = document.createElement("div");
          contentTextBox.classList.add("contentTextBox");
          contents.appendChild(contentTextBox);
          //Testimonies text
          let testimoniesText = document.createElement("p");
          testimoniesText.classList.add("txtDepoimentos");
          testimoniesText.innerHTML = json.testimonies.quotes[i].excerpt;
          contentTextBox.appendChild(testimoniesText);
          //footer box
          let footerBox = document.createElement("div");
          footerBox.classList.add("footerBox");
          internBox.appendChild(footerBox);
          //Author name
          let authorName = document.createElement("p");
          authorName.classList.add("nomeAutorDepoimento");
          authorName.innerHTML = json.testimonies.quotes[i].author;
          footerBox.appendChild(authorName);
          //Course
          let courseName = document.createElement("p");
          courseName.classList.add("redeScAutorDepoimento");
          courseName.innerHTML = json.testimonies.quotes[i].course;
          footerBox.appendChild(courseName);
        }
        testimonioalSlideEvents();
      } else if (!json.testimonies) {
        console.log("Não há depoimentos na API.");
        testimoniesSection.style.display = "none";
      }
  } catch (e) {
    console.warn(e);
  }
}
function testimonioalSlideEvents() {
  try {
    const depoimentosSlideWrapper = document.querySelector(
      '[data-slide="depoimentosSlide-wrapper"]'
    );
    const depoimentosSlideList = document.querySelector(
      '[data-slide="depoimentos-slide-list"]'
    );
    const depoimentosPreviousBtn = document.querySelector(
      '[data-slide="depoimentos-previous-btn"]'
    );
    const depoimentosNextBtn = document.querySelector(
      '[data-slide="depoimentos-next-btn"]'
    );
    const depoimentosControlsWapper = document.querySelector(
      '[data-slide="depoimentos-slide-controls-wrapper"]'
    );
    let depoimentosSlideItems = document.querySelectorAll(
      '[data-slide="depoimentos-slide-item"]'
    );
    let depoimentosControlButtons;
    let depoimentosSlideInterval;

    const depoimentosState = {
      depoimentosStartingPoint: 0,
      depoimentosSavedPosition: 0,
      depoimentosCurrentPoint: 0,
      depoimentosMovement: 0,
      CurrentDepoimentosSlideIndex: 0,
      depoimentosAutoPlay: true,
      depoimentosTimeInterval: 0,
    };

    //Mudar slides
    function translateDepoimentosSlide({ depoimentosPosition }) {
      depoimentosState.depoimentosSavedPosition = depoimentosPosition;
      depoimentosSlideList.style.transform = `translateX(${depoimentosPosition}px)`;
    }

    function getCenterDepoimentosPosition({ indice }) {
      const depoimentosSlideItem = depoimentosSlideItems[indice];
      const depoimentosSlideWidth = depoimentosSlideItem.clientWidth;
      const windowDepoimentosWidth = document.body.clientWidth;
      const marginDepoimentos =
        (windowDepoimentosWidth - depoimentosSlideWidth) / 2;
      const depoimentosPosition =
        marginDepoimentos - indice * depoimentosSlideWidth;
      return depoimentosPosition;
    }

    function setVisibleDepoimentosSlide({ indice, animateDepoimentos }) {
      if (indice === 0 || indice === depoimentosSlideItems.length - 1) {
        indice = depoimentosState.CurrentDepoimentosSlideIndex;
      }
      const depoimentosPosition = getCenterDepoimentosPosition({ indice });
      depoimentosState.CurrentDepoimentosSlideIndex = indice;
      depoimentosSlideList.style.transition =
        animateDepoimentos === true ? "transform 1s" : "none";
      activeDepoimentosControlButton({ indice });
      translateDepoimentosSlide({ depoimentosPosition: depoimentosPosition });
    }

    function nextDepoimentosSlide() {
      setVisibleDepoimentosSlide({
        indice: depoimentosState.CurrentDepoimentosSlideIndex + 1,
        animateDepoimentos: true,
      });
    }

    function previousDepoimentosSlide() {
      setVisibleDepoimentosSlide({
        indice: depoimentosState.CurrentDepoimentosSlideIndex - 1,
        animateDepoimentos: true,
      });
    }

    function createDepoimentosControlButtons() {
      depoimentosSlideItems.forEach(function () {
        const depoimentosControlButton = document.createElement("button");
        depoimentosControlButton.dataset.slide = "depoimentos-control-btn";
        depoimentosControlButton.setAttribute("aria-label", "Show testimonial");
        depoimentosControlButton.classList.add(
          "depoimentosSlide-control-button"
        );
        let icon = document.createElement("span");
        icon.classList.add("fas", "fa-circle");
        depoimentosControlButton.appendChild(icon);
        let hiddenText = document.createElement("span");
        hiddenText.innerText = "Show testimonial";
        hiddenText.style.cssText =
          "display:flex; overflow:hidden; width:0; height:0;";
        depoimentosControlButton.appendChild(hiddenText);
        depoimentosControlsWapper.append(depoimentosControlButton);
      });
    }

    function activeDepoimentosControlButton({ indice }) {
      const depoimentosSlideItem = depoimentosSlideItems[indice];
      const dataIndice = Number(depoimentosSlideItem.dataset.indice);
      const depoimentosControlButton = depoimentosControlButtons[dataIndice];
      depoimentosControlButtons.forEach(function (
        depoimentosControlButtonItem
      ) {
        depoimentosControlButtonItem.classList.remove("activeDepoimentos");
      });
      if (depoimentosControlButton)
        depoimentosControlButton.classList.add("activeDepoimentos");
    }

    function createDepoimentosSlideClone() {
      const firstDepoimentosSlide = depoimentosSlideItems[0].cloneNode(true);
      firstDepoimentosSlide.classList.add("depoimentosSlide-cloned");
      firstDepoimentosSlide.dataset.indice = depoimentosSlideItems.length;

      const secundDepoimentosSlide = depoimentosSlideItems[1].cloneNode(true);
      secundDepoimentosSlide.classList.add("depoimentosSlide-cloned");
      secundDepoimentosSlide.dataset.indice = depoimentosSlideItems.length + 1;

      const lastDepoimentosSlide =
        depoimentosSlideItems[depoimentosSlideItems.length - 1].cloneNode(true);
      lastDepoimentosSlide.classList.add("depoimentosSlide-cloned");
      lastDepoimentosSlide.dataset.indice = -1;

      const penultimateDepoimentosSlide =
        depoimentosSlideItems[depoimentosSlideItems.length - 2].cloneNode(true);
      penultimateDepoimentosSlide.classList.add("depoimentosSlide-cloned");
      penultimateDepoimentosSlide.dataset.indice = -2;

      //Criar no final da lista
      depoimentosSlideList.append(firstDepoimentosSlide);
      depoimentosSlideList.append(secundDepoimentosSlide);
      //Criar no início da lista
      depoimentosSlideList.prepend(lastDepoimentosSlide);
      depoimentosSlideList.prepend(penultimateDepoimentosSlide);

      depoimentosSlideItems = document.querySelectorAll(
        '[data-slide="depoimentos-slide-item"]'
      );
    }

    //Apertar
    function onDepoimentosMouseDown(evento, indice) {
      const depoimentosSlideItem = evento.currentTarget;
      depoimentosState.depoimentosStartingPoint = evento.clientX;
      depoimentosState.depoimentosCurrentPoint =
        depoimentosState.depoimentosStartingPoint -
        depoimentosState.depoimentosSavedPosition;
      depoimentosState.diaDiaCurrentSlideindice = indice;
      depoimentosSlideList.style.transition = "none";
      depoimentosSlideItem.addEventListener(
        "mousemove",
        onDepoimentosMouseMove
      );
    }
    //Evento de mover mouse
    function onDepoimentosMouseMove(evento, indice) {
      depoimentosState.depoimentosMovement =
        evento.clientX - depoimentosState.depoimentosStartingPoint;
      const depoimentosPosition =
        evento.clientX - depoimentosState.depoimentosCurrentPoint;
      translateDepoimentosSlide({ depoimentosPosition });
    }
    //Soltar
    function noDepoimentosMouseUp(evento) {
      const pointsToMoveDepoimentos = evento.type.includes("touch") ? 50 : 150;
      // console.log(evento.type);
      const depoimentosSlideItem = evento.currentTarget;
      if (depoimentosState.depoimentosMovement < -pointsToMoveDepoimentos) {
        nextDepoimentosSlide();
      } else if (
        depoimentosState.depoimentosMovement > pointsToMoveDepoimentos
      ) {
        previousDepoimentosSlide();
      } else {
        setVisibleDepoimentosSlide({
          indice: depoimentosState.CurrentDepoimentosSlideIndex,
          animateDepoimentos: true,
        });
      }

      depoimentosSlideItem.removeEventListener(
        "mousemove",
        onDepoimentosMouseMove
      );
    }

    function onDepoimentosTouchStart(evento, indice) {
      evento.clientX = evento.touches[0].clientX;
      onDepoimentosMouseDown(evento, indice);
      const depoimentosSlideItem = evento.currentTarget;
      depoimentosSlideItem.addEventListener(
        "touchmove",
        onDepoimentosTouchMove
      );
    }

    function onDepoimentosTouchMove(evento) {
      evento.clientX = evento.touches[0].clientX;
      onDepoimentosMouseMove(evento);
    }
    function onDepoimentosTouchEnd(evento) {
      noDepoimentosMouseUp(evento);
      const depoimentosSlideItem = evento.currentTarget;
      depoimentosSlideItem.removeEventListener(
        "touchmove",
        onDepoimentosTouchMove
      );
    }

    function onDepoimentosControlButtonClick(indice) {
      setVisibleDepoimentosSlide({
        indice: indice + 2,
        animateDepoimentos: true,
      });
    }

    function onDepoimentosSlideListTransitionEnd() {
      const depoimentosSlideItem =
        depoimentosSlideItems[depoimentosState.CurrentDepoimentosSlideIndex];

      if (
        depoimentosSlideItem.classList.contains("depoimentosSlide-cloned") &&
        Number(depoimentosSlideItem.dataset.indice) > 0
      ) {
        setVisibleDepoimentosSlide({ indice: 2, animateDepoimentos: false });
      }
      if (
        depoimentosSlideItem.classList.contains("depoimentosSlide-cloned") &&
        Number(depoimentosSlideItem.dataset.indice) < 0
      ) {
        setVisibleDepoimentosSlide({
          indice: depoimentosSlideItems.length - 3,
          animateDepoimentos: false,
        });
      }
    }

    function setDepoimentosAutoPlay() {
      if (depoimentosState.depoimentosAutoPlay) {
        depoimentosSlideInterval = setInterval(function () {
          setVisibleDepoimentosSlide({
            indice: depoimentosState.CurrentDepoimentosSlideIndex + 1,
            animateDepoimentos: true,
          });
        }, depoimentosState.depoimentosTimeInterval);
      }
    }

    function setDepoimentosListeners() {
      depoimentosControlButtons = document.querySelectorAll(
        '[data-slide="depoimentos-control-btn"]'
      );
      depoimentosSlideItems = document.querySelectorAll(
        '[data-slide="depoimentos-slide-item"]'
      );

      //Adicionar evento nos indicatons
      depoimentosControlButtons.forEach(function (
        depoimentosControlButton,
        indice
      ) {
        depoimentosControlButton.addEventListener("click", function (evento) {
          onDepoimentosControlButtonClick(indice);
        });
      });

      //Eventos do mouse
      depoimentosSlideItems.forEach(function (depoimentosSlideItem, indice) {
        //Arrastar
        depoimentosSlideItem.addEventListener("dragstart", function (evento) {
          evento.preventDefault();
        });
        //Apertar
        depoimentosSlideItem.addEventListener("mousedown", function (evento) {
          onDepoimentosMouseDown(evento, indice);
        }),
          //Soltar no mobile
          depoimentosSlideItem.addEventListener(
            "mouseup",
            noDepoimentosMouseUp
          );

        //Apertar no mobile
        depoimentosSlideItem.addEventListener("touchstart", function (evento) {
          onDepoimentosTouchStart(evento, indice);
        }),
          //Soltar
          depoimentosSlideItem.addEventListener(
            "touchend",
            onDepoimentosTouchEnd
          );
      });

      depoimentosNextBtn.addEventListener("click", nextDepoimentosSlide);
      depoimentosPreviousBtn.addEventListener(
        "click",
        previousDepoimentosSlide
      );

      //Evento para voltar o slide de forma que o usuário não perceba
      depoimentosSlideList.addEventListener(
        "transitionend",
        onDepoimentosSlideListTransitionEnd
      );
      depoimentosSlideWrapper.addEventListener("mouseenter", function () {
        clearInterval(depoimentosSlideInterval);
      });
      depoimentosSlideWrapper.addEventListener("mouseleave", function () {
        setDepoimentosAutoPlay();
      });

      //Manter posicionamento padrão
      let depoimentosResizeTimeOut;
      window.addEventListener("resize", function () {
        clearTimeout(depoimentosResizeTimeOut);
        depoimentosResizeTimeOut = setTimeout(function () {
          setVisibleDepoimentosSlide({
            indice: depoimentosState.CurrentDepoimentosSlideIndex,
            animateDepoimentos: true,
          });
        }, 500);
      });
    }

    function initDepoimentosSlider({
      startAtIndice = 0,
      depoimentosAutoPlay = true,
      depoimentosTimeInterval = 3000,
    }) {
      depoimentosState.depoimentosAutoPlay = depoimentosAutoPlay;
      depoimentosState.depoimentosTimeInterval = depoimentosTimeInterval;
      createDepoimentosControlButtons();
      createDepoimentosSlideClone();
      setDepoimentosListeners();
      setVisibleDepoimentosSlide({
        indice: startAtIndice + 2,
        animateDepoimentos: true,
      });
      setDepoimentosAutoPlay();
    }

    initDepoimentosSlider({
      depoimentosAutoPlay: true,
      startAtIndice: 0,
      depoimentosTimeInterval: 3000,
    });
  } catch (e) {
    console.warn(e);
  }
}
//End of Testimonials section

// Find elements and add SEO attributes
function findElementsAndAddSeoAttributes() {
  const as = [...document.querySelectorAll("a")];
  const iframes = [...document.querySelectorAll("iframe")];
  const imgs = [...document.querySelectorAll("img")];
  const btns = [...document.querySelectorAll("button")];
  const inputs = [...document.querySelectorAll("input")];
  let count = 0;
  if (as.length > 0) {
    as.forEach((e) => {
      const hasDirectTextContent = e.textContent.trim().length > 0;
      const hasVisibleChildText = [...e.childNodes].some((node) => {
        return (
          node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
        );
      });
      if (hasDirectTextContent || hasVisibleChildText) {
        e.setAttribute("aria-label", e.textContent.replace(/\s+/g, " ").trim());
      } else {
        let hiddenText = document.createElement("span");
        hiddenText.innerText = "Saiba mais";
        hiddenText.style.cssText =
          "display:flex; overflow:hidden; width:0; height:0;";
        e.appendChild(hiddenText);
        e.setAttribute("aria-label", "Saiba mais");
      }
    });
  }
  if (iframes.length > 0) {
    iframes.forEach((e) => {
      if (!e.getAttribute("title")) {
        e.setAttribute("title", "Veja nosso conteúdo");
      }
    });
  }
  if (imgs.length > 0) {
    imgs.forEach((e) => {
      if (!e.getAttribute("alt")) e.setAttribute("alt", "Imagem");
      if (!e.getAttribute("data-src")) e.setAttribute("data-src", e.src);
      if (!e.getAttribute("loading")) e.setAttribute("loading", "lazy");
    });
  }
  if (btns.length > 0) {
    btns.forEach((e) => {
      if (!e.getAttribute("aria-label")) {
        if (!e.textContent) {
          let hiddenText = document.createElement("span");
          hiddenText.innerText = "Saiba mais";
          hiddenText.style.cssText =
            "display:flex; overflow:hidden; width:0; height:0;";
          e.appendChild(hiddenText);
        }
        e.setAttribute("aria-label", e.textContent.replace(/\s+/g, " ").trim());
      }
    });
  }
  if (inputs.length > 0) {
    inputs.forEach((input) => {
      count++;
      if (!input.id) {
        input.id = "input-" + count;
      }
      const inputId = input.id.trim();
      let label = document.querySelector(`label[for="${inputId}"]`);
      if (!label) {
        const newLabel = document.createElement("label");
        newLabel.setAttribute("for", input.id);
        let hiddenText = document.createElement("span");
        hiddenText.innerText = "Preencha o campo abaixo";
        hiddenText.style.cssText =
          "display:flex; overflow:hidden; width:0; height:0;";
        newLabel.appendChild(hiddenText);
        input.parentNode.insertBefore(newLabel, input.nextSibling);
      }
      const autocompleteTypes = ["text", "email", "password", "tel"];
      if (
        autocompleteTypes.includes(input.type) &&
        !input.getAttribute("autocomplete")
      ) {
        input.setAttribute("autocomplete", "off");
      }
    });
  }
}

// Footer Section
const logoFooterBox = document.querySelector(".footerEnd");
const socialMediaBox = document.querySelector(".footerSocialMediaIconBox");
const footerInfoBox = document.querySelector(".footerInfoBox");

// $(".linksCreatedJs").remove();
let footerLinkBox = document.createElement("div");
footerLinkBox.classList.add("linksCreatedJs");
footerInfoBox.appendChild(footerLinkBox);
let infoBoxLeftFooter = document.createElement("div");
infoBoxLeftFooter.classList.add("infoBoxLeftFooter");
footerLinkBox.appendChild(infoBoxLeftFooter);

serviceBox = document.createElement("div");
serviceBox.classList.add("serviceBox");
footerLinkBox.appendChild(serviceBox);
//Politic link
let footerPolicyLinks = document.createElement("a");
footerPolicyLinks.innerText = "Política e Privacidade";
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === "Política de Privacidade") {
    footerPolicyLinks.setAttribute("aria-label", footerPolicyLinks.textContent);
    footerPolicyLinks.setAttribute("href", pageLinksList[i].id);
  }
}
footerPolicyLinks.classList.add("OurCoursesLinks");
serviceBox.appendChild(footerPolicyLinks);
//Use terms link
let footerUseTermsLink = document.createElement("a");
footerUseTermsLink.innerText = "Termos de Uso";
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === "Termos de Uso") {
    footerUseTermsLink.setAttribute(
      "aria-label",
      footerUseTermsLink.textContent
    );
    footerUseTermsLink.setAttribute("href", pageLinksList[i].id);
  }
}
footerUseTermsLink.classList.add("OurCoursesLinks");
serviceBox.appendChild(footerUseTermsLink);
//navbarLinks
try {
  for (let i = 0; i < pageLinksList.length; i++) {
    for (let e = 0; e < navbarLinks.length; e++) {
      if (pageLinksList[i].page === navbarLinks[e].textContent) {
        let links = navbarLinks[e].textContent;
        let navBarCopy = document.createElement("a");
        navBarCopy.innerHTML = links;
        navBarCopy.setAttribute("aria-label", links);
        navBarCopy.setAttribute("href", pageLinksList[i].id);
        infoBoxLeftFooter.appendChild(navBarCopy);
      }
    }
  }
} catch (e) {
  console.warn(e);
}

//Footer logo
function getFooterInfo(json) {
  try {
    let logoSite = json.logo;
    let linkToLogo = document.createElement("a");
    for (let i = 0; i < pageLinksList.length; i++) {
      if (pageLinksList[i].page === "Home") {
        linkToLogo.setAttribute("aria-label", "Go Home");
        linkToLogo.setAttribute("href", pageLinksList[i].id);
      }
    }
    logoFooterBox.prepend(linkToLogo);
    let logoImg = document.createElement("img");
    logoImg.setAttribute("src", `${initUrl + logoSite}`);
    logoImg.setAttribute("data-src", `${initUrl + logoSite}`);
    logoImg.setAttribute("loading", "lazy");
    logoImg.setAttribute("alt", "Logo image");
    logoImg.setAttribute("width", "162");
    logoImg.setAttribute("height", "60");
    linkToLogo.appendChild(logoImg);
    let hiddenText = document.createElement("span");
    hiddenText.innerText = "Go home";
    hiddenText.style.cssText =
      "display:flex; overflow:hidden; width:0; height:0;";
    linkToLogo.appendChild(hiddenText);
  } catch (e) {
    console.warn(e);
  }
}

function getSocialMediaFooter(json) {
  try {
    if (
      json.socialMedias &&
      json.socialMedias.links &&
      json.socialMedias.links.length !== undefined &&
      json.socialMedias.links.length !== null
    ) {
      let quantitySocialNetworks = json.socialMedias.links.length;
      for (let i = 0; i < quantitySocialNetworks; i++) {
        let socialMediaName = json.socialMedias.links[i].icon;
        let socialMediaLink = document.createElement("a");
        socialMediaLink.setAttribute("href", json.socialMedias.links[i].href);
        socialMediaLink.setAttribute(
          "aria-label",
          `Acessar ${socialMediaName}`
        );
        socialMediaLink.setAttribute("target", "_blank");
        const iconHiddenText = document.createElement("span");
        iconHiddenText.style.cssText = `display: flex; overflow: hidden; width: 0; height: 0;`;
        iconHiddenText.textContent = `Acessar ${socialMediaName}`;
        socialMediaLink.appendChild(iconHiddenText);
        let socialMediaIcon = document.createElement("i");
        socialMediaIcon.classList.add("fa-brands");
        socialMediaIcon.classList.add(
          socialMediaIcon.classList.add(
            `fa-${
              socialMediaName === "twitter"
                ? "x-" + socialMediaName
                : socialMediaName
            }`
          )
        );
        socialMediaLink.appendChild(socialMediaIcon);
        socialMediaBox.appendChild(socialMediaLink);
      }
    }
  } catch (e) {
    console.warn(e);
  }
}

function fetchMenuInfo() {
  try {
    fetch(`${initUrl}${jsonFile}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        getSocialMediaFooter(json);
        getTestimonials(json);
        document.title = json.PortalEducacional;
      });
  } catch (e) {
    console.warn(e);
  }
}
// End Footer Section

// SEO and PWA adjustiments
function seoAdjustment() {
  try {
    const head = document.head || document.getElementsByTagName("head")[0];
    const viewportMeta = head.querySelector('meta[name="viewport"]');
    // Update tag
    viewportMeta.setAttribute(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=6"
    );

    // Comments
    const initialComment = document.createComment("SEO adjustiments - Isaias");
    // Author
    const author = document.createElement("meta");
    author.setAttribute("name", "author");
    author.setAttribute("content", "Isaias - Company DRM Education");
    // Theme
    const theme = document.createElement("meta");
    theme.setAttribute("name", "theme-color");
    theme.setAttribute("content", "var(--primary)");
    // Manifest link
    // const manifest = document.createElement("link");
    // manifest.setAttribute("rel", "manifest");
    // manifest.setAttribute("href", "/manifest.json");
    // IOS device
    const app_status_bar = document.createElement("meta");
    app_status_bar.setAttribute(
      "name",
      "apple-mobile-web-app-status-bar-style"
    );
    app_status_bar.setAttribute("content", "default");
    // SEO/PWA adjustment date
    const date_1 = document.createElement("meta");
    date_1.setAttribute("name", "publishdate");
    date_1.setAttribute("content", "20240215162941");
    const date_2 = document.createElement("meta");
    date_2.setAttribute("name", "publish-date");
    date_2.setAttribute("content", "2024-02-15T16:29:41Z");
    // IOS
    const app_capable = document.createElement("meta");
    app_capable.setAttribute("name", "apple-mobile-web-app-capable");
    app_capable.setAttribute("content", "yes");
    // Comments
    const finalComment = document.createComment(
      " The end SEO adjustiments - Isaias"
    );
    // Add defer atribute
    [...document.querySelectorAll(".setupLinks script")].forEach((e) =>
      e.setAttribute("defer", "")
    );

    head.insertBefore(finalComment, viewportMeta.nextSibling);
    head.insertBefore(app_capable, viewportMeta.nextSibling);
    head.insertBefore(app_status_bar, viewportMeta.nextSibling);
    // head.insertBefore(manifest, viewportMeta.nextSibling);
    head.insertBefore(theme, viewportMeta.nextSibling);
    head.insertBefore(date_1, viewportMeta.nextSibling);
    head.insertBefore(date_2, viewportMeta.nextSibling);
    head.insertBefore(author, viewportMeta.nextSibling);
    head.insertBefore(initialComment, viewportMeta.nextSibling);
    document.querySelector(".FooterEndDZM").setAttribute("width", "120");
    document.querySelector(".FooterEndDZM").setAttribute("height", "20");
    const usStoryImgs = [...document.querySelectorAll(".ourStoryIconsBox img")];
    if (usStoryImgs) {
      usStoryImgs.forEach((e) => {
        // e.setAttribute("width", "85");
        // e.setAttribute("height", "67");
      });
    }
    const usValuesImgs = [
      ...document.querySelectorAll(".ourValuesIconsBox img"),
    ];
    if (usValuesImgs) {
      usValuesImgs.forEach((e) => {
        // e.setAttribute("width", "38");
        // e.setAttribute("height", "40");
      });
    }
  } catch (e) {
    console.warn(e);
  }
}

function createServiceWorker() {
  const script = document.createElement("script");
  script.classList.add("serviceWorker");
  script.setAttribute("defer", "");
  script.textContent = `
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("js/service-worker.js")
      .then((registration) => {
        // console.log("Service Worker registrado com sucesso:", registration);
      })
      .catch((error) => {
        console.warn("Erro ao registrar o Service Worker:", error);
      });
  }
  `;
  document.body.appendChild(script);
}
window.onload = createServiceWorker();
// The end SEO and PWA adjustiments console.warn(e)

seoAdjustment();

//Call functions
fetchJsonNavbarLinks();
fetchMenuInfo();
findElementsAndAddSeoAttributes();
// fetchCoursesDetals();
// fetchallJsonCourseCategories();
