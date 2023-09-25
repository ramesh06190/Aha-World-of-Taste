import React, { useState , useEffect } from 'react';
import './AdminViewMenu.css'; // Import your CSS file for styling
import { RiEdit2Line } from 'react-icons/ri'; // Import the edit icon
import "./AdminEditMenu.css"
import { Input } from "@chakra-ui/react";
import { post , get} from "../api/ApiService"; // Import the put function from your API service
import {
    useToast
  } from "@chakra-ui/react";

const FoodCard = ({ id, foodName, description, price , category , updateRenderData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(foodName);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedRate, setEditedRate] = useState(price);
  const [editedcategory, setEditedcategory] = useState(category);
  const [AdminToken , setAdminToken] = useState("")



  const handleEditClick = () => {
    setIsEditing(true);
  };
  const headers = {
    token: AdminToken,
  };

  const defaultToastConfig = {
    duration: 2000,
    isClosable: true,
    position: 'top',
  };

  useEffect(()=>{
    const Token = localStorage.getItem("adminToken")
    setAdminToken(Token)
} , [])
const toast = useToast();
  const handleSaveClick = async (myid) => {
    setIsEditing(false);


    const updatedFoodData = {
      id: myid,
      foodName: editedName,
      category: editedcategory,
      description: editedDescription,
      price: editedRate,
    };

    try {
      // Make a PUT request to update the food item
      const result = await post('api/edit/dish', updatedFoodData , headers);

      if (result.status) {
    
        toast({
          title: "Item Updated Successfully",
          status: "success",
          ...defaultToastConfig
        });
        updateRenderData()
      } 
    } catch (error) {
      console.log(error, "oihihih")
      toast({
          title: 'Error in Updateing Item',
          description: error?.response?.data?.message,
          status: 'error',
          ...defaultToastConfig,
      });
  }
  };

  return (
    <div className="food-card">
      <h2 className="food-name">
        {isEditing ? (
          <Input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
            foodName
        )}
      </h2>
      <p className="food-description">
        {isEditing ? (
          <Input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          description
        )}
      </p>
      <p className="food-description">
        {isEditing ? (
          <Input
            type="text"
            value={editedcategory}
            onChange={(e) => setEditedcategory(e.target.value)}
          />
        ) : (
            category
        )}
      </p>
      <div className="rate-wrap">
        <p className="food-rate">
          {isEditing ? (
            <Input
              type="text"
              value={editedRate}
              onChange={(e) => setEditedRate(e.target.value)}
            />
          ) : (
            price
          )}
        </p>

        {isEditing ? (
          <button onClick={(()=>handleSaveClick(id))}>Save</button>
        ) : (
          <button onClick={handleEditClick}>
            <RiEdit2Line /> Edit
          </button>
        )}
      </div>
    </div>
  );
};

const FoodList = ({ searchData , updateRenderData }) => {
    const [AdminDish, setAdminDish] = useState([]);
    useEffect(() => { 
        getAllDish();
      
      }, [updateRenderData ]);
      const getAllDish = async () => {
        const result = await get("api/all/dish");
        setAdminDish(result.data);
      };
    
  const filteredData = AdminDish.filter((item) =>
    item.foodName.toLowerCase().includes(searchData.toLowerCase())
  );

  return (
    <div className="food-grid">
      {filteredData.map((food, index) => (
        <FoodCard key={index} {...food}  updateRenderData={updateRenderData} />
      ))}
    </div>
  );
};

const AdminEditMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [renderdata , setRenderdata] = useState(false)
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const updateRenderData = () => {
    setRenderdata((prevRenderData) => !prevRenderData);
  };
  return (
    <div className="admin-viewcontainer">
      <div className="search-wrap">
        <h1>Edit Menu</h1>
        <input
          type="text"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <FoodList searchData={searchTerm} updateRenderData={updateRenderData} />
    </div>
  );
};

export default AdminEditMenu;
