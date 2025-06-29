import {
  CreateProjectTag,
  CreateResult,
  DeleteResult,
  GetAllResult,
  ProjectTag,
  ProjectTagsService,
  UpdateProjectTag,
  UpdateResult,
} from "../types";

export default class MockProjectTagsService implements ProjectTagsService {
  async getAll(): Promise<GetAllResult<ProjectTag>> {
    throw new Error("Method not implemented.");
  }

  async get(id: ProjectTag["id"]): Promise<ProjectTag> {
    throw new Error("Method not implemented.");
  }

  async create(data: CreateProjectTag): Promise<CreateResult<ProjectTag>> {
    throw new Error("Method not implemented.");
  }

  async update(
    id: ProjectTag["id"],
    data: UpdateProjectTag
  ): Promise<UpdateResult<ProjectTag>> {
    throw new Error("Method not implemented.");
  }

  async delete(id: ProjectTag["id"]): Promise<DeleteResult> {
    throw new Error("Method not implemented.");
  }
}
