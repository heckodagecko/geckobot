import { faker } from "@faker-js/faker";

import { MOCK_API_DELAY, MOCK_PROJECTS_COUNT } from "./constants";
import { projectTags } from "./project-tags";
import type {
  CreateProject,
  CreateResult,
  DeleteMode,
  DeleteResult,
  GetAllOptions,
  GetAllResult,
  Project as BaseProject,
  ProjectsService,
  ProjectTag,
  RestoreResult,
  UpdateProject,
  UpdateResult,
  UpdateTagsResult,
} from "../types";

interface Project extends BaseProject {
  tags?: ProjectTag["id"][];
}

export const projects: Project[] = [];

function createProject(): Project {
  return {
    id: projects.length + 1,
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    startedAt: Math.random() > 0.75 ? null : faker.date.past().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    tags: Array(Math.floor(Math.random() * MOCK_PROJECTS_COUNT)).map(
      () => projectTags[Math.floor(Math.random() * projectTags.length)].id
    ),
  };
}

for (let i = 0; i < MOCK_PROJECTS_COUNT; i++) {
  projects.push(createProject());
}

export default class MockProjectsService implements ProjectsService {
  async getAll(
    options: GetAllOptions<Project> = {},
    searchTerm?: string
  ): Promise<GetAllResult<Project>> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    // TODO: Filter by tags

    const pageNo = options.pageNo || 1;
    const pageSize = options.pageSize || 10;
    const includeTrashed = Boolean(options.includeTrashed);

    let filteredItems = projects.filter(({ deletedAt }) =>
      !includeTrashed ? deletedAt == null : true
    );

    if (searchTerm != null) {
      filteredItems = filteredItems.filter(({ name }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const startIndex = (pageNo - 1) * pageSize;

    const data = filteredItems.slice(startIndex, startIndex + pageSize);
    const totalCount = filteredItems.length;
    const totalPages = Math.ceil(filteredItems.length / pageSize);

    return {
      data,
      _paging: { totalCount, totalPages },
    };
  }

  async get(id: Project["id"]): Promise<Project> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const project = projects.find(({ id: _id }) => _id === id);

    if (project == null) {
      throw new Error("Project not found");
    }

    return project;
  }

  async create({
    name,
    description,
    startedAt,
  }: CreateProject): Promise<CreateResult<Project>> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const project: Project = {
      id: projects.length + 1,
      name,
      description: description ?? null,
      startedAt: startedAt ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };
    projects.unshift(project);

    return {
      message: "Project has been successfully created",
      data: project,
    };
  }

  async update(
    id: Project["id"],
    data: UpdateProject
  ): Promise<UpdateResult<Project>> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const index = projects.findIndex(({ id: _id }) => _id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }

    const project: Project = {
      ...projects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    projects[index] = project;

    return {
      message: "Project has been updated successfully",
      data: project,
    };
  }

  async delete(
    id: Project["id"],
    mode: DeleteMode = "SOFT"
  ): Promise<DeleteResult> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const index = projects.findIndex(({ id: _id }) => _id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }

    if (mode === "HARD") {
      projects.splice(index, 1);
    } else {
      projects[index].deletedAt = new Date().toISOString();
    }

    return {
      message:
        mode === "HARD"
          ? "Project has been permanently deleted"
          : "Project has been archived",
    };
  }

  async restore(id: Project["id"]): Promise<RestoreResult> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const index = projects.findIndex(({ id: _id }) => _id === id);
    if (index === -1) {
      return Promise.reject(new Error("Project not found"));
    }

    projects[index].deletedAt = null;

    return { message: "Project has been restored" };
  }

  async updateTags(
    id: Project["id"],
    assign: ProjectTag["id"][] = [],
    remove: ProjectTag["id"][] = []
  ): Promise<UpdateTagsResult> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const index = projects.findIndex(({ id: _id }) => _id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }

    const project = projects[index];

    const assignedTags: ProjectTag["id"][] = [
      ...(project.tags ?? []),
      ...assign.filter((tagId) => !project.tags?.includes(tagId)),
    ];
    const removedTags: ProjectTag["id"][] = [
      ...(project.tags ?? []).filter((tagId) => !assign.includes(tagId)),
      ...remove.filter((tagId) => project.tags?.includes(tagId)),
    ];

    project.tags = assignedTags.filter((tagId) => !removedTags.includes(tagId));
    project.updatedAt = new Date().toISOString();

    projects[index] = project;

    return {
      message: "Project tags have been updated successfully",
      data: {
        assigned: assignedTags,
        removed: removedTags,
      },
    };
  }
}
