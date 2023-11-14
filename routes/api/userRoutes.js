const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:ID").get(getSingleUser).put(updateUser).delete(deleteUser);

router.route("/:ID/friends/:friendId").post(addFriend).delete(deleteFriend);
module.exports = router;
