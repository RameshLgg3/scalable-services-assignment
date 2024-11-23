const axios = require("axios");

// Set the base URL for restaurant-service
const ORDER_SERVICE_URL =
    process.env.ORDER_SERVICE_URL || "http://localhost:5004/api";

const getAllOrders = async (token, restaurant_id) => {
    try {
        const response = await axios.get(
            `${ORDER_SERVICE_URL}/orders/restaurants/${restaurant_id}`,
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

const getOrderById = async (id, token) => {
    try {
        const response = await axios.get(`${ORDER_SERVICE_URL}/orders/${id}`, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching orders from restaurant-service:",
            error.message
        );
        throw new Error("Could not fetch orders");
    }
};

const updateOrderStatus = async (id, token) => {
    try {
        const response = await axios.put(`${ORDER_SERVICE_URL}/orders/${id}`, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching orders from restaurant-service:",
            error.message
        );
        throw new Error("Could not fetch orders");
    }
};

module.exports = { getAllOrders, getOrderById, updateOrderStatus };
