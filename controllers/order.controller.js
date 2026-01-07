import mongoose from "mongoose";
import {calculateFinalOrderValue} from "../business-model/discounts.js";

export class OrderController {
    constructor(orderRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    createOrder = async (req, res, next) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const {customerId, products} = req.body;

            for (const item of products) {
                const updatedProduct =
                    await this.productRepository.decrementStock(
                        item.productId,
                        item.quantity,
                        session
                    );

                if (!updatedProduct) {
                    throw new Error("INSUFFICIENT_STOCK");
                }
            }

            const order = await this.orderRepository.create(
                {customerId, products},
                session
            );

            const orderItems = await Promise.all(
                products.map(async ({productId, quantity}) => {
                    const product = await this.productRepository.findById(productId);
                    if (!product) {
                        throw new Error("PRODUCT_NOT_FOUND");
                    }
                    const category = product.description.split(" ")[0] || "OTHER";

                    return {
                        price: product.price,
                        quantity,
                        category
                    };
                })
            );
            const {customerLocation, orderDate} = req.body;
            const customer = {
                location: customerLocation,
            };
            const total = calculateFinalOrderValue({
                orderItems,
                customer,
                orderDate
            });

            await session.commitTransaction();
            return res.status(201).json({order, total});
        } catch (err) {
            await session.abortTransaction();

            if (err.message === "INSUFFICIENT_STOCK") {
                return res.status(400).json({
                    message: "Insufficient stock for one or more products",
                });
            }

            next(err);
        } finally {
            await session.endSession();
        }
    };
}
