const { Thought } = require("../models");

module.exports = {
  async createThought(req, res) {
    try {
      const Thoughts = await Thought.create(req.body);
      res.json(Thoughts);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const delThought = await Thought.findOneAndDelete({ _id: req.params.ID });

      if (!delThought) {
        return res.status(400).json({ message: "No thoughts match that ID" });
      }
      res.json({ message: "Sucsessfully deleted" });
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
