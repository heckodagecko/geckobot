import { faker } from "@faker-js/faker";

import type { ProjectExportFile, ProjectSourceFile } from "../types";

export const projectSourceFiles: ProjectSourceFile[] = [];

export const projectExportFiles: ProjectExportFile[] = [];

const getRandomBytes = () => {
  const min = 1024; // 1 KiB
  const max = 1024 * 1024 * 1024; // 1 GiB
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function createProjectSourceFile(): ProjectSourceFile {
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

export function createProjectSourceDirectory(): ProjectSourceFile {
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
  projectSourceFiles.push(createProjectSourceFile());
}

export class ProjectSourceFilesService {
  async getAll() {}
  async get() {}
  async createFolder() {}
  async createExport() {}
  async uploadFile() {}
  async rename() {}
  async delete() {}
}

export class ProjectExportFilesService {
  async getAll() {}
  async get() {}
}

export class ProjectFilesService {
  readonly exports: ProjectExportFilesService;
  readonly sources: ProjectSourceFilesService;

  constructor() {
    this.exports = new ProjectExportFilesService();
    this.sources = new ProjectSourceFilesService();
  }
}
