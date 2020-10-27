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
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();



function loopPokemonList(pokemon) {
  if (pokemon.height >= 2) {
    document.write("<p>" + pokemon.name + "(height: " + pokemon.height + "m) " + "- Wow, that's big" + "</p>");
  } else {
    document.write("<p>" + pokemon.name + "(height: " + pokemon.height + "m)" + "</p>");
  }
}
pokemonRepository.getAll().forEach(loopPokemonList);