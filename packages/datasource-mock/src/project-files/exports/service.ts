import { faker } from "@faker-js/faker";
import type {
  ProjectExportFilesService,
  Project,
  GetAllProjectExportFilesOptions,
  GetAllResult,
  ProjectExportFile,
  CreateResult,
  DeleteResult,
} from "@geckobot/datasource";

import { MOCK_API_DELAY } from "../../constants";
import { getRandomBytes } from "../utils";
import { projectExportFiles } from "./data";

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
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const file = projectExportFiles.find(({ id: _id }) => _id === id);

    if (file == null) {
      throw new Error("File not found.");
    }

    return file;
  }

  async upload(
    _: Project["id"],
    file: File
  ): Promise<CreateResult<ProjectExportFile>> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const exportFile: ProjectExportFile = {
      id: projectExportFiles.length + 1,
      filename: file.name,
      mimetype: faker.system.mimeType(),
      size: getRandomBytes(),
      url: faker.internet.url(),
      createdAt: new Date().toISOString(),
    };
    projectExportFiles.push(exportFile);

    return {
      message: "Export file has been successfully uploaded",
      data: exportFile,
    };
  }

  async delete(id: ProjectExportFile["id"]): Promise<DeleteResult> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const index = projectExportFiles.findIndex(({ id: _id }) => _id === id);
    if (index === -1) {
      throw new Error("Export file not found");
    }

    projectExportFiles.splice(index, 1);

    return {
      message: "Export file has been deleted",
    };
  }

  async download(id: ProjectExportFile["id"]): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}
