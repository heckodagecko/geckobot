import { body, check, param } from "express-validator";

export const projectIdValidation = [
  param("id").isInt().withMessage("Param id must be an integer").toInt(),
];

export const projectCreateValidation = [
  body("name").isString().notEmpty().trim().withMessage("Name is required"),
  body("description")
    .isString()
    .optional()
    .trim()
    .withMessage("Description must be a string"),
  body("startedAt").isISO8601().optional().withMessage("Date must be a date"),
];

export const projectUpdateValidation = [
  check("body").isEmpty().withMessage("Request body cannot be empty"),
  body("name")
    .isString()
    .optional()
    .notEmpty()
    .trim()
    .withMessage("Name is required"),
  body("description")
    .isString()
    .optional()
    .trim()
    .withMessage("Description must be a string"),
  body("startedAt").isISO8601().optional().withMessage("Date must be a date"),
];
