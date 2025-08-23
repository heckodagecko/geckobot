import { faker } from "@faker-js/faker";
import type { Project as BaseProject, ProjectTag } from "@geckobot/datasource";

import { MOCK_PROJECT_TAG_LIMIT, MOCK_PROJECTS_COUNT } from "../constants";
import { getRandomUniqueTagIds } from "./utils";

interface Project extends BaseProject {
  tags?: ProjectTag["id"][];
}

export function createProject(id: Project["id"]): Project {
  const tagCount = Math.floor(Math.random() * MOCK_PROJECT_TAG_LIMIT);
  return {
    id,
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    startedAt: Math.random() > 0.75 ? null : faker.date.past().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
    tags: getRandomUniqueTagIds(tagCount),
  };
}

export const projects: Project[] = Array.from(
  { length: MOCK_PROJECTS_COUNT },
  (_, index) => createProject(index + 1)
);
