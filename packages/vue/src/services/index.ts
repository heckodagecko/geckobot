import type { Datasource, ProjectsService } from '@geckobot/datasource'

import MockProjectsService from './projects'

class MockDatasource implements Datasource {
  readonly projects: ProjectsService

  constructor() {
    this.projects = new MockProjectsService()
  }
}

export default new MockDatasource()
