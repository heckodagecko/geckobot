import { Router } from "express";

import { validate } from "../middlewares";
import {
  createProjectTag,
  deleteProjectTag,
  getAllProjectTags,
  getProjectTagById,
  updateProjectTag,
} from "./controllers";
import {
  projectTagCreateValidation,
  projectTagIdValidation,
  projectTagUpdateValidation,
} from "./validations";

const router = Router();

// Get all project tags
router.get("/", getAllProjectTags);

// Get a project tag
router.get("/:id", projectTagIdValidation, validate, getProjectTagById);

// Create a project tag
router.post("/", projectTagCreateValidation, validate, createProjectTag);

// Update a project tag
router.put(
  "/:id",
  projectTagIdValidation,
  projectTagUpdateValidation,
  validate,
  updateProjectTag
);

// Delete a project tag
router.delete("/:id", projectTagIdValidation, validate, deleteProjectTag);

export default router;
