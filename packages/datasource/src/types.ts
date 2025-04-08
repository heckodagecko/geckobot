import type { ProjectsService } from "./services";

export interface Datasource {
  readonly projects: ProjectsService;
}
