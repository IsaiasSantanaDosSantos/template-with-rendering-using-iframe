// const pageLinksList = [
//   { page: "Home", id: "408098" },
//   { page: "Nossos Cursos", id: "408816" },
//   { page: "Quem Somos", id: "408817" },
//   { page: "Como Funciona", id: "408818" },
//   { page: "FAQ", id: "408819" },
//   { page: "Seja Parceiro", id: "408820" },
//   { page: "Contato", id: "408821" },
//   { page: "Curso", id: "408822" },
//   { page: "Política de Privacidade", id: "408823" },
//   { page: "Termos de Uso", id: "408824" },
//   { page: "Registre-se", id: "408825" },
//   { page: "Login", id: "408826" },
// ];
// let initUrl = "https://uniflor.edu.br"; //Tem 9 emphasis
// let menuInfo = "/api/getJson.aspx?type=menu";
// Navbar
//Create all menu informations
function fetchJsonNavbarLinks() {
  try {
    fetch(`${initUrl}${menuInfo}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        createNavBarInfo(json);
        //   getFooterInfo(json);
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
        linkToLogo.setAttribute("aria-label", `Acesse Home`);
        linkToLogo.setAttribute("href", `/page/${pageLinksList[i].id}/Home`);
      }
    }
    navbarImgBox.appendChild(linkToLogo);
    let logoImg = document.createElement("img");
    logoImg.setAttribute("src", `${initUrl + logoSite}`);
    logoImg.setAttribute("width", `160px`);
    logoImg.setAttribute("height", `59px`);
    logoImg.setAttribute("alt", "Logo image");
    linkToLogo.appendChild(logoImg);
    let hiddenLabel = document.createElement("span");
    hiddenLabel.style.cssText =
      "display: flex; overflow: hidden; width:0; height:0;";
    hiddenLabel.innerText = "Acessar Home";
    linkToLogo.appendChild(hiddenLabel);
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
        navbarLinks[e].setAttribute(
          "href",
          `/page/${pageLinksList[i].id}/${pageLinksList[i].page}`
        );
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
    coletaLeadLogin.setAttribute("href", `/page/${pageLinksList[i].id}/Login`);
  }
}
//Register button
let registerNavbarBtn = document.querySelector(".registerNavbarBtn");
for (let i = 0; i < pageLinksList.length; i++) {
  if (pageLinksList[i].page === "Registre-se") {
    registerNavbarBtn.setAttribute(
      "href",
      `/page/${pageLinksList[i].id}/Registre-se`
    ); //
  }
}
// End of Navbar
fetchJsonNavbarLinks();
