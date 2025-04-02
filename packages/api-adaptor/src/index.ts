import { ProjectsService } from "./services/projects";

export interface BackendAdapter {
  projects: ProjectsService;
}
