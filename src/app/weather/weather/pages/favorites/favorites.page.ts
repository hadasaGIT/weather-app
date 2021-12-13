import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { Location } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {
  favorites: Location[];
  currentWeatherObject: CurrentWeather;
  isMetric = this._weatherService.isMetric;
  weatherArr: CurrentWeather[] = [];

  ngOnInit() {
    this.getFavoritesList();
    this._weatherService.temperatureUnitChanged.subscribe((p) => {
      this.isMetric = this._weatherService.isMetric;
    });
    this.getCurrentWeathers();
  }
  constructor(
    private _favoritesService: FavoritesService,
    private _weatherService: WeatherService,
    private _snackBar: MatSnackBar
  ) {}
  getFavoritesList() {
    this.favorites = this._favoritesService.getFavorites();
  }
  removeFromFavorites(locationKey: string) {
    this._favoritesService.removeFromFavorites(locationKey);
    this._snackBar.open('Location deleted successfully!!', 'x');
  }
  isFavorite(locationKey: string): boolean {
    return this._favoritesService.IsFavorite(locationKey);
  }
  getCurrentWeathers() {
    this.favorites.forEach((l) => {
      this._weatherService
        .getCurrentWeather(l.Key)
        .subscribe((currentWeather) => {
          this.weatherArr.push(currentWeather[0]);
        });
    });
  }
  getIndex(locationKey: string) {
    return this.favorites.findIndex((favorite) => favorite.Key === locationKey);
  }
}
