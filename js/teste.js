//Global variable
let siteProt = location.protocol + "//";
let siteHost = location.host;
const frontUrl = siteProt + siteHost;
let jsonFile = "/api/getJson.aspx?type=home";
let menuInfo = "/api/getJson.aspx?type=menu";

let initUrl = frontUrl;

let seachInput = document.getElementById("courseName");
let seachInputIcon = document.querySelector(".seachInputIcon");
let textWarn = document.querySelector(".textWarn");
let backToStartLabel = document.querySelector(".backToStartLabel");
let backToStartBtn = document.querySelector(".backToStartBtn");
let seachIcon = document.createElement("i");
seachIcon.classList.add("fa-sharp", "fa-solid", "fa-magnifying-glass");
seachInput.appendChild(seachIcon);
const categoryList = [];
let allCourseBox = document.querySelector(".allCourseForCategory");
const courseContainer = document.querySelector(".teachingContainer");
const inputBox = document.querySelector(".inputBox");
const coursesList = [];
const allCategoriesSearchBtn = document.querySelector(
  "#allCategoriesSearchBtn"
);

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

//Scroll function
// Create an 'id' to scroll the page directly to the section
inputBox.setAttribute("id", "courseSearch");
function scrollAndCenterElement(elementId) {
  const element = document.getElementById(elementId);
  console.log(elementId);
  if (element) {
    const windowHeight = window.innerHeight;
    const elementHeight = element.offsetHeight;
    const scrollY = element.offsetTop - (windowHeight - elementHeight) / 2;

    window.scrollTo({
      top: scrollY,
      behavior: "smooth",
      block: "center",
    });
  }
}

