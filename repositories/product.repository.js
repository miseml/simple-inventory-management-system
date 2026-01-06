export class ProductRepository {
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
    }

    async create(product) {
        return this.ProductModel.create(product);
    }

    async findAll() {
        return this.ProductModel.find().lean();
    }

    async incrementStock(productId, amount) {
        return this.ProductModel.findByIdAndUpdate(
            productId,
            { $inc: { stock: amount } },
            { new: true }
        );
    }
}