import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { LocationService } from 'src/app/core/services/location.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { Location } from 'src/app/shared/models/location.model';
import { Forecast, DailyForecast } from 'src/app/shared/models/forecast.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  searchInput = new FormControl();
  filteredOptions$: Observable<Location[]>;
  currentLocationObject: Location;
  currentWeatherObject: CurrentWeather;
  Valid: boolean = true;
  forecast: Forecast;
  sourceImg: string = '';
  isFavorite: boolean = false;
  isMetric = this._weatherService.isMetric;

  constructor(
    private _locationService: LocationService,
    private _weatherService: WeatherService,
    private _favoritesService: FavoritesService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.params.subscribe(
      (p) => {
        if (p.locationKey) {
          this.getLocationByKey(p.locationKey);
        } else {
          this.getLocationByKey('215854');
        }
      },
      (err) => {
        alert('oops' + err.message);
      }
    );
    this._weatherService.temperatureUnitChanged.subscribe((p) => {
      this.isMetric = this._weatherService.isMetric;
    });
  }

  keyPressAlpha(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (!/[a-zA-Z]/.test(inp)) {
      event.preventDefault();
    }
  }

  autoComplete() {
    this.filteredOptions$ = this._locationService.getAutocompleteLocation(
      this.searchInput.value
    );
    this.filteredOptions$.subscribe(
      (c) => {
        this.Valid = true;
      },
      (err) => {
        this.Valid = false;
        this.currentLocationObject = null;
        this.currentWeatherObject = null;
        alert('oops' + err);
      }
    );
  }
  getLocationByKey(keyLocation: string) {
    this._locationService.getLocationByKey(keyLocation).subscribe(
      (location) => {
        this.currentLocationObject = location;
        this.getCurrentWeather(this.currentLocationObject.Key);
      },
      (err) => {
        alert('oops' + err);
      }
    );
  }
  displayLocation(location: Location) {
    return location && location.LocalizedName ? location.LocalizedName : '';
  }

  getWeather() {
    this.currentLocationObject = this.searchInput.value;
    this.getCurrentWeather(this.currentLocationObject.Key);
  }
  getCurrentWeather(keyLocation: string) {
    this._weatherService.getCurrentWeather(keyLocation).subscribe(
      (weather) => {
        this.currentWeatherObject = weather[0];
        this.sourceImg =
          '../../../assets/icons/' +
          this.currentWeatherObject.WeatherIcon +
          '.png';
        this.getIsFavorite();
        this.getForecast();
      },
      (err) => {
        alert('oops' + err);
      }
    );
  }

  getIsFavorite() {
    this.isFavorite = this._favoritesService.IsFavorite(
      this.currentLocationObject.Key
    );
  }
  favorite() {
    if (this.isFavorite == false) {
      this._favoritesService.addToFavorites(this.currentLocationObject);
      this.isFavorite = true;
    } else {
      this._favoritesService.removeFromFavorites(
        this.currentLocationObject.Key
      );
      this.isFavorite = false;
    }
  }
  getForecast() {
    this._weatherService.getForecast(this.currentLocationObject.Key).subscribe(
      (weather) => (this.forecast = weather),
      (err) => {
        alert('oops' + err);
      }
    );
  }
  getSourceImg(day: DailyForecast): string {
    return '../../../assets/icons/' + day.Day.Icon + '.png';
  }
  convert(c: number): number {
    return c * 1.8 + 32;
  }
}