//Header section
function fetchMenuInfo() {
  try {
    fetch(`${initUrl}${jsonFile}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        getHeaderSlide(json);
        // getSocialMediaFooter(json);
        getEmphasis(json);
        getDiscoverPackages(json);
        getTestimonials(json);
        document.title = json.PortalEducacional;
      });
  } catch (e) {
    console.warn(e);
  }
}

function getHeaderSlide(json) {
  try {
    const headerSection = document.querySelector("header");
    const headerSlideBox = document.querySelector(".slide-list-header");
    const headerSlideItemList = document.querySelectorAll(
      '[data-slide="item-header"]'
    );
    const headerQuotaIcons = document.querySelectorAll(
      ".slide-nav-button-header"
    );
    if (json.topBanners) {
      if (json.topBanners.length <= 1 || json.topBanners.length === undefined) {
        const headerSliderBoxes = document.createElement("div");
        headerSliderBoxes.classList.add("slide-item-header");
        headerSlideBox.appendChild(headerSliderBoxes);

        const contents = document.createElement("div");
        contents.classList.add("slide-content-header");
        headerSliderBoxes.appendChild(contents);

        const imgLink = document.createElement("a");
        imgLink.setAttribute("href", `${initUrl}${json.topBanners.banner.url}`);
        imgLink.setAttribute("aria-label", `Show course`);
        headerSliderBoxes.appendChild(imgLink);

        let hiddenLabel = document.createElement("span");
        hiddenLabel.innerText = "Show course";
        hiddenLabel.style.cssText =
          "display: flex; overflow: hidden; width:0; height:0;";
        imgLink.appendChild(hiddenLabel);

        const deskTopImage = document.createElement("img");
        deskTopImage.classList.add(
          "slide-image-header",
          "desktop-image-header"
        );
        deskTopImage.setAttribute(
          "src",
          `${initUrl}${json.topBanners.banner.desktopImg}`
        );
        deskTopImage.setAttribute("alt", "Desktop header banner");
        imgLink.appendChild(deskTopImage);

        const mobileImage = document.createElement("img");
        mobileImage.classList.add("slide-image-header", "mobile-image-header");
        mobileImage.setAttribute(
          "src",
          `${initUrl}${json.topBanners.banner.mobileImg}`
        );
        mobileImage.setAttribute("alt", "Mobile header banner");
        imgLink.appendChild(mobileImage);

        headerQuotaIcons.forEach((e) => (e.style.display = "none"));
      } else {
        for (let i = 0; i < json.topBanners.length; i++) {
          const headerSliderBoxes = document.createElement("div");
          headerSliderBoxes.classList.add("slide-item-header");
          headerSliderBoxes.dataset.slide = "item-header";
          headerSliderBoxes.dataset.idxheader = headerSlideItemList.length + i;
          headerSlideBox.appendChild(headerSliderBoxes);

          const contents = document.createElement("div");
          contents.classList.add("slide-content-header");
          headerSliderBoxes.appendChild(contents);

          const imgLink = document.createElement("a");
          imgLink.setAttribute("href", `${initUrl}${json.topBanners[i].url}`);
          imgLink.setAttribute("aria-label", `Show course`);
          headerSliderBoxes.appendChild(imgLink);

          let hiddenLabel = document.createElement("span");
          hiddenLabel.innerText = "Show course";
          hiddenLabel.style.cssText =
            "display: flex; overflow: hidden; width:0; height:0;";
          imgLink.appendChild(hiddenLabel);

          const deskTopImage = document.createElement("img");
          deskTopImage.classList.add(
            "slide-image-header",
            "desktop-image-header"
          );
          deskTopImage.setAttribute(
            "src",
            `${initUrl}${json.topBanners[i].desktopImg}`
          );
          deskTopImage.setAttribute("alt", "Desktop header banner");
          imgLink.appendChild(deskTopImage);

          const mobileImage = document.createElement("img");
          mobileImage.classList.add(
            "slide-image-header",
            "mobile-image-header"
          );
          mobileImage.setAttribute(
            "src",
            `${initUrl}${json.topBanners[i].mobileImg}`
          );
          mobileImage.setAttribute("alt", "Mobile header banner");
          imgLink.appendChild(mobileImage);
        }
      }
      getEventHeaderSlide();
    } else {
      headerSection.style.display = "none";
      console.log("Não há banners na Api");
    }
  } catch (e) {
    console.warn(e);
  }
}

function getEventHeaderSlide() {
  try {
    ("use strict");

    const slideWrapperHeader = document.querySelector(
      '[data-slide="wrapper-header"]'
    );
    const slideListHeader = document.querySelector(
      '[data-slide="list-header"]'
    );
    const navPreviousButtonHeader = document.querySelector(
      '[data-slide="nav-previous-button-header"]'
    );
    const navNextButtonHeader = document.querySelector(
      '[data-slide="nav-next-button-header"]'
    );
    const controlsWapperHeader = document.querySelector(
      '[data-slide="controls-wrapper-header"]'
    );
    let slideItemsHeader = document.querySelectorAll(
      '[data-slide="item-header"]'
    );
    let controlButtonsHeader;
    let slideIntervalHeader;

    const stateHeader = {
      startingPointHeader: 0,
      savedPositionHeader: 0,
      currentPointHeader: 0,
      movementHeader: 0,
      currentSlideIndexHeader: 0,
      autoPlayHeader: true,
      timeIntervalHeader: 0,
    };

    //Mudar slides
    function translateSlideHeader({ positionHeader }) {
      stateHeader.savedPositionHeader = positionHeader;
      slideListHeader.style.transform = `translateX(${positionHeader}px)`;
    }

    function getCenterPositionHeader({ idxheader }) {
      const slideItemHeader = slideItemsHeader[idxheader];
      const slideWidthHeader = slideItemHeader.clientWidth;
      const windowWidthHeader = document.body.clientWidth;
      const margin = (windowWidthHeader - slideWidthHeader) / 2;
      const positionHeader = margin - idxheader * slideWidthHeader;
      return positionHeader;
    }

    function setVisibleSlideHeader({ idxheader, animateHeader }) {
      if (idxheader === 0 || idxheader === slideItemsHeader.length - 1) {
        idxheader = stateHeader.currentSlideIndexHeader;
      }
      const positionHeader = getCenterPositionHeader({ idxheader });
      stateHeader.currentSlideIndexHeader = idxheader;
      slideListHeader.style.transition =
        animateHeader === true ? "transform 1s" : "none";
      activeControlButtonHeader({ idxheader });
      translateSlideHeader({ positionHeader: positionHeader });
    }

    function nextSlideHeader() {
      setVisibleSlideHeader({
        idxheader: stateHeader.currentSlideIndexHeader + 1,
        animateHeader: true,
      });
    }

    function previousSlideHeader() {
      setVisibleSlideHeader({
        idxheader: stateHeader.currentSlideIndexHeader - 1,
        animateHeader: true,
      });
    }

    function createControlButtonsHeader() {
      slideItemsHeader.forEach(function () {
        const controlButtonHeader = document.createElement("button");
        controlButtonHeader.setAttribute("aria-label", "Show slide");
        controlButtonHeader.dataset.slide = "control-button-header";
        controlButtonHeader.classList.add("slide-control-button-header");
        let icon = document.createElement("span");
        icon.classList.add("fas", "fa-circle");
        controlButtonHeader.appendChild(icon);
        let hiddenLabel = document.createElement("span");
        hiddenLabel.innerText = "Show slide";
        hiddenLabel.style.cssText = `display: flex; overflow: hidden; width:0; height:0;`;
        controlButtonHeader.appendChild(hiddenLabel);
        controlsWapperHeader.append(controlButtonHeader);
      });
    }

    function activeControlButtonHeader({ idxheader }) {
      const slideItemHeader = slideItemsHeader[idxheader];
      const dataIndexHeader = Number(slideItemHeader.dataset.idxheader);
      const controlButtonHeader = controlButtonsHeader[dataIndexHeader];
      controlButtonsHeader.forEach(function (controlButtonItem) {
        controlButtonItem.classList.remove("active");
      });
      if (controlButtonHeader) controlButtonHeader.classList.add("active");
    }

    function createSlideCloneHeader() {
      const firstSlideHeader = slideItemsHeader[0].cloneNode(true);
      firstSlideHeader.classList.add("slide-cloned");
      firstSlideHeader.dataset.idxheader = slideItemsHeader.length;

      const secundSlideHeader = slideItemsHeader[1].cloneNode(true);
      secundSlideHeader.classList.add("slide-cloned");
      secundSlideHeader.dataset.idxheader = slideItemsHeader.length + 1;

      const lastSlideHeader =
        slideItemsHeader[slideItemsHeader.length - 1].cloneNode(true);
      lastSlideHeader.classList.add("slide-cloned");
      lastSlideHeader.dataset.idxheader = -1;

      const penultimateSlideHeader =
        slideItemsHeader[slideItemsHeader.length - 2].cloneNode(true);
      penultimateSlideHeader.classList.add("slide-cloned");
      penultimateSlideHeader.dataset.idxheader = -2;

      //Criar no final da lista
      slideListHeader.append(firstSlideHeader);
      slideListHeader.append(secundSlideHeader);
      //Criar no início da lista
      slideListHeader.prepend(lastSlideHeader);
      slideListHeader.prepend(penultimateSlideHeader);

      slideItemsHeader = document.querySelectorAll(
        '[data-slide="item-header"]'
      );
    }

    //Apertar
    function onMouseDownHeader(eventHeader, idxheader) {
      const slideItemHeader = eventHeader.currentTarget;
      stateHeader.startingPointHeader = eventHeader.clientX;
      stateHeader.currentPointHeader =
        stateHeader.startingPointHeader - stateHeader.savedPositionHeader;
      stateHeader.currentSlideIndexHeader = idxheader;
      slideListHeader.style.transition = "none";
      // slideItemHeader.addEventListener('mousemove', onMouseMoveHeader, { passive: true });
    }
    //Evento de mover mouse
    // function onMouseMoveHeader(eventHeader, index) {
    //   stateHeader.movementHeader = eventHeader.clientX - stateHeader.startingPointHeader;
    //   const positionHeader = eventHeader.clientX - stateHeader.currentPointHeader;
    //   translateSlideHeader({ positionHeader });
    // }
    //Soltar
    function noMouseUpHeader(eventHeader) {
      const pointsToMoveHeader = eventHeader.type.includes("touch") ? 50 : 150;
      // console.log(eventHeader.type);
      const slideItemHeader = eventHeader.currentTarget;
      if (stateHeader.movementHeader < -pointsToMoveHeader) {
        nextSlideHeader();
      } else if (stateHeader.movementHeader > pointsToMoveHeader) {
        previousSlideHeader();
      } else {
        setVisibleSlideHeader({
          idxheader: stateHeader.currentSlideIndexHeader,
          animateHeader: true,
        });
      }

      // slideItemHeader.removeEventListener('mousemove', onMouseMoveHeader);
    }

    function onTouchStartHeader(eventHeader, idxheader) {
      eventHeader.clientX = eventHeader.touches[0].clientX;
      onMouseDownHeader(eventHeader, idxheader);
      const slideItemHeader = eventHeader.currentTarget;
      slideItemHeader.addEventListener("touchmove", onTouchMoveHeader, {
        passive: true,
      });
    }

    function onTouchMoveHeader(eventHeader) {
      eventHeader.clientX = eventHeader.touches[0].clientX;
      // onMouseMoveHeader(eventHeader);
    }
    function onTouchEndHeader(eventHeader) {
      noMouseUpHeader(eventHeader);
      const slideItemHeader = eventHeader.currentTarget;
      slideItemHeader.removeEventListener("touchmove", onTouchMoveHeader),
        { passive: true };
    }

    function onControlButtonClickHeader(idxheader) {
      setVisibleSlideHeader({ idxheader: idxheader + 2, animateHeader: true });
    }

    function onSlideListTransitionEndHeader() {
      const slideItemHeader =
        slideItemsHeader[stateHeader.currentSlideIndexHeader];

      if (
        slideItemHeader.classList.contains("slide-cloned") &&
        Number(slideItemHeader.dataset.idxheader) > 0
      ) {
        setVisibleSlideHeader({ idxheader: 2, animateHeader: false });
      }
      if (
        slideItemHeader.classList.contains("slide-cloned") &&
        Number(slideItemHeader.dataset.idxheader) < 0
      ) {
        setVisibleSlideHeader({
          idxheader: slideItemsHeader.length - 3,
          animateHeader: false,
        });
      }
    }

    function setAutoPlayHeader() {
      if (stateHeader.autoPlayHeader) {
        slideIntervalHeader = setInterval(function () {
          setVisibleSlideHeader({
            idxheader: stateHeader.currentSlideIndexHeader + 1,
            animateHeader: true,
          });
        }, stateHeader.timeIntervalHeader);
      }
    }

    function setListenersHeader() {
      controlButtonsHeader = document.querySelectorAll(
        '[data-slide="control-button-header"]'
      );
      slideItemsHeader = document.querySelectorAll(
        '[data-slide="item-header"]'
      );

      //Adicionar eventHeadero nos indicatons
      controlButtonsHeader.forEach(function (controlButtonHeader, idxheader) {
        controlButtonHeader.addEventListener("click", function (eventHeader) {
          onControlButtonClickHeader(idxheader);
        });
      });

      //Eventos do mouse
      slideItemsHeader.forEach(function (slideItemHeader, idxheader) {
        //Arrastar
        slideItemHeader.addEventListener(
          "dragstart",
          function (eventHeader) {
            eventHeader.preventDefault();
          },
          { passive: true }
        );
        //Apertar
        slideItemHeader.addEventListener("mousedown", function (eventHeader) {
          onMouseDownHeader(eventHeader, idxheader);
        }),
          //Soltar no mobile
          slideItemHeader.addEventListener("mouseup", noMouseUpHeader);

        //Apertar no mobile
        slideItemHeader.addEventListener(
          "touchstart",
          function (eventHeader) {
            onTouchStartHeader(eventHeader, idxheader);
          },
          { passive: true }
        ),
          //Soltar
          slideItemHeader.addEventListener("touchend", onTouchEndHeader, {
            passive: true,
          });
      });

      navNextButtonHeader.addEventListener("click", nextSlideHeader);
      navPreviousButtonHeader.addEventListener("click", previousSlideHeader);
      //Evento para voltar o slide de forma que o usuário não perceba
      slideListHeader.addEventListener(
        "transitionend",
        onSlideListTransitionEndHeader
      );
      slideWrapperHeader.addEventListener("mouseenter", function () {
        clearInterval(slideIntervalHeader);
      });
      slideWrapperHeader.addEventListener("mouseleave", function () {
        setAutoPlayHeader();
      });
      //Manter posicionamento padrão
      let resizeTimeOutHeader;
      window.addEventListener("resize", function () {
        this.clearTimeout(resizeTimeOutHeader);
        resizeTimeOutHeader = setTimeout(function () {
          setVisibleSlideHeader({
            idxheader: stateHeader.currentSlideIndexHeader,
            animateHeader: true,
          });
        }, 1000);
      });
    }

    function initSliderHeader({
      startAtIndexHeader = 0,
      autoPlayHeader = true,
      timeIntervalHeader = 4000,
    }) {
      stateHeader.autoPlayHeader = autoPlayHeader;
      stateHeader.timeIntervalHeader = timeIntervalHeader;
      createControlButtonsHeader();
      createSlideCloneHeader();
      setListenersHeader();
      setVisibleSlideHeader({
        idxheader: startAtIndexHeader + 2,
        animateHeader: true,
      });
      setAutoPlayHeader();
    }

    initSliderHeader({
      autoPlayHeader: true,
      startAtIndexHeader: 0,
      timeIntervalHeader: 4000,
    });
  } catch (e) {
    console.warn(e);
  }
}
// End of Header section

// Emphasis section
function getEmphasis(json) {
  try {
    // Right Choice section
    let instituteName = Array.prototype.slice.call(
      document.querySelectorAll(".instituteName")
    );
    instituteName.forEach(
      (e) => (e.innerHTML = json.PortalEducacional || json.pageTitle)
    );
    // End of Right Choice section
    let discoverPackagesSection = document.querySelector(".emphasisSection");
    let discoverPackagesBox = document.querySelector(".emphasisSlide-list");
    let emphasisList = document.querySelectorAll(
      '[data-slide="emphasis-slide-item"]'
    );

    if (json.featuredCourses) {
      if (json.featuredCourses.courses) {
        let count = -1;
        for (let i = 0; i < json.featuredCourses.courses.length; i++) {
          let courseId = json.featuredCourses.courses[i].id;
          count++;
          //Eacth
          let discoverPackagesBoxes = document.createElement("div");
          discoverPackagesBoxes.classList.add("emphasisSlide-item");
          discoverPackagesBoxes.dataset.slide = "emphasis-slide-item";
          discoverPackagesBoxes.dataset.indice_emphasis =
            emphasisList.length + count;
          discoverPackagesBoxes.dataset.id = courseId;
          discoverPackagesBoxes.addEventListener("click", () => {
            for (let x = 0; x < pageLinksList.length; x++) {
              if (pageLinksList[x].page === "Curso") {
                window.location.href = `/page/${pageLinksList[x].id}/Curso?courseId=${courseId}`;
              }
            }
          });
          discoverPackagesBox.appendChild(discoverPackagesBoxes);
          //Emphasis content
          let courseImg = document.createElement("img");
          courseImg.setAttribute(
            "src",
            `${initUrl}${json.featuredCourses.courses[i].img}`
          );
          courseImg.setAttribute(
            "data-src",
            `${initUrl}${json.featuredCourses.courses[i].img}`
          );
          courseImg.setAttribute("loading", `lazy`);
          courseImg.setAttribute("alt", "Course image");
          courseImg.classList.add("emphasisSlide-content");
          discoverPackagesBoxes.appendChild(courseImg);

          //Course name
          let authorName = document.createElement("p");
          authorName.classList.add("emphasisCourseName");
          authorName.innerHTML = json.featuredCourses.courses[i].title;
          discoverPackagesBoxes.appendChild(authorName);
          //Course
          let courseName = document.createElement("p");
          courseName.classList.add("emphasisCourseType");
          courseName.innerHTML = json.featuredCourses.courses[i].author;
          discoverPackagesBoxes.appendChild(courseName);
        }
      }
      slideEvents();
    } else {
      discoverPackagesSection.style.display = "none";
      console.log("Não há cursos em destaque");
    }
  } catch (e) {
    console.warn(e);
  }
}
function slideEvents() {
  try {
    const emphasisSlideWrapper = document.querySelector(
      '[data-slide="emphasisSlide-wrapper"]'
    );
    const emphasisSlideList = document.querySelector(
      '[data-slide="emphasis-slide-list"]'
    );
    const emphasisPreviousBtn = document.querySelector(
      '[data-slide="emphasis-previous-btn"]'
    );
    const emphasisNextBtn = document.querySelector(
      '[data-slide="emphasis-next-btn"]'
    );
    const emphasisControlsWapper = document.querySelector(
      '[data-slide="emphasis-slide-controls-wrapper"]'
    );
    let emphasisSlideItems = document.querySelectorAll(
      '[data-slide="emphasis-slide-item"]'
    );
    let emphasisControlButtons;
    let emphasisSlideInterval;

    const emphasisState = {
      emphasisStartingPoint: 0,
      emphasisSavedPosition: 0,
      emphasisCurrentPoint: 0,
      emphasisMovement: 0,
      currentEmphasisSlideIndex: 0,
      emphasisAutoPlay: true,
      emphasisTimeInterval: 0,
    };

    //Mudar slides
    function translateEmphasisSlide({ emphasisPosition }) {
      emphasisState.emphasisSavedPosition = emphasisPosition;
      emphasisSlideList.style.transform = `translateX(${emphasisPosition}px)`;
    }

    function getCenterEmphasisPosition({ indice_emphasis }) {
      let windowSize = window.innerWidth;
      let newMargin = (windowSize - 400) / 2;
      const emphasisSlideItem = emphasisSlideItems[indice_emphasis];
      const emphasisSlideWidth = emphasisSlideItem.clientWidth;
      const windowEmphasisWidth = document.body.clientWidth;
      const marginEmphasis = newMargin; // (windowEmphasisWidth - emphasisSlideWidth) / 2;
      const emphasisPosition =
        marginEmphasis - indice_emphasis * emphasisSlideWidth;
      return emphasisPosition;
    }

    function setVisibleEmphasisSlide({ indice_emphasis, animateEmphasis }) {
      if (
        indice_emphasis === 0 ||
        indice_emphasis === emphasisSlideItems.length - 1
      ) {
        indice_emphasis = emphasisState.currentEmphasisSlideIndex;
      }
      const emphasisPosition = getCenterEmphasisPosition({ indice_emphasis });
      emphasisState.currentEmphasisSlideIndex = indice_emphasis;
      emphasisSlideList.style.transition =
        animateEmphasis === true ? "transform 1s" : "none";
      activeEmphasisControlButton({ indice_emphasis });
      translateEmphasisSlide({ emphasisPosition: emphasisPosition });
    }

    function nextEmphasisSlide() {
      setVisibleEmphasisSlide({
        indice_emphasis: emphasisState.currentEmphasisSlideIndex + 1,
        animateEmphasis: true,
      });
    }

    function previousEmphasisSlide() {
      setVisibleEmphasisSlide({
        indice_emphasis: emphasisState.currentEmphasisSlideIndex - 1,
        animateEmphasis: true,
      });
    }

    function createEmphasisControlButtons() {
      emphasisSlideItems.forEach(function () {
        const emphasisControlButton = document.createElement("button");
        emphasisControlButton.setAttribute("aria-label", "Show course");
        emphasisControlButton.classList.add("emphasisSlide-control-button");
        emphasisControlButton.dataset.slide = "emphasis-control-btn";
        let icon = document.createElement("span");
        icon.classList.add("fas", "fa-circle");
        emphasisControlButton.appendChild(icon);
        let hiddenLabel = document.createElement("span");
        hiddenLabel.innerText = "Show course";
        hiddenLabel.style.cssText =
          "display: flex; overflow: hidden; width:0; height:0;";
        emphasisControlButton.appendChild(hiddenLabel);
        emphasisControlsWapper.append(emphasisControlButton);
      });
    }

    function activeEmphasisControlButton({ indice_emphasis }) {
      const emphasisSlideItem = emphasisSlideItems[indice_emphasis];
      const dataindice_emphasis = Number(
        emphasisSlideItem.dataset.indice_emphasis
      );
      const emphasisControlButton = emphasisControlButtons[dataindice_emphasis];
      emphasisControlButtons.forEach(function (emphasisControlButtonItem) {
        emphasisControlButtonItem.classList.remove("activeEmphasisSlideItem");
      });
      if (emphasisControlButton)
        emphasisControlButton.classList.add("activeEmphasisSlideItem");
    }

    function createEmphasisSlideClone() {
      const firstEmphasisSlide = emphasisSlideItems[0].cloneNode(true);
      firstEmphasisSlide.classList.add("emphasisSlide-cloned");
      firstEmphasisSlide.dataset.indice_emphasis = emphasisSlideItems.length;

      const secundEmphasisSlide = emphasisSlideItems[1].cloneNode(true);
      secundEmphasisSlide.classList.add("emphasisSlide-cloned");
      secundEmphasisSlide.dataset.indice_emphasis =
        emphasisSlideItems.length + 1;

      const lastEmphasisSlide =
        emphasisSlideItems[emphasisSlideItems.length - 1].cloneNode(true);
      lastEmphasisSlide.classList.add("emphasisSlide-cloned");
      lastEmphasisSlide.dataset.indice_emphasis = -1;

      const penultimateEmphasisSlide =
        emphasisSlideItems[emphasisSlideItems.length - 2].cloneNode(true);
      penultimateEmphasisSlide.classList.add("emphasisSlide-cloned");
      penultimateEmphasisSlide.dataset.indice_emphasis = -2;

      //Criar no final da lista
      emphasisSlideList.append(firstEmphasisSlide);
      emphasisSlideList.append(secundEmphasisSlide);
      //Criar no início da lista
      emphasisSlideList.prepend(lastEmphasisSlide);
      emphasisSlideList.prepend(penultimateEmphasisSlide);

      emphasisSlideItems = document.querySelectorAll(
        '[data-slide="emphasis-slide-item"]'
      );
    }

    //Apertar
    function onEmphasisMouseDown(evento, indice_emphasis) {
      const emphasisSlideItem = evento.currentTarget;
      emphasisState.emphasisStartingPoint = evento.clientX;
      emphasisState.emphasisCurrentPoint =
        emphasisState.emphasisStartingPoint -
        emphasisState.emphasisSavedPosition;
      emphasisState.diaDiaCurrentSlideindice_emphasis = indice_emphasis;
      emphasisSlideList.style.transition = "none";
      emphasisSlideItem.addEventListener("mousemove", onEmphasisMouseMove, {
        passive: true,
      });
    }
    //Evento de mover mouse
    function onEmphasisMouseMove(evento, indice_emphasis) {
      emphasisState.emphasisMovement =
        evento.clientX - emphasisState.emphasisStartingPoint;
      const emphasisPosition =
        evento.clientX - emphasisState.emphasisCurrentPoint;
      translateEmphasisSlide({ emphasisPosition });
    }
    //Soltar
    function noEmphasisMouseUp(evento) {
      const pointsToMoveEmphasis = evento.type.includes("touch") ? 50 : 150;
      // console.log(evento.type);
      const emphasisSlideItem = evento.currentTarget;
      if (emphasisState.emphasisMovement < -pointsToMoveEmphasis) {
        nextEmphasisSlide();
      } else if (emphasisState.emphasisMovement > pointsToMoveEmphasis) {
        previousEmphasisSlide();
      } else {
        setVisibleEmphasisSlide({
          indice_emphasis: emphasisState.currentEmphasisSlideIndex,
          animateEmphasis: true,
        });
      }

      emphasisSlideItem.removeEventListener("mousemove", onEmphasisMouseMove, {
        passive: true,
      });
    }

    function onEmphasisTouchStart(evento, indice_emphasis) {
      evento.clientX = evento.touches[0].clientX;
      onEmphasisMouseDown(evento, indice_emphasis);
      const emphasisSlideItem = evento.currentTarget;
      emphasisSlideItem.addEventListener("touchmove", onEmphasisTouchMove, {
        passive: true,
      });
    }

    function onEmphasisTouchMove(evento) {
      evento.clientX = evento.touches[0].clientX;
      onEmphasisMouseMove(evento);
    }
    function onEmphasisTouchEnd(evento) {
      noEmphasisMouseUp(evento);
      const emphasisSlideItem = evento.currentTarget;
      emphasisSlideItem.removeEventListener("touchmove", onEmphasisTouchMove);
    }

    function onEmphasisControlButtonClick(indice_emphasis) {
      setVisibleEmphasisSlide({
        indice_emphasis: indice_emphasis + 2,
        animateEmphasis: true,
      });
    }

    function onEmphasisSlideListTransitionEnd() {
      const emphasisSlideItem =
        emphasisSlideItems[emphasisState.currentEmphasisSlideIndex];

      if (
        emphasisSlideItem.classList.contains("emphasisSlide-cloned") &&
        Number(emphasisSlideItem.dataset.indice_emphasis) > 0
      ) {
        setVisibleEmphasisSlide({ indice_emphasis: 2, animateEmphasis: false });
      }
      if (
        emphasisSlideItem.classList.contains("emphasisSlide-cloned") &&
        Number(emphasisSlideItem.dataset.indice_emphasis) < 0
      ) {
        setVisibleEmphasisSlide({
          indice_emphasis: emphasisSlideItems.length - 3,
          animateEmphasis: false,
        });
      }
    }

    function setEmphasisAutoPlay() {
      if (emphasisState.emphasisAutoPlay) {
        emphasisSlideInterval = setInterval(function () {
          setVisibleEmphasisSlide({
            indice_emphasis: emphasisState.currentEmphasisSlideIndex + 1,
            animateEmphasis: true,
          });
        }, emphasisState.emphasisTimeInterval);
      }
    }

    function setEmphasisListeners() {
      emphasisControlButtons = document.querySelectorAll(
        '[data-slide="emphasis-control-btn"]'
      );
      emphasisSlideItems = document.querySelectorAll(
        '[data-slide="emphasis-slide-item"]'
      );

      //Adicionar evento nos indicatons
      emphasisControlButtons.forEach(function (
        emphasisControlButton,
        indice_emphasis
      ) {
        emphasisControlButton.addEventListener("click", function (evento) {
          onEmphasisControlButtonClick(indice_emphasis);
        });
      });

      //Eventos do mouse
      emphasisSlideItems.forEach(function (emphasisSlideItem, indice_emphasis) {
        //Arrastar
        emphasisSlideItem.addEventListener(
          "dragstart",
          function (evento) {
            evento.preventDefault();
          },
          { passive: true }
        );
        //Apertar
        emphasisSlideItem.addEventListener("mousedown", function (evento) {
          onEmphasisMouseDown(evento, indice_emphasis);
        }),
          //Soltar no mobile
          emphasisSlideItem.addEventListener("mouseup", noEmphasisMouseUp);

        //Apertar no mobile
        emphasisSlideItem.addEventListener(
          "touchstart",
          function (evento) {
            onEmphasisTouchStart(evento, indice_emphasis);
          },
          { passive: true }
        ),
          //Soltar
          emphasisSlideItem.addEventListener("touchend", onEmphasisTouchEnd, {
            passive: true,
          });
      });

      emphasisNextBtn.addEventListener("click", nextEmphasisSlide);
      emphasisPreviousBtn.addEventListener("click", previousEmphasisSlide);

      //Evento para voltar o slide de forma que o usuário não perceba
      emphasisSlideList.addEventListener(
        "transitionend",
        onEmphasisSlideListTransitionEnd
      );
      emphasisSlideWrapper.addEventListener("mouseenter", function () {
        clearInterval(emphasisSlideInterval);
      });
      emphasisSlideWrapper.addEventListener("mouseleave", function () {
        setEmphasisAutoPlay();
      });

      //Manter posicionamento padrão
      let emphasisResizeTimeOut;
      window.addEventListener("resize", function () {
        clearTimeout(emphasisResizeTimeOut);
        emphasisResizeTimeOut = setTimeout(function () {
          setVisibleEmphasisSlide({
            indice_emphasis: emphasisState.currentEmphasisSlideIndex,
            animateEmphasis: true,
          });
        }, 500);
      });
    }

    function initEmphasisSlider({
      startAtindice_emphasis = 0,
      emphasisAutoPlay = true,
      emphasisTimeInterval = 3000,
    }) {
      emphasisState.emphasisAutoPlay = emphasisAutoPlay;
      emphasisState.emphasisTimeInterval = emphasisTimeInterval;
      createEmphasisControlButtons();
      createEmphasisSlideClone();
      setEmphasisListeners();
      setVisibleEmphasisSlide({
        indice_emphasis: startAtindice_emphasis + 2,
        animateEmphasis: true,
      });

      setEmphasisAutoPlay();
    }

    initEmphasisSlider({
      emphasisAutoPlay: true,
      startAtindice_emphasis: 0,
      emphasisTimeInterval: 4000,
    });
    addEventFeaturedCourseClones();
  } catch (e) {
    console.warn(e);
  }
}

// Nova função para que as imgens dos clones recebam o evento de clique
function addEventFeaturedCourseClones() {
  let clonesFeaturedCourse = document.querySelectorAll(".emphasisSlide-cloned");
  clonesFeaturedCourse.forEach((e) => {
    e.addEventListener("click", () => {
      window.location.href = `/page/408822/Curso?courseId=${e.getAttribute(
        "data-id"
      )}`;
    });
  });
}
//
// End of Emphasis section

// All Categories section

function createBackButtonSearch(seachName) {
  backToStartBtn.style.display = "flex";
  backToStartLabel.innerHTML = seachName;
}
seachInput.addEventListener("input", () => {
  if (seachInput.value.length > 2) {
    textWarn.innerHTML = "";
    textWarn.style.display = "none";
  }
});
seachInput.addEventListener("blur", () => {
  if (seachInput.value.length < 3) {
    textWarn.innerHTML = "";
    textWarn.style.display = "none";
  }
});

seachInput.addEventListener("keyup", (e) => {
  let seachName = seachInput.value;

  if (e.keyCode === 13) {
    if (seachInput.value.length < 3) {
      backToStartBtn.style.display = "none";
      textWarn.style.display = "block";
      textWarn.innerHTML = "Para buscar um curso, digite pelo menos 3 letras.";
    } else {
      let showMoreCourses = document.querySelector(".showMoreCourses");
      if (showMoreCourses) showMoreCourses.remove();
      fecthSeachCourse(seachName);
      console.log(seachInput.value);
      seachInput.value = "";
      textWarn.innerHTML = "";
      coursesList.length = 0;
      countPage = 1;
      scrollAndCenterElement("courseSearch");
      createBackButtonSearch(seachName);
    }
  }
});
seachInputIcon.addEventListener("click", (e) => {
  seachName = seachInput.value;
  if (seachInput.value.length < 3) {
    backToStartBtn.style.display = "none";
    textWarn.style.display = "block";
    textWarn.innerHTML = "Para buscar um curso, digite pelo menos 3 letras.";
  } else {
    scrollAndCenterElement("courseSearch");
    let showMoreCourses = document.querySelector(".showMoreCourses");
    if (showMoreCourses) showMoreCourses.remove();
    fecthSeachCourse(seachName);
    console.log(seachInput.value);
    seachInput.value = "";
    textWarn.innerHTML = "";
    coursesList.length = 0;
    countPage = 1;
    createBackButtonSearch(seachName);
  }
});

backToStartBtn.addEventListener("click", () => {
  let showMoreCourses = document.querySelector(".showMoreCourses");
  if (showMoreCourses) showMoreCourses.remove();
  allCourseBox.innerHTML = "";
  coursesList.length = 0;
  countPage = 1;
  backToStartBtn.style.display = "none";
  fetchallJsonCourseCategories();
});
allCategoriesSearchBtn.addEventListener("click", () => {
  seachName = seachInput.value;
  if (seachInput.value.length < 3) {
    backToStartBtn.style.display = "none";
    textWarn.style.display = "block";
    textWarn.innerHTML = "Para buscar um curso, digite pelo menos 3 letras.";
  } else {
    let showMoreCourses = document.querySelector(".showMoreCourses");
    if (showMoreCourses) showMoreCourses.remove();
    fecthSeachCourse(seachName);
    console.log(seachInput.value);
    seachInput.value = "";
    textWarn.innerHTML = "";
    coursesList.length = 0;
    countPage = 1;
    scrollAndCenterElement("courseSearch");
    createBackButtonSearch(seachName);
  }
});
function fetchallJsonCourseCategories() {
  try {
    fetch(`${initUrl}/api/getJson.aspx?type=tutors_app_new`)
      .then((answer) => answer.json())
      .then((allCategory) => {
        getCategoryTitles(allCategory);
        createCourseForCategory(allCategory);
      });
  } catch (e) {
    console.warn(e);
  }
}

function getCategoryTitles(allCategory) {
  try {
    for (let i = 0; i <= allCategory.tutorsList.length; i++) {
      let categoryName = [];
      categoryList.push(categoryName);
    }
  } catch (e) {
    console.warn(e);
  }
}

function createCourseForCategory(allCategory) {
  try {
    for (let i = 0; i < allCategory.tutorsList.length; i++) {
      let categoryName = allCategory.tutorsList[i].name;
      let categoryId = allCategory.tutorsList[i].id;
      let categoryImg = allCategory.tutorsList[i].img;
      //Box of each category
      let boxOfEachCategory = document.createElement("div");
      boxOfEachCategory.id = categoryId;
      boxOfEachCategory.classList.add("boxOfEachCategory");
      allCourseBox.appendChild(boxOfEachCategory);
      //boxFromImg
      let boxFromImg = document.createElement("div");
      boxFromImg.classList.add("boxFromImg");
      boxOfEachCategory.appendChild(boxFromImg);
      //Image box
      let imageBox = document.createElement("div");
      imageBox.classList.add("imageBox");
      imageBox.style.backgroundImage = `url(${initUrl}${categoryImg})`;
      imageBox.addEventListener("click", () => {
        for (let y = 0; y < pageLinksList.length; y++) {
          if (pageLinksList[y].page === "Nossos Cursos") {
            window.location.href = `/page/${pageLinksList[y].id}/Nossos-Cursos?categoryId=${categoryId}`;
          }
        }
      });
      //https://catalogo.drmeducacao.com.br/pages/396298/TemplateClassicCategoria
      //https://catalogo.drmeducacao.com.br/pages/396298/Nossos-Cursos?categoryId=1145045
      boxFromImg.appendChild(imageBox);

      //Category title
      let categoryTitle = document.createElement("p");
      categoryTitle.innerHTML = categoryName;
      categoryTitle.classList.add("categoryTitle");
      boxFromImg.appendChild(categoryTitle);
    }
    // console.log(allCategory);
  } catch (e) {
    console.warn(e);
  }
}

function getQuantityCoursesByCategory(NumberOfCourses, categoryId) {
  try {
    fetch(
      `${initUrl}/api/getJson.aspx?type=courses_list_app&tutor_id=${categoryId}`
    )
      .then((answer) => answer.json())
      .then((json) => {
        // let strQuantityCourse;
        // console.log(json);
        if (json.total === "1") {
          NumberOfCourses.innerHTML = `${json.total} Curso disponível`;
        } else if (json.total > "1") {
          NumberOfCourses.innerHTML = `${json.total} Cursos disponíveis`;
        } else if (json.total < 1) {
          NumberOfCourses.innerHTML = `Saiba mais`;
        }
        // NumberOfCourses.innerHTML = `${json.total} ${strQuantityCourse} `;
      });
  } catch (e) {
    console.warn(e);
  }
}
function fecthSeachCourse(seachName) {
  try {
    fetch(
      `${initUrl}/api/getJson.aspx?type=courses_list_app&page_total=12&txt_search=${seachName}`
    )
      .then((resposta) => resposta.json())
      .then((json) => {
        allCourseBox.innerHTML = "";
        searchForCoursesSearched(json);
      });
  } catch (e) {
    console.warn(e);
  }

  function createUrlPageMoreCouses() {
    countPage++;
    fecthNewPageWithMoreCourses(countPage);
  }
  //Show more course button
  let showMoreCourses = document.createElement("p");
  showMoreCourses.classList.add("showMoreCourses");
  showMoreCourses.innerHTML = "Mostrar mais...";
  showMoreCourses.style.display = "none";
  courseContainer.appendChild(showMoreCourses);
  showMoreCourses.addEventListener("click", () => {
    createUrlPageMoreCouses();
  });

  function fecthNewPageWithMoreCourses(countPage) {
    try {
      let newPage = `${initUrl}/api/getJson.aspx?type=courses_list_app&page=${countPage}&page_total=12&txt_search=${seachName}`;

      fetch(newPage)
        .then((resposta) => resposta.json())
        .then((json) => {
          console.log(newPage);
          searchForCoursesSearched(json);
        });
    } catch (e) {
      console.warn(e);
    }
  }

  function searchForCoursesSearched(json) {
    try {
      console.log(json);
      let numberCourse = Number(json.total);
      if (numberCourse === 0) {
        let infoTextBox = document.createElement("div");
        infoTextBox.style.cssText =
          "width:100%; height: auto; display: block; text-align: center;";
        allCourseBox.appendChild(infoTextBox);
        let infoText = document.createElement("h2");
        infoText.classList.add("infoText");
        infoText.innerHTML = "Desculpe, ainda não temos o curso pesquisado.";
        infoTextBox.appendChild(infoText);
        showMoreCourses.style.display = "none";
        const showBtnList = Array.prototype.slice.call(
          document.querySelectorAll(".showMoreCourses")
        );
        showBtnList.forEach((e) => e.remove());
      }
      if (
        json.coursesList.course.length === 1 ||
        typeof json.coursesList.course.length === "undefined"
      ) {
        let categoryName = json.coursesList.course.title;
        let courseId = json.coursesList.course.id;
        let categoryImg = json.coursesList.course.img;
        let ysnPacote = json.coursesList.course.ysnPacote;
        let courseCategoryName = json.coursesList.course.categoria.name;
        // let courseCategoryId = json.coursesList.course.categoria.id;
        let courseThemeName = json.coursesList.course.temaCourse;
        //Box of each category
        let boxOfEachCategory = document.createElement("div");
        boxOfEachCategory.id = courseId;
        boxOfEachCategory.classList.add("boxOfEachCategory");
        coursesList.push(boxOfEachCategory);
        allCourseBox.appendChild(boxOfEachCategory);
        //boxFromImg
        let boxFromImg = document.createElement("div");
        boxFromImg.classList.add("boxFromImg");
        boxOfEachCategory.appendChild(boxFromImg);
        //Image box
        let imageBox = document.createElement("div");
        imageBox.classList.add("imageBox");
        imageBox.style.backgroundImage = `url(${initUrl}${categoryImg})`;
        imageBox.addEventListener("click", () => {
          for (let y = 0; y < pageLinksList.length; y++) {
            if (pageLinksList[y].page === "Curso") {
              window.location.href = `/page/${pageLinksList[y].id}/Curso?courseId=${courseId}&ysnPacote=${ysnPacote}`;
            }
          }
        });
        boxFromImg.appendChild(imageBox);
        //Texts box
        let textsBox = document.createElement("div");
        textsBox.classList.add("textsBox");
        boxOfEachCategory.appendChild(textsBox);
        //Category title
        let categoryTitle = document.createElement("p");
        if (categoryName.length > 45) {
          categoryTitle.innerHTML = `${categoryName.slice(0, 45)}...`;
        } else {
          categoryTitle.innerHTML = categoryName;
        }
        categoryTitle.classList.add("categoryTitle");
        textsBox.appendChild(categoryTitle);
      } else {
        for (let i = 0; i < json.coursesList.course.length; i++) {
          let categoryName = json.coursesList.course[i].title;
          let courseId = json.coursesList.course[i].id;
          let categoryImg = json.coursesList.course[i].img;
          let ysnPacote = json.coursesList.course[i].ysnPacote;
          let courseCategoryName = json.coursesList.course[i].categoria.name;
          let courseCategoryId = json.coursesList.course[i].categoria.id;
          let courseThemeName = json.coursesList.course[i].temaCourse;
          //Box of each category
          let boxOfEachCategory = document.createElement("div");
          boxOfEachCategory.id = courseId;
          boxOfEachCategory.classList.add("boxOfEachCategory");
          coursesList.push(boxOfEachCategory);
          allCourseBox.appendChild(boxOfEachCategory);
          //boxFromImg
          let boxFromImg = document.createElement("div");
          boxFromImg.classList.add("boxFromImg");
          boxOfEachCategory.appendChild(boxFromImg);
          //Image box
          let imageBox = document.createElement("div");
          imageBox.classList.add("imageBox");
          imageBox.style.backgroundImage = `url(${initUrl}${categoryImg})`;
          imageBox.addEventListener("click", () => {
            for (let y = 0; y < pageLinksList.length; y++) {
              if (pageLinksList[y].page === "Curso") {
                window.location.href = `/page/${pageLinksList[y].id}/Curso?courseId=${courseId}&ysnPacote=${ysnPacote}`;
              }
            }
          });
          boxFromImg.appendChild(imageBox);
          //Texts box
          let textsBox = document.createElement("div");
          textsBox.classList.add("textsBox");
          boxOfEachCategory.appendChild(textsBox);
          //Category title
          let categoryTitle = document.createElement("p");
          if (categoryName.length > 45) {
            categoryTitle.innerHTML = `${categoryName.slice(0, 45)}...`;
          } else {
            categoryTitle.innerHTML = categoryName;
          }
          categoryTitle.classList.add("categoryTitle");
          textsBox.appendChild(categoryTitle);
        }
      }

      console.log(coursesList.length);
      console.log(numberCourse);
      //courseContainer
      numberCourse > coursesList.length
        ? (showMoreCourses.style.display = "block")
        : (showMoreCourses.style.display = "none");
    } catch (e) {
      console.warn(e);
    }
  }
}
// End of All Categories section

// Why Choose Us section
//Note: The title code for this session is between lines 577 and 580 of this file
//Cards links
let onlineClassLink = Array.prototype.slice.call(
  document.querySelectorAll(".whyChooseUsBtnBox")
);
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === "Quem Somos") {
    onlineClassLink[0].setAttribute(
      "href",
      `/page/${pageLinksList[i].id}/Quem-Somos`
    );
  }
}
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === "Nossos Cursos") {
    onlineClassLink[1].setAttribute(
      "href",
      `/page/${pageLinksList[i].id}/Nossos-Cursos`
    );
  }
}
// End of Why Choose Us section

// Discover Packages section

function getDiscoverPackages(json) {
  try {
    let discoverPackagesSection = document.querySelector(
      ".discoverPackagesSection"
    );
    // let institutionName = document.querySelector('.instituteName');
    let discoverPackagesBox = document.querySelector(".discoverPackages-list");
    let discoverPackagesList = document.querySelectorAll(
      '[data-slide="desc-packages-slide-item"]'
    );
    if (json.store) {
      let sizeStoreCoursesList = json.store.courses.length;
      let count = -1;
      for (let i = 0; i < json.store.courses.length; i++) {
        let packageLink = json.store.courses[i].link;
        count++;
        //Eacth testimonies json.store.course
        let discoverPackagesBoxes = document.createElement("div");
        discoverPackagesBoxes.classList.add("discoverPackages-item");
        discoverPackagesBoxes.dataset.slide = "desc-packages-slide-item";
        discoverPackagesBoxes.dataset.idx_disc =
          discoverPackagesList.length + count;
        discoverPackagesBox.appendChild(discoverPackagesBoxes);
        //Intern box
        let discPkgInternBox = document.createElement("div");
        discPkgInternBox.classList.add("discPkgInternBox");
        discoverPackagesBoxes.appendChild(discPkgInternBox);
        //Testimonies content
        let contents = document.createElement("div");
        contents.classList.add("discoverPackages-content");
        discPkgInternBox.appendChild(contents);
        //Image box
        let imageCardBox = document.createElement("div");
        imageCardBox.classList.add("imageCardBox");
        contents.appendChild(imageCardBox);
        //Card image
        let cardImage = document.createElement("div");
        cardImage.classList.add("cardImage");
        cardImage.style.backgroundImage = `url(${initUrl}${json.store.courses[i].img})`;
        imageCardBox.appendChild(cardImage);
        cardImage.addEventListener("click", () => {
          window.open(packageLink, "_blank");
        });
        //Text and button box
        let contentTextBox = document.createElement("div");
        contentTextBox.classList.add("contentTextBox");
        contents.appendChild(contentTextBox);
        //Texts box
        let textsBox = document.createElement("div");
        textsBox.classList.add("textsBox");
        contentTextBox.appendChild(textsBox);
        //Text
        let discPackagesTextCard = document.createElement("p");
        discPackagesTextCard.classList.add("txtDiscoverPackagesCard");
        discPackagesTextCard.innerHTML = json.store.courses[i].title;
        textsBox.appendChild(discPackagesTextCard);
        //Author name
        let authorName = document.createElement("p");
        authorName.classList.add("packageNameCard");
        authorName.innerHTML = json.store.courses[i].author;
        textsBox.appendChild(authorName);

        //Link box
        let linkBox = document.createElement("div");
        linkBox.classList.add("linkBox");
        contentTextBox.appendChild(linkBox);
        //Link
        let link = document.createElement("a");
        link.innerHTML = json.store.courses[i].button + " →";
        link.classList.add("linkDiscoverPackagesCard");
        link.setAttribute("href", packageLink);
        link.setAttribute("aria-label", link.textContent);
        link.setAttribute("target", `_blank`);
        // let hiddenText = document.createElement("span");
        // hiddenText.innerText = "Show package";
        // hiddenText.style.cssText = `color:#000; display:flex; overflow: hidden; width:0; height:0;`;
        // link.appendChild(hiddenText);
        linkBox.appendChild(link);
      }
      getWindowSize(sizeStoreCoursesList);
    } else {
      discoverPackagesSection.style.display = "none";
      console.log("Não há pacotes para ser exibido.");
    }
  } catch (e) {
    console.warn(e);
  }
}

