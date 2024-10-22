import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CityApiResponse {
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state: string;
}

interface CityQueryParams {
    cityName: string;
}

const cityBaseURL = import.meta.env.VITE_OPEN_GEO_BASE_URL;
const appId = import.meta.env.VITE_OPEN_WETHER_API_KEY;

export const CityApi = createApi({
    reducerPath: "CityApi",
    baseQuery: fetchBaseQuery({ baseUrl: cityBaseURL }),
    endpoints: (build) => ({
        getCityInfo: build.query<CityApiResponse, CityQueryParams>({
            query: ({ cityName }) => ({
                method: "GET",
                url: `direct`,
                params:{
                    appId,
                    q:cityName
                }
            }),
        }),
    }),
});

export const { useGetCityInfoQuery } = CityApi;
