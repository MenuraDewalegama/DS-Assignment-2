const cart = require('../util/database.util').db('ecommerceDB').collection('cart'); // Todo: This CustomerID string should be exact customer ID

const save = async ({CustomerID, productId, productName, description, addedDate}) =>{
    const result = await cart.insertOne({CustomerID, productId, productName, description, addedDate});
    return result.ops[0];
};

const userID = "1234";
const getAll = async () =>{
    const cursor = await cart.find({"CustomerID": userID});
    return cursor.toArray();
};

const findViewById = async (CustomerID) =>{
    return await cart.findOne({CustomerID})
}

const removeById = async (CustomerID) =>{
    const result = await cart.deleteOne({CustomerID});
    return result.ops[0];
}

const update = async (CustomerID, {productId, productName, description, addedDate}) =>{
    const result= await cart.replaceOne({CustomerID}, {CustomerID,productId, productName, description, addedDate});
    return result.ops[0];
}

module.exports = {save, getAll, findViewById, removeById, update};