function getWindowSize(sizeStoreCoursesList) {
  let windowSize = window.innerWidth;
  let newMargin = (windowSize - 250) / 2;
  let chandeSlideBtn = document.querySelector(".discoverPakagesBtnBox");
  if (windowSize < 992 || sizeStoreCoursesList >= 5) {
    eventsDiscoverPackagesSlide(newMargin);
    chandeSlideBtn.style.display = "flex";
  }
}

function eventsDiscoverPackagesSlide(newMargin) {
  try {
    const discoverPackagesWrapper = document.querySelector(
      '[data-slide="discoverPackages-wrapper"]'
    );
    const discoverPackagesSlideList = document.querySelector(
      '[data-slide="discoverPackages-list"]'
    );
    const discoverPackagesPreviousBtn = document.querySelector(
      '[data-slide="discoverPackages-previous-btn"]'
    );
    const discoverPackagesNextBtn = document.querySelector(
      '[data-slide="discoverPackages-next-btn"]'
    );
    const discoverPackagesControlsWapper = document.querySelector(
      '[data-slide="discoverPackages-controls-wrapper"]'
    );
    let discPackagesSlideItems = document.querySelectorAll(
      '[data-slide="desc-packages-slide-item"]'
    );
    let discPackagesControlButtons;
    let discPackagesSlideInterval;

    const discPackagesState = {
      discPackagesStartingPoint: 0,
      discPackagesSavedPosition: 0,
      discPackagesCurrentPoint: 0,
      discPackagesMovement: 0,
      CurrentDiscPackagesSlideIndex: 0,
      discPackagesAutoPlay: true,
      discPackagesTimeInterval: 0,
    };

    //Mudar slides
    function translateDiscPackagesSlide({ discPackagesPosition }) {
      discPackagesState.discPackagesSavedPosition = discPackagesPosition;
      discoverPackagesSlideList.style.transform = `translateX(${discPackagesPosition}px)`;
    }

    function getCenterDiscPackagesPosition({ idx_disc }) {
      const discPackagesSlideItem = discPackagesSlideItems[idx_disc];
      const discPackagesSlideWidth = discPackagesSlideItem.clientWidth;
      const windowDiscPackagesWidth = document.body.clientWidth;
      const marginDiscPackages =
        (windowDiscPackagesWidth - discPackagesSlideWidth) / 2;
      const discPackagesPosition =
        marginDiscPackages - idx_disc * discPackagesSlideWidth;
      return discPackagesPosition;
    }

    function setVisibleDiscPackagesSlide({ idx_disc, animateDiscPackages }) {
      if (idx_disc === 0 || idx_disc === discPackagesSlideItems.length - 1) {
        idx_disc = discPackagesState.CurrentDiscPackagesSlideIndex;
      }
      const discPackagesPosition = getCenterDiscPackagesPosition({ idx_disc });
      discPackagesState.CurrentDiscPackagesSlideIndex = idx_disc;
      discoverPackagesSlideList.style.transition =
        animateDiscPackages === true ? "transform 1s" : "none";
      activeDiscPackagesControlButton({ idx_disc });
      translateDiscPackagesSlide({
        discPackagesPosition: discPackagesPosition,
      });
    }

    function nextDiscPackagesSlide() {
      setVisibleDiscPackagesSlide({
        idx_disc: discPackagesState.CurrentDiscPackagesSlideIndex + 1,
        animateDiscPackages: true,
      });
    }

    function previousDiscPackagesSlide() {
      setVisibleDiscPackagesSlide({
        idx_disc: discPackagesState.CurrentDiscPackagesSlideIndex - 1,
        animateDiscPackages: true,
      });
    }

    function createDiscPackagesControlButtons() {
      discPackagesSlideItems.forEach(function () {
        const discPackagesControlButton = document.createElement("button");
        discPackagesControlButton.setAttribute("aria-label", "Show package");
        discPackagesControlButton.dataset.slide = "discPackages-control-btn";
        discPackagesControlButton.classList.add(
          "discoverPackages-control-button"
        );
        let icon = document.createElement("span");
        icon.classList.add("fas", "fa-circle");
        discPackagesControlButton.appendChild(icon);
        let hiddenText = document.createElement("span");
        hiddenText.innerText = "Show package";
        hiddenText.style.cssText = `display:flex; overflow:hidden; width:0; height:0;`;
        discPackagesControlButton.appendChild(hiddenText);
        discoverPackagesControlsWapper.append(discPackagesControlButton);
      });
    }

    function activeDiscPackagesControlButton({ idx_disc }) {
      const discPackagesSlideItem = discPackagesSlideItems[idx_disc];
      const dataidx_disc = Number(discPackagesSlideItem.dataset.idx_disc);
      const discPackagesControlButton =
        discPackagesControlButtons[dataidx_disc];
      discPackagesControlButtons.forEach(function (
        discPackagesControlButtonItem
      ) {
        discPackagesControlButtonItem.classList.remove("activeDiscPackages");
      });
      if (discPackagesControlButton)
        discPackagesControlButton.classList.add("activeDiscPackages");
    }

    function createDiscPackagesSlideClone() {
      const firstDiscPackagesSlide = discPackagesSlideItems[0].cloneNode(true);
      firstDiscPackagesSlide.classList.add("discPackagesSlide-cloned");
      firstDiscPackagesSlide.dataset.idx_disc = discPackagesSlideItems.length;

      const secundDiscPackagesSlide = discPackagesSlideItems[1].cloneNode(true);
      secundDiscPackagesSlide.classList.add("discPackagesSlide-cloned");
      secundDiscPackagesSlide.dataset.idx_disc =
        discPackagesSlideItems.length + 1;

      const lastDiscPackagesSlide =
        discPackagesSlideItems[discPackagesSlideItems.length - 1].cloneNode(
          true
        );
      lastDiscPackagesSlide.classList.add("discPackagesSlide-cloned");
      lastDiscPackagesSlide.dataset.idx_disc = -1;

      const penultimateDiscPackagesSlide =
        discPackagesSlideItems[discPackagesSlideItems.length - 2].cloneNode(
          true
        );
      penultimateDiscPackagesSlide.classList.add("discPackagesSlide-cloned");
      penultimateDiscPackagesSlide.dataset.idx_disc = -2;

      //Criar no final da lista
      discoverPackagesSlideList.append(firstDiscPackagesSlide);
      discoverPackagesSlideList.append(secundDiscPackagesSlide);
      //Criar no início da lista
      discoverPackagesSlideList.prepend(lastDiscPackagesSlide);
      discoverPackagesSlideList.prepend(penultimateDiscPackagesSlide);

      discPackagesSlideItems = document.querySelectorAll(
        '[data-slide="desc-packages-slide-item"]'
      );
    }

    //Apertar
    function onDiscPackagesMouseDown(evento, idx_disc) {
      const discPackagesSlideItem = evento.currentTarget;
      discPackagesState.discPackagesStartingPoint = evento.clientX;
      discPackagesState.discPackagesCurrentPoint =
        discPackagesState.discPackagesStartingPoint -
        discPackagesState.discPackagesSavedPosition;
      discPackagesState.diaDiaCurrentSlideidx_disc = idx_disc;
      discoverPackagesSlideList.style.transition = "none";
      discPackagesSlideItem.addEventListener(
        "mousemove",
        onDiscPackagesMouseMove,
        { passive: true }
      );
    }
    //Evento de mover mouse
    function onDiscPackagesMouseMove(evento, idx_disc) {
      discPackagesState.discPackagesMovement =
        evento.clientX - discPackagesState.discPackagesStartingPoint;
      const discPackagesPosition =
        evento.clientX - discPackagesState.discPackagesCurrentPoint;
      translateDiscPackagesSlide({ discPackagesPosition });
    }
    //Soltar
    function noDiscPackagesMouseUp(evento) {
      const pointsToMoveDiscPackages = evento.type.includes("touch") ? 50 : 150;
      // console.log(evento.type);
      const discPackagesSlideItem = evento.currentTarget;
      if (discPackagesState.discPackagesMovement < -pointsToMoveDiscPackages) {
        nextDiscPackagesSlide();
      } else if (
        discPackagesState.discPackagesMovement > pointsToMoveDiscPackages
      ) {
        previousDiscPackagesSlide();
      } else {
        setVisibleDiscPackagesSlide({
          idx_disc: discPackagesState.CurrentDiscPackagesSlideIndex,
          animateDiscPackages: true,
        });
      }

      discPackagesSlideItem.removeEventListener(
        "mousemove",
        onDiscPackagesMouseMove
      );
    }

    function onDiscPackagesTouchStart(evento, idx_disc) {
      evento.clientX = evento.touches[0].clientX;
      onDiscPackagesMouseDown(evento, idx_disc);
      const discPackagesSlideItem = evento.currentTarget;
      discPackagesSlideItem.addEventListener(
        "touchmove",
        onDiscPackagesTouchMove,
        { passive: true }
      );
    }

    function onDiscPackagesTouchMove(evento) {
      evento.clientX = evento.touches[0].clientX;
      onDiscPackagesMouseMove(evento);
    }
    function onDiscPackagesTouchEnd(evento) {
      noDiscPackagesMouseUp(evento);
      const discPackagesSlideItem = evento.currentTarget;
      discPackagesSlideItem.removeEventListener(
        "touchmove",
        onDiscPackagesTouchMove
      );
    }

    function onDiscPackagesControlButtonClick(idx_disc) {
      setVisibleDiscPackagesSlide({
        idx_disc: idx_disc + 2,
        animateDiscPackages: true,
      });
    }

    function onDiscPackagesSlideListTransitionEnd() {
      const discPackagesSlideItem =
        discPackagesSlideItems[discPackagesState.CurrentDiscPackagesSlideIndex];

      if (
        discPackagesSlideItem.classList.contains("discPackagesSlide-cloned") &&
        Number(discPackagesSlideItem.dataset.idx_disc) > 0
      ) {
        setVisibleDiscPackagesSlide({
          idx_disc: 2,
          animateDiscPackages: false,
        });
      }
      if (
        discPackagesSlideItem.classList.contains("discPackagesSlide-cloned") &&
        Number(discPackagesSlideItem.dataset.idx_disc) < 0
      ) {
        setVisibleDiscPackagesSlide({
          idx_disc: discPackagesSlideItems.length - 3,
          animateDiscPackages: false,
        });
      }
    }

    function setDiscPackagesAutoPlay() {
      if (discPackagesState.discPackagesAutoPlay) {
        discPackagesSlideInterval = setInterval(function () {
          setVisibleDiscPackagesSlide({
            idx_disc: discPackagesState.CurrentDiscPackagesSlideIndex + 1,
            animateDiscPackages: true,
          });
        }, discPackagesState.discPackagesTimeInterval);
      }
    }

    function setDiscPackagesListeners() {
      discPackagesControlButtons = document.querySelectorAll(
        '[data-slide="discPackages-control-btn"]'
      );
      discPackagesSlideItems = document.querySelectorAll(
        '[data-slide="desc-packages-slide-item"]'
      );

      //Adicionar evento nos indicatons
      discPackagesControlButtons.forEach(function (
        discPackagesControlButton,
        idx_disc
      ) {
        discPackagesControlButton.addEventListener("click", function (evento) {
          onDiscPackagesControlButtonClick(idx_disc);
        });
      });

      //Eventos do mouse
      discPackagesSlideItems.forEach(function (
        discPackagesSlideItem,
        idx_disc
      ) {
        //Arrastar
        discPackagesSlideItem.addEventListener("dragstart", function (evento) {
          evento.preventDefault();
        });
        //Apertar
        discPackagesSlideItem.addEventListener(
          "mousedown",
          function (evento) {
            onDiscPackagesMouseDown(evento, idx_disc);
          },
          { passive: true }
        ),
          //Soltar no mobile
          discPackagesSlideItem.addEventListener(
            "mouseup",
            noDiscPackagesMouseUp
          );

        //Apertar no mobile
        discPackagesSlideItem.addEventListener(
          "touchstart",
          function (evento) {
            onDiscPackagesTouchStart(evento, idx_disc);
          },
          { passive: true }
        ),
          //Soltar
          discPackagesSlideItem.addEventListener(
            "touchend",
            onDiscPackagesTouchEnd
          );
      });

      discoverPackagesNextBtn.addEventListener("click", nextDiscPackagesSlide);
      discoverPackagesPreviousBtn.addEventListener(
        "click",
        previousDiscPackagesSlide
      );

      //Evento para voltar o slide de forma que o usuário não perceba
      discoverPackagesSlideList.addEventListener(
        "transitionend",
        onDiscPackagesSlideListTransitionEnd
      );
      discoverPackagesWrapper.addEventListener("mouseenter", function () {
        clearInterval(discPackagesSlideInterval);
      });
      discoverPackagesWrapper.addEventListener("mouseleave", function () {
        setDiscPackagesAutoPlay();
      });

      //Manter posicionamento padrão
      let discPackagesResizeTimeOut;
      window.addEventListener("resize", function () {
        clearTimeout(discPackagesResizeTimeOut);
        discPackagesResizeTimeOut = setTimeout(function () {
          setVisibleDiscPackagesSlide({
            idx_disc: discPackagesState.CurrentDiscPackagesSlideIndex,
            animateDiscPackages: true,
          });
        }, 500);
      });
    }

    function initDiscPackagesSlider({
      startAtidx_disc = 0,
      discPackagesAutoPlay = true,
      discPackagesTimeInterval = 3000,
    }) {
      discPackagesState.discPackagesAutoPlay = discPackagesAutoPlay;
      discPackagesState.discPackagesTimeInterval = discPackagesTimeInterval;
      createDiscPackagesControlButtons();
      createDiscPackagesSlideClone();
      setDiscPackagesListeners();
      setVisibleDiscPackagesSlide({
        idx_disc: startAtidx_disc + 2,
        animateDiscPackages: true,
      });
      setDiscPackagesAutoPlay();
    }

    initDiscPackagesSlider({
      discPackagesAutoPlay: true,
      startAtidx_disc: 0,
      discPackagesTimeInterval: 3000,
    });

    redirectionClonedPackages();
    //End Discover Packages Section
  } catch (e) {
    console.warn(e);
  }
}
// Nova função para que as imgens dos clones recebam o evento de clique
function redirectionClonedPackages() {
  let clonedImg = document.querySelectorAll(
    ".discPackagesSlide-cloned .cardImage"
  );

  clonedImg.forEach((img, index) => {
    img.addEventListener("click", () => {
      let clonedLink = document.querySelectorAll(".discPackagesSlide-cloned a")[
        index
      ];
      let linkHref = clonedLink.href;
      window.open(linkHref, "_blank");
    });
  });
}
//
// End of Discover Packages section

//Testimonials section
function getTestimonials(json) {
  // console.log(json);
  try {
    let testimoniesSection = document.querySelector(".testimonialSection");
    // let whoDo = document.querySelector('.testimonialsTitle');
    let institutionName = document.querySelector(".instituteName");

    let testimoniesBox = document.querySelector(".depoimentosSlide-list");
    let testimoniesList = document.querySelectorAll(
      '[data-slide="depoimentos-slide-item"]'
    );

    if (json.PortalEducacional)
      institutionName.innerHTML = json.PortalEducacional;
    if (json.testimonies) {
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
    } else {
      console.log(`Não há depoimento para serem exibidos`);
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
        depoimentosControlButton.setAttribute("aria-label", "Show testimonial");
        depoimentosControlButton.classList.add(
          "depoimentosSlide-control-button"
        );
        depoimentosControlButton.dataset.slide = "depoimentos-control-btn";
        let icon = document.createElement("span");
        icon.classList.add("fas", "fa-circle");
        depoimentosControlButton.append(icon);
        let hiddenText = document.createElement("span");
        hiddenText.style.cssText =
          "display:flex; overfow: hidden; width:0; height:0;";
        hiddenText.innerText = "Show testimonial";
        depoimentosControlButton.append(hiddenText);

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
        onDepoimentosMouseMove,
        { passive: true }
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
        onDepoimentosTouchMove,
        { passive: true }
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
        depoimentosSlideItem.addEventListener(
          "dragstart",
          function (evento) {
            evento.preventDefault();
          },
          { passive: true }
        );
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
        depoimentosSlideItem.addEventListener(
          "touchstart",
          function (evento) {
            onDepoimentosTouchStart(evento, indice);
          },
          { passive: true }
        ),
          //Soltar
          depoimentosSlideItem.addEventListener(
            "touchend",
            onDepoimentosTouchEnd,
            { passive: true }
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

    //End Testimonials section
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

// Free Slide code
function createFreeSlideArrow(nextSlide, previousSlide) {
  const windowFreeSlide = document.querySelector(".freeSlideWrapper");
  const leftArrow = document.createElement("span");
  leftArrow.style.cssText = `position: absolute; top: 0; left: 0; bottom: 0; width: 20px; color: #ffffff8a; background-image: linear-gradient(to right, #000000d9, transparent); display: flex; justify-content: center; align-items: center; font-size: 30px; cursor: pointer;`;
  leftArrow.classList.add("fa-solid", "fa-angle-left");
  const rightArrow = document.createElement("span");
  rightArrow.style.cssText = `position: absolute; top: 0; right: 0; bottom: 0; width: 20px; color: #ffffff8a; background-image: linear-gradient(to left, #000000d9, transparent); display: flex; justify-content: center; align-items: center; font-size: 30px; cursor: pointer;`;
  rightArrow.classList.add("fa-solid", "fa-angle-right");
  windowFreeSlide.appendChild(leftArrow);
  windowFreeSlide.appendChild(rightArrow);
  rightArrow.addEventListener("click", nextSlide);
  leftArrow.addEventListener("click", previousSlide);
}

function freeSlideAddEvents() {
  const slideWrapper = document.querySelector(
    '[data-slide="freeSlideWrapper"]'
  );
  const slideList = document.querySelector('[data-slide="freeList"]');
  let slideItems = document.querySelectorAll('[data-slide="item"]');
  let controlButtons;
  let slideInterval;

  const state = {
    startingPoint: 0,
    savedPosition: 0,
    currentPoint: 0,
    movement: 0,
    currentSlideIndex: 0,
    autoPlay: true,
    timeInterval: 0,
  };

  //Mudar slides
  function translateSlide({ position }) {
    state.savedPosition = position;
    slideList.style.transform = `translateX(${position}px)`;
  }

  function getCenterPosition({ index }) {
    const slideItem = slideItems[index];
    const slideWidth = slideItem.clientWidth;
    // const windowWidth = document.body.clientWidth;
    //Here get the width of parent element ↓
    const freeSlide = document.querySelector(".freeSlideWrapper");
    const windowWidth = freeSlide.clientWidth;
    const margin = (windowWidth - slideWidth) / 2;
    const position = margin - index * slideWidth;
    return position;
  }

  function setVisibleSlide({ index, animate }) {
    if (index === 0 || index === slideItems.length - 1) {
      index = state.currentSlideIndex;
    }
    const position = getCenterPosition({ index });
    state.currentSlideIndex = index;
    slideList.style.transition = animate === true ? "transform 1s" : "none";
    activeControlButton({ index });
    translateSlide({ position: position });
  }

  function nextSlide() {
    setVisibleSlide({
      index: state.currentSlideIndex + 1,
      animate: true,
    });
  }

  function previousSlide() {
    setVisibleSlide({
      index: state.currentSlideIndex - 1,
      animate: true,
    });
  }

  function activeControlButton({ index }) {
    const slideItem = slideItems[index];
    const dataIndex = Number(slideItem.dataset.index);
    const controlButton = controlButtons[dataIndex];
    controlButtons.forEach(function (controlButtonItem) {
      controlButtonItem.classList.remove("active");
    });
    if (controlButton) controlButton.classList.add("active");
  }

  function createSlideClone() {
    const firstSlide = slideItems[0].cloneNode(true);
    firstSlide.classList.add("freeSlide-cloned");
    firstSlide.dataset.index = slideItems.length;

    const secundSlide = slideItems[1].cloneNode(true);
    secundSlide.classList.add("freeSlide-cloned");
    secundSlide.dataset.index = slideItems.length + 1;

    const lastSlide = slideItems[slideItems.length - 1].cloneNode(true);
    lastSlide.classList.add("freeSlide-cloned");
    lastSlide.dataset.index = -1;

    const penultimateSlide = slideItems[slideItems.length - 2].cloneNode(true);
    penultimateSlide.classList.add("freeSlide-cloned");
    penultimateSlide.dataset.index = -2;

    //Criar no final da lista
    slideList.append(firstSlide);
    slideList.append(secundSlide);
    //Criar no início da lista
    slideList.prepend(lastSlide);
    slideList.prepend(penultimateSlide);

    slideItems = document.querySelectorAll('[data-slide="item"]');
  }

  //Apertar
  function onMouseDown(event, index) {
    const slideItem = event.currentTarget;
    state.startingPoint = event.clientX;
    state.currentPoint = state.startingPoint - state.savedPosition;
    state.currentSlideIndex = index;
    slideList.style.transition = "none";
    slideItem.addEventListener("mousemove", onMouseMove);
  }
  //Evento de mover mouse
  function onMouseMove(event, index) {
    state.movement = event.clientX - state.startingPoint;
    const position = event.clientX - state.currentPoint;
    translateSlide({ position });
  }
  //Soltar
  function noMouseUp(event) {
    const pointsToMove = event.type.includes("touch") ? 50 : 150;
    // console.log(event.type);
    const slideItem = event.currentTarget;
    if (state.movement < -pointsToMove) {
      nextSlide();
    } else if (state.movement > pointsToMove) {
      previousSlide();
    } else {
      setVisibleSlide({
        index: state.currentSlideIndex,
        animate: true,
      });
    }

    slideItem.removeEventListener("mousemove", onMouseMove);
  }

  function onTouchStart(event, index) {
    event.clientX = event.touches[0].clientX;
    onMouseDown(event, index);
    const slideItem = event.currentTarget;
    slideItem.addEventListener("touchmove", onTouchMove);
  }

  function onTouchMove(event) {
    event.clientX = event.touches[0].clientX;
    onMouseMove(event);
  }
  function onTouchEnd(event) {
    noMouseUp(event);
    const slideItem = event.currentTarget;
    slideItem.removeEventListener("touchmove", onTouchMove);
  }

  function onControlButtonClick(index) {
    setVisibleSlide({ index: index + 2, animate: true });
  }

  function onSlideListTransitionEnd() {
    const slideItem = slideItems[state.currentSlideIndex];

    if (
      slideItem.classList.contains("freeSlide-cloned") &&
      Number(slideItem.dataset.index) > 0
    ) {
      setVisibleSlide({ index: 2, animate: false });
    }
    if (
      slideItem.classList.contains("freeSlide-cloned") &&
      Number(slideItem.dataset.index) < 0
    ) {
      setVisibleSlide({
        index: slideItems.length - 3,
        animate: false,
      });
    }
  }

  function setAutoPlay() {
    if (state.autoPlay) {
      slideInterval = setInterval(function () {
        setVisibleSlide({
          index: state.currentSlideIndex + 1,
          animate: true,
        });
      }, state.timeInterval);
    }
  }

  function setListeners() {
    controlButtons = document.querySelectorAll('[data-slide="control-button"]');
    slideItems = document.querySelectorAll('[data-slide="item"]');

    //Adicionar evento nos indicatons
    controlButtons.forEach(function (controlButton, index) {
      controlButton.addEventListener("click", function (event) {
        onControlButtonClick(index);
      });
    });

    //Eventos do mouse
    slideItems.forEach(function (slideItem, index) {
      //Arrastar
      slideItem.addEventListener("dragstart", function (event) {
        event.preventDefault();
      });
      //Apertar
      slideItem.addEventListener("mousedown", function (event) {
        onMouseDown(event, index);
      }),
        //Soltar no mobile
        slideItem.addEventListener("mouseup", noMouseUp);

      //Apertar no mobile
      slideItem.addEventListener("touchstart", function (event) {
        onTouchStart(event, index);
      }),
        //Soltar
        slideItem.addEventListener("touchend", onTouchEnd);
    });

    //Evento para voltar o slide de forma que o usuário não perceba
    slideList.addEventListener("transitionend", onSlideListTransitionEnd);
    slideWrapper.addEventListener("mouseenter", function () {
      clearInterval(slideInterval);
    });
    slideWrapper.addEventListener("mouseleave", function () {
      setAutoPlay();
    });
    //Manter posicionamento padrão
    let resizeTimeOut;
    window.addEventListener("resize", function () {
      this.clearTimeout(resizeTimeOut);
      resizeTimeOut = setTimeout(function () {
        setVisibleSlide({
          index: state.currentSlideIndex,
          animate: true,
        });
      }, 1000);
    });
  }

  function initSlider({
    startAtIndex = 0,
    autoPlay = true,
    timeInterval = 3000,
  }) {
    state.autoPlay = autoPlay;
    state.timeInterval = timeInterval;
    createSlideClone();
    setListeners();
    setVisibleSlide({ index: startAtIndex + 2, animate: true });
    setAutoPlay();
  }

  initSlider({
    autoPlay: true,
    startAtIndex: 1,
    timeInterval: 4000,
  });

  function createFreeSlideStyle() {
    const freeSlideBox = document.querySelector(".freeSlideWrapper");
    freeSlideBox.style.cssText = `margin-top: 20px;`;
    const style = document.createElement("style");
    style.id = "freeSlideStyle";
    style.innerText = `
    .freeSlideWrapper * {margin: 0; padding: 0; box-sizing: border-box;} .freeSlideWrapper { width: 100%; display: flex; align-items: center; height: 100%; position: relative; z-index: 0; } .freeSlide-wrapper { display: flex; flex-direction: column; justify-content: center; width: 100%; overflow: hidden; } .freeSlide-list { display: flex; } .freeSlide-item { flex-shrink: 0; width: 15vw; cursor: pointer; transition: all 0.4s; } .freeSlide-item:hover { transform: scale(1.03); } .freeSlide-content { position: relative; border-radius: 15px; } .freeSlide-image { width: 100%; } @media (max-width: 768px) { .freeSlide-item { width: 25vw; } } @media (max-width: 576px) { .freeSlide-item { width: 40vw; } } `;
    freeSlideBox.appendChild(style);
    getSrcOfFreeClickedImage();
  }
  createFreeSlideArrow(nextSlide, previousSlide);
  createFreeSlideStyle();
}

function createFreeGallery() {
  const freeBox = document.querySelector(".freeSlideWrapper");
  const style = document.createElement("style");
  style.innerText = `.freeSlideWrapper, .freeSlide-wrapper, .freeSlide-list, .freeSlide-content, .freeSlide-image { width: 100%; display: flex; justify-content: start; align-items: center; } .freeSlide-item { width: 33%; cursor: pointer; transition: all 0.4s; } .freeSlide-item:hover { transform: scale(1.03); } @media (max-width: 380px) { .freeSlide-list { display: flex; flex-direction: column; } .freeSlide-item { width: 95%; margin: auto; } }`;
  freeBox.appendChild(style);
  getSrcOfFreeClickedImage();
}

function getSrcOfFreeClickedImage() {
  const slideItems = document.querySelectorAll(".freeSlide-item");
  slideItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      const elCkd = event.target;
      createNewFreeWindowImg(elCkd.src);
    });
  });
}

