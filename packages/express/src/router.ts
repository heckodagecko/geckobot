import { Router } from "express";

import { projectRouter } from "./projects";
import { projectTagRouter } from "./project-tags";

const router = Router();

router.use("/projects", projectRouter);
router.use("/project-tags", projectTagRouter);

export default router;
