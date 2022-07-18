import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    favorItems: [{
        id: {type: String, required: true},
        name: { type: String, required: true },
        image1: { type: String, required: true },
        image2: { type: String, required: true },
        brand: { type: String, required: true },
        countInStock: {type: Number, required: true},
        discount: { type: Number, required: true },
        price: { type: Number, required: true },
        isMarked: { type: Boolean, required: true, default: false },
    }]
}, {timestamps: true});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;