import React, { useState, useEffect } from "react";
import "./AdminViewMenu.css"; // Import your CSS file for styling
import { get } from "../api/ApiService";

const AdminViewMenu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [AdminDish, setAdminDish] = useState([]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    getAllDish();
  }, []);
  const getAllDish = async () => {
    const result = await get("api/all/dish");
    setAdminDish(result.data);
  };
  const FoodCard = ({ foodName, description, price }) => (
    <div className="food-card">
      <h2 className="food-name">{foodName}</h2>
      <p className="food-description">{description}</p>
      <p className="food-rate">{price}</p>
    </div>
  );

  const FoodList = ({ searchData }) => {
    const filteredData = AdminDish?.filter((item) =>
      item?.foodName?.toLowerCase().includes(searchData?.toLowerCase())
    );

    return (
      <div className="food-grid">
        {filteredData.map((food, index) => (
          <FoodCard key={index} {...food} />
        ))}
      </div>
    );
  };

  return (
    <div className="admin-viewcontainer">
      <div className="search-wrap">
        <h1>Full Menu</h1>
        <>
          <input
            type="text"
            placeholder="Search for food..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </>
      </div>
      <FoodList searchData={searchTerm} />
    </div>
  );
};

export default AdminViewMenu;
