const { User, Thought } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.ID }).select("-__v");

      if (!user) {
        return res.status(400).json({ message: "No users match that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async updateUser(req, res) {
    const { username, email } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.ID },
        { username, email },
        { new: true }
      );
      if (updatedUser) {
        res.status(200).json({ message: "Sucsess", user: updatedUser });
      } else {
        res.status(400).json({ message: "No user assosiated with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.ID });
      if (!user) {
        return res.status(400).json({ message: "No users match that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.Thought } });
      res.json({ message: "Sucsessfully deleted" });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.ID },
        {
          $push: {
            friends: req.params.friendId,
          },
        },
        { new: true }
      );
      if (updatedUser) {
        res.status(200).json({ message: "Sucsess" });
      } else {
        res.status(400).json({ message: "No user assosiated with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const deletedFriend = await User.findOneAndUpdate(
        { _id: req.params.ID },
        {
          $pull: {
            friends: req.params.friendId,
          },
        },
        { new: true }
      );
      if (deletedFriend) {
        res.status(200).json({ message: "Sucsess" });
      } else {
        res.status(400).json({ message: "No user assosiated with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
