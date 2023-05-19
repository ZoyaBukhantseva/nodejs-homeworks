const express = require ("express");
const ctrl = require("..//..//controllers/controllers")
const validateBody  = require("..//..//validations/validations");
const { schemas } = require("..//..//validations/contactValidations");
const authorization = require("..//..//middlewares/authorization")
const validateId = require("..//..//middlewares/validateId")
const router = express.Router();

router.get("/", authorization, ctrl.getAllContacts);

router.get("/:contactId", authorization,validateId, ctrl.getContactById);

router.post("/",  authorization,validateBody(schemas.addSchema), ctrl.addContacts);

router.put("/:contactId", authorization,validateId, validateBody(schemas.putSchema), ctrl.updateContacts);

router.patch("/:contactId/favorite",  authorization, validateId, validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", authorization,validateId, ctrl.removeContacts);

module.exports = router;