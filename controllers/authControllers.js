const { Users } = require('../models/users');
const HttpError = require('..//helpers/HttpError');
const ctrllWrapper  = require('../utils/ctrlWrapper');
const bcrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const jimpOtimizer = require('../helpers/jimpOptimizer');
const { nanoid } = require('nanoid');
const sendLetter = require('..//helpers/emailSender');
const getCurrentServerUrl  = require('../helpers/getCurrentServerUrl')
const { SECRET_KEY } = process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars");

async function registerUser (req, res) {

    const { password, email } = req.body;
    const user = await Users.findOne({email});

    if (user) throw HttpError(409, "Email in use") ;

    const soltPasw = await bcrpt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const result = await Users.create({ password: soltPasw, email, avatarURL, verificationToken });

    const serverUrl = getCurrentServerUrl(req);

    await sendLetter({
        to: email,
        subject: "Your email varification",
        html: `<a target="_blank" href="${serverUrl}/users/verify/${verificationToken}">Click to verify email</a>`
    })

    res.status(201).json({ "user":
        {"email": result.email,
        "subscription": result.subscription,}
    }); 
};

async function loginUser (req, res) {

   const { password, email } = req.body;
   const user = await Users.findOne({email});

   if(!user) { throw HttpError(401, "Email or password is wrong") };

   const checkPassword = await bcrpt.compare(password, user.password);

   if(!checkPassword) { throw HttpError(401, "Email or password is wrong") };

   if(!user.verify) { throw HttpError(401, "Email not verify")}; 

   const payload = {
    id: user._id,
   };

   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

   const result = await Users.findByIdAndUpdate(user._id, { token }, { new: true });

   res.status(200).json({
    token,
    "user":
        {"email": result.email,
        "subscription": result.subscription,}
   });

};

async function logoutUser (req, res) {

    const {_id} = req.user;

    await Users.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json();

};

async function currentUser (req, res) {
    const { _id } = req.user;

    const{ email, subscription } = await Users.findById(_id);

    res.json({
        email, subscription
    });
};

async function updateUserSubscript (req, res) {

   const { _id } = req.user;

   const result = await Users.findByIdAndUpdate( _id, req.body, { new: true } );
  
   res.status(200).json({
        "email": result.email,
        "subscription": result.subscription
   });

};

async function updateUserAvatar (req,res) {

    const { _id } = req.user;

    const { path: tempUpload, filename } = req.file;

    await jimpOtimizer(tempUpload);

    const avatarName = `${_id}_${filename}`;

    const resultPath = path.join(avatarDir, avatarName);

    await fs.rename(tempUpload, resultPath);

    const avatarURL = path.join('avatars', avatarName);

    await Users.findByIdAndUpdate(_id, { avatarURL });

    res.json({avatarURL});

};

async function verifyUserEmail (req, res) {

    const { verificationToken } = req.params;

    const user = await Users.findOne({verificationToken});

    if(!user) { throw HttpError(404, "User not found") };

    await Users.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

    res.status(200).json({
        "message": 'Verification successful'
    });
}

async function repeatVerifyUserEmail (req, res) {

    const { email } = req.body;

    const user = await Users.findOne({ email });

    if(!user) { throw HttpError(404, "User not found") };

    if(user.verify) { throw HttpError(400, "Verification has already been passed")}; 

    const serverUrl = getCurrentServerUrl(req);

    await sendLetter({
        to: email,
        subject: "Your email varification",
        html: `<a target="_blank" href="${serverUrl}/users/verify/${user.verificationToken}">Click to verify email</a>`
    });

    res.status(200).json({
        "message": "Verification email sent",
    });
};


module.exports = {
    registerUser:  ctrllWrapper(registerUser),
    loginUser:  ctrllWrapper(loginUser),
    logoutUser:  ctrllWrapper(logoutUser),
    currentUser:  ctrllWrapper(currentUser),
    updateUserSubscript:  ctrllWrapper(updateUserSubscript),
    updateUserAvatar:  ctrllWrapper(updateUserAvatar),
    verifyUserEmail:  ctrllWrapper(verifyUserEmail),
    repeatVerifyUserEmail:  ctrllWrapper(repeatVerifyUserEmail),
};