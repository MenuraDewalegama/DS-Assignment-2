// const products = require('../util/database.util').db('ecommerceDB').collection('products');
// import DatabaseService from '../util/database.service.js';

const DatabaseService = require('../service/database.service.js');

const collectionName = 'products';
const products = new DatabaseService(collectionName);

const addProduct = async ({id, name, description, unitPrice, handOnQuantity}) => {
    return await products.save({id, name, description, unitPrice, handOnQuantity});
};


const updateProduct = async (id, {name, description, unitPrice, handOnQuantity}) => {
    return await products.update(id,)
    // const result = await products.replaceOne({id}, {id, name, description, price});
    // return result.ops[0];
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
    addProduct: addProduct,
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProduct
}
