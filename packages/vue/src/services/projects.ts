import type {
  CreateResult,
  DeleteMode,
  DeleteResult,
  GetAllOptions,
  GetAllResult,
  ProjectsService,
  RestoreResult,
  UpdateResult,
} from '@geckobot/datasource'
import { faker } from '@faker-js/faker'
import type { Project, CreateProject, UpdateProject } from '@geckobot/types'

const items: Project[] = []

function createProject(): Project {
  return {
    id: items.length + 1,
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
  async getAll(options: GetAllOptions<Project> = {}): Promise<GetAllResult<Project>> {
    const pageNo = options.pageNo || 1
    const pageSize = options.pageSize || 10
    const includeTrashed = Boolean(options.includeTrashed)

    const filteredItems = items.filter(({ deletedAt }) =>
      !includeTrashed ? deletedAt == null : true,
    )

    const startIndex = (pageNo - 1) * pageSize

    const data = filteredItems.slice(startIndex, startIndex + pageSize)
    const totalCount = filteredItems.length
    const totalPages = Math.ceil(filteredItems.length / pageSize)

    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      data,
      _paging: { totalCount, totalPages },
    }
  }

  async get(id: Project['id']): Promise<Project> {
    const project = items.find((p) => p.id === id)

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (project == null) throw new Error('Project not found')

    return project
  }

  async create({ name, description, startedAt }: CreateProject): Promise<CreateResult<Project>> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const project: Project = {
      id: items.length + 1,
      name,
      description: description ?? null,
      startedAt: startedAt ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    }
    items.unshift(project)

    return {
      message: 'Project has been successfully created',
      data: project,
    }
  }

  async update(id: Project['id'], data: UpdateProject): Promise<UpdateResult<Project>> {
    const index = items.findIndex(({ id: _id }) => _id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    const project: Project = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    items[index] = project

    return {
      message: 'Project has been updated successfully',
      data: project,
    }
  }

  async delete(id: Project['id'], mode: DeleteMode = 'SOFT'): Promise<DeleteResult> {
    const index = items.findIndex(({ id: _id }) => _id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (mode === 'HARD') {
      items.splice(index, 1)
    } else {
      items[index].deletedAt = new Date().toISOString()
    }

    return {
      message:
        mode === 'HARD' ? 'Project has been permanently deleted' : 'Project has been archived',
    }
  }

  async restore(id: Project['id']): Promise<RestoreResult> {
    const index = items.findIndex(({ id: _id }) => _id === id)
    if (index === -1) {
      return Promise.reject(new Error('Project not found'))
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    items[index].deletedAt = null

    return { message: 'Project has been restored' }
  }
}
