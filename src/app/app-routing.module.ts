import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesPage } from './weather/weather/pages/favorites/favorites.page';
import { SearchPage } from './weather/weather/pages/search/search.page';


const routes: Routes = [
  {
    path: 'search',
    component: SearchPage,
  },
  {
    path: 'search/:locationKey', 
    component: SearchPage,
  },
  {
    path: 'favorites',
    component: FavoritesPage,
  },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
