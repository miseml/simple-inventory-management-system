export class ProductController {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    createProduct = async (req, res, next) => {
        try {
            const { name, description, price, stock } = req.body;

            const product = {
                id: crypto.randomUUID(),
                name,
                description,
                price,
                stock,
                createdAt: new Date().toISOString(),
            };

            const savedProduct = await this.productRepository.create(product);

            return res.status(201).json(savedProduct);
        } catch (err) {
            next(err);
        }
    };

    getAllProducts = async (req, res, next) => {
        try {
            const products = await this.productRepository.findAll();
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    };
}
