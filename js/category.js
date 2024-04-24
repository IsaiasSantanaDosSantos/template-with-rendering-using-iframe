//Global variable
let siteProt = location.protocol + "//";
let siteHost = location.host;
const frontUrl = siteProt + siteHost;
let jsonFile = "/api/getJson.aspx?type=home";
let menuInfo = "/api/getJson.aspx?type=menu";
let jsonCategories = "/api/getJson.aspx?type=tutors_app_new";
let jsonSpecificCategory =
  "/api/getJson.aspx?type=courses_list_app&page_total=12&page=1&tutor_id=";

// let initUrl = frontUrl;  //No Grape devo descomentar essa variável

const categoriesBox = document.querySelector(".categoryNamesBox");
const categoriesCourseCardsBox = document.querySelector(
  ".coursesCategoriesCardsBox"
);
let categoryList = [];
let courseSpecificList = [];
let coursesCategoriesTitle = document.querySelector(".coursesCategoriesTitle");
let showMoreCourseBtn = document.querySelector(".showMoreCourses");
const categoryNamesList = document.querySelectorAll(".categoryName");
let APICategoryId;
let pageCounter = 1;

// let initUrl = 'https://euestudo.com.vc'; //No Grape devo Comentar essa variável //https://espg.com.br/
// let initUrl = 'https://catalogo.drmeducacao.com.br'; //No Grape devo Comentar essa variável //
// let initUrl = 'https://espg.com.br'; //No Grape devo Comentar essa variável //
// let initUrl = 'https://faculdadesucesso.edu.br'; //Tem 3 emphasis
let initUrl = "https://uniflor.edu.br"; //Tem 9 emphasis
// let initUrl = 'https://eadmovel.com.br';
// let initUrl = 'http://facigma.edu.br'; // SÓ ESSE ESTÁ DANDO ERRO! //
// let initUrl = 'https://reboucasdigital.com.br'; // SÓ ESSE ESTÁ DANDO ERRO! // /page/
// let initUrl = 'https://virtual.ajes.edu.br';

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
coursesCategoriesTitle.setAttribute("id", "courseSearch");
function scrollAndCenterElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const windowHeight = window.innerHeight;
    const elementHeight = element.offsetHeight;
    const scrollY = element.offsetTop - (windowHeight - elementHeight) / 2;

    window.scrollTo({
      top: scrollY,
      behavior: "smooth",
    });
  }
}

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
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === "Login") {
    coletaLeadLogin.setAttribute("href", pageLinksList[i].id);
  }
}
//Register button
let registerNavbarBtn = document.querySelector(".registerNavbarBtn");
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === "Registre-se") {
    registerNavbarBtn.setAttribute("href", pageLinksList[i].id);
  }
}
// End of Navbar

// Course categories
//Seach input
let seachInput = document.getElementById("courseName");
let seachInputIcon = document.querySelector(".seachInputIcon");
let textWarn = document.querySelector(".textWarn");
let backToStartLabel = document.querySelector(".backToStartLabel");
let backToStartBtn = document.querySelector(".backToStartBtn");
let closedBtn = document.querySelector(".closedBtn");
let seachIcon = document.querySelector(".seachInputIcon");
const coursesList = [];
let countSearchPage = 1;
let seachName;

closedBtn.addEventListener("click", () => {
  seachInput.value = "";
  textWarn.innerHTML = "";
});

// seachInput.addEventListener('input', () => {
//   if (seachInput.value.length > 2) {
//     backToStartBtn.style.display = 'flex';
//     backToStartLabel.innerHTML = seachInput.value;
//     textWarn.innerHTML = '';
//     textWarn.style.display = 'none';
//   }
// });
seachInput.addEventListener("input", () => {
  if (seachInput.value.length > 2) {
    textWarn.innerHTML = "";
    textWarn.style.display = "none";
  }
});

function createBackButtonSearch(seachName) {
  backToStartBtn.style.display = "flex";
  backToStartLabel.innerHTML = seachName;
  textWarn.innerHTML = "";
  textWarn.style.display = "none";
}
seachInput.addEventListener("blur", () => {
  if (seachInput.value.length < 3) {
    textWarn.innerHTML = "";
    textWarn.style.display = "none";
  }
});

