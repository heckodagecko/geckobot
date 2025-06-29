import type { ProjectsService } from "./projects";
import type { ProjectTagsService } from "./project-tags";

export interface Datasource {
  readonly projects: ProjectsService;
  readonly projectTags: ProjectTagsService;
}
