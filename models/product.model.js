import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0.01,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const ProductModel = mongoose.model("Product", productSchema);