seachInput.addEventListener("keyup", (e) => {
  seachName = seachInput.value;

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
      countSearchPage = 1;
      courseSpecificList = [];
      coursesCategoriesTitle.innerHTML = "Todas as categorias";
      categoryNamesList[0].classList.add("activedCategory");
      history.pushState(null, null, `/page/408816`);
      removeActivedClass(categoryList);
      resetSelector();
      scrollAndCenterElement("courseSearch");

      createBackButtonSearch(seachName);
      categoryList.forEach((e) => {
        e.classList.remove("activedCategory");
      });
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
    let showMoreCourses = document.querySelector(".showMoreCourses");
    if (showMoreCourses) showMoreCourses.remove();
    fecthSeachCourse(seachName);
    console.log(seachInput.value);
    seachInput.value = "";
    textWarn.innerHTML = "";
    coursesList.length = 0;
    countSearchPage = 1;
    courseSpecificList = [];
    coursesCategoriesTitle.innerHTML = "Todas as categorias";
    categoryNamesList[0].classList.add("activedCategory");
    history.pushState(null, null, `/page/408816`);
    console.log(categoryList.length);

    removeActivedClass(categoryList);
    resetSelector();
    scrollAndCenterElement("courseSearch");
    createBackButtonSearch(seachName);
    categoryList.forEach((e) => {
      e.classList.remove("activedCategory");
    });
  }
});

backToStartBtn.addEventListener("click", () => {
  let showMoreCourses = document.querySelector(".showMoreCourses");
  if (showMoreCourses) showMoreCourses.remove();
  categoriesCourseCardsBox.innerHTML = "";
  coursesList.length = 0;
  countSearchPage = 1;
  backToStartBtn.style.display = "none";
  location.href = "/page/408816";
});

function fecthSeachCourse(seachName) {
  try {
    let newPage = `${initUrl}/api/getJson.aspx?type=courses_list_app&page=${countSearchPage}&page_total=12&txt_search=${seachName}`;
    fetch(newPage)
      .then((resposta) => resposta.json())
      .then((json) => {
        categoriesCourseCardsBox.innerHTML = "";

        getSearchCourse(json);
      });
  } catch (e) {
    console.warn(e);
  }
}
function countNextPageOfCoursesFromSearchInput() {
  countSearchPage++;
  let searchString = document.querySelector(".backToStartLabel").textContent;

  fecthNewPageSeachCourse(searchString);
}

function fecthNewPageSeachCourse(searchString) {
  try {
    let newPage = `${initUrl}/api/getJson.aspx?type=courses_list_app&page=${countSearchPage}&page_total=12&txt_search=${searchString}`;
    fetch(newPage)
      .then((resposta) => resposta.json())
      .then((json) => {
        categoriesCourseCardsBox.innerHTML = "";
        console.log(newPage);
        getSearchCourse(json);
      });
  } catch (e) {
    console.warn(e);
  }
}

function fetchJsonProductCategoryList() {
  try {
    const reqCategory = `${initUrl}${jsonCategories}`;
    fetch(reqCategory)
      .then((answer) => answer.json())
      .then((json) => {
        getCourseCategoriesName(json);
        getCourseCategoriesCards(json);
        createSelectorOfOptions(json);
      });
  } catch (e) {
    console.warn(e);
  }
}
//Get type of fetch // categoryName
// let urlParams = window.location.search.substring(1).split('&');

let currentUrl =
  "https://catalogo.drmeducacao.com.br/pages/408816/Nossos-Cursos?categoryId=632520 ";

