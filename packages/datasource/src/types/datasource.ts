import type { ProjectsService } from "./projects";
import type { ProjectTagsService } from "./project-tags";
import type { ProjectFilesService } from "./project-files";

export interface Datasource {
  readonly projects: ProjectsService;
  readonly projectTags: ProjectTagsService;
  readonly projectFiles: ProjectFilesService;
}
