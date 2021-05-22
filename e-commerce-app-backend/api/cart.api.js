const uuid = require('uuid');
const cart = new Map();
const {save, getAll, findViewById, removeById, update} = require('../dal/cart.dao');

const addProduct = async ({CustomerID, productId, productName, description, }) =>{
   const Product = {
    CustomerID,
    productId,
    productName,
    description,
    addedDate: new Date(),
    
   }
  return  await save(Product);

}
const getProducts = async () =>{
    return await getAll();
}

const getProduct = async (CustomerID) =>{
    return  await findViewById(CustomerID);
}

const removeProductById = async  (CustomerID) =>{
    const x = await findViewById(CustomerID);
     await removeById(CustomerID);
    return x;
}

const updateProductById = async  (CustomerID, {productId, productName, description, postedDate}) =>{
    postedDate = new Date()
    return await update(CustomerID, {productId, productName, description, postedDate});
}



module.exports = {getProducts, getProduct, addProduct, removeProductById, updateProductById}