let urlParams = new URL(currentUrl).search.substring(1).split("&");
let urlParamArray = {};
for (let i = 0; i < urlParams.length; i++) {
  let param = urlParams[i].split("=");
  urlParamArray[param[0]] = param[1];
  urlCategoryId = urlParamArray["categoryId"];
  // urlThemeName = urlParamArray['txt_tema'];
  // urlTxtSearch = urlParamArray['txt_search'];
}
//Get category from URL //urlCategoryId = 1168149
function selectCategoryUrl(categoryList) {
  try {
    if (urlParamArray["categoryId"]) {
      categoryList.filter((e) => {
        if (urlCategoryId === e.id) {
          console.log("Selecionado: " + e.textContent);
          let categoryId = e.id;
          categoriesCourseCardsBox.innerHTML = "";
          categoryNamesList[0].classList.remove("activedCategory");
          console.log(categoryNamesList);
          categoryNamesList.forEach((e) =>
            e.classList.remove("activedCategory")
          );
          // e.classList.add('activedCategory');
          removeActivedClass(categoryList);
          coursesCategoriesTitle.innerHTML = e.textContent;
          courseSpecificList.length = 0;
          courseSpecificList = [];
          pageCounter = 1;
          //  history.pushState(
          //   null,
          //   null,
          //   `/page/408816/?categoryId=${categoryId}`
          // );
          fetchSpecificCategory(categoryId);
        } else {
          // e.classList.remove('activedCategory');
          // console.log(e.id + ' → ' + e.textContent);
        }
      });
    }
  } catch (e) {
    console.warn(e);
  }
}

function removeActivedClass(categoryList) {
  categoryList.forEach((e) => {
    if (e.id === urlParamArray["categoryId"]) {
      e.classList.add("activedCategory");
    } else {
      e.classList.remove("activedCategory");
    }
  });

  // const options = categorySelector.querySelectorAll('option');
  // options.forEach((option) => {
  //   if (option.value === urlParamArray['categoryId']) {
  //     option.selected = true;
  //   }
  // });
}

//End of get category from URL

function getCourseCategoriesName(json) {
  try {
    // console.log(json);
    // console.log(json.tutorsList.length);
    if (json.tutorsList) {
      for (let item = 0; item < json.tutorsList.length; item++) {
        let categoryId = json.tutorsList[item].id;
        let categoryName = json.tutorsList[item].name;

        //Create category names in the categories box
        let names = document.createElement("p");
        names.classList.add("categoryName");
        names.id = categoryId;
        names.innerHTML = categoryName;
        categoriesBox.appendChild(names);
        categoryList.push(names);
      }
    }
    showCoursesForCategory(categoryList);
    selectCategoryUrl(categoryList);

    if (!urlParamArray["categoryId"]) {
      getCategoryNames();
    }
  } catch (e) {
    console.warn(e);
  }
}

// Selector Options
const categorySelector = document.querySelector(
  '[data-selector="categorySelectorBox"]'
);
let categoryInJson;
function createSelectorOfOptions(json) {
  try {
    const selectorBox = document.querySelector(
      '[data-selector="categorySelectorBox"]'
    );
    // console.log(json);
    let modifyCategoryName;
    if (json.tutorsList) {
      for (let item = 0; item < json.tutorsList.length; item++) {
        let categoryId = json.tutorsList[item].id;
        let categoryName = json.tutorsList[item].name;
        categoryName.length >= 30
          ? (modifyCategoryName = `${categoryName.slice(0, 30)}...`)
          : (modifyCategoryName = categoryName);

        let option = document.createElement("option");
        option.setAttribute("data-selector-option", "selector-option");
        option.setAttribute("value", `${categoryId}`);
        option.classList.add("eachOption");
        option.innerHTML = modifyCategoryName;
        selectorBox.appendChild(option);
      }
    }
    const options = categorySelector.querySelectorAll("option");
    options.forEach((option) => {
      if (option.value === urlParamArray["categoryId"]) {
        option.selected = true;
      }
    });
    return (categoryInJson = json);
  } catch (e) {
    console.warn(e);
  }
}

// Selector logic
categorySelector.onchange = function () {
  let valueSelected = categorySelector.value;
  let textOfSelected = categorySelector.options[categorySelector.selectedIndex];
  let categorySelectedName = textOfSelected.textContent;
  let categoryId;
  for (let i = 0; i < categoryInJson.tutorsList.length; i++) {
    categoryId = categoryInJson.tutorsList[i].id;
    if (categoryId === valueSelected) {
      backToStartBtn.style.display = "none";
      categoriesCourseCardsBox.innerHTML = "";
      categoryNamesList[0].classList.remove("activedCategory");
      coursesCategoriesTitle.innerHTML = categorySelectedName;
      courseSpecificList.length = 0;
      courseSpecificList = [];
      pageCounter = 1;
      fetchSpecificCategory(categoryId);
    }
  }
};
function resetSelector() {
  categorySelector.selectedIndex = 0;
}
// End of Selector Options

