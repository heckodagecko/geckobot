import type {
  CreateProjectSourceFolder,
  CreateResult,
  GetAllProjectSourceFilesOptions,
  GetAllResult,
  Project,
  ProjectExportFile,
  ProjectSourceFile,
  ProjectSourceFilesService,
  UpdateResult,
} from "@geckobot/datasource";
import type { AxiosInstance } from "axios";

export default class ExpressProjectSourceFilesService
  implements ProjectSourceFilesService
{
  readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAll(
    projectId: Project["id"],
    options: GetAllProjectSourceFilesOptions = {}
  ): Promise<GetAllResult<ProjectSourceFile>> {
    throw new Error("Method not implemented.");
  }

  async get(id: ProjectSourceFile["id"]): Promise<ProjectSourceFile> {
    throw new Error("Method not implemented.");
  }

  async createFolder(
    projectId: Project["id"],
    data: CreateProjectSourceFolder
  ): Promise<CreateResult<ProjectSourceFile>> {
    throw new Error("Method not implemented.");
  }

  async uploadFile(
    projectId: Project["id"],
    file: File
  ): Promise<CreateResult<ProjectSourceFile>> {
    throw new Error("Method not implemented.");
  }

  async createExport(
    id: ProjectSourceFile["id"]
  ): Promise<CreateResult<ProjectExportFile>> {
    throw new Error("Method not implemented.");
  }

  async rename(
    id: ProjectSourceFile["id"]
  ): Promise<UpdateResult<ProjectSourceFile>> {
    throw new Error("Method not implemented.");
  }

  async delete(id: ProjectSourceFile["id"]): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}
