import { faker } from "@faker-js/faker";
import type {
  CreateResult,
  DeleteResult,
  GetAllProjectExportFilesOptions,
  GetAllResult,
  Project,
  ProjectExportFile,
  ProjectExportFilesService,
} from "@geckobot/datasource";

import { MOCK_API_DELAY } from "../constants";
import { getRandomBytes } from "./utils";

export const projectExportFiles: ProjectExportFile[] = [];

function createProjectExportFile(): ProjectExportFile {
  return {
    id: projectExportFiles.length + 1,
    filename: faker.system.commonFileName(),
    mimetype: faker.system.mimeType(),
    size: getRandomBytes(),
    url: faker.internet.url(),
    createdAt: new Date().toISOString(),
  };
}

for (let i = 0; i < 50; i++) {
  projectExportFiles.push(createProjectExportFile());
}

export default class MockProjectExportFilesService
  implements ProjectExportFilesService
{
  async getAll(
    _: Project["id"],
    options: GetAllProjectExportFilesOptions = {}
  ): Promise<GetAllResult<ProjectExportFile>> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const pageNo = options.pageNo || 1;
    const pageSize = options.pageSize || 10;

    const data = projectExportFiles.slice(
      (pageNo - 1) * pageSize,
      pageNo * pageSize
    );
    const totalCount = projectExportFiles.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data,
      _paging: { totalCount, totalPages },
    };
  }

  async get(id: ProjectExportFile["id"]): Promise<ProjectExportFile> {
    throw new Error("Method not implemented.");
  }

  async upload(
    projectId: Project["id"],
    file: File
  ): Promise<CreateResult<ProjectExportFile>> {
    throw new Error("Method not implemented.");
  }

  async delete(id: ProjectExportFile["id"]): Promise<DeleteResult> {
    throw new Error("Method not implemented.");
  }

  async download(id: ProjectExportFile["id"]): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}
