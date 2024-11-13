// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// @route GET /api/categories
// @route POST /api/categories
router.route('/')
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);
  
// @route GET /api/categories/:id
// @route PUT /api/categories/:id
// @route DELETE /api/categories/:id
router.route('/:id')
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