function getCourseCategoriesCards(json) {
  try {
    // console.log(json);
    // console.log(json.tutorsList);
    if (json.tutorsList) {
      for (let item = 0; item < json.tutorsList.length; item++) {
        let categoryId = json.tutorsList[item].id;
        let categoryName = json.tutorsList[item].name;
        let categoryImg = json.tutorsList[item].img;

        //Create categories cards
        let categoryCard = document.createElement("div");
        categoryCard.classList.add("coursesCategoriesCard");
        categoriesCourseCardsBox.appendChild(categoryCard);

        //Create category card image box
        let imgBox = document.createElement("div");
        imgBox.classList.add("coursesCategoriesCardImg");
        categoryCard.appendChild(imgBox);

        //Create card image
        let cardImg = document.createElement("img");
        cardImg.classList.add("categoryCardImg");
        cardImg.dataset.id = categoryId; //MODIFIQUEI AQUI
        cardImg.setAttribute("src", `${initUrl}${categoryImg}`);
        cardImg.setAttribute("data-src", `${initUrl}${categoryImg}`);
        cardImg.setAttribute("loading", "lazy");
        cardImg.setAttribute("alt", "Image");
        cardImg.addEventListener("click", () => {
          //MODIFIQUEI AQUI
          showCoursesForCategory(categoryList);
        });
        imgBox.appendChild(cardImg);

        //Create category card content
        let contentBox = document.createElement("div");
        contentBox.classList.add("coursesCategoriesCardContent");
        categoryCard.appendChild(contentBox);

        //Get category name
        let title = document.createElement("p");
        title.classList.add("coursesCategoriesCardTitle");
        categoryName.length >= 90
          ? (title.innerHTML = `${categoryName.slice(0, 90)}...`)
          : (title.innerHTML = categoryName);
        contentBox.appendChild(title);

        //Get category link
        let categoryLink = document.createElement("p"); //MODIFIQUEI AQUI
        categoryLink.innerHTML = "Saiba mais →";
        categoryLink.classList.add("coursesCategoriesCardsLink");
        categoryLink.dataset.id = categoryId; //MODIFIQUEI AQUI
        categoryLink.id = categoryId;
        categoryLink.addEventListener("click", () => {
          showCoursesForCategory(categoryList);
        });
        contentBox.appendChild(categoryLink);
      }
    }
  } catch (e) {
    console.warn(e);
  }
}

//Get all category names
function getCategoryNames() {
  categoryNamesList[0].classList.add("activedCategory");
}

function showCoursesForCategory(categoryList) {
  document.addEventListener("click", (e) => {
    const elCkd = e.target;
    e.stopImmediatePropagation(); //MODIFIQUEI AQUI
    let elCkd_dataId = elCkd.getAttribute("data-id"); //MODIFIQUEI AQUI
    // Se usar dessa forma, dá pau ao selecionar uma categoria pelo menu... (ajuste futuro)

    for (let x = 0; x < categoryList.length; x++) {
      if (elCkd.id === categoryList[x].id) {
        categoryList.filter((e) => {
          let categoryName = e.innerText;
          let categoryId = e.id;
          if (e.id === categoryList[x].id) {
            backToStartBtn.style.display = "none";
            categoriesCourseCardsBox.innerHTML = "";
            categoryNamesList[0].classList.remove("activedCategory");
            e.classList.add("activedCategory");
            coursesCategoriesTitle.innerHTML = categoryName;
            courseSpecificList.length = 0;
            courseSpecificList = [];
            pageCounter = 1;
            fetchSpecificCategory(categoryId);
          } else {
            e.classList.remove("activedCategory");
          }
        });
      } else if (elCkd.id === "allCourses") {
        location.href = "/page/408816";
      }
    }
  });
}

