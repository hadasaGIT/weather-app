import { Temperature } from "./temperature.model";

export type Forecast = {
    Headline: {
        EffectiveDate: string,
        EffectiveEpochDate: Number,
        Severity: Number,
        Text: string,
        Category: string,
        EndDate: string,
        EndEpochDate: Number,
        MobileLink: string,
        Link: string,
    },
    DailyForecasts: DailyForecast[],
};

export type DailyForecast = {
  Date: string,
  EpochDate: Number,
  Temperature: {
    Minimum: Temperature,
    Maximum: Temperature,
  },
  Day: WeatherDescription,
  Night: WeatherDescription,
  Sources: string[],
  MobileLink: string,
  Link: string,
};

type WeatherDescription = {
  Icon: Number,
  IconPhrase: string,
  HasPrecipitation: boolean,
  PrecipitationType?: string,
  PrecipitationIntensity?: string,
};