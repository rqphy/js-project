import Cookies from "js-cookie";
import Granim from "granim";

document.addEventListener("DOMContentLoaded", function () {
  class Model {
    constructor() {
      this.pages = [
        {
          title: "Homepage",
          url: "#",
          background: "red",
          content: `
          <canvas id="granim-canvas"></canvas>
          <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nostrum quidem sequi aperiam numquam minima possimus? Atque possimus molestiae libero, voluptas quidem architecto facilis vero delectus nihil provident tempora velit.
          <ul>
          <li>lorem ipsum</li>
          <li>dolor sit</li>
          <li>amet consectetur</li>
          </ul>
          </div>
					`,
          dynamisme: () => {
            const lis = document.querySelectorAll("li");
            console.log(Cookies.get("name"));

            const granimInstance = new Granim({
              element: "#granim-canvas",
              name: "granim",
              opacity: [1, 1],
              states: {
                "default-state": {
                  gradients: [
                    ["#834D9B", "#D04ED6"],
                    ["#1CD8D2", "#93EDC7"],
                  ],
                },
              },
            });

            function toUpper(element) {
              element.innerText = element.innerText.toUpperCase();
            }

            lis.forEach((li) => {
              toUpper(li);
            });
          },
        },
        {
          title: "Contact",
          url: "#contact",
          background: "green",
          form: true,
        },
        {
          title: "Test",
          url: "#test",
          background: "purple",
          content: `
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nostrum quidem sequi aperiam numquam minima possimus? Atque possimus molestiae libero, voluptas quidem architecto facilis vero delectus nihil provident tempora velit.
							<ul>
								<li>lorem ipsum</li>
								<li>dolor sit</li>
								<li>amet consectetur</li>
							</ul>
						</div>
						<div class="parallax-container">
							<div class="parallax">

							</div>
						</div>
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nostrum quidem sequi aperiam numquam minima possimus? Atque possimus molestiae libero, voluptas quidem architecto facilis vero delectus nihil provident tempora velit.
							<ul>
								<li>lorem ipsum</li>
								<li>dolor sit</li>
								<li>amet consectetur</li>
							</ul>
						</div>
					`,
          dynamisme: () => {
            console.log("test1");

            window.onscroll = (e) => {
              let scrollTop = e.target.scrollingElement.scrollTop;

              console.log(scrollTop);

              document.querySelector(
                ".parallax"
              ).style.backgroundPosition = `center calc(50% - ${
                scrollTop / 2
              }px)`;
            };
          },
        },
        {
          title: "Test2",
          url: "#test2",
          background: "cyan",
          content: `
          <section class="test2">
            <div class="test2__content">
              <h2 class="test2__title">Let's try something</h2>
              <p class="test2__description">Here goes the description, Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nostrum quidem sequi aperiam numquam minima possimus? Atque possimus molestiae libero, voluptas quidem architecto facilis vero delectus nihil provident tempora velit.
              </p>
            </div>
          </section>
          `,
          dynamisme: () => {
            console.log("test2");

            const $content = document.querySelector(".test2__content");
            console.log($content);

            window.onscroll = () => {
              const scrollValue = window.pageYOffset;
              $content.style.transform = `skewX(${scrollValue}deg)`;
            };
          },
        },
      ];
    }

    getPageByUrl(url) {
      return this.pages.find((page) => page.url == url);
    }
  }

  class View {
    constructor(pages) {
      this.container = document.querySelector(".container");
      this.container.innerHTML = "";
      this.addHeader(pages);
    }

    run(dynamisme) {
      dynamisme();
    }

    addContent(content) {
      const contentContainer = document.createElement("div");
      contentContainer.classList.add("content");
      contentContainer.innerHTML = content;

      this.container.appendChild(contentContainer);
    }

    addHeader(pages) {
      pages.forEach((page) => {
        const button = document.createElement("button");

        button.innerText = page.title;

        this.container.appendChild(button);

        button.addEventListener("click", () => {
          location.hash = page.url;
        });
      });
    }

    changeTitle(text) {
      const title = document.createElement("h1");

      title.innerText = text;

      this.container.appendChild(title);
    }

    changeBackground(color) {
      this.container.style.background = color;
    }

    addForm() {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.classList.add("input-text");

      this.container.appendChild(input);
    }
  }

  function controller() {
    let data = new Model();

    const currentPage = data.getPageByUrl(location.hash || "#");

    let page = new View(data.pages);
    page.changeTitle(currentPage.title);
    page.changeBackground(currentPage.background);

    if (currentPage.content) {
      page.addContent(currentPage.content);
    }

    if (typeof currentPage.dynamisme === "function") {
      page.run(currentPage.dynamisme);
    }

    if (currentPage.form) {
      page.addForm();
    }
  }

  window.addEventListener("hashchange", () => {
    controller();
  });

  controller();
});
