import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const sorting = req.query.sorting || 1;

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        },
        brand: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const filter = req.query.filter ? {
        brand: {
            $regex: req.query.filter,
            $options: 'i'
        }
    } : {}



    const count = await Product.countDocuments({ ...keyword, ...filter });
    const products = await Product.find({ ...keyword, ...filter }).sort({"price": sorting}).limit(pageSize).skip(pageSize * ( page - 1));

    if(count === 0) {
        res.status(404)
        throw new Error('Product not found');
    }else{
        res.json({ products, page, pages: Math.ceil(count / pageSize) })
    }
    
});

const getRandomProducts = asyncHandler(async (req, res) => {
    const randomProducts = 6;
    const products = await Product.find({})

    const max = products.length - randomProducts;
    const min = 0;
    const start = Math.floor(Math.random() * (max - min) + min);
    const randomProductsList = products.slice(start, start + randomProducts);

    res.json(randomProductsList);
})

// @desc Fetch single products
// @route GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(404)
        throw new Error('Product not found');
    }else{
        res.json(product);
    }
    
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(404)
        throw new Error('Product not found');
    }else{
        await product.remove();
        res.json({message: 'Product deleted'});
    }
})

// @desc Create a product
// @route POST /api/products/
// @access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image1: '/images/sample.jpg',
        image2: '/images/sample.jpg',
        brand: 'Sample brand',
        countInStock: 0,
        numReviews: 0,
        rating: 0,
        description: 'Sample description',
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
})

// @desc Update a product
// @route PUT /api/products/
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
    const {
        name, 
        price, 
        image1,
        image2, 
        brand, 
        countInStock, 
        numReviews, 
        rating, 
        description
    } = req.body;

    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(404)
        throw new Error('Product not found');
    }else{
        product.name = name;
        product.price = price;
        product.image1 = image1;
        product.image2 = image2;
        product.brand = brand;
        product.countInStock = countInStock;
        product.numReviews = numReviews;
        product.rating = rating;
        product.description = description;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
})

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewd = product.reviews.find(review => review.user.toString() === req.user._id.toString());

        if(alreadyReviewd){
            res.status(400)
            throw new Error('You already reviewed this product');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

        await product.save()
        res.status(201).json({message: 'Review added'})
    }else{
        res.status(404)
        throw new Error('Product not found');
    }
})

export {getProducts, getRandomProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview};