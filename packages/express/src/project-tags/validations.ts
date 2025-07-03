import { body, param } from "express-validator";

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
  body("name")
    .isString()
    .optional()
    .notEmpty()
    .trim()
    .withMessage("Name is required"),
  body("color")
    .optional({ nullable: true })
    .custom(
      (value) =>
        value === null ||
        (typeof value === "string" && /^#[0-9A-Fa-f]{6}$/.test(value))
    )
    .withMessage("Color must be in a valid hex format or null"),
];
