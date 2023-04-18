const contacts = require("..//models/contacts");

const HttpError = require("..//helpers/HttpError");

async function listContacts ( req, res, next){ 
    try {
    const result = await contacts.listContacts();
    res.json(result);

}
catch(error) {
    next(error);

}}

async  function  getContactById (req, res, next) {
    try {
      const {contactId} = req.params;
      const result = await contacts.getContactById(contactId);
      if(!result) {
          throw HttpError(404);
      }
      res.json(result);
  }
  catch(error) {
      next(error);
  }
  }
  async function removeContact(req, res, next){
    try {
        const {contactId} = req.params;
        const result = await contacts.removeContact(contactId);
        if(!result) {
            throw HttpError(404);
        }
        // res.status(204).send()
        res.json({
            message: "Delete success"
        })
    }
    catch(error) {
        next(error);
    }
    }
    async function addContact (req, res, next){
        try {
            const result = await contacts.addContact(req.body);
            res.status(201).json(result);
        }
        catch(error) {
            next(error);
        }
        }
        
        async function updateContact (req, res, next){
            try {
                const {contactId} = req.params;
                const result = await contacts.updateContact(contactId, req.body);
                if(!result) {throw HttpError(404);}
                res.json(result);
            }
            catch(error) {
                next(error);
            }
            }
            module.exports = {
                listContacts,
                getContactById,
                removeContact,
                addContact,
                updateContact,
            };

  