function getSpecificCategory(json) {
  try {
    let stringTest =
      "Espec. em Gestão de Recursos Humanos com Ênfase em Treinamentos e Desenvolvimentodffvfdvdz fvfz vfzs";
    console.log(stringTest.length);
    console.log(json);
    if (json.coursesList === 0 || json.coursesList === false) {
      showMessageNoHavingCourse();
    }

    let APICoursesListSize = json.total;

    if (json.coursesList.course.length === undefined) {
      let curseId = json.coursesList.course.id;
      let curseImg = json.coursesList.course.img;
      let courseName = json.coursesList.course.title;
      let curseCategoryName = json.coursesList.course.categoria.name;
      // let curseCategoryId = json.coursesList.course.categoria.id;
      let ysnPacote = json.coursesList.course.ysnPacote;
      let linkDetailCoursePage;

      //Create guidance for the Course Details page
      for (let x = 0; x < pageLinksList.length; x++) {
        if (pageLinksList[x].page === "Curso") {
          linkDetailCoursePage = `${pageLinksList[x].id}?courseId=${curseId}&ysnPacote=${ysnPacote}`;
        }
      }

      const cardCourse = document.createElement("div");
      cardCourse.classList.add("coursesCategoriesCard");
      cardCourse.id = curseId;
      let modifyName;
      courseName.length >= 50
        ? (modifyName = `${courseName.slice(0, 50)}...`)
        : (modifyName = courseName);
      cardCourse.innerHTML = `
      <div class="coursesCategoriesCardImg">
         <a  href="${linkDetailCoursePage}" >
          <img
            class="categoryCardImg"
            src="${initUrl}${curseImg}"
            data-src="${initUrl}${curseImg}"
            loading="lazy"
            alt="Image"
          />
         </a>
        </div>
        <div class="coursesCategoriesCardContent">
          <p class="coursesCategoriesCardTitle">${modifyName}</p>
          <p class="coursesCategoriesCardCategory">${curseCategoryName}</p>
          <a href="${linkDetailCoursePage}"  class="coursesCategoriesCardsLink">Saiba mais →</a>
        </div>
      `;
      categoriesCourseCardsBox.appendChild(cardCourse);
      console.log(linkDetailCoursePage);

      courseSpecificList.push(cardCourse);
    } else if (json.coursesList.course.length > 1) {
      for (let cl = 0; cl < json.coursesList.course.length; cl++) {
        let curseId = json.coursesList.course[cl].id;
        let curseImg = json.coursesList.course[cl].img;
        let courseName = json.coursesList.course[cl].title;
        let curseCategoryName = json.coursesList.course[cl].categoria.name;
        // let curseCategoryId = json.coursesList.course[cl].categoria.id;
        let ysnPacote = json.coursesList.course[cl].ysnPacote;

        //Create guidance for the Course Details page
        for (let x = 0; x < pageLinksList.length; x++) {
          if (pageLinksList[x].page === "Curso") {
            linkDetailCoursePage = `${pageLinksList[x].id}?courseId=${curseId}&ysnPacote=${ysnPacote}`;
          }
        }

        const cardCourse = document.createElement("div");
        cardCourse.classList.add("coursesCategoriesCard");
        cardCourse.id = curseId;
        let modifyName;
        courseName.length >= 50
          ? (modifyName = `${courseName.slice(0, 50)}...`)
          : (modifyName = courseName);
        cardCourse.innerHTML = `
          <div class="coursesCategoriesCardImg">
            <a  href="${linkDetailCoursePage}" >
              <img
                class="categoryCardImg"
                src="${initUrl}${curseImg}"
                data-src="${initUrl}${curseImg}"
                loading="lazy"
                alt="Image"
              />
            </a>
            </div>
            <div class="coursesCategoriesCardContent">
              <p class="coursesCategoriesCardTitle">${modifyName}</p>
              <p class="coursesCategoriesCardCategory">${curseCategoryName}</p>
              <a href="${linkDetailCoursePage}" class="coursesCategoriesCardsLink">Saiba mais →</a>
            </div>
          `;
        categoriesCourseCardsBox.appendChild(cardCourse);
        // testFunction(cardCourse);
        courseSpecificList.push(cardCourse);
        console.log(courseSpecificList.length);
      }
    } else {
      let curseId = json.coursesList.course.id;
      let curseImg = json.coursesList.course.img;
      let courseName = json.coursesList.course.title;
      let curseCategoryName = json.coursesList.course.categoria.name;
      // let curseCategoryId = json.coursesList.course.categoria.id;
      let ysnPacote = json.coursesList.course.ysnPacote;

      //Create guidance for the Course Details page
      for (let x = 0; x < pageLinksList.length; x++) {
        if (pageLinksList[x].page === "Curso") {
          linkDetailCoursePage = `${pageLinksList[x].id}?courseId=${curseId}&ysnPacote=${ysnPacote}`;
        }
      }

      const cardCourse = document.createElement("div");
      cardCourse.classList.add("coursesCategoriesCard");
      cardCourse.id = curseId;
      let modifyName;
      courseName.length >= 50
        ? (modifyName = `${courseName.slice(0, 50)}...`)
        : (modifyName = courseName);
      cardCourse.innerHTML = `
          <div class="coursesCategoriesCardImg">
            <a  href="${linkDetailCoursePage}" >
              <img
                class="categoryCardImg"
                src="${initUrl}${curseImg}"
                data-src="${initUrl}${curseImg}"
                loading="lazy"
                alt="Image"
              />
            </a>
            </div>
            <div class="coursesCategoriesCardContent">
              <p class="coursesCategoriesCardTitle">${modifyName}</p>
              <p class="coursesCategoriesCardCategory">${curseCategoryName}</p>
              <a href="${linkDetailCoursePage}" class="coursesCategoriesCardsLink">Saiba mais →</a>
            </div>
          `;
      categoriesCourseCardsBox.appendChild(cardCourse);

      courseSpecificList.push(cardCourse);
    }
    // console.log(json);
    console.log(
      "json.coursesList.course.length → " + courseSpecificList.length
    );
    // console.log(json.coursesList);
    console.log("json.total  → " + json.total);

    if (courseSpecificList.length < APICoursesListSize) {
      showMoreCoursesButtonEvent();
    } else {
      showMoreCourseBtn.style.display = "none";
    }
  } catch (e) {
    console.warn(e);
  }
}

