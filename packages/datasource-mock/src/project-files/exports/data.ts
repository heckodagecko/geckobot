import { faker } from "@faker-js/faker";
import type { ProjectExportFile } from "@geckobot/datasource";

import { MOCK_PROJECT_FILE_EXPORTS_COUNT } from "../../constants";
import { getRandomBytes } from "../utils";

function createProjectExportFile(
  id: ProjectExportFile["id"]
): ProjectExportFile {
  return {
    id,
    filename: faker.system.commonFileName(),
    mimetype: faker.system.mimeType(),
    size: getRandomBytes(),
    url: faker.internet.url(),
    createdAt: new Date().toISOString(),
  };
}

export const projectExportFiles: ProjectExportFile[] = Array.from(
  { length: MOCK_PROJECT_FILE_EXPORTS_COUNT },
  (_, index) => createProjectExportFile(index + 1)
);
