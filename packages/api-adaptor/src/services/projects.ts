import type { CreateProject, UpdateProject, Project } from "@geckobot/types";

import { GetAllResult, CreateResult, UpdateResult, DeleteResult, SortOptions } from "./types";

export interface ProjectsService {
  getAll(sortBy: SortOptions<Project>, pageNo: number, pageSize: number): Promise<GetAllResult<Project>>;
  get(id: Project['_id']): Promise<Project>;
  create(data: CreateProject): Promise<CreateResult<Project>>;
  update(id: Project['_id'], data: UpdateProject): Promise<UpdateResult<Project>>;
  delete(id: Project['_id']): Promise<DeleteResult>;
}
