import menuJSON from "../../assets/data/menu.json" assert { type: "json" };

export const getMenu = (req, res) => {
  try {
    res.json({ data: menuJSON });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
