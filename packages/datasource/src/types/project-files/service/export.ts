import { Project } from "../../projects";
import { ProjectExportFile } from "../data";
import { GetAllProjectExportFilesOptions } from "./types";

export interface ProjectExportFilesService {
  getAll(
    projectId: Project["id"],
    options?: GetAllProjectExportFilesOptions
  ): any;
  get(id: ProjectExportFile["id"]): any;
  upload(projectId: Project["id"], file: File): any;
  delete(id: ProjectExportFile["id"]): any;
  download(id: ProjectExportFile["id"]): any;
}
