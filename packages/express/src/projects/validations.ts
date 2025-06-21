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

export const projectTagsUpdateValidation = [
  check("body").notEmpty().withMessage("Request body cannot be empty"),
  body("assign")
    .optional()
    .isArray()
    .withMessage("The 'assign' field must be an array")
    .custom((value) => {
      if (value && value.length === 0) {
        throw new Error("The 'assign' array cannot be empty");
      }
      return true;
    })
    .bail()
    .custom((value) => {
      if (value && !value.every((id) => Number.isInteger(id) && id > 0)) {
        throw new Error(
          "All items in 'assign' must be valid positive integers"
        );
      }
      return true;
    }),
  body("remove")
    .optional()
    .isArray()
    .withMessage("The 'remove' field must be an array")
    .custom((value) => {
      if (value && value.length === 0) {
        throw new Error("The 'remove' array cannot be empty");
      }
      return true;
    })
    .bail()
    .custom((value) => {
      if (value && !value.every((id) => Number.isInteger(id) && id > 0)) {
        throw new Error(
          "All items in 'remove' must be valid positive integers"
        );
      }
      return true;
    }),
  ,
];