function getSearchCourse(json) {
  try {
    console.log(json);
    if (json.coursesList === 0 || json.coursesList === false) {
      showMessageNoHavingCourse();
    }

    let APICoursesListSize = json.total;

    if (json.coursesList.course.length === undefined) {
      let curseId = json.coursesList.course.id;
      let curseImg = json.coursesList.course.img;
      let courseName = json.coursesList.course.title;
      let curseCategoryName = json.coursesList.course.categoria.name;
      // let curseCategoryId = json.coursesList.course.categoria.id;
      let ysnPacote = json.coursesList.course.ysnPacote;
      let linkDetailCoursePage;

      //Create guidance for the Course Details page
      for (let x = 0; x < pageLinksList.length; x++) {
        if (pageLinksList[x].page === "Curso") {
          linkDetailCoursePage = `${pageLinksList[x].id}?courseId=${curseId}&ysnPacote=${ysnPacote}`;
        }
      }

      const cardCourse = document.createElement("div");
      cardCourse.classList.add("coursesCategoriesCard");
      cardCourse.id = curseId;
      cardCourse.innerHTML = `
      <div class="coursesCategoriesCardImg">
         <a  href="${linkDetailCoursePage}" >
          <img
            class="categoryCardImg"
            src="${initUrl}${curseImg}"
            data-src="${initUrl}${curseImg}"
            loading="lazy"
            alt="Image"
          />
         </a>
        </div>
        <div class="coursesCategoriesCardContent">
          <p class="coursesCategoriesCardTitle">${courseName}</p>
          <p class="coursesCategoriesCardCategory">${curseCategoryName}</p>
          <a href="${linkDetailCoursePage}"  class="coursesCategoriesCardsLink">Saiba mais →</a>
        </div>
      `;
      categoriesCourseCardsBox.appendChild(cardCourse);
      console.log(linkDetailCoursePage);

      courseSpecificList.push(cardCourse);
    } else if (json.coursesList.course.length > 1) {
      for (let cl = 0; cl < json.coursesList.course.length; cl++) {
        let curseId = json.coursesList.course[cl].id;
        let curseImg = json.coursesList.course[cl].img;
        let courseName = json.coursesList.course[cl].title;
        let curseCategoryName = json.coursesList.course[cl].categoria.name;
        // let curseCategoryId = json.coursesList.course[cl].categoria.id;
        let ysnPacote = json.coursesList.course[cl].ysnPacote;

        //Create guidance for the Course Details page
        for (let x = 0; x < pageLinksList.length; x++) {
          if (pageLinksList[x].page === "Curso") {
            linkDetailCoursePage = `${pageLinksList[x].id}?courseId=${curseId}&ysnPacote=${ysnPacote}`;
          }
        }

        const cardCourse = document.createElement("div");
        cardCourse.classList.add("coursesCategoriesCard");
        cardCourse.id = curseId;
        cardCourse.innerHTML = `
          <div class="coursesCategoriesCardImg">
            <a  href="${linkDetailCoursePage}" >
              <img
                class="categoryCardImg"
                src="${initUrl}${curseImg}"
                data-src="${initUrl}${curseImg}"
                loading="lazy"
                alt="Image"
              />
            </a>
            </div>
            <div class="coursesCategoriesCardContent">
              <p class="coursesCategoriesCardTitle">${courseName}</p>
              <p class="coursesCategoriesCardCategory">${curseCategoryName}</p>
              <a href="${linkDetailCoursePage}" class="coursesCategoriesCardsLink">Saiba mais →</a>
            </div>
          `;
        categoriesCourseCardsBox.appendChild(cardCourse);
        // testFunction(cardCourse);
        courseSpecificList.push(cardCourse);
        console.log(courseSpecificList.length);
      }
    } else {
      let curseId = json.coursesList.course.id;
      let curseImg = json.coursesList.course.img;
      let courseName = json.coursesList.course.title;
      let curseCategoryName = json.coursesList.course.categoria.name;
      // let curseCategoryId = json.coursesList.course.categoria.id;
      let ysnPacote = json.coursesList.course.ysnPacote;

      //Create guidance for the Course Details page
      for (let x = 0; x < pageLinksList.length; x++) {
        if (pageLinksList[x].page === "Curso") {
          linkDetailCoursePage = `${pageLinksList[x].id}?courseId=${curseId}&ysnPacote=${ysnPacote}`;
        }
      }

      const cardCourse = document.createElement("div");
      cardCourse.classList.add("coursesCategoriesCard");
      cardCourse.id = curseId;
      cardCourse.innerHTML = `
          <div class="coursesCategoriesCardImg">
            <a  href="${linkDetailCoursePage}" >
              <img
                class="categoryCardImg"
                src="${initUrl}${curseImg}"
                data-src="${initUrl}${curseImg}"
                loading="lazy"
                alt="Image"
              />
            </a>
            </div>
            <div class="coursesCategoriesCardContent">
              <p class="coursesCategoriesCardTitle">${courseName}</p>
              <p class="coursesCategoriesCardCategory">${curseCategoryName}</p>
              <a href="${linkDetailCoursePage}" class="coursesCategoriesCardsLink">Saiba mais →</a>
            </div>
          `;
      categoriesCourseCardsBox.appendChild(cardCourse);

      courseSpecificList.push(cardCourse);
    }
    // console.log(json);
    // console.log(
    //   'json.coursesList.course.length → ' + courseSpecificList.length
    // );
    // console.log(json.coursesList);
    // console.log('json.total  → ' + json.total);

    if (courseSpecificList.length < APICoursesListSize) {
      showMoreCoursesButtonEvent();
      // console.log('Local list is SMALLER then API list - 1');
    } else {
      showMoreCourseBtn.style.display = "none";
      // console.log('Local list is BIGGER then API list');
    }
  } catch (e) {
    console.warn(e);
  }
}
// console.log(categoryList.length);
//Show more button
function showMoreCoursesButtonEvent() {
  let box = document.querySelector(".coursesCategoriesContainer");
  showMoreCourseBtn.style.display = "block";
  box.appendChild(showMoreCourseBtn);

  if (arguments.callee.caller === getSpecificCategory) {
    showMoreCourseBtn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      fetchMoreSpecificCategory();
      console.log("Chamada por: getSpecificCategory");
    });
    // return;
  } else if (arguments.callee.caller === getSearchCourse) {
    showMoreCourseBtn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      countNextPageOfCoursesFromSearchInput();
      console.log("Chamada por: getSearchCourse");
    });
    // return;
  }
}

