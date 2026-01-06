import { body, param } from "express-validator";

export const createProductValidator = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ max: 50 }).withMessage("Name must be at most 50 characters"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ max: 50 }).withMessage("Description must be at most 50 characters"),

    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ gt: 0 }).withMessage("Price must be a positive number"),

    body("stock")
        .notEmpty().withMessage("Stock is required")
        .isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
];

export const restockProductValidator = [
    param("id").isMongoId().withMessage("Invalid product id"),
    body("amount")
        .isInt({ gt: 0 })
        .withMessage("Restock amount must be a positive integer"),
];

export const sellProductValidator = [
    param("id").isMongoId().withMessage("Invalid product id"),
    body("amount")
        .isInt({ gt: 0 })
        .withMessage("Sell amount must be a positive integer"),
];