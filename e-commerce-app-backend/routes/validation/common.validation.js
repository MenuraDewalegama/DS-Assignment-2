/*
@author : Dhanusha Perera
@date : 12/05/2021
*/


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

module.exports = {
    validateID
}
