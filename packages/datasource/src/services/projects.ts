import type { CreateProject, UpdateProject, Project } from "@geckobot/types";

import type {
  GetAllOptions,
  GetAllResult,
  CreateResult,
  UpdateResult,
  DeleteMode,
  DeleteResult,
  RestoreResult,
} from "./types";

export interface ProjectsService {
  getAll(
    options: GetAllOptions<Project>,
    searchTerm?: string | null
  ): Promise<GetAllResult<Project>>;
  get(id: Project["id"]): Promise<Project>;
  create(data: CreateProject): Promise<CreateResult<Project>>;
  update(
    id: Project["id"],
    data: UpdateProject
  ): Promise<UpdateResult<Project>>;
  delete(id: Project["id"], mode: DeleteMode): Promise<DeleteResult>;
  restore(id: Project["id"]): Promise<RestoreResult>;
}
