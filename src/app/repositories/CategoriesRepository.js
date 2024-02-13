const { query } = require('../../database');

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const categories = await query(`SELECT * FROM categories ORDER BY name ${direction};`);

    return categories;
  }

  async findOne(id) {
    const [row] = await query('SELECT * FROM categories WHERE  id = $1;', [id]);
    return row;
  }

  async findOneByName(name) {
    const [row] = await query('SELECT * FROM categories WHERE  name = $1;', [name]);
    return row;
  }

  async create({ name }) {
    const [row] = await query(`
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *;
    `, [name]);

    return row;
  }

  async delete(id) {
    const deleteOp = await query('DELETE FROM categories WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new CategoriesRepository();
