import type {
  ProjectsService as Service,
  CreateResult,
  DeleteResult,
  GetAllOptions,
  GetAllResult,
  UpdateResult,
  DeleteMode,
} from "@geckobot/datasource";
import type { Project, CreateProject, UpdateProject } from "@geckobot/types";
import type { AxiosInstance } from "axios";

class ProjectsService implements Service {
  readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAll(
    options: GetAllOptions<Project> = {}
  ): Promise<GetAllResult<Project>> {
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
}

export default ProjectsService;
