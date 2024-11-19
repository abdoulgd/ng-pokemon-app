import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styles: ``
})
export class SearchPokemonComponent implements OnInit {
  // Recherche {..."a"...ab"..."abz"..."ab..."abc"...}
  searchTerms = new Subject<string>();
  // {pokemonList(a)...pokemonList(ab)...pokemonList(abc)...}
  pokemons$: Observable<Pokemon[]>;

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      // {...."ab"..."abz"."ab"...."abc"......}
      // attendre 300ms après chaque touche avant de faire la requête
      debounceTime(300), 
      // {......"ab"...."ab"...."abc"......}
      // ignorer la recherche en cours si c'est la même que la précédente
      distinctUntilChanged(),
      // {......"ab"..........."abc"......}
      // passer à la recherche suivante
      switchMap((term) => this.pokemonService.searchPokemonList(term)) 
      // {.....pokemonList(ab)............pokemonList(abc)......}
    )
  }

  search(term: string) {
    console.log('Terme recherché :', term);
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
