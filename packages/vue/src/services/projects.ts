import type {
  CreateResult,
  DeleteMode,
  DeleteResult,
  GetAllOptions,
  GetAllResult,
  ProjectsService,
  UpdateResult,
} from '@geckobot/datasource'
import { faker } from '@faker-js/faker'
import type { Project, CreateProject, UpdateProject } from '@geckobot/types'

const items: Project[] = []

function createProject(): Project {
  return {
    id: items.length,
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    startedAt: Math.random() > 0.75 ? null : faker.date.past().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  }
}

for (let i = 0; i < 150; i++) {
  items.push(createProject())
}

export default class MockProjectsService implements ProjectsService {
  getAll(options: GetAllOptions<Project> = {}): Promise<GetAllResult<Project>> {
    const pageNo = options.pageNo || 1
    const pageSize = options.pageSize || 10
    const includeTrashed = Boolean(options.includeTrashed)

    const filteredItems = items.filter(({ deletedAt }) =>
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
    const project = items.find((p) => p.id === id)
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
