import type { Project } from "../../projects";
import type { CreateResult, DeleteResult, GetAllResult } from "../../service";
import type { ProjectExportFile } from "../data";
import type { GetAllProjectExportFilesOptions } from "./types";

export interface ProjectExportFilesService {
  getAll(
    projectId: Project["id"],
    options?: GetAllProjectExportFilesOptions
  ): Promise<GetAllResult<ProjectExportFile>>;
  get(id: ProjectExportFile["id"]): Promise<ProjectExportFile>;
  upload(
    projectId: Project["id"],
    file: File
  ): Promise<CreateResult<ProjectExportFile>>;
  delete(id: ProjectExportFile["id"]): Promise<DeleteResult>;
  download(id: ProjectExportFile["id"]): Promise<unknown>;
}