function createNewFreeWindowImg(imgPath) {
  const freePopup = document.createElement("div");
  freePopup.classList.add("windowFreeSlideImg");
  freePopup.innerHTML = `
      <div class="imageFreeSlideBox">
        <div class="closedFreeSlideBox">
          <i class="fa-sharp fa-solid fa-xmark closedFreeSlideIcon"></i>
        </div>
        <img
          src="${imgPath}"
          alt="Slide image"
          class="freeSlideImg"
        />
      </div>
    <style>
      .windowFreeSlideImg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99;
         display: flex; 
        justify-content: center;
        align-items: center;
        background-color: #1f202959;
        backdrop-filter: blur(1px);
      }
      .imageFreeSlideBox {
        max-width: 600px;
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }
      .closedFreeSlideBox {
        position: absolute;
        top: -13px;
        right: -13px;
        width: auto;
        height: auto;
        border-radius: 50%;
        color: var(--blackColor);
        border: 1px solid;
        background-color: var(--whiteColor);
        cursor: pointer;
        transition: all 0.4s;
      }
      .closedFreeSlideBox:hover {
        transform: scale(1.06);
      }
      .closedFreeSlideBox:active {
        filter: brightness(75%);
      }
      .closedFreeSlideIcon {
        color: var(--blackColor);
        padding: 3px 5px;
        font-size: 20px;
      }
      .freeSlideImg {
        width: 100%;
      }
    </style>
  `;
  document.getElementsByTagName("body")[0].appendChild(freePopup);
  createFreePopupEvents();
}

