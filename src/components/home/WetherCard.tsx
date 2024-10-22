import React from "react";
import { FaStar } from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import { useDispatch } from "react-redux";
import {
  manageCityBookmark,
  updateActiveCity,
} from "../../Store/Reducers/CityReducer";
import { useNavigate } from "react-router-dom";

interface cardProps {
  name: string;
  lat: number;
  lon: number;
}
const WetherCard: React.FC<cardProps> = ({ name, lat, lon }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onBookmarkClickHandler = (city: cardProps, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(manageCityBookmark(city));
  };

  const cityClickHandler = (city: cardProps): void => {
    dispatch(updateActiveCity(city));
    navigate("/city");
  };

  return (
    <div
      className="weather-card"
      onClick={() => cityClickHandler({ name, lat, lon })}
    >
      <div className="weather-info">
        <h2 className="city-name">{name}</h2>
        <div className="tempreature-with-icon">
          <p className="temperature">25°C</p>
          <WiDaySunny size={25} />
        </div>
        <p className="description">Sunny</p>
      </div>

      <FaStar
        cursor={"pointer"}
        onClick={(e) => onBookmarkClickHandler({ name, lat, lon }, e)}
        size={25}
        color={true ? "green" : "gray"}
      />
    </div>
  );
};

export default WetherCard;
