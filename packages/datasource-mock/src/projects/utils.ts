import type { ProjectTag } from "@geckobot/datasource";

import { projectTags } from "../project-tags";

export function getRandomUniqueTagIds(count: number): ProjectTag["id"][] {
  const tagIds = new Set<ProjectTag["id"]>();

  while (tagIds.size < count && tagIds.size < projectTags.length) {
    tagIds.add(projectTags[Math.floor(Math.random() * projectTags.length)].id);
  }

  return Array.from(tagIds);
}