function createFreePopupEvents() {
  const window = document.querySelector(".windowFreeSlideImg");
  const closedWindow = document.querySelector(".closedFreeSlideBox");
  if (closedWindow) {
    closedWindow.addEventListener("click", () => {
      window.remove();
    });
  }
  if (window) {
    window.addEventListener("click", (event) => {
      const elCkd = event.target;
      if (elCkd.classList.contains("windowFreeSlideImg")) {
        window.remove();
      }
    });
  }
}

// Check if exist slide structure and attributes
function checkIfFreeSlideExist() {
  const freeBox = document.querySelector(".freeSlideWrapper");
  if (freeBox) {
    const freeWrapper = freeBox.querySelector(".freeSlide-wrapper");
    if (
      freeWrapper &&
      freeWrapper.getAttribute("data-slide") === "freeSlideWrapper"
    ) {
      const freeList = freeWrapper.querySelector(".freeSlide-list");
      if (freeList && freeList.getAttribute("data-slide") === "freeList") {
        const freeItem = freeWrapper.querySelectorAll(".freeSlide-item");
        if (
          freeItem.length > 0 &&
          freeItem[0].getAttribute("data-slide") === "item"
        ) {
          const freeContent = freeItem[0].querySelector(".freeSlide-content");
          if (freeContent) {
            const freeImage = freeContent.querySelectorAll(".freeSlide-image");
            if (freeImage.length > 0) {
              if (freeItem.length > 3) {
                freeSlideAddEvents();
              } else if (freeItem.length <= 3) {
                createFreeGallery();
              }
            } else {
              console.warn(
                `Elemento com a classe 'freeSlide-image' não encontrado.`
              );
              console.warn(`A estrutura e atributos corretos para que o slide funcione são:

<!-- Carrossel -->
<div class="freeSlideWrapper">
  <div class="freeSlide-wrapper" data-slide="freeSlideWrapper">
    <div class="freeSlide-list" data-slide="freeList">
      <!-- Cada bloco desse será uma imagem -->
      <div class="freeSlide-item" data-slide="item">
        <div class="freeSlide-content">
          <img
            class="freeSlide-image"
            src="link-imagem"
            alt="Imagem"
          />
        </div>
      </div>
      <!-- Cada bloco desse será uma imagem -->
      <div class="freeSlide-item" data-slide="item">
        <div class="freeSlide-content">
          <img
            class="freeSlide-image"
            src="link-imagem"
            alt="Imagem"
          />
        </div>
      </div>
      <!-- Adicione a quantidade de imagem desejada -->
    </div>
  </div>
</div>
<!-- Carrossel -->
              `);
              return;
            }
          } else {
            console.warn(
              `Elemento com a classe 'freeSlide-content' não encontrado.`
            );
            return;
          }
        } else {
          console.warn(
            `Elemento com a classe 'freeSlide-item' não encontrado ou ele não tem o atributo 'data-slide="item"', que é necessário!`
          );
          return;
        }
      } else {
        console.warn(
          `Elemento com a classe 'freeSlide-list' não encontrado ou ele não tem o atributo 'data-slide="freeList"', que é necessário!`
        );
        return;
      }
    } else {
      console.warn(
        `Elemento com a classe 'freeSlide-wrapper' não encontrado ou ele não tem o atributo 'data-slide="freeSlideWrapper"', que é necessário!`
      );
      return;
    }
  } else {
    return;
  }
}
// End of Free Slide code

