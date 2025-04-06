import { query } from "express-validator";

export const paginationValidation = [
  query("pageNo")
    .isInt({ min: 1 })
    .optional()
    .withMessage("Query pageNo must be a positive integer"),
  query("pageSize")
    .isInt({ min: 1 })
    .optional()
    .withMessage("Query pageSize must be a positive integer"),
];

export const includeTrashedValidation = [
  query("includeTrashed")
    .isBoolean()
    .optional()
    .withMessage("Query includeTrashed must be a boolean")
    .toBoolean(),
];

export const destroyValidation = [
  query("destroy")
    .isBoolean()
    .optional()
    .withMessage("Query destroy must be a boolean")
    .toBoolean(),
];
