import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        customerId: {
            type: String,
            required: true,
        },
        products: {
            type: [orderItemSchema],
            required: true,
            validate: (v) => v.length > 0,
        },
        status: {
            type: String,
            enum: ["CREATED"],
            default: "CREATED",
        },
    },
    { timestamps: true }
);

export const OrderModel = mongoose.model("Order", orderSchema);
