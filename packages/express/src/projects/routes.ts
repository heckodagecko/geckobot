import { Router } from "express";

import { validate } from "../middlewares";
import {
  paginationValidation,
  includeTrashedValidation,
  destroyValidation,
} from "../validations";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "./controllers";
import {
  projectIdValidation,
  projectCreateValidation,
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

export default router;
