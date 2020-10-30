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

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let listItemButton = document.createElement("button");
  
    listItemButton.classList.add("button-class");
    listItemButton.innerText = pokemon.name;
    
    pokemonList.appendChild(listItem);
    listItem.appendChild(listItemButton);
    addEvent(listItemButton, pokemon);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      console.log(pokemon);
    });
  }

  function addEvent(item, pokemon) {
    item.addEventListener("click", () => {
      showDetails(pokemon);
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

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addEvent: addEvent,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };
})();

pokemonRepository.loadList().then(() => {
  // Now the data is loaded
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
