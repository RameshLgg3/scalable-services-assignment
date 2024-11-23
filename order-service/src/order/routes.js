// src/order/routes.js
const express = require("express");
const orderController = require("./controller");
const { authenticateToken, authorizeRoles } = require("./middleware");

const router = express.Router();

// Apply the authentication middleware to all routes
router.use(authenticateToken);

// Create an order
router.post("/orders", authorizeRoles("CUSTOMER"), orderController.createOrder);

// Get all orders
router.get(
    "/orders",
    authorizeRoles("CUSTOMER", "RESTAURANT"),
    orderController.getAllOrders
);
router.get(
    "/orders/customers/:id",
    authorizeRoles("CUSTOMER"),
    orderController.getAllOrdersByCustomer
);
router.get(
    "/orders/restaurants/:id",
    authorizeRoles("RESTAURANT"),
    orderController.getAllOrdersByRestaurant
);
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

router.use(authorizeRoles("CUSTOMER", "RESTAURANT"));

router.post("/orders/:order_number/reorder", orderController.reOrder);

module.exports = router;
