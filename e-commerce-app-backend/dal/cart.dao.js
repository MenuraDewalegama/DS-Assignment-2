const cart = require('./').db('cart').collection('CustomerID'); // Todo: This CustomerID string should be exact customer ID

const save = async ({CustomerID, productId, productName, description, addedDate}) =>{
    const result = await cart.insertOne({CustomerID, productId, productName, description, addedDate});
    return result.ops[0];
};

const getAll = async () =>{
    const cursor = await cart.find();
    return cursor.toArray();
};

const findViewById = async (id) =>{
    return await cart.findOne({id})
}

const removeById = async (id) =>{
    const result = await cart.deleteOne({id});
    return result.ops[0];
}

const update = async (CustomerID, {productId, productName, description, addedDate}) =>{
    const result= await cart.replaceOne({CustomerID}, {CustomerID,productId, productName, description, addedDate});
    return result.ops[0];
}

module.exports = {save, getAll, findViewById, removeById, update};