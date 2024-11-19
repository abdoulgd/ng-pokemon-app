import { Pokemon } from './pokemon/pokemon';
import { Observable } from 'rxjs';

export abstract class PokemonService {

  abstract getPokemonList(): Observable<Pokemon[]>;
  abstract getPokemonById(id: number): Observable<Pokemon>;
  abstract updatePokemon(pokemon: Pokemon): Observable<Pokemon>;
  abstract deletePokemon(pokemonId: number): Observable<void>;
  abstract addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon>;
  abstract getPokemonTypeList(): string[];
  abstract searchPokemonList(term: string): Observable<Pokemon[]>;
}
