import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface WeatherApiResponse {
	coord: {
		lon: number;
		lat: number;
	};
	weather: Array<{
		id: number;
		main: string;
		description: string;
		icon: string;
	}>;
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level?: number;
		grnd_level?: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

interface CityWeatherQueryParams {
	lattitude: number;
	langitude: number;
}

const weatherBaseURL = import.meta.env.VITE_OPEN_WETHER_BASE_URL;
const appId = import.meta.env.VITE_OPEN_WETHER_API_KEY;

export const WeatherApi = createApi({
	reducerPath: "WeatherApi",
	baseQuery: fetchBaseQuery({ baseUrl: weatherBaseURL }),
	endpoints: (build) => ({
		getCityWeather: build.query<WeatherApiResponse, CityWeatherQueryParams>(
			{
				query: ({ lattitude, langitude }) => ({
					method: "GET",
					url: `weather`,
					params: {
						lat: lattitude,
						lon: langitude,
						appId: appId,
					},
				}),
			}
		),
	}),
});

export const { useGetCityWeatherQuery } = WeatherApi;
