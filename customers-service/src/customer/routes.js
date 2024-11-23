// src/customer/routes.js
const express = require("express");
const orderController = require("./controller");
const addressController = require("./addressController");
const { authenticateToken, authorizeRoles } = require("./middleware");

const router = express.Router();

// Apply the authentication middleware to all routes
router.use(authenticateToken);

// Apply the role-based access control for the CUSTOMER role to all order-related routes

// Hello World endpoint (accessible by any authenticated user)
router.get("/customers", (req, res) => {
    res.json({ message: "Hello from Customer Service!" });
});

// Create an order
router.post("/orders", authorizeRoles("CUSTOMER"), orderController.createOrder);

// Get all orders
router.get("/orders", authorizeRoles("CUSTOMER"), orderController.getAllOrders);
router.get(
    "/orders/:id",
    authorizeRoles("CUSTOMER", "RESTAURANT"),
    orderController.getOrderById
);
router.put(
    "/orders/:id",
    authorizeRoles("CUSTOMER", "RESTAURANT"),
    orderController.updateOrder
);

router.use(authorizeRoles("CUSTOMER"));

router.get("/restaurants", orderController.fetchRestaurants);
router.get("/restaurants/search", orderController.searchRestaurants);
router.get("/menu/search", orderController.searchMenu);
router.post("/orders/:order_number/reorder", orderController.reOrder);

router.post("/addresses", addressController.createAddress);
router.get("/addresses", addressController.getAllAddresses);
router.get("/addresses/:id", addressController.getAddressById);
router.put("/addresses/:id", addressController.updateAddress);
router.delete("/addresses/:id", addressController.deleteAddress);

module.exports = router;
