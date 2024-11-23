const express = require("express");
const orderRoutes = require("./order/routes");
const app = express();

// Use JSON middleware
app.use(express.json());

// Load customer routes
app.use("/api", orderRoutes);

module.exports = app;
