const { Thought, User } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const Thoughts = await Thought.find();
      res.json(Thoughts);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(400).json({ message: "No Thoughts match that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const updateUser = await User.findOneAndUpdate(
        { username: req.body.username },
        {
          $push: {
            thoughts: thought._id,
          },
        },
        { new: true }
      );
      if (thought && updateUser) {
        res.status(200).json({ message: "Sucsess" });
      } else {
        res.status(400).json({ message: "No Thought assosiated with that ID" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async updateThought(req, res) {
    const { thoughtText } = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { thoughtText },
        { new: true }
      );
      if (updatedThought) {
        res.status(200).json({ message: "Sucsess", Thought: updatedThought });
      } else {
        res.status(400).json({ message: "No Thought assosiated with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res.status(400).json({ message: "No Thoughts match that ID" });
      }
      res.json({ message: "Sucsessfully deleted" });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async createReaction(req, res) {
    const newReaction = req.body;
    try {
      const updatedReaction = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: newReaction } },
        { new: true }
      );
      if (updatedReaction) {
        res.status(200).json({ message: "Sucsess" });
      } else {
        res.status(400).json({ message: "No Thought assosiated with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    const newReaction = req.body;
    try {
      const deleteReaction = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: newReaction } },
        { new: true }
      );
      if (deleteReaction) {
        res.status(200).json({ message: "Sucsess", Thought: updatedThought });
      } else {
        res.status(400).json({ message: "No Thought assosiated with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
