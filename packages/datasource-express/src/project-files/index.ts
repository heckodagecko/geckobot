import type {
  ProjectExportFilesService,
  ProjectFilesService,
  ProjectSourceFilesService,
} from "@geckobot/datasource";
import type { AxiosInstance } from "axios";

import ExpressProjectExportFilesService from "./exports";
import ExpressProjectSourceFilesService from "./sources";

export default class ExpressProjectFilesService implements ProjectFilesService {
  readonly exports: ProjectExportFilesService;
  readonly sources: ProjectSourceFilesService;

  constructor(axios: AxiosInstance) {
    this.exports = new ExpressProjectExportFilesService(axios);
    this.sources = new ExpressProjectSourceFilesService(axios);
  }
}
