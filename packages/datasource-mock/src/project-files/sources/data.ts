import { faker } from "@faker-js/faker";
import type { ProjectSourceFile } from "@geckobot/datasource";

import { MOCK_PROJECT_FILE_SOURCES_COUNT } from "../../constants";
import { getRandomBytes } from "../utils";

export function createProjectSourceFile(
  id: ProjectSourceFile["id"]
): ProjectSourceFile {
  return {
    id,
    filename: faker.system.commonFileName(),
    mimetype: faker.system.mimeType(),
    size: getRandomBytes(),
    isDirectory: false,
    isExportable: Math.random() < 0.5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function createProjectSourceDirectory(
  id: ProjectSourceFile["id"]
): ProjectSourceFile {
  return {
    id,
    filename: faker.lorem.word(),
    size: getRandomBytes(),
    isDirectory: true,
    isExportable: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const projectSourceFiles: ProjectSourceFile[] = Array.from(
  { length: MOCK_PROJECT_FILE_SOURCES_COUNT },
  (_, index) => {
    const id = index + 1;
    if (Math.random() < 0.25) {
      return createProjectSourceDirectory(id);
    } else {
      return createProjectSourceFile(id);
    }
  }
);
