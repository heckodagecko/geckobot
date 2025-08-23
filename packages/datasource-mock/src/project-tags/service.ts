import type {
  ProjectTagsService,
  GetAllResult,
  ProjectTag,
  CreateProjectTag,
  CreateResult,
  UpdateProjectTag,
  UpdateResult,
  DeleteResult,
} from "@geckobot/datasource";

import { delay } from "../utils";
import { projectTags } from "./data";

export default class MockProjectTagsService implements ProjectTagsService {
  async getAll(): Promise<GetAllResult<ProjectTag>> {
    await delay();

    return {
      data: projectTags,
      _paging: { totalCount: projectTags.length, totalPages: 1 },
    };
  }

  async get(id: ProjectTag["id"]): Promise<ProjectTag> {
    await delay();

    const tag = projectTags.find(({ id: _id }) => _id === id);

    if (tag == null) {
      throw new Error(`Project tag not found`);
    }

    return tag;
  }

  async create({
    name,
    color,
  }: CreateProjectTag): Promise<CreateResult<ProjectTag>> {
    await delay();

    const tag: ProjectTag = {
      id: projectTags.length + 1,
      name,
      color: color ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projectTags.push(tag);

    return {
      message: "Project tag has been successfully created",
      data: tag,
    };
  }

  async update(
    id: ProjectTag["id"],
    data: UpdateProjectTag
  ): Promise<UpdateResult<ProjectTag>> {
    await delay();

    const index = projectTags.findIndex(({ id: _id }) => _id === id);
    if (index === -1) {
      throw new Error("Project tag not found");
    }

    const tag: ProjectTag = {
      ...projectTags[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    projectTags[index] = tag;

    return {
      message: "Project tag has been successfully updated",
      data: tag,
    };
  }

  async delete(id: ProjectTag["id"]): Promise<DeleteResult> {
    await delay();

    const index = projectTags.findIndex(({ id: _id }) => _id === id);
    if (index === -1) {
      throw new Error("Project tag not found");
    }

    projectTags.splice(index, 1);

    return { message: "Project tag has been successfully deleted" };
  }
}
