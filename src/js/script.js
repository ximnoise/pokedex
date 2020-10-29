let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 
    'name' in pokemon && 
    'height' in pokemon && 
    'type' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('The pokemon you want to add is not a object type!');
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
    console.log(pokemon.name);
  }

  function addEvent(item, pokemon) {
    item.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then((response) => {
      return response.json();
    }).then((json) => {
      json.result.forEach((item) => {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch((e) => {
      console.error(e);
    })
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addEvent: addEvent,
    loadList: loadList
  };
})();

pokemonRepository.loadList().then(() => {
  // Now the data is loaded
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
