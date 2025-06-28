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
  check("body").custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error("Request body cannot be empty");
    }
    return true;
  }),
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

export const projectUpdateTagsValidation = [
  check("body").notEmpty().withMessage("Request body cannot be empty"),
  body("assign")
    .optional()
    .isArray()
    .withMessage("The 'assign' field must be an array"),
  body("remove")
    .optional()
    .isArray()
    .withMessage("The 'remove' field must be an array"),
  body("assign.*")
    .isInt()
    .withMessage("Each item in 'assign' must be an integer")
    .toInt(),
  body("remove.*")
    .isInt()
    .withMessage("Each item in 'remove' must be an integer")
    .toInt(),
];
