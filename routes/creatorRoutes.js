const express = require("express");
const validateToken = require("../controllers/middleware/validateTokenHandler");
const router = express.Router();
// Get all creators
const {
  getCreator,
  createCreator,
  deleteCreator,
  updateCreator,
  getCreators,
} = require("../controllers/creatorController");
router.route("/").get(getCreators).post(createCreator);
router.route("/:id").get(getCreator).put(updateCreator).delete(deleteCreator);

module.exports = router;
