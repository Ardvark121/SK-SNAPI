const { Thought } = require("../models");

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
      res.json(thought);
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
      const Thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!Thought) {
        return res.status(400).json({ message: "No Thoughts match that ID" });
      }
      res.json({ message: "Sucsessfully deleted" });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
