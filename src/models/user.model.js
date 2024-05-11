const db = require('../config/database.config');

const User = {
  async create(username, password) {
    const { rows } = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );
    return rows[0];
  },

  async findByUsername(username) {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0];
  },
};

module.exports = User;