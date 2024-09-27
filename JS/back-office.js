const shopURL = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NzJlNzc5YzQ1ZjAwMTU2OWI0ZGQiLCJpYXQiOjE3Mjc0MjczMDMsImV4cCI6MTcyODYzNjkwM30.dSkoVoCBsJyB0HWvIcb6_HU4miXoppPW4xVu64gdNYs";

//do la logica al bottone di modifica nel backoffice
const addressBarContent = new URLSearchParams(location.search);
const guitarId = addressBarContent.get("guitarId");

if (guitarId) {
  //se apro backoffice con il parametro del prodotto,
  //vado in modalità modifica e quindi precompilo il form con le info del prodotto che richiamo dal dataBase
  fetch(shopURL + "/" + guitarId, {
    headers: {
      Authorization: authorization,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero del prodotto da modificare");
      }
    })
    .then((guitar) => {
      const nameInput = document.getElementById("name");
      const descriptionInput = document.getElementById("description");
      const brandInput = document.getElementById("brand");
      const imageUrlInput = document.getElementById("imageUrl");
      const priceInput = document.getElementById("price");

      nameInput.value = guitar.name;
      descriptionInput.value = guitar.description;
      brandInput.value = guitar.brand;
      imageUrlInput.value = guitar.imageUrl;
      priceInput.value = guitar.price;

      const modifierButton = document.querySelector("form button");
      modifierButton.innerText = "Modifica Prodotto";
      modifierButton.classList.add("btn-outline-warning");
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
}

//fase iniziale in cui creiamo i prodotti dai valori degli input del form!
class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const creationForm = document.getElementById("creation-form");
creationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = document.getElementById("price").value;

  const product = new Product(name, description, brand, imageUrl, price);

  let methodToUse;
  if (guitarId) {
    methodToUse = "PUT";
  } else {
    methodToUse = "POST";
  }

  let urlToUse;
  if (guitarId) {
    urlToUse = shopURL + "/" + guitarId;
  } else {
    urlToUse = shopURL;
  }

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(product),
    headers: {
      "Content-type": "application/json",
      Authorization: authorization,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(guitarId ? "Prodotto Modificato" : "Chitarra aggiunta allo Store!");
        if (!guitarId) {
          creationForm.reset();
        } else {
          location.assign("./homepage.html");
        }
        //non faccio un return perché mi interessa  soltanto la creazione dell'elemento!
      } else {
        throw new Error("Errore nel caricamento del prodotto!");
      }
    })
    .cathch((err) => {
      console.log("Error", err);
    });
});
