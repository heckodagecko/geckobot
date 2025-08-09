import { faker } from "@faker-js/faker";
import {
  CreateProjectSourceFolder,
  CreateResult,
  GetAllProjectSourceFilesOptions,
  GetAllResult,
  Project,
  ProjectExportFile,
  ProjectSourceFile,
  ProjectSourceFilesService,
  UpdateResult,
} from "@geckobot/datasource";

import { MOCK_API_DELAY } from "../constants";
import { getRandomBytes } from "./utils";

export const projectSourceFiles: ProjectSourceFile[] = [];

function createProjectSourceFile(): ProjectSourceFile {
  return {
    id: projectSourceFiles.length + 1,
    filename: faker.system.commonFileName(),
    mimetype: faker.system.mimeType(),
    size: getRandomBytes(),
    isDirectory: false,
    isExportable: Math.random() < 0.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function createProjectSourceDirectory(): ProjectSourceFile {
  return {
    id: projectSourceFiles.length + 1,
    filename: faker.lorem.word(),
    size: getRandomBytes(),
    isDirectory: true,
    isExportable: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

for (let i = 0; i < 24; i++) {
  if (Math.random() < 0.25) {
    projectSourceFiles.push(createProjectSourceDirectory());
  } else {
    projectSourceFiles.push(createProjectSourceFile());
  }
}

export default class MockProjectSourceFilesService
  implements ProjectSourceFilesService
{
  async getAll(
    _: Project["id"],
    options: GetAllProjectSourceFilesOptions = {}
  ): Promise<GetAllResult<ProjectSourceFile>> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const pageNo = options.pageNo || 1;
    const pageSize = options.pageSize || 10;

    // Group by directories and files, then sort by filename
    let data = projectSourceFiles
      .sort((a, b) => a.filename.localeCompare(b.filename))
      .reduce((acc, file) => {
        if (file.isDirectory) {
          acc.unshift(file);
        } else {
          acc.push(file);
        }
        return acc;
      }, [] as ProjectSourceFile[]);

    data = projectSourceFiles.slice((pageNo - 1) * pageSize, pageNo * pageSize);
    const totalCount = projectSourceFiles.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      data,
      _paging: { totalCount, totalPages },
    };
  }

  async get(id: ProjectSourceFile["id"]): Promise<ProjectSourceFile> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const file = projectSourceFiles.find(({ id: _id }) => _id === id);

    if (file == null) {
      throw new Error("File not found");
    }

    return file;
  }

  async createFolder(
    _: Project["id"],
    { name }: CreateProjectSourceFolder
  ): Promise<CreateResult<ProjectSourceFile>> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_API_DELAY));

    const folder: ProjectSourceFile = {
      id: projectSourceFiles.length + 1,
      filename: name,
      size: 0,
      isDirectory: true,
      isExportable: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projectSourceFiles.push(folder);

    return {
      message: "Folder has been successfully created",
      data: folder,
    };
  }

  async createExport(
    id: ProjectSourceFile["id"]
  ): Promise<CreateResult<ProjectExportFile>> {
    throw new Error("Method not implemented.");
  }

  async uploadFile(
    projectId: Project["id"],
    file: File
  ): Promise<CreateResult<ProjectSourceFile>> {
    throw new Error("Method not implemented.");
  }

  async rename(
    id: ProjectSourceFile["id"]
  ): Promise<UpdateResult<ProjectSourceFile>> {
    throw new Error("Method not implemented.");
  }

  async delete(id: ProjectSourceFile["id"]): Promise<unknown> {
    throw new Error("Method not implemented.");
  }
}
