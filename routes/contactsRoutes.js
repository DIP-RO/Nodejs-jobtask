const express = require("express");
const {
  getContact,
  updateContact,
  deleteContact,
  CreateContact,
  getContacts,
} = require("../controllers/contactControllers");
const validateToken = require("../controllers/middleware/validateTokenHandler");
const router = express.Router();
router.use(validateToken);
router.route("/").get(getContacts).post(CreateContact);
router.route("/:id").put(updateContact).get(getContact).delete(deleteContact);

module.exports = router;
