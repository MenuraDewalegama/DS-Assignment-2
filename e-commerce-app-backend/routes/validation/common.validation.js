/*
@author : Dhanusha Perera
@date : 12/05/2021
*/

/* error object. */
let validationResultObject = {
    code: 200,
    message: 'success'
}


/** validate the given ID.
 *
 * @param id id which is going to be validated.
 * @returns errorMessage errors are logged into errorMessage variable as a string.
 * if no errors found then errorMessage object would be a string string. */
const validateID = (id) => {
    let errorMessage = '';
    if (id) {
        errorMessage = '';
        try {
            require('mongodb').ObjectID(id);
        } catch (error) {
            errorMessage += 'ID is invalid. ID value should be 12 bytes in length. ' +
                'ID should be contained only letters (case does not matter) and numbers.';
        }
    } else {
        errorMessage += 'Invalid: ID is required.';
    }

    return errorMessage;
}

/** validate the given URL.
 * @param entityName name of the resource entity.
 * if the entity is 'products', @param entityName should be 'products'.
 * @param URLtoEntity URL of the Entity. /{entityName}/{24 digits}.
 *
 * ex: /products/609bd21d6867543e3833ba31
 * */
const validateURL = (entityName, URLtoEntity) => {
    const regExp = new RegExp('^\\/'+ entityName +'\\/[A-Za-z\\d]{24}$');
    return (regExp.test(URLtoEntity));
};

/** Check whether a matching record in the database.
 *
 * @param entityName name of the entity which working with (always plural).
 * @param URLtoEntity URL of the resource. ex: /products/{24 digit ID}
 * @param checkForRecord callback function to find the record by given ID.
 *
 * @return Promise returns matching record if found, otherwise return validationResultObject. */
const isEntityExists = async (entityName, URLtoEntity, checkForRecord) => {
    return new Promise(async (resolve, reject) => {

        if (validateURL(entityName, URLtoEntity)) {
            /* extract the ID from the URL. */
            const extractedID = URLtoEntity.replace('/' + entityName + '/', '');

            const validationResultOfProductID = validateID(extractedID);
            if (validationResultOfProductID) {
                /* id is invalid. */
                reject(validationResultObject = {
                    code: 400,
                    message: validationResultOfProductID
                });
            }

            try {
                const foundResult = await checkForRecord(extractedID);
                if (foundResult) {
                    /* found a matching record. */
                    // resolve(validationResultObject = {
                    //     code: 200,
                    //     message: 'success'
                    // });
                    resolve(foundResult);
                } else {
                    /* found a matching record. */
                    reject(validationResultObject = {
                        code: 404,
                        message: 'No matching record found.'
                    });
                }
            } catch (error) {
                reject(validationResultObject = {
                    code: 500,
                    message: 'Internal Server Error. Error occurred when finding a matching record.'
                });
            }

        } else {
            /* provided URL is invalid. */
            reject(validationResultObject = {
                code: 400,
                message: 'Invalid: Provided URL is invalid. URL should be formatted "/entityName/<24 digit ID>" '
            });
        }


    });
};


module.exports = {
    validateID,
    validateURL,
    isEntityExists
}
