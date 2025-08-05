import type {
  CreateResult,
  DeleteMode,
  DeleteResult,
  GetAllOptionsPagination,
  GetAllOptionsSortable,
  GetAllOptionsWithTrashed,
  GetAllResult,
  RestoreResult,
  UpdateResult,
} from "../service";
import type { ProjectTag } from "../project-tags";
import type { CreateProject, UpdateProject, Project } from "./data";

export interface GetAllProjectsOptions
  extends GetAllOptionsPagination,
    GetAllOptionsSortable<Project>,
    GetAllOptionsWithTrashed {
  searchTerm?: string;
  hasTags?: ProjectTag["id"][];
}

export interface UpdateTagsResult {
  message: string;
  data: {
    assigned: Project["id"][];
    removed: Project["id"][];
  };
}

export interface ProjectsService {
  getAll(options?: GetAllProjectsOptions): Promise<GetAllResult<Project>>;
  get(id: Project["id"]): Promise<Project>;
  create(data: CreateProject): Promise<CreateResult<Project>>;
  update(
    id: Project["id"],
    data: UpdateProject
  ): Promise<UpdateResult<Project>>;
  delete(id: Project["id"], mode: DeleteMode): Promise<DeleteResult>;
  restore(id: Project["id"]): Promise<RestoreResult>;
  updateTags(
    id: Project["id"],
    assign: Project["id"][],
    remove: Project["id"][]
  ): Promise<UpdateTagsResult>;
}
