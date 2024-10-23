import React, { useEffect, useState } from "react";
import { useGetCityInfoQuery } from "../../../Store/Reducers/API_Reducer/CityApi";
import { useDispatch } from "react-redux";
import { addCityToSelectedCities } from "../../../Store/Reducers/CityReducer";

interface cityObjectType {
  lat: number;
  lon: number;
  name: string;
}

const AddCityModal = () => {
  const dispatch = useDispatch();

  const [searchedCity, setSearchedCity] = useState<string>("");
  const [debouncedCity, setDebouncedCity] = useState<string>(searchedCity);


  //getCity API call
  const { data: getCityResponse, isLoading: isGetCityLoading } =
    useGetCityInfoQuery({ cityName: debouncedCity });

  const cityChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedCity(e.target.value);
  };

  const onAddCityClick = (city: cityObjectType): void => {
    dispatch(addCityToSelectedCities(city));
    setSearchedCity("");
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedCity(searchedCity);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchedCity]);

  return (
    <div className="city-container">
      <div className="modal-search">
        <input
          type="text"
          placeholder="🔍 Search cities"
          className="search-input"
          onChange={cityChangeHandler}
          value={searchedCity}
          name="cityName"
        />
      </div>

      {isGetCityLoading ? (
        <p>...Fetching city, kindly hold on</p>
      ) : getCityResponse?.length > 0 ? (
        <ul className="modal-city-list">
          {getCityResponse.map((city) => (
            <li key={city.name} className="modal-city-item">
              <span>
                {city.name}, {city.state}, {city.country}
              </span>
              <button
                onClick={() => onAddCityClick(city)}
                className="add-city-button"
              >
                +
              </button>
            </li>
          ))}
        </ul>
      ) : !searchedCity ? (
        <p>Type to search city</p>
      ) : (
        <p>No cities found</p>
      )}
    </div>
  );
};

export default AddCityModal;
