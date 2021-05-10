const products = require('../util/database.util').db('ecommerceDB').collection('products');

const addProduct = async ({ id, name, description, price }) => {
    const result = await products.insertOne({ id, name, description, price });
    return result.ops[0];
};

const getAllProducts = async () => {
    const cursor = await products.find();
    return cursor.toArray();
};

const getProductById = async id => {
    return await products.findOne({ id });
};

const removeProductById = async id => {
    await products.deleteOne({ id })
};

const updateProductById = async (id, { name, description, price }) => {
    const result = await products.replaceOne({ id }, { id, name, description, price });
    return result.ops[0];
};

module.exports = { addProduct: addProduct, getAllProducts, getProductById, removeProductById, updateProductById }
