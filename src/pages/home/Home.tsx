import React, { useState } from "react";
import "./home.css";
import WetherCard from "../../components/home/WetherCard";
import { BiPlus } from "react-icons/bi";
import AddCityModal from "../../components/modals/addCity/AddCityModal";
import CustomModal from "../../components/modals/index.js";
import { useSelector } from "react-redux";

interface cityObjectType {
  lat: number;
  lon: number;
  name: string;
}

const Home: React.FC = () => {
  const [addCityModalOpen, setAddCityModalOpen] = useState(false);
  const { bookmarkedCities } = useSelector((state) => state.city);
  console.log("bookmarkedCities", bookmarkedCities);

  const addCityButtonClickHandler = () => {
    setAddCityModalOpen(true);
  };

  return (
    <>
      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="title">My Favorite Cities</h1>
          <button
            className="add-city-button"
            onClick={addCityButtonClickHandler}
          >
            <BiPlus size={20} />
            Add New City
          </button>
        </header>

        {/* Weather Card */}
        <div className="wetherCardsArea">
          {bookmarkedCities.length ? (
            bookmarkedCities.map((city: cityObjectType) => {
              return (
                <WetherCard name={city.name} lat={city.lat} lon={city.lon} />
              );
            })
          ) : (
            <p>No cities added yet</p>
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
    </>
  );
};

export default Home;
