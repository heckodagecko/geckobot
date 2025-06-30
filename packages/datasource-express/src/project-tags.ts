import type {
  CreateProjectTag,
  CreateResult,
  DeleteResult,
  GetAllResult,
  ProjectTag,
  ProjectTagsService,
  UpdateProjectTag,
  UpdateResult,
} from "@geckobot/datasource";
import type { AxiosInstance } from "axios";

export default class ExpressProjectTagsService implements ProjectTagsService {
  readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAll(): Promise<GetAllResult<ProjectTag>> {
    const { data } =
      await this.axios.get<GetAllResult<ProjectTag>>("/project-tags");
    return data;
  }

  async get(id: ProjectTag["id"]): Promise<ProjectTag> {
    const { data } = await this.axios.get<ProjectTag>(`/project-tags/${id}`);
    return data;
  }

  async create(data: CreateProjectTag): Promise<CreateResult<ProjectTag>> {
    const response = await this.axios.post<CreateResult<ProjectTag>>(
      "/project-tags",
      data
    );
    return response.data;
  }

  async update(
    id: ProjectTag["id"],
    data: UpdateProjectTag
  ): Promise<UpdateResult<ProjectTag>> {
    const response = await this.axios.put<UpdateResult<ProjectTag>>(
      `/project-tags/${id}`,
      data
    );
    return response.data;
  }

  async delete(id: ProjectTag["id"]): Promise<DeleteResult> {
    const { data } = await this.axios.delete<DeleteResult>(
      `/project-tags/${id}`
    );
    return data;
  }
}
