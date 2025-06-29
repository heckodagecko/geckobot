import type {
  CreateResult,
  DeleteResult,
  GetAllResult,
  UpdateResult,
} from "../service";
import type { CreateProjectTag, ProjectTag, UpdateProjectTag } from "./data";

export interface ProjectTagsService {
  getAll(): Promise<GetAllResult<ProjectTag>>;
  get(id: ProjectTag["id"]): Promise<ProjectTag>;
  create(data: CreateProjectTag): Promise<CreateResult<ProjectTag>>;
  update(
    id: ProjectTag["id"],
    data: UpdateProjectTag
  ): Promise<UpdateResult<ProjectTag>>;
  delete(id: ProjectTag["id"]): Promise<DeleteResult>;
}
