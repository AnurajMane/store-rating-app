const pool = require("../config/db");

const getAllStores = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,

        COALESCE(
          ROUND(AVG(r.rating), 2),
          0
        ) AS overall_rating,

        (
          SELECT rating
          FROM ratings
          WHERE user_id = $1
          AND store_id = s.id
        ) AS user_rating

      FROM stores s

      LEFT JOIN ratings r
      ON s.id = r.store_id

      GROUP BY s.id

      ORDER BY s.id
      `,
      [userId]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      stores: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const submitRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const storeId = req.params.storeId;

    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const storeResult = await pool.query(
      `
      SELECT id
      FROM stores
      WHERE id = $1
      `,
      [storeId]
    );

    if (storeResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    const existingRating = await pool.query(
      `
      SELECT id
      FROM ratings
      WHERE user_id = $1
      AND store_id = $2
      `,
      [userId, storeId]
    );

    if (existingRating.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message:
          "You have already rated this store",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO ratings
      (user_id, store_id, rating)
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [userId, storeId, rating]
    );

    res.status(201).json({
      success: true,
      rating: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const storeId = req.params.storeId;
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    const existingRating = await pool.query(
      `
      SELECT id
      FROM ratings
      WHERE user_id = $1
      AND store_id = $2
      `,
      [userId, storeId]
    );

    if (existingRating.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Rating not found"
      });
    }

    const result = await pool.query(
      `
      UPDATE ratings
      SET rating = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $2
      AND store_id = $3
      RETURNING *
      `,
      [rating, userId, storeId]
    );

    res.json({
      success: true,
      rating: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const getMyRatings = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        r.id,
        r.rating,
        s.id AS store_id,
        s.name AS store_name
      FROM ratings r
      JOIN stores s
      ON s.id = r.store_id
      WHERE r.user_id = $1
      `,
      [req.user.id]
    );

    res.json({
      success: true,
      ratings: result.rows
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
  getAllStores,
  submitRating,
  updateRating,
  getMyRatings
};