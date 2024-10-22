import React, { useState } from "react";
import "./cities.css";
import { FaStar } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import CustomModal from "../../components/modals/index.js";
import AddCityModal from "../../components/modals/addCity/AddCityModal.js";
import { useGetCityWeatherQuery } from "../../Store/Reducers/API_Reducer/WeatherApi.js";
import { useDispatch, useSelector } from "react-redux";
import {
  manageCityBookmark,
  updateActiveCity,
} from "../../Store/Reducers/CityReducer.js";

interface cityObjectType {
  lat: number;
  lon: number;
  name: string;
}

const App: React.FC = () => {
  const dispatch = useDispatch();

  const [addCityModalOpen, setAddCityModalOpen] = useState(false);

  const {
    selectedCities = [],
    bookmarkedCities = [],
    activeCity,
  } = useSelector((state) => state.city);

  const isBookMarkedCity = bookmarkedCities.find(
    (city) => city.name === activeCity.name
  );

  // RTK api call
  const {
    data: getCityResponse,
    isLoading: getCityLoading,
    isSuccess: isGetCitySuccess,
  } = useGetCityWeatherQuery({
    lattitude: activeCity.lat,
    langitude: activeCity.lon,
  });

  const onBookmarkClickHandler = (city: cityObjectType) => {
    dispatch(manageCityBookmark(city));
  };

  const updateActiveCityHandler = (city: cityObjectType) => {
    dispatch(updateActiveCity(city));
  };

  return (
    <div className="app">
      <div className="cities-section">
        <header className="city-list-header">
          <h3>Cities</h3>
          <button
            style={{
              backgroundColor: "red",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setAddCityModalOpen(true)}
          >
            <BiPlus size={20} color="white" fontWeight={"bold"} />
          </button>
        </header>
        <ul className="cities-list">
          {!selectedCities.length ? (
            <li>Cities Not Added Yet!</li>
          ) : (
            selectedCities?.map((city) => (
              <li
                key={city.name}
                className={`city-item ${
                  activeCity.name === city.name ? "active" : ""
                }`}
                onClick={() => updateActiveCityHandler(city)}
              >
                <div className="city-name">{city.name}</div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="details-section">
        <header className="details-header">
          <h2>{activeCity.name}</h2>
          <FaStar
            onClick={() => onBookmarkClickHandler(activeCity)}
            cursor={"pointer"}
            size={30}
            color={isBookMarkedCity ? "blue" : "grey"}
          />
        </header>
        <div className="weather-info">
          {getCityLoading ? (
            <p>Loading weather information...</p>
          ) : activeCity && activeCity.name ? (
            <>
              <p>Weather information for {activeCity.name}:</p>
              <ul>
                <li>
                  Temperature:{" "}
                  {Math.round(getCityResponse?.main?.temp - 273.15)} °C
                </li>
                <li>
                  Feels Like:{" "}
                  {Math.round(getCityResponse?.main?.feels_like - 273.15)} °C
                </li>
                <li>Humidity: {getCityResponse?.main?.humidity}%</li>
                <li>Pressure: {getCityResponse?.main?.pressure} hPa</li>
                <li>Wind Speed: {getCityResponse?.wind?.speed} m/s</li>
                <li>Wind Direction: {getCityResponse?.wind?.deg}°</li>
                <li>Weather: {getCityResponse?.weather[0]?.description}</li>
                <li>Visibility: {getCityResponse?.visibility / 1000} km</li>
                <li>Cloud Coverage: {getCityResponse?.clouds?.all}%</li>
              </ul>
            </>
          ) : (
            <p>Please add cities to see weather updates!</p>
          )}
        </div>
      </div>
      {/* modals */}
      <CustomModal
        isOpen={addCityModalOpen}
        onClose={() => setAddCityModalOpen(false)}
        modalHeading="Add City"
      >
        <AddCityModal />
      </CustomModal>
    </div>
  );
};

export default App;
