const router = require("express").Router();
const {
  createThought,
  deleteThought,
} = require("../../controllers/thoughtController");

router
  .route("/api/thoughts/:thoughtId/reactions")
  .post(createThought)
  .delete(deleteThought);
module.exports = router;
