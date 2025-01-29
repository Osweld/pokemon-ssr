import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [{page: "1"},{page: "2"},{page: "3"},{page: "4"},{page: "5"},{page: "6"}]
    },
  },{
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${151}`)
  .then((res) => res.json());
      return pokemonNameList.results.map((pokemon: any) => ({id: pokemon.name}))
    }
  },{
    path: '**',
    renderMode: RenderMode.Prerender
  },
];
