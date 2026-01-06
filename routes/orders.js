import express from "express";
import { createOrderValidator } from "../validators/order.validator.js";

import {validateRequest} from "../middlewares/error.handling.js";

export const createOrderRoutes = (orderController) => {
    const router = express.Router();

    router.post(
        "/",
        createOrderValidator,
        validateRequest,
        orderController.createOrder
    );

    return router;
};
