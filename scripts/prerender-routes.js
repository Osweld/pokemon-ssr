const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 8;

(async () => {
  const fs = require("fs");

  const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  let fileContent = pokemonsIds.map((id) => `/pokemon/${id}`).join("\n");
  fileContent += "\n";
  const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
  fileContent += pages.map((page) => `/pokemons/page/${page}`).join("\n");


  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
  .then((res) => res.json());

  fileContent += "\n";

  fileContent += pokemonNameList.results.map((pokemon) => `/pokemon/${pokemon.name}`).join("\n");


  fs.writeFileSync("routes.txt", fileContent);

  console.log("Prerender routes generated");
})();
