const productDAO = require('../dal/product.dao');
const mimeTypes = require('mime-types');
const fs = require('fs');
const path = require('path');

/* assets and products dir */
const assetDir = `${process.cwd()}${path.sep}assets`;
const productsDir = `${assetDir}${path.sep}products`;
// const productsDefaultDir = `${assetDir}${path.sep}products${path.sep}default.jpg`;

/** add product. */
const addProduct = async ({name, description, unitPrice, handOnQuantity}, ctxProductImage) => {
    const product = {
        name,
        description,
        unitPrice,
        handOnQuantity,
        imagePath: null
    }
    return new Promise(async (resolve, reject) => {
        try {
            const generatedResult = await productDAO.addProduct(product);

            /* check whether the user has upload an image. */
            if (ctxProductImage) {
                /* user has uploaded an image with the product details. */

                /* get image extension. */
                const fileType = mimeTypes.extension(ctxProductImage?.type);

                /* image should be saved to 'assets/products/{generatedId}.extension' */
                const desFilePath = `${productsDir + path.sep + generatedResult.insertedId}.${fileType}`;
                const dbImagePath = `/assets/products/${generatedResult.insertedId}.${fileType}`;
                // const dbImagePath =
                // `${path.sep}assets${path.sep}products${path.sep + generatedResult.insertedId}.${fileType}`;
                try {
                    fs.copyFileSync(ctxProductImage?.path, desFilePath);
                    fs.unlinkSync(ctxProductImage?.path);

                    try { /* update the product record imagePath field. */
                        const result = await productDAO.updateProductImagePath(generatedResult.insertedId,
                            {imagePath: dbImagePath});
                        resolve(generatedResult);
                    } catch (error) {
                        /* error: w\\hen updating dbImagePath. */
                        reject(error);
                    }
                } catch (error) {
                    /* error when file coping. */
                    reject(error);
                }

            } else {
                /* when user does not upload an image with the product details,
                just save the product details. */
                resolve(generatedResult);
            }

        } catch (error) {
            reject(error);
        }

    });
};

/** get all products. */
const getProducts = async () => {
    return await productDAO.getAllProducts();
};

/** get product by ID. */
const getProduct = async id => {
    return await productDAO.getProduct(id);
};

/** update a product.
 * @param id product id
 * @param {name, description, unitPrice, handOnQuantity, imagePath}: new values for the product.
 * @param existingProduct the product is being updated. it is used to get the product image path (old).
 * @returns Promise with the result if success, otherwise the error. */
const updateProduct = async (id,
                             {name, description, unitPrice, handOnQuantity, imagePath},
                             ctxProductImage,
                             existingProduct) => {
    const product = {
        name,
        description,
        unitPrice,
        handOnQuantity,
        imagePath
    }
    return new Promise(async (resolve, reject) => {

        try {
            /* updating the product. */
            const result = await productDAO.updateProduct(id, product);

            /* if the product is provided, then it should be saved.
            then update the ImagePath in the Database*/
            if (ctxProductImage) {
                const fileType = mimeTypes.extension(ctxProductImage?.type);
                const desFilePath = `${productsDir + path.sep + id}.${fileType}`;

                try {
                    /* copy the temp image file to the /assets/products folder. */
                    fs.copyFileSync(ctxProductImage.path, desFilePath);
                    fs.unlinkSync(ctxProductImage.path);

                    /* update the database record with the lasted image path. */
                    await productDAO.updateProductImagePath(id, {
                        imagePath: `/assets/products/${id}.${fileType}`
                    });

                    /* old image should be deleted, if found. */
                    if (existingProduct?.imagePath) {
                        const oldImageFilePath = `${productsDir + path.sep + path.parse(existingProduct?.imagePath).base}`;
                        if (fs.existsSync(oldImageFilePath) && (oldImageFilePath !== desFilePath)) {
                            try {
                                /* delete the old image. */
                                fs.unlinkSync(oldImageFilePath);
                                console.log('old image file deleted!');
                            } catch (error) {
                                reject(error);
                            }
                        } else {
                            console.log('no file deleted!');
                        }
                    }
                    resolve(result);
                } catch (error) {
                    /* error when writing file. */
                    reject(error);
                }
            } else {
                /* productImage are not provided. */
                if (product?.imagePath == null) {
                    const oldImageFilePath = `${productsDir + path.sep + path.parse(existingProduct?.imagePath).base}`;
                    if (fs.existsSync(oldImageFilePath)) {
                        try {
                            /* delete the old image. */
                            fs.unlinkSync(oldImageFilePath);
                            console.log('old image file deleted!');
                        } catch (error) {
                            reject(error);
                        }
                    }
                }
                resolve(result);
            }
        } catch (error) {
            /* error in update process. */
            reject(error);
        }
    })
};


/** delete product by ID.
 * If image found for that id, that image also will be deleted. */
const deleteProduct = async (id) => {

    return new Promise(async (resolve, reject) => {
        try {
            const existingProduct = await productDAO.getProduct(id);
            const oldImageFilePath = `${productsDir + path.sep + path.parse(existingProduct?.imagePath).base}`;
            console.log(oldImageFilePath);
            if (fs.existsSync(oldImageFilePath)) {
                fs.unlinkSync(oldImageFilePath);
            }
            const result = await productDAO.deleteProduct(id);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProduct
}
