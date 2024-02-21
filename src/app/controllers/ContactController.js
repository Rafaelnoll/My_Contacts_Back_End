const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findOne(id);
    if (!contact) {
      response.status(404).json({ error: 'Contact not found!' });
      return;
    }

    response.json(contact);
  }

  async store(request, response) {
    const {
      name,
      email,
      phone,
      categoryId,
    } = request.body;

    if (!name) {
      response.status(400).json({ error: 'name is required' });
      return;
    }

    if (!email) {
      response.status(400).json({ error: 'email is required' });
      return;
    }

    const userAlreadyCreated = await ContactsRepository.findByEmail(email);

    if (userAlreadyCreated) {
      response.status(400).json({ error: 'E-mail is already been taken' });
      return;
    }

    const userCreated = await ContactsRepository.create({
      name,
      email,
      phone,
      categoryId,
    });

    if (userCreated) {
      response.status(201).json(userCreated);
      return;
    }

    response.status(500).json({ error: 'Error on create Contact' });
  }

  async update(request, response) {
    const {
      name,
      email,
      phone,
      categoryId,
    } = request.body;

    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ error: 'Id is required' });
    }

    const contactExists = await ContactsRepository.findOne(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'email is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(404).json({ error: 'This e-mail is already in use' });
    }

    const updatedContact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      categoryId,
    });

    return response.json(updatedContact);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!id) {
      response.status(400).json({ error: 'id is required' });
      return;
    }

    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
