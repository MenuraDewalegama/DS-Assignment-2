/*
@author : Dhanusha Perera
@date : 12/05/2021
*/

const commonValidation = require('./common.validation');
const userAPI = require('../../api/user.api');

const validateUser = (user) => {
    let errorMessage = '';
    errorMessage += validateName(user);
    errorMessage += validateContactNo(user);
    errorMessage += validateType(user);
    errorMessage += validatePassword(user);
    return errorMessage;
}

const validateName = (user) => {
    let errorMessage = '';
    if (user.hasOwnProperty('name')) {
        if (new RegExp('^[A-Za-z][\A-Za-z ]+$').test(user.name)) {
            errorMessage = '';
        } else {
            errorMessage += 'Name is invalid. First letter should be a letter. Letters, numbers, underscore, spaces allowed. \n';
        }
    } else {
        errorMessage += 'Name is required.';
    }

    return errorMessage;
};


const validateContactNo = (user) => {
    let errorMessage = '';
    if (user.hasOwnProperty('contactNo')) {
        if (new RegExp('^[\\d]{10}$').test(user.contactNo)) {
            errorMessage = '';
        } else {
            errorMessage += 'Contact No is invalid. Contact no should be 10 digit number. ex: 0771234567 \n';
        }
    } else {
        errorMessage += 'Contact No is required.';
    }

    return errorMessage;
};

const validateType = (user) => {
    let errorMessage = '';
    if (user.hasOwnProperty('type')) {
        if (new RegExp('^ADMIN$|^USER$').test(user.type)) {
            errorMessage = '';
        } else {
            errorMessage += 'Type is invalid. ADMIN and USER (in uppercase) are only valid inputs.\n';
        }
    } else {
        errorMessage += 'Type No is required.\n';
    }

    return errorMessage;
};

const validatePassword = (user) => {
    let errorMessage = '';
    if (user.hasOwnProperty('password')) {
        if (user?.password?.length >= 6) {
            errorMessage = '';
        } else {
            errorMessage += 'Password is weak. Your password should contain at least 6 digit or more.\n';
        }
    } else {
        errorMessage += 'Type No is required.\n';
    }

    return errorMessage;
};


/** check for the user by URL.
 * @param URL ex: /users/{24 digit ID}
 * @returns Promise with the product if found, otherwise reason. */
const checkRecordByURI = async (userURI) => {
    return await commonValidation.isEntityExists('users', userURI, userAPI.getUser);
}

module.exports = {
    validateName,
    validateContactNo,
    validateType,
    validatePassword,
    validateUser,
    checkRecordByURI
}