// SEO and PWA adjustiments
function seoAdjustment() {
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
  app_status_bar.setAttribute("name", "apple-mobile-web-app-status-bar-style");
  app_status_bar.setAttribute("content", "default");
  // SEO/PWA adjustment date
  const date_1 = document.createElement("meta");
  date_1.setAttribute("name", "publishdate");
  date_1.setAttribute("content", "20240207101852");
  const date_2 = document.createElement("meta");
  date_2.setAttribute("name", "publish-date");
  date_2.setAttribute("content", "2024-02-07T10:18:52Z");
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
  // Create a new doctype declaration with the "html" attribute
  let newDoctype = document.implementation.createDocumentType("html", "", "");
  // Replaces the existing declaration with the new one
  document.replaceChild(newDoctype, document.doctype);

  head.insertBefore(finalComment, viewportMeta.nextSibling);
  head.insertBefore(app_capable, viewportMeta.nextSibling);
  head.insertBefore(app_status_bar, viewportMeta.nextSibling);
  // head.insertBefore(manifest, viewportMeta.nextSibling);
  head.insertBefore(theme, viewportMeta.nextSibling);
  head.insertBefore(date_1, viewportMeta.nextSibling);
  head.insertBefore(date_2, viewportMeta.nextSibling);
  head.insertBefore(author, viewportMeta.nextSibling);
  head.insertBefore(initialComment, viewportMeta.nextSibling);
  const DRMZ_img = document.querySelector(".FooterEndDZM");
  if (DRMZ_img) {
    DRMZ_img.setAttribute("width", "120");
    DRMZ_img.setAttribute("height", "20");
  }
  const appleStoreImg = document.querySelector(".appleStoreImg");
  const playStoreImg = document.querySelector(".playStoreImg");
  if (playStoreImg && appleStoreImg) {
    appleStoreImg.setAttribute("width", "180");
    appleStoreImg.setAttribute("height", "89.8");
    playStoreImg.setAttribute("height", "180");
    playStoreImg.setAttribute("height", "66");
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

seoAdjustment();

//Call functions
fetchMenuInfo();
fetchallJsonCourseCategories();
findElementsAndAddSeoAttributes();
checkIfFreeSlideExist();

function renderNavbarSection() {
  const container = document.getElementById("navbarIframe");
  fetch("/pages/513947/navbar-teste")
    .then((response) => response.text())
    .then((html) => (container.innerHTML = html));
  const navbarJs = document.createElement("script");
  navbarJs.type = "text/javascript";
  navbarJs.src = "/assets/js/templates/teste/navBar.js";
  document.getElementsByTagName("body")[0].appendChild(navbarJs);
}

function renderFooterSection() {
  const container = document.getElementById("footerPage");
  fetch("/pages/513948/footer-teste")
    .then((response) => response.text())
    .then((html) => (container.innerHTML = html));
  const footerJs = document.createElement("script");
  footerJs.type = "text/javascript";
  footerJs.src = "/assets/js/templates/teste/footer.js";
  document.getElementsByTagName("body")[0].appendChild(footerJs);
}

// window.onload = function () {
//   renderFooterSection();
//   renderNavbarSection();
// };

window.addEventListener("DOMContentLoaded", function () {
  renderFooterSection();
  renderNavbarSection();
});
