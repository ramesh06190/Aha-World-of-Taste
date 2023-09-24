const config = require("../config");
const Dish = require("../model/dish");
const bookidgen = require("bookidgen");

const postDishes = async (req, res) => {
  try {
    const dishes = req.body.dishes;
    if (!Array.isArray(dishes) || dishes.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Request body is empty or not an array of dishes",
      });
    }
    // const insertedDishes = await Dish.insertMany(dishes);
    res.status(201).json({ success: true, dishes: insertedDishes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await Dish.distinct("category");
    res.status(201).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllDish = async (req, res) => {
  try {
    const dishes = await Dish.find({});
    res.status(201).json({ success: true, data: dishes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDishByCategory = async (req, res) => {
  const { category } = req.body;

  try {
    const dishes = await Dish.find({ category });

    if (dishes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No dishes found for the provided category.",
      });
    }

    res.status(200).json({ success: true, data: dishes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const addLikeToFood = async (req, res) => {
  const { dishId } = req.body;
  if (!dishId) {
    return res.json({ success: false, message: "Enter dishId" });
  }
  try {
    const dish = await Dish.findOne({ id: dishId });
    if (!dish) {
      return res
        .status(404)
        .json({ success: false, message: "Dish not found." });
    }
    const userId = req.data.id;
    const alreadyLiked = dish.likes.some((like) => like === userId);
    if (alreadyLiked) {
      return res.json({
        success: false,
        message: "You have already liked this dish.",
      });
    }
    dish.likes.push(userId);
    await dish.save();
    res
      .status(200)
      .json({ success: true, message: "Like added successfully.", data: dish });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const addDish = async (req, res) => {
  try {
    const { foodName, category, price, description } = req.body;
    if (!foodName || !category || !price || !description) {
      return res.json({
        message:
          "All fields (foodName, category, price, description) are mandatory.",
        status: false,
      });
    }
    const newDish = new Dish({
      id: bookidgen("Dish-", 9898, 89898),
      foodName,
      category,
      price,
      description,
    });

    const savedDish = await newDish.save();
    res.status(201).json({ message: "item saved successfully", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const editDish = async (req, res) => {
  try {
    const { id, foodName, category, price, description } = req.body;
    if (!id || !foodName || !category || !price || !description) {
      return res.status(400).json({
        message:
          "All fields (id, foodName, category, price, description) are mandatory.",
        status: false,
      });
    }
    const updatedDish = await Dish.findOneAndUpdate(
      { id: id },
      {
        foodName,
        category,
        price,
        description,
      },
      {
        new: true,
      }
    );
    if (!updatedDish) {
      return res.status(404).json({ error: "Dish not found" });
    }
    res.json({
      message: "data updated successfully",
      data: updatedDish,
      status: true,
    });
  } catch (error) {
    res.status(400).json({ error: error.message, status: false });
  }
};

module.exports = {
  postDishes,
  getAllCategory,
  getAllDish,
  getDishByCategory,
  addLikeToFood,
  addDish,
  editDish,
};
