// src/services/restaurantService.js
const axios = require("axios");

// Set the base URL for restaurant-service
const ORDER_SERVICE_URL =
    process.env.ORDER_SERVICE_URL || "http://localhost:5004/api";

// Function to create an order
const createOrder = async (token, orderData) => {
    try {
        const response = await axios.post(
            `${ORDER_SERVICE_URL}/orders`,
            orderData,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error creating order from order-service:",
            error.message
        );
        throw new Error("Could not create order");
    }
};

const getAllOrders = async (token, customer_id) => {
    try {
        const response = await axios.get(
            `${ORDER_SERVICE_URL}/orders/customers/${customer_id}`,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching orders from order-service:",
            error.message
        );
        throw new Error("Could not fetch orders");
    }
};

const getOrderById = async (token, id) => {
    try {
        const response = await axios.get(`${ORDER_SERVICE_URL}/orders/${id}`, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching orders from order-service:",
            error.message
        );
        throw new Error("Could not fetch orders");
    }
};

const updateOrder = async (token, id, updateData) => {
    try {
        const response = await axios.put(
            `${ORDER_SERVICE_URL}/orders/${id}`,
            updateData,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching orders from order-service:",
            error.message
        );
        throw new Error("Could not fetch orders");
    }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrder };
