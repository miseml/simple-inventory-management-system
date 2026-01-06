export class OrderRepository {
    constructor(OrderModel) {
        this.OrderModel = OrderModel;
    }

    async create(order, session) {
        const [createdOrder] = await this.OrderModel.create([order], { session });
        return createdOrder;
    }
}
