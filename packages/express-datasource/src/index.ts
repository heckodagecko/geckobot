import type { Datasource, ProjectsService } from "@geckobot/datasource";
import type { AxiosInstance } from "axios";

class ExpressDatasource implements Datasource {
  readonly axios: AxiosInstance;
  readonly projects: ProjectsService;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }
}
