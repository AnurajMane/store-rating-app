const pool = require("../config/db");

const getDashboard = async (req, res) => {
  try {
    const usersResult = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    const storesResult = await pool.query(
      "SELECT COUNT(*) FROM stores"
    );

    const ratingsResult = await pool.query(
      "SELECT COUNT(*) FROM ratings"
    );

    res.status(200).json({
      success: true,
      data: {
        totalUsers: Number(usersResult.rows[0].count),
        totalStores: Number(storesResult.rows[0].count),
        totalRatings: Number(ratingsResult.rows[0].count),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getDashboard,
};