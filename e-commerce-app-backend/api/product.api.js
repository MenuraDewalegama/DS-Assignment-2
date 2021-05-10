const uuid = require('uuid');
const { addProduct, getAllProducts, getProductById, removeProductById, updateProductById } = require('../dal/product.dao');

const product = new Map();

const createProduct = async ({ name, description, price }) => {
    const product = {
        id: uuid.v4(),
        name,
        description,
        price
    }
    return await addProduct(product);
};

const getProducts = async () => {
    return await getAllProducts();
};

const getProduct = async id => {
    return await getProductById(id);
};

const deleteProduct = async id => {
    return await removeProductById(id);
};

const updateProduct = async (id, { name, description, price }) => {
    return await updateProductById(id, { name, description, price });
};

module.exports = { createProduct, getProducts, getProduct, deleteProduct, updateProduct }
