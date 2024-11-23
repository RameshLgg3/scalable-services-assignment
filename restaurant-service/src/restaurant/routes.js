const express = require("express");
const {
    createRestaurant,
    addFoodItems,
    getAllRestaurants,
    getRestaurantWithFoodItems,
    getFoodItemsByRestaurantId,
    getFoodItemsBySearch,
    getRestaurantsBySearch,
    updateRestaurant,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
} = require("./controller");

const restaurantRoutes = express.Router();

const { authenticateToken, authorizeRoles } = require("./middleware");

// Apply the authentication middleware to all routes
restaurantRoutes.use(authenticateToken);

restaurantRoutes.get(
    "/restaurants",
    authorizeRoles("CUSTOMER", "RESTAURANT"),
    getAllRestaurants
);

restaurantRoutes.get(
    "/restaurants/:restaurant_id",
    authorizeRoles("CUSTOMER", "RESTAURANT"),
    getRestaurantWithFoodItems
);

// Route to get food items by restaurant_id
restaurantRoutes.get(
    "/restaurants/:restaurant_id/menu",
    authorizeRoles("CUSTOMER", "RESTAURANT"),
    getFoodItemsByRestaurantId
);

// Route to search food items
restaurantRoutes.get(
    "/menu/search",
    authorizeRoles("CUSTOMER", "RESTAURANT"),
    getFoodItemsBySearch
);

// Route to search restaurants
restaurantRoutes.get(
    "/restaurants/search",
    authorizeRoles("CUSTOMER", "RESTAURANT"),
    getRestaurantsBySearch
);

// Apply the role-based access control for the CUSTOMER role to all order-related routes
restaurantRoutes.use(authorizeRoles("RESTAURANT"));

// Route to create a restaurant
restaurantRoutes.post("/restaurants", createRestaurant);

// Route to get all restaurants

// Route to add food items to a restaurant
restaurantRoutes.post("/restaurants/menu", addFoodItems);

// Route to get a single restaurant with its food items

restaurantRoutes.put("/restaurants/:id", updateRestaurant);

restaurantRoutes.get("/orders", getAllOrders);
restaurantRoutes.get("/orders/:id", getOrderById);
restaurantRoutes.put("/orders/:id", updateOrderStatus);

module.exports = restaurantRoutes;
