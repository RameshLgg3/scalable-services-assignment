// src/customer/repository.js
const { Order, OrdersMenu, Address } = require("./model");

class OrderRepository {
    async createOrder(orderData) {
        return Order.create({ data: orderData });
    }

    async createOrderItems(orderMenuEntries) {
        const createdItems = await OrdersMenu.createMany({
            data: orderMenuEntries,
        });
        return createdItems;
    }

    async getAllOrders(user_id, status) {
        const filter = {
            where: {
                ...(user_id && { user_id }), // Include user_id filter if provided
                ...(status && {
                    status: { equals: status, mode: "insensitive" }, // Include status filter if provided
                }),
            },
        };
        return Order.findMany(filter);
    }

    async getOrderById(id, user_id) {
        return Order.findUnique({ where: { id: parseInt(id), user_id } });
    }

    async updateOrder(id, user_id, updateData) {
        return Order.update({
            where: { id: parseInt(id), user_id },
            data: updateData,
        });
    }

    async getOrderByNumber(order_number) {
        return Order.findUnique({
            where: { order_number },
            include: { orders_menu: true }, // Include order items (if needed)
        });
    }

    async createAddress(data) {
        return Address.create({ data });
    }

    async getAllAddresses(customer_id) {
        return Address.findMany({ where: { customer_id } });
    }

    async getAddressById(id, customer_id) {
        return Address.findUnique({ where: { id, customer_id } });
    }

    async updateAddress(id, customer_id, data) {
        return Address.update({ where: { id, customer_id }, data });
    }

    async deleteAddress(id, customer_id) {
        return Address.delete({ where: { id, customer_id } });
    }
}

module.exports = new OrderRepository();
