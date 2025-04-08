import type { Datasource } from "@geckobot/datasource";
import type { AxiosInstance } from "axios";

import { ProjectsService } from "./services";

export default class ExpressDatasource implements Datasource {
  readonly axios: AxiosInstance;
  readonly projects: ProjectsService;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    this.projects = new ProjectsService(this.axios);
  }
}
