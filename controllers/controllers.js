const {Contact} = require("../models/contacts");
const ctrlWrapper  = require("../utils/ctrlWrapper");

const HttpError  = require("..//helpers/HttpError");

const getAllContacts = async (req, res) => {
  const { _id:owner } = req.user;
      const { page = 1, limit = 20, favorite } = req.query;

      const skip = (page - 1) * limit;

      const query = (favorite !== undefined)?{ owner, favorite }:{ owner };  

      const result = await Contact.find(query, { skip, limit }).populate("owner", "email subscription");
      res.json(result);
 
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const addContacts = async (req, res) => {
  const { _id:owner } = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

const removeContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.status(200).json({
    message: "Delete success",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContacts: ctrlWrapper(addContacts),
  updateContacts: ctrlWrapper(updateContacts),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContacts: ctrlWrapper(removeContacts)
};