const connectDB = require("../models");
const { employees } = connectDB;

const getAllEmployee = async (req, res) => {
  try {
      const rootEmployeeId = req?.params?.id;
    if (!rootEmployeeId || rootEmployeeId === undefined) {
    return res.status(404).json({ error: "No id was provided" });
    }
    const hierarchy = await employees.findByPk(rootEmployeeId, {
      include: [
        {
          model: employees,
          as: "children",
          attributes: ["id", "name", "positionId", "positionName"],
          include: [
            {
              model: employees,
              as: "children",
              attributes: ["id", "name", "positionId", "positionName"],
              include: [
                {
                  model: employees,
                  as: "children",
                  attributes: ["id", "name", "positionId", "positionName"],
                },
              ],
            },
          ],
        },
      ],
      attributes: ["id", "name", "positionId", "positionName"],
    });

    return res.json(hierarchy);
  } catch (err) {
    console.error("****Error from hierarchy *****", err);
    return res.status(500).json({ error: "Error fetching hierarchy" });
  }
};

module.exports = {
  getAllEmployee,
};
