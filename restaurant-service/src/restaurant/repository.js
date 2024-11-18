// src/repositories/restaurantRepository.js
const { Restaurant, FoodItem } = require("./model");

// Function to create a new restaurant
const createRestaurant = async (data) => {
    return await Restaurant.create({
        data: {
            name: data.name,
            location: data.location,
            phone: data.phone,
            email: data.email,
            opening_hours: data.opening_hours,
            delivery_zones: data.delivery_zones,
        },
    });
};

// Function to add food items to a specific restaurant by restaurant_id
const addFoodItems = async (foodItems) => {
    return await FoodItem.createMany({
        data: foodItems.map((item) => ({
            restaurant_id: item.restaurant_id,
            name: item.name,
            price: item.price,
        })),
    });
};

// Function to get all restaurants (without food items)
const getAllRestaurants = async () => {
    try {
        const restaurants = await Restaurant.findMany({
            select: {
                id: true, // Use `id` as per the Prisma schema
                name: true,
                location: true,
                _count: {
                    select: { food_items: true }, // Counting the associated food items
                },
            },
        });
        return restaurants; // Return the fetched restaurants
    } catch (error) {
        console.error("Error in getAllRestaurants:", error);
        throw new Error("Error fetching all restaurants");
    }
};

// Function to get a single restaurant with its food items by restaurant_id
const getRestaurantWithFoodItems = async (restaurant_id) => {
    return await Restaurant.findUnique({
        where: { id: parseInt(restaurant_id) },
        include: {
            food_items: true,
        },
    });
};

const getRestaurantById = async (id) => {
    try {
        return await Restaurant.findUnique({
            where: {
                id: parseInt(id), // Assuming 'id' is the primary key in your Restaurant model
            },
        });
    } catch (error) {
        console.error("Error in getRestaurantById repository:", error);
        throw new Error("Error fetching restaurant");
    }
};

// Function to update a restaurant by restaurant_id
const updateRestaurant = async (restaurant_id, data) => {
    return await Restaurant.update({
        where: { id: parseInt(restaurant_id) },
        data,
    });
};

// Function to delete a restaurant by restaurant_id
const deleteRestaurant = async (restaurant_id) => {
    return await Restaurant.delete({
        where: { id: parseInt(restaurant_id) },
    });
};

// Function to get food items by restaurant_id
const getFoodItemsByRestaurantId = async (restaurant_id) => {
    return await FoodItem.findMany({
        where: { restaurant_id: parseInt(restaurant_id) },
    });
};

// Function to get food items by search
const getFoodItemsBySearch = async (searchQuery) => {
    return await FoodItem.findMany({
        where: {
            name: {
                contains: searchQuery,
                mode: "insensitive",
            },
        },
    });
};

// Function to get restaurants by search
const getRestaurantsBySearch = async (searchQuery) => {
    return await Restaurant.findMany({
        where: {
            name: {
                contains: searchQuery,
                mode: "insensitive",
            },
        },
    });
};

module.exports = {
    createRestaurant,
    addFoodItems,
    getAllRestaurants,
    getRestaurantWithFoodItems,
    updateRestaurant,
    deleteRestaurant,
    getFoodItemsByRestaurantId,
    getFoodItemsBySearch,
    getRestaurantsBySearch,
    getRestaurantById,
};
