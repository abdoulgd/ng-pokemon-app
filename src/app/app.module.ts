import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonModule } from './pokemon/pokemon.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { PokemonService } from './pokemon.service';
import { PokemonJsonServerService } from './pokemon-json-server.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PokemonModule, // attention à l'ordre d'import, PokemonModule doit être importé avant AppRoutingModule
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    { provide: PokemonService, useClass: PokemonJsonServerService }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
