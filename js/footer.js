//   const pageLinksList = [
//     { page: "Home", id: "408098" },
//     { page: "Nossos Cursos", id: "408816" },
//     { page: "Quem Somos", id: "408817" },
//     { page: "Como Funciona", id: "408818" },
//     { page: "FAQ", id: "408819" },
//     { page: "Seja Parceiro", id: "408820" },
//     { page: "Contato", id: "408821" },
//     { page: "Curso", id: "408822" },
//     { page: "Política de Privacidade", id: "408823" },
//     { page: "Termos de Uso", id: "408824" },
//     { page: "Registre-se", id: "408825" },
//     { page: "Login", id: "408826" },
//   ];
//   const navbarLinks = Array.prototype.slice.call(
//     document.querySelectorAll(".itemsMenuNavbar a")
//   );

//   // Footer Section

//   const socialMediaBox = document.querySelector(
//     ".footerSocialMediaIconBox"
//   );
//   const footerInfoBox = document.querySelector(".footerInfoBox");

//   // $('.linksCreatedJs').remove();
//   let footerLinkBox = document.createElement("div");
//   footerLinkBox.classList.add("linksCreatedJs");
//   footerInfoBox.appendChild(footerLinkBox);
//   let infoBoxLeftFooter = document.createElement("div");
//   infoBoxLeftFooter.classList.add("infoBoxLeftFooter");
//   footerLinkBox.appendChild(infoBoxLeftFooter);

//   serviceBox = document.createElement("div");
//   serviceBox.classList.add("serviceBox");
//   footerLinkBox.appendChild(serviceBox);
//   //Politic link
//   let footerPolicyLinks = document.createElement("a");
//   footerPolicyLinks.innerText = "Política e Privacidade";
//   for (let i = 0; i < pageLinksList.length; i++) {
//     if (pageLinksList[i].page === "Política de Privacidade") {
//       footerPolicyLinks.setAttribute(
//         "href",
//         `/page/${pageLinksList[i].id}/Política-Privacidade`
//       );
//       footerPolicyLinks.setAttribute(
//         "aria-label",
//         footerPolicyLinks.textContent
//       );
//     }
//   }
//   footerPolicyLinks.classList.add("OurCoursesLinks");
//   serviceBox.appendChild(footerPolicyLinks);
//Use terms link
//   let footerUseTermsLink = document.createElement("a");
//   footerUseTermsLink.innerText = "Termos de Uso";
//   for (let i = 0; i < pageLinksList.length; i++) {
//     if (pageLinksList[i].page === "Termos de Uso") {
//       footerUseTermsLink.setAttribute(
//         "href",
//         `/page/${pageLinksList[i].id}/Termos-Uso`
//       );
//       footerUseTermsLink.setAttribute(
//         "aria-label",
//         footerUseTermsLink.textContent
//       );
//     }
//   }
//   footerUseTermsLink.classList.add("OurCoursesLinks");
//   serviceBox.appendChild(footerUseTermsLink);
//navbarLinks
//   try {
//     for (let i = 0; i < pageLinksList.length; i++) {
//       for (let e = 0; e < navbarLinks.length; e++) {
//         if (pageLinksList[i].page === navbarLinks[e].textContent) {
//           let links = navbarLinks[e].textContent;
//           let navBarCopy = document.createElement("a");
//           navBarCopy.innerHTML = links;
//           navBarCopy.setAttribute("href", `/page/${pageLinksList[i].id}`);
//           navBarCopy.setAttribute("aria-label", links);
//           infoBoxLeftFooter.appendChild(navBarCopy);
//         }
//       }
//     }
//   } catch (e) {
//     console.warn(e);
//   }

//Footer logo
// let initUrl = "https://uniflor.edu.br"; //Tem 9 emphasis
// let menuInfo = "/api/getJson.aspx?type=menu";
// let jsonFile = "/api/getJson.aspx?type=home";
const socialMediaBox = document.querySelector(".footerSocialMediaIconBox");
const logoFooterBox = document.querySelector(".footerEnd");

function getFooterInfo(json) {
  try {
    let logoSite = json.logo;
    let linkToLogo = document.createElement("a");
    //   for (let i = 0; i < pageLinksList.length; i++) {
    //     if (pageLinksList[i].page === "Home") {
    //     }
    //   }
    linkToLogo.setAttribute("aria-label", "Acessar Home");
    linkToLogo.setAttribute("href", `/`);
    logoFooterBox.prepend(linkToLogo);
    let logoImg = document.createElement("img");
    logoImg.setAttribute("src", `${initUrl + logoSite}`);
    logoImg.setAttribute("data-src", `${initUrl + logoSite}`);
    logoImg.setAttribute("loading", `lazy`);
    logoImg.setAttribute("width", `162px`);
    logoImg.setAttribute("height", `60px`);
    logoImg.setAttribute("alt", "Logo image");
    linkToLogo.appendChild(logoImg);
    let hiddenText = document.createElement("span");
    hiddenText.innerText = "Acessar Home";
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
      });
  } catch (e) {
    console.warn(e);
  }
}

function fetchJsonNavbarLinks() {
  try {
    fetch(`${initUrl}${menuInfo}`)
      .then((resposta) => resposta.json())
      .then((json) => {
        getFooterInfo(json);
      });
  } catch (e) {
    console.warn(e);
  }
}

fetchMenuInfo();
fetchJsonNavbarLinks();
// End Footer Section
