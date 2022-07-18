import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        require: true,
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
});

const favorSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isMarked: {
        type: Boolean,
        required: true,
        default: false,
    }
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true,
    },
    image2: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }, 
    numReviews: {
        type: Number,
        required: true,
        default: 0
    }, 
    discount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    reviews: [reviewsSchema],
    favors: [favorSchema],
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

export default Product;