function fetchSpecificCategory(categoryId) {
  try {
    APICategoryId = categoryId;
    let urlSearch = initUrl + jsonSpecificCategory + categoryId;
    fetch(urlSearch)
      .then((answer) => answer.json())
      .then((json) => {
        courseSpecificList.length = 0;
        categoriesCourseCardsBox.innerHTML = "";
        getSpecificCategory(json);
        // console.log(json);
      });
  } catch (e) {
    console.warn(e);
  }
}

function fetchMoreSpecificCategory() {
  try {
    pageCounter++;
    let urlSearch = `${initUrl}/api/getJson.aspx?type=courses_list_app&page_total=12&page=${pageCounter}&tutor_id=${APICategoryId}`;

    console.log(urlSearch);
    console.log("Number page → " + pageCounter);
    fetch(urlSearch)
      .then((answer) => answer.json())
      .then((json) => {
        getSpecificCategory(json);
      });
  } catch (e) {
    console.warn(e);
  }
}
function showMessageNoHavingCourse() {
  let titleCategoryCourses = document.querySelector(".coursesCategoriesTitle");
  titleCategoryCourses.innerHTML = "Desculpe, ainda não temos o curso buscado.";
}

// End of Course categories

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

// $('.linksCreatedJs').remove();
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
      let howManySocialMedia = json.socialMedias.links.length;
      for (let i = 0; i < howManySocialMedia; i++) {
        let socialMediaName = json.socialMedias.links[i].icon;
        let socialMediaLink = document.createElement("a");
        socialMediaLink.setAttribute("href", json.socialMedias.links[i].href);
        socialMediaLink.setAttribute(
          "aria-label",
          `Acessar ${socialMediaName}`
        );
        socialMediaLink.setAttribute("target", "_blank");
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
        const iconHiddenText = document.createElement("span");
        iconHiddenText.style.cssText = `display: flex; overflow: hidden; width: 0; height: 0;`;
        iconHiddenText.textContent = `Acessar ${socialMediaName}`;
        socialMediaLink.appendChild(iconHiddenText);

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
        document.title = json.PortalEducacional;
      });
  } catch (e) {
    console.warn(e);
  }
}
// End Footer Section
/*


FUNÇÃO PARA SELECIONAR A CATEGORIA NO SELECTOR (test()) FUNCIONA NO NAGEGADOR, PRECISO FAZER FUNCIONAR POR AQUI.
ESSA SOLUÇÃO ABAIXO NÃO FUNCIONOU...

*/
// window.onload = function test() {
//   console.log('inicio');
//   const categorySelector = document.querySelector(
//     '[data-selector="categorySelectorBox"]'
//   );
//   const options = categorySelector.querySelectorAll('option');
//   options.forEach((option) => {
//     if (option.value === urlParamArray['categoryId']) {
//       option.selected = true;
//     }
//   });
//   console.log('fim');
// };
// document.addEventListener('load', test);

