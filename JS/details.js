const shopURL = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NzJlNzc5YzQ1ZjAwMTU2OWI0ZGQiLCJpYXQiOjE3Mjc0MjczMDMsImV4cCI6MTcyODYzNjkwM30.dSkoVoCBsJyB0HWvIcb6_HU4miXoppPW4xVu64gdNYs";

const addressBarContent = new URLSearchParams(location.search); // questo prende tutti i parametri dalla barra degli elementi!
const guitarId = addressBarContent.get("guitarId"); //prende l'id dalla barra degli indirizzi prendendo il nome della stringa dall'href della a della card!

//recupero il singolo prodotto dal dataBase facendo una chiamata specifica!
const getGuitar = () => {
  fetch(shopURL + "/" + guitarId, {
    headers: {
      Authorization: authorization,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero del singolo prodotto");
      }
    })
    .then((guitar) => {
      const row = document.getElementById("product-row");
      const newCol = document.createElement("div");
      newCol.classList.add("col", "col-12", "col-md-6");
      newCol.innerHTML = `
        <div class="card mb-5 border-0 shadow detail">
            <img src="${guitar.imageUrl}" class="card-img-top object-fit-contain h-75" alt="guitar picture">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
               <h5 class="card-title fw-bold">${guitar.name}</h5>
               <p class="card-text fw-bold">${guitar.brand}</p>
               <p class="card-text ">${guitar.description}</p>
               </div>
               <div>
               <p class="card-text text-danger">${guitar.price} €</p>
               <a href="./homepage.html" class="btn btn-outline-primary">Torna alla Home</a>
               <button onclick="deleteProduct()" class="btn btn-outline-danger">Elimina Prodotto</button>
               <a href="./back-office.html?guitarId=${guitar._id}" class="btn btn-outline-warning">Modifica Prodotto</a> 
              </div>
            </div>
        </div>
        `;
      row.appendChild(newCol);
    })
    .catch((err) => {
      console.log("Errore", err);
    });
};

const deleteProduct = () => {
  fetch(shopURL + "/" + guitarId, {
    method: "DELETE",
    headers: {
      Authorization: authorization,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Prodotto ELIMINATO con successo!");
        location.assign("./homepage.html");
      } else {
        throw new Error("Errore nell'eliminazione del prodotto!");
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

getGuitar();
