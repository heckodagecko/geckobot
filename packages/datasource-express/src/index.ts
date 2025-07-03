import axios from "axios";
import type { Datasource } from "@geckobot/datasource";
import type { AxiosInstance } from "axios";

import ProjectsService from "./projects";
import ProjectTagsService from "./project-tags";

export default class ExpressDatasource implements Datasource {
  readonly axios: AxiosInstance;
  readonly projects: ProjectsService;
  readonly projectTags: ProjectTagsService;

  constructor(baseURL: string) {
    this.axios = axios.create({ baseURL });
    this.projects = new ProjectsService(this.axios);
    this.projectTags = new ProjectTagsService(this.axios);
  }
}
