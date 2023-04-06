const express = require("express");
const { validatePostData, validatePutData } = require('..//..//validations/validations');
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../controllers/controllers');


const router = express.Router();

router.get('/', listContacts);

router.get('/:contactId', getContactById);


router.post('/', validatePostData, addContact);


router.delete('/:contactId', removeContact);

router.put('/:contactId', validatePutData, updateContact);

module.exports = router;