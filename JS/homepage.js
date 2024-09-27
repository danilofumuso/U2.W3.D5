const shopURL = "https://striveschool-api.herokuapp.com/api/product/";
const authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NzJlNzc5YzQ1ZjAwMTU2OWI0ZGQiLCJpYXQiOjE3Mjc0MjczMDMsImV4cCI6MTcyODYzNjkwM30.dSkoVoCBsJyB0HWvIcb6_HU4miXoppPW4xVu64gdNYs";

const getItems = () => {
  fetch(shopURL, {
    headers: {
      Authorization: authorization,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nell'acquisizione dati");
      }
    })
    .then((guitars) => {
      console.log(guitars);
      guitars.forEach((guitar) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col", "col-12", "col-sm-6", "col-md-4", "col-lg-3", "my-5");
        newCol.innerHTML = `
        <div class="card">
            <img src="${guitar.imageUrl}" class="card-img-top object-fit-contain" alt="guitar picture">
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
               <h5 class="card-title fw-bold">${guitar.name}</h5>
               <p class="card-text fw-bold">${guitar.brand}</p>
               <p class="card-text ">${guitar.description}</p>
               </div>
               <div>
               <p class="card-text text-danger">${guitar.price} €</p>
               <a href="./details.html?guitarId=${guitar._id}" class="btn btn-outline-primary">Scopri di Più</a>
              </div>
            </div>
        </div>
        `;
        const row = document.getElementById("product-row");
        row.appendChild(newCol);
      });
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

getItems();
