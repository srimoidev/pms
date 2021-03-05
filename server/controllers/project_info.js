const db = require("../models/index");
module.exports = {
  index: async (req, res) => {
    try {
      const project_info = await db.project_info.findByPk(29);
      return res.json(project_info);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Cannot get data from database." });
    }
  },
};
