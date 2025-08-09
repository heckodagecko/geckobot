import type { Project } from "../../projects";
import type { CreateResult, GetAllResult, UpdateResult } from "../../service";
import type { ProjectExportFile, ProjectSourceFile } from "../data";
import type {
  CreateProjectSourceFolder,
  GetAllProjectSourceFilesOptions,
} from "./types";

export interface ProjectSourceFilesService {
  getAll(
    projectId: Project["id"],
    options?: GetAllProjectSourceFilesOptions
  ): Promise<GetAllResult<ProjectSourceFile>>;
  get(id: ProjectSourceFile["id"]): Promise<ProjectSourceFile>;
  createFolder(
    projectId: Project["id"],
    data: CreateProjectSourceFolder
  ): Promise<CreateResult<ProjectSourceFile>>;
  createExport(
    id: ProjectSourceFile["id"]
  ): Promise<CreateResult<ProjectExportFile>>;
  uploadFile(
    projectId: Project["id"],
    file: File
  ): Promise<CreateResult<ProjectSourceFile>>;
  rename(id: ProjectSourceFile["id"]): Promise<UpdateResult<ProjectSourceFile>>;
  delete(id: ProjectSourceFile["id"]): Promise<unknown>;
}
