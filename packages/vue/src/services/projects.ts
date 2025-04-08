import type {
  CreateResult,
  DeleteMode,
  DeleteResult,
  GetAllOptions,
  GetAllResult,
  ProjectsService,
  UpdateResult,
} from '@geckobot/datasource'
import type { Project, CreateProject, UpdateProject } from '@geckobot/types'

export default class MockProjectsService implements ProjectsService {
  items: Project[] = [
    {
      id: 1,
      name: 'Mock Project 1',
      description: 'Description of mock project 1',
      startedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      id: 2,
      name: 'Mock Project 2',
      description: 'Description of mock project 2',
      startedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    },
    {
      id: 3,
      name: 'Mock Project 3',
      description: 'Description of mock project 3',
      startedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: new Date().toISOString(),
    },
  ]

  getAll(options: GetAllOptions<Project> = {}): Promise<GetAllResult<Project>> {
    const pageNo = options.pageNo || 1
    const pageSize = options.pageSize || 10
    const includeTrashed = Boolean(options.includeTrashed)

    const filteredItems = this.items.filter(({ deletedAt }) =>
      !includeTrashed ? deletedAt === null : true,
    )

    const startIndex = (pageNo - 1) * pageSize

    const data = filteredItems.slice(startIndex, startIndex + pageSize)
    const totalCount = filteredItems.length
    const totalPages = Math.ceil(filteredItems.length / pageSize)

    return new Promise((resolve) => setTimeout(resolve, 500)).then(() => ({
      data,
      _paging: { totalCount, totalPages },
    }))
  }

  get(id: Project['id']): Promise<Project> {
    const project = this.items.find((p) => p.id === id)
    if (project) return Promise.resolve(project)
    return Promise.reject(new Error('Project not found'))
  }

  create(data: CreateProject): Promise<CreateResult<Project>> {
    throw new Error('Method not implemented.')
  }

  update(id: Project['id'], data: UpdateProject): Promise<UpdateResult<Project>> {
    throw new Error('Method not implemented.')
  }

  delete(id: Project['id'], mode: DeleteMode = 'SOFT'): Promise<DeleteResult> {
    throw new Error('Method not implemented.')
  }
}
