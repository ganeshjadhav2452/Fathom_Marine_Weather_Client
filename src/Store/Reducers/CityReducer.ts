import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CityObjectType {
	lat: number;
	lon: number;
	name: string;
}

interface CitySliceState {
	selectedCities: CityObjectType[];
	bookmarkedCities: CityObjectType[];
    activeCity:CityObjectType
}

const initialState: CitySliceState = {
	selectedCities: [],
	bookmarkedCities: [],
    activeCity :{
        lat: 0,
        lon: 0,
        name: ''
    }
};

const citySlice = createSlice({
	name: "CityReducer",
	initialState,
	reducers: {
		addCityToSelectedCities(state, action: PayloadAction<CityObjectType>) {
			const isAlreadySelected = state.selectedCities.find(
				(city) => city.name === action.payload.name
			);
			if (!isAlreadySelected) {
				state.selectedCities.push(action.payload);
			}
		},
		manageCityBookmark(
			state,
			action: PayloadAction<CityObjectType>
		) {
			const isAlreadyBookedMarked = state.bookmarkedCities.find(
				(city) => city.name === action.payload.name
			);
			if (!isAlreadyBookedMarked) {
				state.bookmarkedCities.push(action.payload);
			} else {
				state.bookmarkedCities = state.bookmarkedCities.filter(
					(city) => city.name !== action.payload.name
				);
			}
		},
        updateActiveCity(state, action: PayloadAction<CityObjectType>){
            state.activeCity = action.payload
        }
	},
});

export const { addCityToSelectedCities, manageCityBookmark, updateActiveCity } =
	citySlice.actions;

export default citySlice.reducer;
