import type { Project } from "../../projects";
import type { ProjectSourceFile } from "../data";
import type {
  CreateProjectSourceFolder,
  GetAllProjectSourceFilesOptions,
} from "./types";

export interface ProjectSourceFilesService {
  getAll(
    projectId: Project["id"],
    options?: GetAllProjectSourceFilesOptions
  ): void;
  get(id: ProjectSourceFile["id"]): void;
  createFolder(projectId: Project["id"], data: CreateProjectSourceFolder): void;
  createExport(id: ProjectSourceFile["id"]): void;
  uploadFile(projectId: Project["id"], file: File): void;
  rename(id: ProjectSourceFile["id"]): void;
  delete(id: ProjectSourceFile["id"]): void;
}
