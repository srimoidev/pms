const db = require("../models/index");
module.exports = {
  index: async (req, res) => {
    try {
      const project_member = await db.project_member.findAll(29);
      return res.json(project_member);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Cannot get data from database." });
    }
  },
};
