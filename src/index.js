import "./index.html";
import "./index.scss";

const categoryBtns = document.querySelectorAll(".category-btn");
const specInputs = document.querySelectorAll(".add-specification__input");
const submitInputBtns = document.querySelectorAll(
  ".add-specification__submit-btn"
);
const specLists = document.querySelectorAll(".specifications__list");

let inputValue = "";

for (let btn of categoryBtns) {
  btn.addEventListener("click", (event) => {
    for (let btn of categoryBtns) {
      btn.classList.remove("category-btn_active");
    }

    btn.classList.add("category-btn_active");

    showProduct(event.target.dataset.product);
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth <= 800) {
    toggleMobileBtns();
  } else {
    toggleDesktopBtns();
  }
});

for (let input of specInputs) {
  input.addEventListener("change", (event) => {
    inputValue = event.target.value;
  });
}

for (let btn of submitInputBtns) {
  btn.addEventListener("click", (event) => {
    const listItem = document.createElement("li");

    listItem.classList.add("specifications__item");

    listItem.insertAdjacentText("beforeend", inputValue);

    for (let list of specLists) {
      if (
        list.dataset.product === event.target.dataset.product &&
        inputValue !== ""
      ) {
        list.insertAdjacentElement("beforeend", listItem);

        if (list.childNodes.length % 2 === 0) {
          let maxHeight = parseInt(window.getComputedStyle(list).maxHeight);
          list.style.maxHeight = `${(maxHeight += 40)}px`;
        }
      }
    }
  });
}

function toggleMobileBtns() {
  const btns = document.querySelectorAll(".category-btn");
  const products = document.querySelectorAll(".product-card");

  for (let btn of btns) {
    btn.remove();
  }

  for (let i = 0; i < products.length; i++) {
    products[i].insertAdjacentElement("beforebegin", btns[i]);
  }
}

function toggleDesktopBtns() {
  const categoryBtnsContainer = document.querySelector(".category-buttons");
  const btns = document.querySelectorAll(".category-btn");

  for (let btn of btns) {
    btn.remove();
  }

  for (let btn of btns) {
    categoryBtnsContainer.insertAdjacentElement("beforeend", btn);
  }
}

function showProduct(str) {
  const products = document.querySelectorAll(".product-card");

  products.forEach((prod) => {
    if (prod.dataset.product === str) {
      prod.style.display = "block";
      prod.classList.add("product-card_toggled");
      return;
    }

    if (prod.dataset.product !== str) {
      prod.classList.remove("product-card_toggled");
      prod.style.display = "none";
      return;
    }
  });
}

categoryBtns[0].classList.add("category-btn_active");

if (window.innerWidth <= 800) {
  toggleMobileBtns();
} else {
  toggleDesktopBtns();
}

showProduct("male-bike");
