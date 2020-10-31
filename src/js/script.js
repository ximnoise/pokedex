let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

  function add(pokemon) {
    if (typeof pokemon === "object" &&
    "name" in pokemon &&
    "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("The pokemon you want to add is not a object type!");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let listItemButton = document.createElement("button");

    listItemButton.classList.add("button-class");
    listItemButton.classList.add("#show-modal");
    listItemButton.innerText = pokemon.name;

    pokemonList.appendChild(listItem);
    listItem.appendChild(listItemButton);
    addEvent(listItemButton, pokemon);
  }

  function addEvent(item, pokemon) {
    item.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon.name, pokemon.height, pokemon.weight, pokemon.types, pokemon.imageUrl);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then((response) => {
      return response.json();
    }).then((json) => {
      json.results.forEach((item) => {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        hideLoadingMessage();
      });
    }).catch((e) => {
      hideLoadingMessage();
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then((response) => {
      return response.json();
    }).then((details) => {
      // Now add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      hideLoadingMessage();
    }).catch((e) => {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showLoadingMessage() {
    let message = document.querySelector(".message");
    message.classList.remove("hidden");
  }

  function hideLoadingMessage() {
    let message = document.querySelector(".message");
    message.classList.add("hidden");
  }

  function showModal(title, height, weight, types, img) {
    //Clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement("div");
    modal.classList.add("modal");

    //Add new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "X";
    closeButtonElement.addEventListener("click", hideModal);

    let imgElement = document.createElement("img");
    imgElement.src = img;

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let lineElement = document.createElement("hr");

    let heightElement = document.createElement("p");
    heightElement.innerText = `Height: ${height}m`;

    let weightElement = document.createElement("p");
    weightElement.innerText = `Weight: ${weight}kg`;

    let typeElement = document.createElement("p");
    typeElement.classList.add("f-right");
    if (types.length > 1) {
      typeElement.innerText = `Types: ${types[0].type.name}, ${types[1].type.name}`;
    } else {
      typeElement.innerText = `Types: ${types[0].type.name}`;
    }

    modalContainer.appendChild(modal);
    modal.appendChild(closeButtonElement);
    modal.appendChild(imgElement);
    modal.appendChild(titleElement);
    modal.appendChild(lineElement);
    modal.appendChild(heightElement);
    modal.appendChild(typeElement);
    modal.appendChild(weightElement);


    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  //Close Modal with Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  //Close Modal by clicking outside
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addEvent: addEvent,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showModal: showModal,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(() => {
  // Now the data is loaded
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
