import type { ProjectsService, ProjectTagsService } from "./services";

export interface Datasource {
  readonly projects: ProjectsService;
  readonly projectTags: ProjectTagsService;
}
