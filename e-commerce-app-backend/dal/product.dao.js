// const products = require('../util/database.util').db('ecommerceDB').collection('products');
// import DatabaseService from '../util/database.service.js';

const DatabaseService = require('../service/database.service.js');

const collectionName = 'products';
const products = new DatabaseService(collectionName);

const addProduct = async ({name, description, unitPrice, handOnQuantity, imagePath}) => {
    return await products.save({name, description, unitPrice, handOnQuantity, imagePath});
};

const updateProduct = async (id, {name, description, unitPrice, handOnQuantity, imagePath}) => {
    const product = {name,
        description,
        unitPrice,
        handOnQuantity,
        imagePath};
    return await products.update(id, product);
};

const updateProductImagePath = async (id, { imagePath }) => {
    return await products.update(id, { imagePath });
};

const deleteProduct = async id => {
    return await products.delete(id);
};


const getProduct = async id => {
    return await products.findById(id);
};

const getAllProducts = async () => {
    return await products.findAll();
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    updateProductImagePath,
}
