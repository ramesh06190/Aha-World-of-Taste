const express = require("express");
const router = express.Router();
const dish = require("../controller/dish");
const auth = require("../auth/middleware");

router.post("/dishes", dish.postDishes);
router.get("/all/category", dish.getAllCategory);
router.get("/all/dish", dish.getAllDish);
router.get("/dish-category", dish.getDishByCategory);
router.post("/like", auth, dish.addLikeToFood);
router.post("/add/dish", auth, dish.addDish);
router.post("/edit/dish", auth, dish.editDish);

module.exports = router;
