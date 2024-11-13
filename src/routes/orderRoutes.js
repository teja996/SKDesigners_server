// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route POST /api/orders
// @access Private
router.post('/', protect, createOrder);

// @route GET /api/orders/myorders
// @access Private
router.get('/myorders', protect, getMyOrders);

// @route GET /api/orders/:id
// @access Private
router.get('/:id', protect, getOrderById);

// @route GET /api/orders
// @access Private/Admin
router.get('/', protect, admin, getAllOrders);

module.exports = router;
