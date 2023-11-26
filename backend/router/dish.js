const express = require("express");
const router = express.Router();
const dish = require("../controller/dish");
const auth = require("../auth/middleware");
const adminAuth = require("../auth/admin");

router.post("/dishes", dish.postDishes);
router.get("/all/category", dish.getAllCategory);
router.get("/all/dish", dish.getAllDish);
router.get("/dish-category", dish.getDishByCategory);
router.post("/like", auth, dish.addLikeToFood);
router.post("/add/dish", adminAuth, dish.addDish);
router.post("/edit/dish", adminAuth, dish.editDish);
router.post("/delete/dish", adminAuth, dish.deleteDish);
router.post("/permanent-delete/dish", adminAuth, dish.permanentDelete);
router.post("/update/rating", dish.addOrUpdateRating);

module.exports = router;
