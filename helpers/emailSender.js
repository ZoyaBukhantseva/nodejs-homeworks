const nodemailer = require("nodemailer")
require("dotenv").config(); 

const {GMAIL_PASSWORD} = process.env;


const nodemailerConfig ={
host: "smtp.meta.ua",
port: 465,
secure: true,
ayth:{
    user:"zoyabukhantseva@meta.ua",
    pass:GMAIL_PASSWORD
}
}

const transport= nodemailer.createTransport(nodemailerConfig);

const sendLetter = async(data) => {
    const email = {...data, from:"zoyabukhantseva@meta.ua"}; 
    await transport.sendMail(email)
    return true;
};
module.exports = sendLetter;
