import asyncHandler from "express-async-handler";
import Favorite from "../models/favorModel.js";
import Product from "../models/productModel.js";

// @desc  - Add to favor
// @route - POST /api/favor
// @access - Private

const addToFavor = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const product = await Product.findOne({ _id: id });
  const collection = await Favorite.findOne({ user: req.user._id });

  if (collection) {
    const duplicatedProduct = collection.favorItems.find(
      (p) => p.name === product.name
    );

    if (duplicatedProduct) {
      res.status(400);
      throw new Error("Product already exist in wishlist");
    } else {
      collection.favorItems.push({
        id: product._id,
        name: product.name,
        image1: product.image1,
        image2: product.image2,
        brand: product.brand,
        discount: product.discount,
        price: product.price,
        countInStock: product.countInStock,
        isMarked: true
      });

      product.favors.push({
        user: req.user._id,
        isMarked: true
      })

      await product.save();
      await collection.save();
      res.status(201).json(collection);
    }
  } else {
    if (product) {
      const favor = new Favorite({
        user: req.user._id,
        favorItems: [
          {
            id: product._id,
            name: product.name,
            image1: product.image1,
            image2: product.image2,
            price: product.price,
            brand: product.brand,
            discount: product.discount,
            countInStock: product.countInStock,
          },
        ],
      });

      const favorItem = await favor.save();

      res.status(201).json(favorItem);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }
});

const getFavor = asyncHandler(async (req, res) => {
  const favor = await Favorite.find({ user: req.user._id });

  if(req.user._id){
    if (favor) {
      res.status(200).json(favor);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }else{
    res.status(401);
    throw new Error("Sign in to see your wishlist");
  }
});

const deleteFavor = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const collection = await Favorite.findOne({ user: req.user._id });

  if (product) {
    if(collection.favorItems.length >= 1) {
      collection.favorItems.splice(collection.favorItems.indexOf(product), 1);
      product.favors.splice(product.favors.indexOf(req.user._id), 1);
      await product.save();
      await collection.save();
      res.status(200).json(collection);
    }else{
      res.status(404);
      throw new Error("Product is not in wishlist");
    }
  }else{
    res.status(404);
    throw new Error("Product not found");
  }
});

export { addToFavor, getFavor, deleteFavor };
