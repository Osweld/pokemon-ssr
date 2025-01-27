import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { POKEAPIResponse, Pokemon, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private httpClient = inject(HttpClient)

  public loadPage(page: number):Observable<SimplePokemon[]>{
    if(page !== 0){
      --page
    }
    page = Math.max(0, page)

    return this.httpClient.get<POKEAPIResponse>(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`)
    .pipe(
      map(resp =>{
        const simplePokemon:SimplePokemon[] = resp.results.map(pokemon =>({
          name:pokemon.name,
          id:(pokemon.url.split('/')[6])
        }))
        return simplePokemon
      }),
      //tap(console.log)
    )
  }


  public loadPokemon(id: string){
    return this.httpClient.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }



}
