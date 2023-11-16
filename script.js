let URI = "https://reqres.in/api/users?page=1";

function Connect(URI) {
  fetch(URI)
    .then((response) => {
      return response.json();
    })
    .then((Json) => {
      const fragment = document.createDocumentFragment();
      const placement = document.getElementById("list");
      let rowPlacement;
      let rowId = Json.data[0].id;
      // création des lignes toutes les 3 colonnes
      for (let member of Json.data) {
        const row = document.createElement("div");
        row.className = "row justify-content-between";
        const card = document.createElement("div");
        card.className = "card col bg-success-subtle m-5";
        card.id = member.id;
        switch (member.id) {
          case rowId:
            placement.appendChild(row);
            row.id = "row" + member.id;
            rowId = member.id;
            rowPlacement = document.getElementById(row.id);
            break;
          case rowId + 3:
            placement.appendChild(row);
            row.id = "row" + member.id;
            rowId = member.id;
            rowPlacement = document.getElementById(row.id);
            break;
        }
        // création des cartes individuelles
        card.innerHTML = `
        <img src=${member.avatar} class="rounded-circle position-absolute top-0 start-0 translate-middle">
        <div class='card-body px-0'>
          <h5 class='card-title text-end'>${member.last_name} ${member.first_name}</h5>
          <p class='card-text text-end mt-3'>${member.email}</p>
        </div>
        `;
        fragment.appendChild(card);

        if (member.id >= rowId && member.id <= rowId + 3) {
          rowPlacement.appendChild(fragment);
        }
      }

      //création des boutons de pages
      for (i = 1; i <= Json.total_pages; i++) {
        const pages = document.getElementById("pages");
        const button = document.createElement("button");
        pages.appendChild(button);
        button.textContent = i;
        button.className = "btn btn-warning m-1";
        button.id = "btn" + i;
        button.setAttribute("onClick", `PageChange(${i})`);
      }
    });
}

//fonction pour vider HTML puis changer de page
function PageChange(number) {
  let placement = document.getElementById("list");
  let pages = document.getElementById("pages");
  pageSelected = number;
  placement.innerHTML = "";
  pages.innerHTML = "";
  URI = "https://reqres.in/api/users?page=" + pageSelected;
  Connect(URI);
}

Connect(URI);
