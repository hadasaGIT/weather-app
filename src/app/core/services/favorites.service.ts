import { Injectable } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Location[] = [];

  addToFavorites(location: Location): void {
    this.favorites.push(location);
  }

  removeFromFavorites(locationKey: string): void {
    const cityToRemoveIndex = this.favorites.findIndex((favorite) => favorite.Key === locationKey);
    this.favorites.splice(cityToRemoveIndex, 1);
  }

  getFavorites(): Location[] {
    return this.favorites;
  }
}
