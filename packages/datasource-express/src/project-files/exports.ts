import type {
  CreateResult,
  DeleteResult,
  GetAllProjectExportFilesOptions,
  GetAllResult,
  Project,
  ProjectExportFile,
  ProjectExportFilesService,
} from "@geckobot/datasource";
import type { AxiosInstance } from "axios";

export default class ExpressProjectExportFilesService
  implements ProjectExportFilesService
{
  readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAll(
    projectId: Project["id"],
    options: GetAllProjectExportFilesOptions = {}
  ): Promise<GetAllResult<ProjectExportFile>> {
    throw new Error("Method not implemented.");
  }

  async get(id: ProjectExportFile["id"]): Promise<ProjectExportFile> {
    throw new Error("Method not implemented.");
  }

  async upload(
    projectId: Project["id"],
    file: File
  ): Promise<CreateResult<ProjectExportFile>> {
    throw new Error("Method not implemented.");
  }

  async delete(id: ProjectExportFile["id"]): Promise<DeleteResult> {
    throw new Error("Method not implemented.");
  }

  async download(id: ProjectExportFile["id"]): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}
