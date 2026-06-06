const pool = require("../config/db");
const bcrypt = require("bcrypt");

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


const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (
      !["ADMIN", "USER", "STORE_OWNER"].includes(role)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const result = await pool.query(
      `
      INSERT INTO users
      (name,email,password_hash,address,role)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING id,name,email,address,role
      `,
      [
        name,
        email,
        hashedPassword,
        address,
        role,
      ]
    );

    res.status(201).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const {
  name,
  email,
  address,
  role,
  sortBy = "id",
  order = "ASC"
} = req.query;

    let query = `
      SELECT
        id,
        name,
        email,
        address,
        role,
        created_at
      FROM users
      WHERE 1=1
    `;

    const allowedSortFields = [
  "id",
  "name",
  "email",
  "role",
  "created_at"
];

const sortField = allowedSortFields.includes(sortBy)
  ? sortBy
  : "id";

const sortOrder =
  order.toUpperCase() === "DESC"
    ? "DESC"
    : "ASC";

    const values = [];
    let count = 1;

    if (name) {
      query += ` AND LOWER(name) LIKE LOWER($${count++})`;
      values.push(`%${name}%`);
    }

    if (email) {
      query += ` AND LOWER(email) LIKE LOWER($${count++})`;
      values.push(`%${email}%`);
    }

    if (address) {
      query += ` AND LOWER(address) LIKE LOWER($${count++})`;
      values.push(`%${address}%`);
    }

    if (role) {
  const allowedRoles = [
    "ADMIN",
    "USER",
    "STORE_OWNER"
  ];

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role"
    });
  }

  query += ` AND role = $${count++}`;
  values.push(role);
}

    query += ` ORDER BY ${sortField} ${sortOrder}`;

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      users: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    const ownerResult = await pool.query(
      `
      SELECT id, role
      FROM users
      WHERE id = $1
      `,
      [owner_id]
    );

    if (ownerResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store owner not found",
      });
    }

    if (ownerResult.rows[0].role !== "STORE_OWNER") {
      return res.status(400).json({
        success: false,
        message: "User is not a store owner",
      });
    }

    const storeResult = await pool.query(
      `
      INSERT INTO stores
      (name,email,address,owner_id)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [name, email, address, owner_id]
    );

    res.status(201).json({
      success: true,
      store: storeResult.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllStores = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      sortBy = "id",
      order = "ASC",
    } = req.query;

    let query = `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,

        COALESCE(
          ROUND(AVG(r.rating), 2),
          0
        ) AS overall_rating

      FROM stores s

      LEFT JOIN ratings r
      ON s.id = r.store_id

      WHERE 1=1
    `;

    const values = [];
    let count = 1;

    if (name) {
      query += ` AND LOWER(s.name) LIKE LOWER($${count++})`;
      values.push(`%${name}%`);
    }

    if (email) {
      query += ` AND LOWER(s.email) LIKE LOWER($${count++})`;
      values.push(`%${email}%`);
    }

    if (address) {
      query += ` AND LOWER(s.address) LIKE LOWER($${count++})`;
      values.push(`%${address}%`);
    }

    query += `
      GROUP BY s.id
    `;

    const allowedSortFields = [
      "id",
      "name",
      "email",
      "address",
    ];

    const sortField = allowedSortFields.includes(sortBy)
      ? sortBy
      : "id";

    const sortOrder =
      order.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";

    query += `
      ORDER BY ${sortField} ${sortOrder}
    `;

    const result = await pool.query(query, values);

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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
  `
  SELECT
      u.id,
      u.name,
      u.email,
      u.address,
      u.role,
      u.created_at,

      CASE
        WHEN u.role = 'STORE_OWNER' THEN (
          SELECT
            ROUND(AVG(r.rating), 2)
          FROM stores s
          LEFT JOIN ratings r
          ON s.id = r.store_id
          WHERE s.owner_id = u.id
        )
        ELSE NULL
      END AS average_rating

  FROM users u

  WHERE u.id = $1
  `,
  [id]
);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        s.owner_id,

        COALESCE(
          ROUND(AVG(r.rating), 2),
          0
        ) AS overall_rating

      FROM stores s

      LEFT JOIN ratings r
      ON s.id = r.store_id

      WHERE s.id = $1

      GROUP BY s.id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    res.status(200).json({
      success: true,
      store: result.rows[0],
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
  createUser,
  getAllUsers,
  getAllStores,
  createStore,
  getUserById,
  getStoreById
};