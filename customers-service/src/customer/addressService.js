const addressRepository = require("./repository");

async function createAddress(data) {
    return addressRepository.createAddress(data);
}

async function getAllAddresses(customer_id) {
    return addressRepository.getAllAddresses(customer_id);
}

async function getAddressById(id, customer_id) {
    return addressRepository.getAddressById(id, customer_id);
}

async function updateAddress(id, customer_id, data) {
    return addressRepository.updateAddress(id, customer_id, data);
}

async function deleteAddress(id, customer_id) {
    return addressRepository.deleteAddress(id, customer_id);
}

module.exports = {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
};
