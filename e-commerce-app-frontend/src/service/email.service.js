/*
@author : Dhanusha Perera
@date : 23/05/2021
*/
// import axios from './axios.service';
const axios = require('axios');

/**
 * Send email using emailJS web service.
 * "user_id": "user_Swzja6hgJOB3MOMfn8x53"
 * "service_id": "service_727resg"
 * "template_id": "template_7yqrsnk"
 * */
const sendEmail = ({
                       user_id,
                       service_id,
                       template_id,
                       template_params: {from_name, to_name, reply_to, address, message, itemName, quantity, unitPrice, total},
                       accessToken
                   }) => {
    const sendData = {
        user_id,
        service_id,
        template_id,
        template_params: {from_name, to_name, reply_to,address, message, itemName, quantity, unitPrice, total},
        accessToken
    };

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send',
                JSON.stringify(sendData), {
                    headers: {'Content-Type': 'application/json'}
                });
            if (response.status === 200) {
                resolve(true);
            }
        } catch (error) {
            reject(error);
        }
    });
};


// sendEmail({
//     user_id: 'user_Swzja6hgJOB3MOMfn8x53',
//     service_id: 'service_727resg',
//     template_id: 'template_3cvmc3f',
//     template_params: {
//         from_name: 'Janaka Chinthana',
//         to_name: 'Dhanusha Perera',
//         reply_to: 'buddhika.dhanusha@gmail.com',
//         message: 'Hello, I am testing the emailJS service.'
//     },
//     accessToken: '6ceb240ee4e4e409d19845b2e08cd7fa'
// }).then(response => {
//     console.log(response);
// }).catch(reason => {
//     console.error(reason);
// });

module.exports = {
    sendEmail
};