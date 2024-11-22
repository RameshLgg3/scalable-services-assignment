const axios = require("axios");

// Set the base URL for restaurant-service
const CUSTOMER_SERVICE_URL =
    process.env.CUSTOMER_SERVICE_URL || "http://localhost:5001/api";

const getAllOrders = async (token) => {
    try {
        const response = await axios.get(`${CUSTOMER_SERVICE_URL}/orders`, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching orders from customer-service:",
            error.message
        );
        throw new Error("Could not fetch orders");
    }
};

const getOrderById = async (id, token) => {
    try {
        const response = await axios.get(
            `${CUSTOMER_SERVICE_URL}/orders/${id}`,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching orders from customer-service:",
            error.message
        );
        throw new Error("Could not fetch orders");
    }
};

const updateOrderStatus = async (id, token) => {
    try {
        const response = await axios.put(
            `${CUSTOMER_SERVICE_URL}/orders/${id}`,
            {
                headers: { Authorization: token },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching orders from customer-service:",
            error.message
        );
        throw new Error("Could not fetch orders");
    }
};

module.exports = { getAllOrders, getOrderById, updateOrderStatus };
