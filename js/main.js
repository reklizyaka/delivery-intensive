"use strict";

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");
const logInForm = document.querySelector("#logInForm");
const loginInput = document.querySelector("#login");
const userName = document.querySelector(".user-name");
const buttonOut = document.querySelector(".button-out");
const cardsRestaurants = document.querySelector(".cards-restaurants");
const containerPromo = document.querySelector(".container-promo");
const restaurants = document.querySelector(".restaurants");
const menu = document.querySelector(".menu");
const logo = document.querySelector(".logo");
const cardsMenu = document.querySelector(".cards-menu");

let login = localStorage.getItem("delivery-food");

function toggleModalAuth() {
  modalAuth.classList.toggle("is-open");
}
function toggleModal() {
  modal.classList.toggle("is-open");
}

function autorized() {
  function logOut() {
    login = null;
    localStorage.removeItem("delivery-food");
    buttonAuth.style.display = "";
    userName.style.display = "";
    buttonOut.style.display = "";
    buttonOut.removeEventListener("click", logOut);
    checkAuth();
  }
  console.log("auto");

  userName.textContent = login;
  buttonAuth.style.display = "none";
  userName.style.display = "inline";
  buttonOut.style.display = "block";

  buttonOut.addEventListener("click", logOut);
}

function notAutorized() {
  console.log("ne auto");

  function logIn(e) {
    e.preventDefault();
    if (loginInput.value === " " && loginInput.value) {
      login = loginInput.value;
      localStorage.setItem("delivery-food", login);
      toggleModalAuth();
      buttonAuth.removeEventListener("click", toggleModalAuth);
      closeAuth.removeEventListener("click", toggleModalAuth);
      logInForm.removeEventListener("submit", logIn);

      logInForm.reset();
      checkAuth();
    } else {
      alert("Введите логин!");
    }
  }

  buttonAuth.addEventListener("click", toggleModalAuth);
  closeAuth.addEventListener("click", toggleModalAuth);
  logInForm.addEventListener("submit", logIn);
}

function checkAuth() {
  if (login) {
    autorized();
  } else {
    notAutorized();
  }
}

checkAuth();

function createCardRestauranr() {
  const card = `
          <a class="card card-restaurant">
						<img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">Тануки</h3>
								<span class="card-tag tag">60 мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
									4.5
								</div>
								<div class="price">От 1 200 ₽</div>
								<div class="category">Суши, роллы</div>
							</div>
						</div>
          </a>`;

  cardsRestaurants.insertAdjacentHTML("beforeend", card);
}

createCardRestauranr();
createCardRestauranr();

function createCardGood() {
  const card = document.createElement("div");
  card.className = "card";

  card.insertAdjacentHTML(
    "beforeend",
    `
						<img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">Пицца Везувий</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
									«Халапенье», соус «Тобаско», томаты.
								</div>
							</div>
							<!-- /.card-info -->
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">545 ₽</strong>
							</div>
						</div>
  `
  );
  cardsMenu.insertAdjacentElement("beforeend", card);
}

function openGoods(e) {
  const target = e.target;

  const restaurant = target.closest(".card-restaurant");

  if (restaurant) {
    cardsMenu.textContent = "";
    containerPromo.classList.add("hide");
    restaurants.classList.add("hide");
    menu.classList.remove("hide");
  }
  createCardGood();
  createCardGood();
  createCardGood();
}

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener("click", openGoods);

logo.addEventListener("click", function () {
  containerPromo.classList.remove("hide");
  restaurants.classList.remove("hide");
  menu.classList.add("hide");
});
