import MockProjectsService from "./projects";
import MockProjectTagsService from "./project-tags";
import type { Datasource, ProjectsService, ProjectTagsService } from "../types";

export default class MockDatasource implements Datasource {
  readonly projects: ProjectsService;
  readonly projectTags: ProjectTagsService;

  constructor() {
    this.projects = new MockProjectsService();
    this.projectTags = new MockProjectTagsService();
  }
}
