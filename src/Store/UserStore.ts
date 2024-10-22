import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { WeatherApi } from "./Reducers/API_Reducer/WeatherApi";
import { CityApi } from "./Reducers/API_Reducer/CityApi";
import CityReducer from "./Reducers/CityReducer";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedCityReducer = persistReducer(persistConfig, CityReducer);

export const UserStore = configureStore({
    reducer: {
        city: persistedCityReducer,
        [WeatherApi.reducerPath]: WeatherApi.reducer,
        [CityApi.reducerPath]: CityApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(WeatherApi.middleware)
            .concat(CityApi.middleware),
});

export const persistor = persistStore(UserStore);
