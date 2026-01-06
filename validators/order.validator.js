import {body} from "express-validator";

export const createOrderValidator = [
    body("customerId")
        .notEmpty()
        .withMessage("customerId is required"),

    body("products")
        .isArray({min: 1})
        .withMessage("products must be a non-empty array"),

    body("products.*.productId")
        .isMongoId()
        .withMessage("Invalid productId"),

    body("products.*.quantity")
        .isInt({gt: 0})
        .withMessage("Quantity must be a positive integer"),
];
