const pool = require("../config/db");

const getStoreStats = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        COALESCE(
          ROUND(AVG(r.rating),2),
          0
        ) AS average_rating,
        COUNT(r.id) AS total_ratings
      FROM stores s
      LEFT JOIN ratings r
      ON s.id = r.store_id
      WHERE s.owner_id = $1
      GROUP BY s.id
      `,
      [req.user.id]
    );

    res.json({
      success: true,
      stores: result.rows
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const getUsersWhoRated = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        r.rating,
        s.name AS store_name
      FROM ratings r
      JOIN users u
      ON u.id = r.user_id
      JOIN stores s
      ON s.id = r.store_id
      WHERE s.owner_id = $1
      ORDER BY r.created_at DESC
      `,
      [req.user.id]
    );

    res.json({
      success: true,
      users: result.rows
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = {
  getStoreStats,
  getUsersWhoRated,
};