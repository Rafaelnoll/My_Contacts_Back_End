const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;

    const categories = await CategoriesRepository.findAll(orderBy);

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      response.status(400).json({ error: 'name is required' });
      return;
    }

    const categoryExists = await CategoriesRepository.findOneByName(name);

    if (categoryExists) {
      response.status(400).json({ error: 'Category with this name already exists' });
      return;
    }

    const categoryCreated = await CategoriesRepository.create({ name });
    response.status(201).json(categoryCreated);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({ error: 'id is required' });
      return;
    }

    await CategoriesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
