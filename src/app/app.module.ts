import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SnotifyModule } from 'ng-snotify';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { WeatherModule } from './weather/weather/weather.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // SnotifyModule,
    BrowserModule,
    MaterialModule,
    SharedModule,
    WeatherModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
