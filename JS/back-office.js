const shopURL = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NzJlNzc5YzQ1ZjAwMTU2OWI0ZGQiLCJpYXQiOjE3Mjc0MjczMDMsImV4cCI6MTcyODYzNjkwM30.dSkoVoCBsJyB0HWvIcb6_HU4miXoppPW4xVu64gdNYs";

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

  fetch(shopURL, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-type": "application/json",
      Authorization: authorization,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Chitarra aggiunta allo Store!");
        creationForm.reset();
        //non faccio un return perché mi interessa  soltanto la creazione dell'elemento!
      } else {
        throw new Error("Errore nel caricamento del prodotto!");
      }
    })
    .cathch((err) => {
      console.log("Error", err);
    });
});
