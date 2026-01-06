import mongoose from "mongoose";

export class OrderController {
    constructor(orderRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    createOrder = async (req, res, next) => {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { customerId, products } = req.body;

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
                { customerId, products },
                session
            );

            await session.commitTransaction();

            return res.status(201).json(order);
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
