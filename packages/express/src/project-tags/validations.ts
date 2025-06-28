import { body, check, param } from "express-validator";

export const projectTagIdValidation = [
  param("id").isInt().withMessage("Param id must be an integer").toInt(),
];

export const projectTagCreateValidation = [
  body("name").isString().notEmpty().trim().withMessage("Name is required"),
  body("color")
    .isString()
    .optional()
    .trim()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Color must be in a valid hex format"),
];

export const projectTagUpdateValidation = [
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
  body("color")
    .isString()
    .optional()
    .trim()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Color must be in a valid hex format"),
];
