import type {
  CreateProject,
  CreateResult,
  DeleteMode,
  DeleteResult,
  GetAllOptions,
  GetAllResult,
  Project,
  ProjectsService,
  RestoreResult,
  UpdateProject,
  UpdateResult,
  UpdateTagsResult,
} from "@geckobot/datasource";
import type { AxiosInstance } from "axios";

export default class ExpressProjectsService implements ProjectsService {
  readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAll(
    options: GetAllOptions<Project> = {},
    searchTerm?: string | null
  ): Promise<GetAllResult<Project>> {
    // TODO: Implement searchTerm functionality

    const { pageNo, pageSize, includeTrashed } = options;
    const { data } = await this.axios.get<GetAllResult<Project>>("/projects", {
      params: { pageNo, pageSize, includeTrashed },
    });
    return data;
  }

  async get(id: Project["id"]): Promise<Project> {
    const { data } = await this.axios.get<Project>(`/projects/${id}`);
    return data;
  }

  async create(data: CreateProject): Promise<CreateResult<Project>> {
    const response = await this.axios.post<CreateResult<Project>>(
      "/projects",
      data
    );
    return response.data;
  }

  async update(
    id: Project["id"],
    data: UpdateProject
  ): Promise<UpdateResult<Project>> {
    const response = await this.axios.put<UpdateResult<Project>>(
      `/projects/${id}`,
      data
    );
    return response.data;
  }

  async delete(
    id: Project["id"],
    mode: DeleteMode = "SOFT"
  ): Promise<DeleteResult> {
    const { data } = await this.axios.delete<DeleteResult>(`/projects/${id}`, {
      params: mode === "HARD" ? { destroy: 1 } : {},
    });
    return data;
  }

  async restore(id: Project["id"]): Promise<RestoreResult> {
    const { data } = await this.axios.patch<RestoreResult>(`/projects/${id}`);
    return data;
  }

  async updateTags(
    id: Project["id"],
    assign: Project["id"][] = [],
    remove: Project["id"][] = []
  ): Promise<UpdateTagsResult> {
    const { data } = await this.axios.put<UpdateTagsResult>(
      `/projects/${id}/tags`,
      { assign, remove }
    );
    return data;
  }
}
