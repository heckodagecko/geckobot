import {
  ProjectExportFilesService,
  ProjectFilesService,
  ProjectSourceFilesService,
} from "@geckobot/datasource";

import MockProjectExportFilesService from "./exports";
import MockProjectSourceFilesService from "./sources";

export default class MockProjectFilesService implements ProjectFilesService {
  readonly exports: ProjectExportFilesService;
  readonly sources: ProjectSourceFilesService;

  constructor() {
    this.exports = new MockProjectExportFilesService();
    this.sources = new MockProjectSourceFilesService();
  }
}
