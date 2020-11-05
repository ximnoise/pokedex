let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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

  // Creates a list with buttons
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let listItemButton = document.createElement("button");

    listItemButton.classList.add("btn", "btn-secondary", "btn-block");
    listItemButton.setAttribute("data-target", "#pokedexmodal");
    listItemButton.setAttribute("data-toggle", "modal");
    listItemButton.setAttribute("data-keyboard", true);
    listItemButton.innerText = pokemon.name;

    pokemonList.appendChild(listItem);
    listItem.appendChild(listItemButton);

    listItemButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  // Show the pokemon's details in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon);
    });
  }

  // Fetches pokemon information from the API
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
    });
  }

  // Fetches pokemon details from the API
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
      item.types = [];
      for (let i = 0; i < details.types.length; i++) {
        item.types.push(' ' + details.types[i].type.name);
      }
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

  // Creates the modal
  function showModal(text) {
    // Clear all existing modal content
    let modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = "";

    // Define the title of the modal
    let modalTitle = document.querySelector(".modal-title");
    modalTitle.innerHTML = text.name;

    // Define elements of the pokemon modal
    let imgElement = document.createElement("img");
    imgElement.src = text.imageUrl;

    let heightElement = document.createElement("p");
    heightElement.innerText = `Height: ${text.height}m`;

    let weightElement = document.createElement("p");
    weightElement.innerText = `Weight: ${text.weight}kg`;

    let typesElement = document.createElement("p");
    typesElement.innerText = `Types: ${text.types}`;

    modalBody.append(imgElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(typesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(() => {
  // Now the data is loaded
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
