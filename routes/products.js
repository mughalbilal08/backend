const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct); // Respond with the newly created product
});

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products); // Respond with a list of products
});

// Update a product by ID
router.put('/:id', async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true } // Return the updated document
    );
    if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct); // Respond with the updated product
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' }); // Respond with success message
});

module.exports = router;
