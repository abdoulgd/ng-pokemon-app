import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { authGuard } from './app/auth.guard';
import { provideRouter, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonJsonServerService } from './app/pokemon-json-server.service';
import { PokemonService } from './app/pokemon.service';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, BrowserModule, bootstrapApplication } from '@angular/platform-browser';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import("./app/pokemon/pokemon.routes")
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import("./app/login/login.component").then(module => module.LoginComponent)
    },
    {
        path: '**',
        title: 'Page not found',
        loadComponent: () => import("./app/page-not-found/page-not-found.component").then(module => module.PageNotFoundComponent)
    }
];



bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule),
        provideClientHydration(),
        provideHttpClient(withFetch()),
        { provide: PokemonService, useClass: PokemonJsonServerService },
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));
