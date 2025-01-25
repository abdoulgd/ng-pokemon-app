import { Routes } from "@angular/router";
import { Pokemon } from "./pokemon";
import { PokemonService } from "../pokemon.service";
import { PokemonJsonServerService } from "../pokemon-json-server.service";

export default [{
    path: '',
    providers: [ /*PokemonService ou alors*/ PokemonJsonServerService], // injecter le service dans le module
    children: [
        { 
            path: 'edit/pokemon/:id',
            loadComponent: () => import('./edit-pokemon/edit-pokemon.component').then(module => module.EditPokemonComponent)
        },
        { 
            path: 'pokemon/add',
            title: 'Add Pokemon',
            loadComponent: () => import('./add-pokemon/add-pokemon.component').then(module => module.AddPokemonComponent)
        },
        { 
            path: 'pokemons',
            title: 'Pokedex',
            loadComponent: () => import('./list-pokemon/list-pokemon.component').then(module => module.ListPokemonComponent)
        },
        { 
            path: 'pokemon/:id', 
            loadComponent: () => import('./detail-pokemon/detail-pokemon.component').then(module => module.DetailPokemonComponent)
        }
    ]
}] as Routes;