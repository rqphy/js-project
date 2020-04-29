const $root = document.querySelector(".root");

function createDiv(message, color, font) {
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode(message);
  newDiv.appendChild(newContent);
  newDiv.classList.add(color);
  newDiv.classList.add(font);
  $root.appendChild(newDiv);
}

createDiv("Hello World!", "red", "Open-Sans");
