let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, type: ['grass', 'poison'] },
    { name: "Ivysaur", height: 1, type: ['grass', 'poison'] },
    { name: "Venusaur", height: 2, type: ['grass', 'poison'] },
    { name: "Charmander", height: 0.6, type: ['fire'] },
    { name: "Charmeleon", height: 1.1, type: ['fire']},
    { name: "Charizard", height: 1.7, type: ['fire', 'flying'] }
  ];

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

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addEvent: addEvent
  };
})();

pokemonRepository.add({ name: 'Pikachu', height: 0.4, type: ['electric'] });

pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});