// // If reflesh the page
// if (
//   window.performance &&
//   window.performance.navigation.type ===
//     window.performance.navigation.TYPE_RELOAD
// ) {
//   for (let p = 0; p < pageLinksList.length; p++) {
//     if (pageLinksList[p].page === "Nossos Cursos") {
//       window.location.href = `/page/${pageLinksList[p].id}/${pageLinksList[p].page}`;
//     }
//   }
// }

//Call functions

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
    date_1.setAttribute("content", "20240209100137");
    const date_2 = document.createElement("meta");
    date_2.setAttribute("name", "publish-date");
    date_2.setAttribute("content", "2024-02-09T10:01:37Z");
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
    document.querySelector(".FooterEndDZM").setAttribute("width", "120");
    document.querySelector(".FooterEndDZM").setAttribute("height", "20");
    const appleStoreImg = document.querySelector(".appleStoreImg");
    const playStoreImg = document.querySelector(".playStoreImg");
    if (playStoreImg && appleStoreImg) {
      appleStoreImg.setAttribute("width", "180");
      appleStoreImg.setAttribute("height", "89.8");
      playStoreImg.setAttribute("width", "180");
      playStoreImg.setAttribute("height", "66");
    }
  } catch (error) {
    console.warn(error);
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
// The end SEO and PWA adjustiments null;

seoAdjustment();

fetchJsonNavbarLinks();
fetchMenuInfo();
fetchJsonProductCategoryList();
findElementsAndAddSeoAttributes();
