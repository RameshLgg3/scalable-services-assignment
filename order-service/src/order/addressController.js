const addressService = require("./addressService");

async function createAddress(req, res) {
    try {
        const customer_id = req.user.id;
        const addressData = { ...req.body, customer_id };
        const address = await addressService.createAddress(addressData);
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllAddresses(req, res) {
    try {
        const customer_id = req.user.id;
        const addresses = await addressService.getAllAddresses(customer_id);
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAddressById(req, res) {
    try {
        const customer_id = req.user.id;
        const address = await addressService.getAddressById(
            Number(req.params.id),
            customer_id
        );
        if (!address)
            return res.status(404).json({ error: "Address not found" });
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateAddress(req, res) {
    try {
        const customer_id = req.user.id;
        const address = await addressService.updateAddress(
            Number(req.params.id),
            customer_id,
            req.body
        );
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteAddress(req, res) {
    try {
        const customer_id = req.user.id;
        await addressService.deleteAddress(Number(req.params.id), customer_id);
        res.status(204).json({ message: "Address deleted." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
};
