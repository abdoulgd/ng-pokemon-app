import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Pokemon } from './pokemon/pokemon';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonJsonServerService implements PokemonService {
  private POKEMON_API_URL = 'http://localhost:3000/pokemons';  // URL de JSON Server

  constructor(private http: HttpClient) { }

  // Méthode privée pour gérer les erreurs
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue:', error);
    return throwError(() => new Error('Erreur de communication avec l\'API'));
  }

  private log(response: any) {
    console.table(response);
  }

  //Retourne la liste des pokémons
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.POKEMON_API_URL).pipe(
      tap((response) => this.log(response)),
      catchError(this.handleError.bind(this))
    );
  }

  //Retourne le pokémon avec l'identifiant passé en paramètre
  getPokemonById(pokemonId: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.POKEMON_API_URL}/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError(this.handleError.bind(this))
    );
  }

  //Recherche un pokemon
  searchPokemonList(term: string): Observable<Pokemon[]> {
    if (term.trim().length <= 1) {
      return of([]);
    }
    
    const url = `${this.POKEMON_API_URL}?q=${term}`;
    return this.http.get<Pokemon[]>(url).pipe(
      tap((response) => this.log(response)),
      catchError(() => this.handleError([]))
    );
  }

  // Mise à jour du pokémon passé en paramètre et qui existe déjà
  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${this.POKEMON_API_URL}/${pokemon.id}`, pokemon).pipe(
      tap((response) => this.log(response)),
      catchError(this.handleError.bind(this))
    );
  }    

  // Ajout d'un nouveau pokémon
  addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.POKEMON_API_URL, pokemon).pipe(
      tap((response) => this.log(response)),
      catchError(this.handleError.bind(this))
    );
  }

  // Suppression du pokémon avec l'identifiant passé en paramètre
  deletePokemon(pokemonId: number): Observable<void> {
    return this.http.delete<void>(`${this.POKEMON_API_URL}/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError(this.handleError.bind(this))
    );
  }

  // Retourne la liste des types valides pour un pokémon.
  getPokemonTypeList(): string[] {
    return [
      'Plante', 
      'Feu', 
      'Eau', 
      'Insecte', 
      'Normal', 
      'Electrik', 
      'Poison', 
      'Fée', 
      'Vol', 
      'Combat', 
      'Psy'
    ];
  }
}
