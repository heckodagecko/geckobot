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
  uploadFile(
    projectId: Project["id"],
    file: File
  ): Promise<CreateResult<ProjectSourceFile>>;
  createExport(
    id: ProjectSourceFile["id"]
  ): Promise<CreateResult<ProjectExportFile>>;
  rename(
    id: ProjectSourceFile["id"],
    newFilename: string
  ): Promise<UpdateResult<ProjectSourceFile>>;
  delete(id: ProjectSourceFile["id"]): Promise<unknown>;
}
