import {validateRequest} from "../middlewares/error.handling.js";

import express from 'express';
import {createProductValidator} from "../validators/product.validator.js";
import {restockProductValidator} from "../validators/product.validator.js";

export const createProductRoutes = (productController) => {
    const router = express.Router();

    router.post(
        "/",
        createProductValidator,
        validateRequest,
        productController.createProduct
    );

    router.get(
        "/",
        productController.getAllProducts
    );

    router.post(
        "/:id/restock",
        restockProductValidator,
        validateRequest,
        productController.restockProduct
    );

    return router;
};