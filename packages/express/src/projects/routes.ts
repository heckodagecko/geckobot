import { Router } from "express";

import { validate } from "../middlewares";
import {
  destroyValidation,
  includeTrashedValidation,
  paginationValidation,
} from "../validations";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  restoreProject,
  updateProject,
  updateTags,
} from "./controllers";
import {
  projectCreateValidation,
  projectIdValidation,
  projectTagsUpdateValidation,
  projectUpdateValidation,
} from "./validations";

const router = Router();

// Get all projects
router.get(
  "/",
  paginationValidation,
  includeTrashedValidation,
  validate,
  getAllProjects
);

// Get a project
router.get("/:id", projectIdValidation, validate, getProjectById);

// Create a project
router.post("/", projectCreateValidation, validate, createProject);

// Update a project
router.put(
  "/:id",
  projectIdValidation,
  projectUpdateValidation,
  validate,
  updateProject
);

// Delete a project
router.delete(
  "/:id",
  projectIdValidation,
  destroyValidation,
  validate,
  deleteProject
);

// Restore a project
router.patch("/:id", projectIdValidation, validate, restoreProject);

// Assign and remove tags
router.put(
  "/:id/tags",
  projectIdValidation,
  projectTagsUpdateValidation,
  validate,
  updateTags
);

export default router;
