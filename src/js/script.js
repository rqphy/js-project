// const $root = document.querySelector(".root");

// function createDiv(message, color, font) {
//   const newDiv = document.createElement("div");
//   const newContent = document.createTextNode(message);
//   newDiv.appendChild(newContent);
//   newDiv.classList.add(color);
//   newDiv.classList.add(font);
//   $root.appendChild(newDiv);
// }

// createDiv("Hello World!", "red", "Open-Sans");
document.addEventListener("DOMContentLoaded", function () {
  class Model {
    constructor() {
      this.pages = [
        {
          title: "Homepage",
          url: "/",
          background: "red",
        },
        {
          title: "Contact",
          url: "/contact",
          background: "green",
        },
        {
          title: "About",
          url: "/about",
          background: "yellow",
          image: true,
          image_src: "assets/javascript.png",
          // probleme entre parcel et le src
        },
      ];
    }

    getPageByUrl(url) {
      return this.pages.find((page) => page.url === url);
    }
  }

  class View {
    constructor(container) {
      this.container = document.querySelector(`.${container}`);
    }

    changeTitle(word) {
      this.container.innerHTML = word;
    }

    changeBackground(color) {
      this.container.style.background = color;
    }

    loadImage(image_src) {
      const image = document.createElement("img");
      image.setAttribute("src", image_src);
      this.container.appendChild(image);
    }
  }

  function controller() {
    const data = new Model();
    const currentPage = data.getPageByUrl("/about");

    const page = new View("root");
    page.changeTitle(currentPage.title);
    page.changeBackground(currentPage.background);

    if (currentPage.image) {
      page.loadImage(currentPage.image_src);
    }
  }

  controller();
});
