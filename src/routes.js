const express = require('express');

const ContactController = require('./app/controllers/ContactController');
const CategoryController = require('./app/controllers/CategoryController');

const router = express.Router();

// GET
router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);

router.get('/categories', CategoryController.index);

// POST
router.post('/contacts', ContactController.store);
router.post('/categories', CategoryController.store);

// PUT
router.put('/contacts/:id', ContactController.update);

// DELETE
router.delete('/contacts/:id', ContactController.delete);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;
