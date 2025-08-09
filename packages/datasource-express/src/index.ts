import axios from "axios";
import type {
  Datasource,
  ProjectFilesService,
  ProjectsService,
  ProjectTagsService,
} from "@geckobot/datasource";
import type { AxiosInstance } from "axios";

import ExpressProjectsService from "./projects";
import ExpressProjectTagsService from "./project-tags";
import ExpressProjectFilesService from "./project-files";

export default class ExpressDatasource implements Datasource {
  readonly axios: AxiosInstance;
  readonly projects: ProjectsService;
  readonly projectTags: ProjectTagsService;
  readonly projectFiles: ProjectFilesService;

  constructor(baseURL: string) {
    this.axios = axios.create({ baseURL });
    this.projects = new ExpressProjectsService(this.axios);
    this.projectTags = new ExpressProjectTagsService(this.axios);
    this.projectFiles = new ExpressProjectFilesService(this.axios);
  }
}
