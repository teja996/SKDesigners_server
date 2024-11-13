// controllers/orderController.js
const Order = require('../models/order');

// @desc Create new order
// @route POST /api/orders
// @access Private
exports.createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    const order = new Order({
      user: req.user.id,
      orderItems,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price');

    if (order) {
      // Ensure that the user requesting the order owns it or is an admin
      if (order.user._id.toString() === req.user.id || req.user.isAdmin) {
        res.json(order);
      } else {
        res.status(401).json({ message: 'Not authorized to view this order' });
      }
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get logged-in user's orders
// @route GET /api/orders/myorders
// @access Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('orderItems.product', 'name price')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    // Check if the user is an admin
    if (!req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized as an admin' });
    }

    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('orderItems.product', 'name price')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
