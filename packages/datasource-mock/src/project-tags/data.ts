import { faker } from "@faker-js/faker";
import type { HexColor, ProjectTag } from "@geckobot/datasource";

import { MOCK_PROJECT_TAGS_COUNT } from "../constants";

export function createProjectTag(id: ProjectTag["id"]): ProjectTag {
  return {
    id,
    name: `Tag #${id}`,
    color: faker.color.rgb() as HexColor,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const projectTags: ProjectTag[] = Array.from(
  { length: MOCK_PROJECT_TAGS_COUNT },
  (_, index) => createProjectTag(index + 1)
);
