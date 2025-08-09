import type {
  Datasource,
  ProjectFilesService,
  ProjectsService,
  ProjectTagsService,
} from "@geckobot/datasource";

import MockProjectsService from "./projects";
import MockProjectTagsService from "./project-tags";
import MockProjectFilesService from "./project-files";

export default class MockDatasource implements Datasource {
  readonly projects: ProjectsService;
  readonly projectTags: ProjectTagsService;
  readonly projectFiles: ProjectFilesService;

  constructor() {
    this.projects = new MockProjectsService();
    this.projectTags = new MockProjectTagsService();
    this.projectFiles = new MockProjectFilesService();
  }
}
